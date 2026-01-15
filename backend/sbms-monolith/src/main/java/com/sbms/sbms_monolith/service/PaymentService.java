package com.sbms.sbms_monolith.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sbms.sbms_monolith.dto.payment.GatewayChargeResult;
import com.sbms.sbms_monolith.dto.payment.PaymentHistoryDTO;
import com.sbms.sbms_monolith.dto.payment.PaymentResult;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.PaymentTransaction;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.model.enums.PaymentStatus;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;
import com.sbms.sbms_monolith.repository.PaymentTransactionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentIntentRepository intentRepo;
    private final PaymentTransactionRepository txRepo;
    private final PaymentGateway paymentGateway;

    @Transactional
    public PaymentResult pay(Long intentId, PaymentMethod method) {

        PaymentIntent intent = intentRepo.findById(intentId)
                .orElseThrow(() -> new RuntimeException("Payment intent not found"));

        if (intent.getStatus() == PaymentIntentStatus.SUCCESS)
            throw new RuntimeException("Payment already completed");

        intent.setStatus(PaymentIntentStatus.PROCESSING);
        intentRepo.save(intent);

        // 🔹 Gateway only INITIATES payment
        GatewayChargeResult gateway =
                paymentGateway.charge(intent, method);

        // 🔹 Create PENDING transaction
        PaymentTransaction tx = new PaymentTransaction();
        tx.setIntent(intent);
        tx.setTransactionRef(gateway.getGatewayRef());
        tx.setAmount(intent.getAmount());
        tx.setMethod(method);
        tx.setGateway("PAYHERE");
        tx.setStatus(PaymentStatus.PENDING);

        txRepo.save(tx);
        
        

        // 🔹 DO NOT mark success here
        return new PaymentResult(
                tx.getId(),
                tx.getTransactionRef(),
                intent.getAmount().doubleValue(),
                "PENDING",
                null
        );
    }

    public List<PaymentHistoryDTO> history(Long userId) {

        return txRepo.findByIntentStudentId(userId)
                .stream()
                .map(tx -> {
                    PaymentHistoryDTO dto = new PaymentHistoryDTO();
                    dto.setId(tx.getId());
                    dto.setTransactionRef(tx.getTransactionRef());
                    dto.setAmount(tx.getAmount());
                    dto.setMethod(tx.getMethod());
                    dto.setStatus(tx.getStatus());
                    dto.setPaidAt(tx.getPaidAt());
                    dto.setReceiptUrl(tx.getReceiptPath());
                    return dto;
                })
                .toList();
    }
}

