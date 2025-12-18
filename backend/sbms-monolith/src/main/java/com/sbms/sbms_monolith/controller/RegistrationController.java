package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.registration.*;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.service.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // STUDENT: Register for a boarding
    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public RegistrationResponseDTO register(
            @PathVariable Long studentId,
            @RequestBody RegistrationRequestDTO dto
    ) {
        return registrationService.register(studentId, dto);
    }

    // STUDENT: My registrations
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<RegistrationResponseDTO> studentRegistrations(@PathVariable Long studentId) {
        return registrationService.getStudentRegistrations(studentId);
    }

    // STUDENT: Cancel
    @PutMapping("/student/{studentId}/{regId}/cancel")
    @PreAuthorize("hasRole('STUDENT')")
    public RegistrationResponseDTO cancel(
            @PathVariable Long studentId,
            @PathVariable Long regId
    ) {
        return registrationService.cancel(studentId, regId);
    }

    // OWNER: View registrations
    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<RegistrationResponseDTO> ownerRegistrations(
            @PathVariable Long ownerId,
            @RequestParam(required = false) RegistrationStatus status
    ) {
        return registrationService.getOwnerRegistrations(ownerId, status);
    }

    // OWNER: Approve or decline
    @PutMapping("/owner/{ownerId}/{regId}")
    @PreAuthorize("hasRole('OWNER')")
    public RegistrationResponseDTO decide(
            @PathVariable Long ownerId,
            @PathVariable Long regId,
            @RequestBody RegistrationDecisionDTO dto
    ) {
        return registrationService.decide(ownerId, regId, dto);
    }
}
