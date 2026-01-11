package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.dashboard.StudentBoardingDashboardDTO;
import com.sbms.sbms_monolith.dto.registration.*;
import com.sbms.sbms_monolith.model.Registration;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.repository.RegistrationRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.PaymentReceiptPdfService;
import com.sbms.sbms_monolith.service.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentReceiptPdfService pdfService;

    @Autowired
    private RegistrationRepository registrationRepo;

    // --- STUDENT ENDPOINTS ---

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public RegistrationResponseDTO register(
            @PathVariable Long studentId,
            @RequestBody RegistrationRequestDTO dto
    ) {
        return registrationService.register(studentId, dto);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<RegistrationResponseDTO> studentRegistrations(@PathVariable Long studentId) {
        return registrationService.getStudentRegistrations(studentId);
    }

    @PutMapping("/student/{studentId}/{regId}/cancel")
    @PreAuthorize("hasRole('STUDENT')")
    public RegistrationResponseDTO cancel(
            @PathVariable Long studentId,
            @PathVariable Long regId
    ) {
        return registrationService.cancel(studentId, regId);
    }

    @GetMapping("/{regId}/dashboard")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentBoardingDashboardDTO> dashboard(
            @PathVariable Long regId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentBoardingDashboardDTO dto =
                registrationService.getDashboard(regId, user.getId());

        return ResponseEntity.ok(dto);
    }

    // --- OWNER ENDPOINTS ---

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<RegistrationResponseDTO> ownerRegistrations(
            @PathVariable Long ownerId,
            @RequestParam(required = false) RegistrationStatus status
    ) {
        return registrationService.getOwnerRegistrations(ownerId, status);
    }

    @PutMapping("/owner/{ownerId}/{regId}")
    @PreAuthorize("hasRole('OWNER')")
    public RegistrationResponseDTO decide(
            @PathVariable Long ownerId,
            @PathVariable Long regId,
            @RequestBody RegistrationDecisionDTO dto
    ) {
        return registrationService.decide(ownerId, regId, dto);
    }

    // --- SHARED (PDF) ---

    @GetMapping(value = "/{regId}/receipt", produces = org.springframework.http.MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long regId) {
        Registration reg = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        byte[] pdfBytes = pdfService.generateRegistrationReceipt(reg);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=receipt_" + regId + ".pdf")
                .body(pdfBytes);
    }
}