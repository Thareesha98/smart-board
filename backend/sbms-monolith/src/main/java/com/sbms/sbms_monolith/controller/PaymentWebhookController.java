package com.sbms.sbms_monolith.controller;


import com.sbms.sbms_monolith.dto.payment.PayHereWebhookRequest;
import com.sbms.sbms_monolith.service.PaymentWebhookService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments/webhook")
@RequiredArgsConstructor
public class PaymentWebhookController {

    private final PaymentWebhookService webhookService;

    @PostMapping("/payhere")
    public ResponseEntity<String> payHereCallback(
            @RequestBody PayHereWebhookRequest request
    ) {
        webhookService.handlePayHereWebhook(request);
        return ResponseEntity.ok("OK");
    }
}
