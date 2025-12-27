package com.sbms.sbms_monolith.dto.maintenance;

import lombok.Data;

@Data
public class MaintenanceRequestDTO {
    private String issueType;
    private String urgency;
    private String description;
    private Long boardingId;
}
