package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.payment.*;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.service.PaymentIntentService;
import com.sbms.sbms_monolith.service.PaymentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentIntentService paymentIntentService;

    // 1️⃣ Create Payment Intent
    @PostMapping("/intent")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<PaymentIntent> createIntent(
            @RequestBody CreatePaymentIntentDTO dto,
            @RequestHeader("X-User-Id") Long studentId
    ) {
        // 🔐 Authorization check (same as before)
        if (!studentId.equals(dto.getStudentId())) {
            throw new RuntimeException("Unauthorized");
        }

        return ResponseEntity.ok(
                paymentIntentService.create(dto)
        );
    }

    // 2️⃣ Pay using Dummy PayHere
    @PostMapping("/pay/{intentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<PaymentResult> pay(
            @PathVariable Long intentId,
            @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey,
            @RequestParam PaymentMethod method
    ) {
        // idempotencyKey intentionally ignored (compatibility only)
        return ResponseEntity.ok(
                paymentService.pay(intentId, method)
        );
    }

    // 3️⃣ Payment History
    @GetMapping("/history")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<PaymentHistoryDTO>> history(
            @RequestHeader("X-User-Id") Long studentId
    ) {
        return ResponseEntity.ok(
                paymentService.history(studentId)
        );
    }
}
