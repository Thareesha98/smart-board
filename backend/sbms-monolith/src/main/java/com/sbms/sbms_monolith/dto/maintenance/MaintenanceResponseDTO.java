package com.sbms.sbms_monolith.dto.maintenance;
import java.time.LocalDateTime;
import java.util.List;

import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;
import com.sbms.sbms_monolith.model.enums.MaintenanceUrgency;

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
    private MaintenanceUrgency maintenanceUrgency;


    private String studentNote;
    private String ownerNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
