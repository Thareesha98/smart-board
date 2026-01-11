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

    // ==========================================
    // 🎓 STUDENT ENDPOINTS
    // ==========================================

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<RegistrationResponseDTO> register(
            @PathVariable Long studentId,
            @RequestBody RegistrationRequestDTO dto
    ) {
        RegistrationResponseDTO response = registrationService.register(studentId, dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<RegistrationResponseDTO>> studentRegistrations(@PathVariable Long studentId) {
        List<RegistrationResponseDTO> registrations = registrationService.getStudentRegistrations(studentId);
        return ResponseEntity.ok(registrations);
    }

    @PutMapping("/student/{studentId}/{regId}/cancel")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<RegistrationResponseDTO> cancel(
            @PathVariable Long studentId,
            @PathVariable Long regId
    ) {
        RegistrationResponseDTO response = registrationService.cancel(studentId, regId);
        return ResponseEntity.ok(response);
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

        StudentBoardingDashboardDTO dto = registrationService.getDashboard(regId, user.getId());
        return ResponseEntity.ok(dto);
    }

    // ==========================================
    // 👔 OWNER ENDPOINTS
    // ==========================================

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<RegistrationResponseDTO>> ownerRegistrations(
            @PathVariable Long ownerId,
            @RequestParam(required = false) RegistrationStatus status
    ) {
        List<RegistrationResponseDTO> list = registrationService.getOwnerRegistrations(ownerId, status);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/owner/{ownerId}/{regId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<RegistrationResponseDTO> decide(
            @PathVariable Long ownerId,
            @PathVariable Long regId,
            @RequestBody RegistrationDecisionDTO dto
    ) {
        RegistrationResponseDTO response = registrationService.decide(ownerId, regId, dto);
        return ResponseEntity.ok(response);
    }

    // ==========================================
    // 📄 SHARED ENDPOINTS (PDF Receipt)
    // ==========================================

    @GetMapping(value = "/{regId}/receipt", produces = org.springframework.http.MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("isAuthenticated()") // Both Student and Owner can download
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long regId) {
        Registration reg = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        byte[] pdfBytes = pdfService.generateRegistrationReceipt(reg);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=receipt_" + regId + ".pdf")
                .body(pdfBytes);
    }
}