package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.appointment.AppointmentResponseDTO;
import com.sbms.sbms_monolith.model.Appointment;

public class AppointmentMapper {

    public static AppointmentResponseDTO toDto(Appointment a) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();

        dto.setId(a.getId());

        dto.setBoardingId(a.getBoarding().getId());
        dto.setBoardingTitle(a.getBoarding().getTitle());
        dto.setBoardingAddress(a.getBoarding().getAddress());

        dto.setStudentId(a.getStudent().getId());
        dto.setStudentName(a.getStudent().getFullName());
        dto.setStudentEmail(a.getStudent().getEmail());

        dto.setNumberOfStudents(a.getNumberOfStudents());

        dto.setRequestedStartTime(a.getRequestedStartTime());
        dto.setRequestedEndTime(a.getRequestedEndTime());

        dto.setOwnerStartTime(a.getOwnerStartTime());
        dto.setOwnerEndTime(a.getOwnerEndTime());

        dto.setStatus(a.getStatus());

        dto.setStudentNote(a.getStudentNote());
        dto.setOwnerNote(a.getOwnerNote());

        return dto;
    }
}
