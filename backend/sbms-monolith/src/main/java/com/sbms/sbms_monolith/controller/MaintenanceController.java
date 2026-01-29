package com.sbms.sbms_monolith.controller;

import java.util.List;

import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceCreateDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceDecisionDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;


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


    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public List<MaintenanceResponseDTO> studentRequests(Authentication authentication) {

        User student = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.getForStudent(student.getId());
    }

    
    @GetMapping("/owner")
    @PreAuthorize("hasRole('OWNER')")
    public List<MaintenanceResponseDTO> ownerRequests(Authentication authentication) {

        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return maintenanceService.getForOwner(owner.getId());
    }

   
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

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'STUDENT', 'TECHNICIAN')")
    public ResponseEntity<Maintenance> getMaintenanceById(@PathVariable Long id) {

        // Call the new service method
        Maintenance m = maintenanceService.getMaintenanceById(id);

        return ResponseEntity.ok(m);
    }
}
