package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.model.Maintenance;

public class MaintenanceMapper {

    public static MaintenanceResponseDTO toDTO(Maintenance m) {

        MaintenanceResponseDTO dto = new MaintenanceResponseDTO();

        dto.setId(m.getId());
        dto.setBoardingId(m.getBoarding().getId());
        dto.setBoardingTitle(m.getBoarding().getTitle());

        dto.setStudentId(m.getStudent().getId());
        dto.setStudentName(m.getStudent().getFullName());

        dto.setTitle(m.getTitle());
        dto.setDescription(m.getDescription());
        dto.setImageUrl(m.getImageUrl());

        dto.setStatus(m.getStatus());
        dto.setStudentNote(m.getStudentNote());
        dto.setOwnerNote(m.getOwnerNote());

        return dto;
    }
}
