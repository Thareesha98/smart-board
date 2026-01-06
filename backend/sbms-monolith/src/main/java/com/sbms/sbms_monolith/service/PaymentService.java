package com.sbms.sbms_monolith.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.sbms.sbms_monolith.dto.payment.PaymentHistoryDTO;
import com.sbms.sbms_monolith.dto.payment.PaymentResult;
import com.sbms.sbms_monolith.mapper.PaymentMapper;
import com.sbms.sbms_monolith.model.PaymentTransaction;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.model.enums.PaymentStatus;
import com.sbms.sbms_monolith.repository.PaymentTransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;




@Service
public class PaymentService {

    @Autowired
    private PaymentTransactionRepository transactionRepo;

    @Autowired(required = false)
    private NotificationPublisher notificationPublisher;

    @Autowired
    private DummyPaymentGateway gateway;
    
    @Autowired
    private PaymentReceiptPdfService pdfService;

    @Autowired
    private S3Service s3Service;


    public PaymentResult processPayment(
            Long userId,
            BigDecimal amount,
            PaymentMethod method
    ) {

        PaymentTransaction tx = new PaymentTransaction();
        tx.setUserId(userId);
        tx.setAmount(amount);
        tx.setMethod(method);
        tx.setTransactionRef(gateway.generateTransactionRef());
        tx.setStatus(PaymentStatus.PENDING);

        transactionRepo.save(tx);

        boolean gatewayResult = gateway.simulateGatewayResponse();

        if (gatewayResult) {
            tx.setStatus(PaymentStatus.SUCCESS);
            transactionRepo.save(tx);
            
            byte[] pdfBytes = pdfService.generateReceipt(tx);

	         String receiptKey = "receipts/" + tx.getTransactionRef() + ".pdf";
	         String receiptUrl = s3Service.uploadBytes(
	                 pdfBytes,
	                 receiptKey,
	                 "application/pdf"
	         );
	
	         tx.setReceiptUrl(receiptUrl);
	         transactionRepo.save(tx);

            // 🔔 PAYMENT SUCCESS EVENT
            if (notificationPublisher != null) {
                try {
                    notificationPublisher.publish(
                            "payment.success",
                            userId,
                            tx.getTransactionRef(),
                            Map.of(
                                    "amount", amount,
                                    "method", method.name(),
                                    "transactionRef", tx.getTransactionRef()
                            )
                    );
                } catch (Exception e) {
                    System.err.println("⚠️ Warning: RabbitMQ is down. 'payment.success' notification skipped.");
                }
            }

            return new PaymentResult(
                    true,
                    tx.getTransactionRef(),
                    "Payment successful"
            );

        } else {
            tx.setStatus(PaymentStatus.FAILED);
            tx.setFailureReason("Insufficient funds (simulated)");
            transactionRepo.save(tx);

            // 🔔 PAYMENT FAILURE EVENT
            if (notificationPublisher != null) {
                try {
                    notificationPublisher.publish(
                            "payment.failed",
                            userId,
                            tx.getTransactionRef(),
                            Map.of(
                                    "amount", amount,
                                    "method", method.name(),
                                    "reason", tx.getFailureReason()
                            )
                    );
                } catch (Exception e) {
                    System.err.println("⚠️ Warning: RabbitMQ is down. 'payment.failed' notification skipped.");
                }
            }

            return new PaymentResult(
                    false,
                    tx.getTransactionRef(),
                    "Payment failed"
            );
        }
    }
    
    
    public List<PaymentHistoryDTO> getPaymentHistory(Long userId) {

        return transactionRepo.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(PaymentMapper::toDTO)
                .toList();
    }

}
