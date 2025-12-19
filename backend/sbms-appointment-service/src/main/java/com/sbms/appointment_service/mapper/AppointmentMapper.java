package com.sbms.appointment_service.mapper;

import com.sbms.appointment_service.domain.Appointment;
import com.sbms.appointment_service.dto.AppointmentResponseDTO;

public class AppointmentMapper {

    private AppointmentMapper() {}

    public static AppointmentResponseDTO toDto(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();

        dto.setId(appointment.getId());
        dto.setStudentId(appointment.getStudentId());
        dto.setBoardingId(appointment.getBoardingId());
        dto.setNumberOfStudents(appointment.getNumberOfStudents());

        dto.setRequestedStartTime(appointment.getRequestedStartTime());
        dto.setRequestedEndTime(appointment.getRequestedEndTime());

        dto.setOwnerStartTime(appointment.getOwnerStartTime());
        dto.setOwnerEndTime(appointment.getOwnerEndTime());

        dto.setStatus(appointment.getStatus());
        dto.setStudentNote(appointment.getStudentNote());
        dto.setOwnerNote(appointment.getOwnerNote());

        return dto;
    }
}
