package com.sbms.sbms_monolith.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceCreateDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceDecisionDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // -----------------------------------------
    // STUDENT: CREATE MAINTENANCE (WITH IMAGES)
    // -----------------------------------------
    @PostMapping(consumes = "application/json")
    @PreAuthorize("hasRole('STUDENT')")
    public MaintenanceResponseDTO create(
            @RequestBody MaintenanceCreateDTO dto,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.create(student.getId(), dto);
    }


    // -----------------------------------------
    // STUDENT: VIEW OWN REQUESTS
    // -----------------------------------------
    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public List<MaintenanceResponseDTO> studentRequests(Authentication authentication) {

        User student = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.getForStudent(student.getId());
    }

    // -----------------------------------------
    // OWNER: VIEW OWN REQUESTS
    // -----------------------------------------
    @GetMapping("/owner")
    @PreAuthorize("hasRole('OWNER')")
    public List<MaintenanceResponseDTO> ownerRequests(Authentication authentication) {

        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.getForOwner(owner.getId());
    }

    // -----------------------------------------
    // OWNER: DECIDE
    // -----------------------------------------
    @PutMapping("/owner/{maintenanceId}")
    @PreAuthorize("hasRole('OWNER')")
    public MaintenanceResponseDTO decide(
            @PathVariable Long maintenanceId,
            @RequestBody MaintenanceDecisionDTO dto,
            Authentication authentication
    ) {

        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.decide(owner.getId(), maintenanceId, dto);
    }
}
