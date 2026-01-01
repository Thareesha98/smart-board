package com.sbms.sbms_monolith.dto.ads;

import com.sbms.sbms_monolith.model.enums.Status;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdResponseDTO {
    private Long id;
    private String title;
    private String companyName;
    private String redirectUrl;
    private String bannerImageUrl;
    private LocalDateTime expiryDate;
    private Status status;
    private String planName;
    private List<String> targetPanels;
    private LocalDateTime createdAt;
}