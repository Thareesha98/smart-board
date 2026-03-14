package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.subscription.SubscriptionPlanResponseDTO;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.service.StudentSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student/subscription-plans")
@PreAuthorize("hasRole('STUDENT')")
@RequiredArgsConstructor
public class StudentSubscriptionController {

    private final StudentSubscriptionService studentSubscriptionService;

    @PostMapping("/{planId}/buy-intent")
    public ResponseEntity<PaymentIntent> createBuyIntent(
            @PathVariable Long planId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(studentSubscriptionService.createBuyPlanIntent(email, planId));
    }

    @PostMapping("/{planId}/buy")
    public ResponseEntity<SubscriptionPlanResponseDTO> buyPlan(
            @PathVariable Long planId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(studentSubscriptionService.buyPlan(email, planId));
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentPlan(Authentication authentication) {
        String email = authentication.getName();
        SubscriptionPlanResponseDTO currentPlan = studentSubscriptionService.getCurrentPlan(email);
        if (currentPlan == null) {
            return ResponseEntity.ok(Map.of("hasSubscription", false));
        }
        return ResponseEntity.ok(currentPlan);
    }
}
