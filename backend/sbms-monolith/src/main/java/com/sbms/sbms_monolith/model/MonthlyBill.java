package com.sbms.sbms_monolith.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.MonthlyBillStatus;

@Data
@Entity
@Table(
    name = "monthly_bills",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"student_id", "boarding_id", "bill_month"}
    )
)
public class MonthlyBill extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "boarding_id", nullable = false)
    private Boarding boarding;

    // YYYY-MM
    @Column(name = "bill_month", nullable = false, length = 7)
    private String month;

    // ---- COST BREAKDOWN ----
    @Column(nullable = false)
    private BigDecimal boardingFee;

    @Column(nullable = false)
    private BigDecimal electricityFee;

    @Column(nullable = false)
    private BigDecimal waterFee;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MonthlyBillStatus status = MonthlyBillStatus.UNPAID;
}
