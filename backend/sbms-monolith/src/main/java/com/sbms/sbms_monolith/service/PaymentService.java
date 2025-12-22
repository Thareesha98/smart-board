package com.sbms.sbms_monolith.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public boolean processPayment(Long studentId, BigDecimal amount) {

        System.out.println("Dummy payment successful: student=" + studentId + " amount=" + amount);
        return true;
    }
}
