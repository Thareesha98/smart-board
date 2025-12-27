package com.sbms.sbms_monolith.dto.maintenance;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MaintenanceResponseDTO {
    private Long id;
    private String issueType;
    private String description;
    private String urgency;
    private String status;
    private LocalDateTime date;

    // Context info
    private String boardingName;
    private String roomNumber;

    // Files
    private List<String> image;
}
