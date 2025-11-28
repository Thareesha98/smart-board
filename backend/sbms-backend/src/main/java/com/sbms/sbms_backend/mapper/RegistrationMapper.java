package com.sbms.sbms_backend.mapper;

import com.sbms.sbms_backend.dto.registration.RegistrationResponseDTO;
import com.sbms.sbms_backend.model.Registration;

public class RegistrationMapper {

    public static RegistrationResponseDTO toDto(Registration r) {
        RegistrationResponseDTO dto = new RegistrationResponseDTO();

        dto.setId(r.getId());

        dto.setBoardingId(r.getBoarding().getId());
        dto.setBoardingTitle(r.getBoarding().getTitle());

        dto.setStudentId(r.getStudent().getId());
        dto.setStudentName(r.getStudent().getFullName());
        dto.setStudentEmail(r.getStudent().getEmail());

        dto.setNumberOfStudents(r.getNumberOfStudents());
        dto.setStatus(r.getStatus());

        dto.setStudentNote(r.getStudentNote());
        dto.setOwnerNote(r.getOwnerNote());

        return dto;
    }
}
