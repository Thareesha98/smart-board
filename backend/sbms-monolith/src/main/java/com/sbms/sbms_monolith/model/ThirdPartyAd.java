package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "third_party_ads")
@EqualsAndHashCode(callSuper = true)
public class ThirdPartyAd extends BaseEntity {

    @Column(nullable = false)
    private String title;

    private String companyName;

    @Column(nullable = false)
    private String redirectUrl;

    @Column(nullable = false)
    private String bannerImageUrl;

    private LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    // Matches the "Plan" logic in your frontend useThirdPartyAds.js
    private String planName; 
    private Double planPrice;

    @ElementCollection
    @CollectionTable(name = "ad_target_panels", joinColumns = @JoinColumn(name = "ad_id"))
    @Column(name = "panel_name")
    private List<String> targetPanels = new ArrayList<>();
}