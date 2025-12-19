package com.sbms.sbms_monolith.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    // Dummy payment simulation
    public boolean processPayment(Long studentId, BigDecimal amount) {

        // In real system, you'd call Stripe/PayHere here
        // For now: ALWAYS succeed
        System.out.println("Dummy payment successful: student=" + studentId + " amount=" + amount);
        return true;
    }
}
