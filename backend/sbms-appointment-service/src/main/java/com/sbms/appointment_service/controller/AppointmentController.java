package com.sbms.appointment_service.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import com.sbms.appointment_service.domain.AppointmentStatus;
import com.sbms.appointment_service.dto.AppointmentCreateDTO;
import com.sbms.appointment_service.dto.AppointmentOwnerDecisionDTO;
import com.sbms.appointment_service.dto.AppointmentResponseDTO;
import com.sbms.appointment_service.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // ---------------------------------------------------------
    // STUDENT: CREATE APPOINTMENT
    // POST /api/appointments/student/{studentId}
    // ---------------------------------------------------------
    @PostMapping("/student/{studentId}")
    public AppointmentResponseDTO createAppointment(
            @PathVariable Long studentId,
            @RequestBody AppointmentCreateDTO dto,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        // Security (same intent as monolith)
        if (!"STUDENT".equals(role)) {
            throw new RuntimeException("User is not a student");
        }
        if (!studentId.equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        return appointmentService.createAppointment(studentId, dto);
    }

    // ---------------------------------------------------------
    // STUDENT: VIEW OWN APPOINTMENTS
    // ---------------------------------------------------------
    @GetMapping("/student/{studentId}")
    public List<AppointmentResponseDTO> getStudentAppointments(
            @PathVariable Long studentId,
            HttpServletRequest request
    ) {
        validateRole(request, "STUDENT");
        validateUser(request, studentId);

        return appointmentService.getAppointmentsForStudent(studentId);
    }

    // ---------------------------------------------------------
    // STUDENT: CANCEL
    // ---------------------------------------------------------
    @PutMapping("/student/{studentId}/{appointmentId}/cancel")
    public AppointmentResponseDTO cancelAppointment(
            @PathVariable Long studentId,
            @PathVariable Long appointmentId,
            HttpServletRequest request
    ) {
        validateRole(request, "STUDENT");
        validateUser(request, studentId);

        return appointmentService.cancelAppointment(studentId, appointmentId);
    }

    // ---------------------------------------------------------
    // OWNER: VIEW APPOINTMENTS
    // ---------------------------------------------------------
    @GetMapping("/owner/{ownerId}")
    public List<AppointmentResponseDTO> getOwnerAppointments(
            @PathVariable Long ownerId,
            @RequestParam(required = false) AppointmentStatus status,
            HttpServletRequest request
    ) {
        validateRole(request, "OWNER");
        validateUser(request, ownerId);

        return appointmentService.getAppointmentsForOwner(ownerId, status);
    }

    // ---------------------------------------------------------
    // OWNER: RESPOND (ACCEPT / DECLINE)
    // ---------------------------------------------------------
    @PutMapping("/owner/{ownerId}/{appointmentId}")
    public AppointmentResponseDTO respond(
            @PathVariable Long ownerId,
            @PathVariable Long appointmentId,
            @RequestBody AppointmentOwnerDecisionDTO dto,
            HttpServletRequest request
    ) {
        validateRole(request, "OWNER");
        validateUser(request, ownerId);

        return appointmentService.respondToAppointment(ownerId, appointmentId, dto);
    }

    // ---------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------
    private void validateRole(HttpServletRequest request, String expectedRole) {
        String role = request.getHeader("X-User-Role");
        if (!expectedRole.equals(role)) {
            throw new RuntimeException("Forbidden");
        }
    }

    private void validateUser(HttpServletRequest request, Long pathUserId) {
        Long headerUserId = Long.valueOf(request.getHeader("X-User-Id"));
        if (!headerUserId.equals(pathUserId)) {
            throw new RuntimeException("Unauthorized");
        }
    }
}
