package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;

public class MaintenanceMapper {

    public static MaintenanceResponseDTO toDTO(Maintenance maintenance) {

        MaintenanceResponseDTO dto = new MaintenanceResponseDTO();

        dto.setId(maintenance.getId());
        dto.setDescription(maintenance.getDescription());
        dto.setDate(maintenance.getDate());
        dto.setImage(maintenance.getImages());

        // 1. Issue Type -> String
        dto.setIssueType(maintenance.getIssueType().toString());

        // 2. Urgency -> lowercase String ("high")
        dto.setUrgency(maintenance.getUrgency().toString().toLowerCase());

        // 3. Status -> Frontend format ("in-progress")
        String statusStr = maintenance.getStatus().toString().toLowerCase();
        if (maintenance.getStatus() == MaintenanceStatus.IN_PROGRESS) {
            statusStr = "in-progress";
        }
        dto.setStatus(statusStr);

        // 4. Boarding Info
        if (maintenance.getBoarding() != null) {
            dto.setBoardingName(maintenance.getBoarding().getTitle());
        }

        // 5. Room Info (Optional - depends  Student entity has this)
        dto.setRoomNumber("N/A");
        // if (request.getStudent() != null) dto.setRoomNumber(request.getStudent().getRoomNumber());

        return dto;
    }

}
