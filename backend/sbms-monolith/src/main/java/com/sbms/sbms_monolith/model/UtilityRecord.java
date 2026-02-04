package com.sbms.sbms_monolith.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.sbms.sbms_monolith.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "utility_records", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"boarding_id", "record_month"}))
@Data
@EqualsAndHashCode(callSuper = true)
public class UtilityRecord extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boarding_id", nullable = false)
    private Boarding boarding;

    @Column(name = "record_month", nullable = false)
    private LocalDate recordMonth; 

    @Column(nullable = false)
    private BigDecimal electricityCost;

    @Column(nullable = false)
    private BigDecimal waterCost;

    @Column(name = "proof_image_url")
    private String proofImageUrl;
}

