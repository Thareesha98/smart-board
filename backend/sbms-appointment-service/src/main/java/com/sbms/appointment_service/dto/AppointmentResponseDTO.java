package com.sbms.appointment_service.dto;


import lombok.Data;

import java.time.LocalDateTime;

import com.sbms.appointment_service.domain.AppointmentStatus;

@Data
public class AppointmentResponseDTO {

    private Long id;

    // ---- References ----
    private Long studentId;
    private Long ownerId;
    private Long boardingId;

    // ---- Appointment details ----
    private int numberOfStudents;

    private LocalDateTime requestedStartTime;
    private LocalDateTime requestedEndTime;

    private LocalDateTime ownerStartTime;
    private LocalDateTime ownerEndTime;

    private AppointmentStatus status;

    private String studentNote;
    private String ownerNote;

    // ---- Audit (optional, but useful) ----
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
