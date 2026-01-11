package com.sbms.sbms_monolith.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.sbms.sbms_monolith.dto.payment.PayHereWebhookRequest;
import com.sbms.sbms_monolith.model.MonthlyBill;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.PaymentTransaction;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MonthlyBillStatus;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentType;
import com.sbms.sbms_monolith.repository.MonthlyBillRepository;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;
import com.sbms.sbms_monolith.repository.PaymentTransactionRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentWebhookService {

    private final PaymentIntentRepository intentRepo;
    private final PaymentTransactionRepository txRepo;
    private final MonthlyBillRepository monthlyBillRepo;
    private final PaymentReceiptPdfService pdfService;
    private final S3Service s3Service;
    private final PaymentFeeCalculator feeCalculator;
    private final OwnerWalletService ownerWalletService;
    
    private final EmailService emailService;
    private final UserRepository userRepository;




    /**
     * Handles PayHere-style webhook callback.
     * This is the SINGLE SOURCE OF TRUTH.
     */
    @Transactional
    public void handlePayHereWebhook(PayHereWebhookRequest req) {

        PaymentTransaction tx = txRepo
                .findByTransactionRef(req.getOrder_id())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        PaymentIntent intent = tx.getIntent();

        // 🔁 Ignore duplicate callbacks
        if (intent.getStatus() == PaymentIntentStatus.SUCCESS) {
            return;
        }

        // -------------------- SUCCESS --------------------
     // SUCCESS
        if ("2".equals(req.getStatus_code())) {

            tx.setStatus(PaymentStatus.SUCCESS);
            tx.setPaidAt(LocalDateTime.now());

            // ✅ COMMISSION CALCULATION
            var fees = feeCalculator.calculate(tx.getAmount());

            tx.setPlatformFee(fees.platformFee());
            tx.setGatewayFee(fees.gatewayFee());
            tx.setNetAmount(fees.netAmount());
            
         // After commission calculation
            ownerWalletService.credit(
                    intent.getOwnerId(),
                    tx.getNetAmount(),
                    tx.getTransactionRef()
            );


            // Generate receipt
            byte[] pdf = pdfService.generate(tx);
            String receiptUrl = s3Service.uploadBytes(
            	    pdf,
            	    "payment-receipts/" + tx.getTransactionRef() + ".pdf",
            	    "application/pdf"  
            	);

            User student = userRepository.findById(intent.getStudentId())
                    .orElseThrow();

            emailService.sendPaymentReceipt(
                    student.getEmail(),
                    student.getFullName(),
                    pdf,
                    tx.getTransactionRef()
            );


            tx.setReceiptPath(receiptUrl);
            txRepo.save(tx);

            intent.setStatus(PaymentIntentStatus.SUCCESS);
            intent.setCompletedAt(LocalDateTime.now());
            intentRepo.save(intent);

            // MonthlyBill update (if applicable)
            if (intent.getType() != PaymentType.KEY_MONEY) {
                MonthlyBill bill = monthlyBillRepo
                        .findByStudentIdAndBoardingIdAndStatus(
                                intent.getStudentId(),
                                intent.getBoardingId(),
                                MonthlyBillStatus.PENDING
                        )
                        .orElseThrow();

                bill.setStatus(MonthlyBillStatus.PAID);
                bill.setPaidAt(LocalDateTime.now());
                monthlyBillRepo.save(bill);
            }
        }

        // -------------------- FAILED --------------------
        else {

            tx.setStatus(PaymentStatus.FAILED);
            tx.setFailureReason("Gateway rejected payment");
            txRepo.save(tx);

            intent.setStatus(PaymentIntentStatus.FAILED);
            intentRepo.save(intent);
        }
    }
}