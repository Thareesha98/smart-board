package com.sbms.sbms_monolith.model.enums;


public enum PaymentIntentStatus {

    CREATED,        // Intent created, not yet sent to gateway
    INITIATED,      // Frontend started payment
    PROCESSING,     // Waiting for gateway confirmation (webhook)
    SUCCESS,        // Payment completed successfully
    FAILED,         // Payment failed
    EXPIRED,        // Time expired before payment
    CANCELLED       // User cancelled manually
}
