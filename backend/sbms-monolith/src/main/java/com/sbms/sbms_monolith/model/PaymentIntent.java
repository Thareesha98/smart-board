package com.sbms.sbms_monolith.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "payment_intents")
@Getter
@Setter
public class PaymentIntent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // -------------------- RELATION REFERENCES --------------------

    private Long studentId;
    private Long ownerId;
    private Long boardingId;

    // -------------------- PAYMENT DETAILS --------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType type;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 255)
    private String description; // "Monthly Rent - Jan", "Key Money", etc.

    // -------------------- LIFECYCLE STATE --------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentIntentStatus status;

    // -------------------- TIMESTAMPS --------------------

    @Column(nullable = false)
    private LocalDateTime createdAt;

    /**
     * Payment intent expiry time.
     * Used to invalidate abandoned or late payments.
     */
    private LocalDateTime expiresAt;

    /**
     * Set only when payment is completed successfully.
     */
    private LocalDateTime completedAt;

    // -------------------- SAFETY --------------------

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
