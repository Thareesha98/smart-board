package com.sbms.sbms_monolith.controller;

import java.time.LocalDateTime;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.PaymentTransaction;
import com.sbms.sbms_monolith.model.enums.ManualApprovalStatus;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.model.enums.PaymentStatus;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;
import com.sbms.sbms_monolith.repository.PaymentTransactionRepository;
import com.sbms.sbms_monolith.service.OwnerWalletService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owner/payments")
@RequiredArgsConstructor
public class OwnerPaymentApprovalController {

    private final PaymentIntentRepository intentRepo;
    private final PaymentTransactionRepository txRepo;
    private final OwnerWalletService ownerWalletService;

    @PostMapping("/{intentId}/approve")
    @PreAuthorize("hasRole('OWNER')")
    @Transactional
    public void approve(@PathVariable Long intentId) {

        PaymentIntent intent = intentRepo.findById(intentId)
                .orElseThrow(() -> new RuntimeException("Payment intent not found"));

        // 🔒 Idempotency
        if (intent.getStatus() == PaymentIntentStatus.SUCCESS) {
            return; // already approved
        }

        if (intent.getStatus() != PaymentIntentStatus.AWAITING_MANUAL_APPROVAL) {
            throw new RuntimeException("Payment is not awaiting approval");
        }

        // 1️⃣ Mark intent as SUCCESS
        intent.setManualApprovalStatus(ManualApprovalStatus.APPROVED);
        intent.setStatus(PaymentIntentStatus.SUCCESS);
        intent.setCompletedAt(LocalDateTime.now());
        intentRepo.save(intent);

        // 2️⃣ Create immutable transaction record
        PaymentTransaction tx = new PaymentTransaction();
        tx.setIntent(intent);
        tx.setStatus(PaymentStatus.SUCCESS);
        tx.setAmount(intent.getAmount());
        tx.setPaidAt(LocalDateTime.now());
        tx.setTransactionRef("MANUAL-" + intent.getId());

        txRepo.save(tx);

        // 3️⃣ Credit owner wallet (ONCE)
        ownerWalletService.credit(
                intent.getOwnerId(),
                intent.getAmount(),
                tx.getTransactionRef()
        );
    }
}
