package com.sbms.sbms_monolith.dto.maintenance;


import java.util.List;

import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;

import lombok.Data;

@Data
public class MaintenanceResponseDTO {

    private Long id;

    private Long boardingId;
    private String boardingTitle;

    private Long studentId;
    private String studentName;

    private String title;
    private String description;
    private List<String> imageUrls;

    private MaintenanceStatus status;

    private String studentNote;
    private String ownerNote;
}
