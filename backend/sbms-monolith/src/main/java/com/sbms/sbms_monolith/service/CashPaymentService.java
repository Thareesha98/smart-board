package com.sbms.sbms_monolith.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.enums.ManualApprovalStatus;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CashPaymentService {

    private final PaymentIntentRepository intentRepo;

    @Transactional
    public void createCashPayment(Long intentId) {

        PaymentIntent intent = intentRepo.findById(intentId)
                .orElseThrow(() -> new RuntimeException("Payment intent not found"));

        // 🔒 SAFETY CHECKS
        if (intent.getStatus() == PaymentIntentStatus.SUCCESS) {
            throw new IllegalStateException("Payment already completed");
        }

        if (intent.getStatus() == PaymentIntentStatus.AWAITING_MANUAL_APPROVAL) {
            // idempotent — already submitted
            return;
        }

        // ✅ MARK AS SUBMITTED (NOT CONFIRMED)
        intent.setStatus(PaymentIntentStatus.AWAITING_MANUAL_APPROVAL);
        intent.setManualApprovalStatus(ManualApprovalStatus.PENDING);
        intent.setCompletedAt(LocalDateTime.now());
        
        intent.setMethod(PaymentMethod.CASH);
        intent.setReferenceId("CASH");


        intentRepo.save(intent);
    }
}
