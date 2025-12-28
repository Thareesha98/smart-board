package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.appointment.*;
import com.sbms.sbms_monolith.model.enums.AppointmentStatus;
import com.sbms.sbms_monolith.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // POST /api/appointments/student/{studentId}
    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public AppointmentResponseDTO createAppointment(
            @PathVariable Long studentId,
            @RequestBody AppointmentCreateDTO dto
    ) {
        return appointmentService.createAppointment(studentId, dto);
    }

    
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<AppointmentResponseDTO> getStudentAppointments(
            @PathVariable Long studentId
    ) {
        return appointmentService.getAppointmentsForStudent(studentId);
    }

   
    @PutMapping("/student/{studentId}/{appointmentId}/cancel")
    @PreAuthorize("hasRole('STUDENT')")
    public AppointmentResponseDTO cancelAppointment(
            @PathVariable Long studentId,
            @PathVariable Long appointmentId
    ) {
        return appointmentService.cancelAppointment(studentId, appointmentId);
    }

   
    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<AppointmentResponseDTO> getOwnerAppointments(
            @PathVariable Long ownerId,
            @RequestParam(required = false) AppointmentStatus status
    ) {
        return appointmentService.getAppointmentsForOwner(ownerId, status);
    }

   
    @PutMapping("/owner/{ownerId}/{appointmentId}")
    @PreAuthorize("hasRole('OWNER')")
    public AppointmentResponseDTO respond(
            @PathVariable Long ownerId,
            @PathVariable Long appointmentId,
            @RequestBody AppointmentOwnerDecisionDTO dto
    ) {
        return appointmentService.respondToAppointment(ownerId, appointmentId, dto);
    }
}
