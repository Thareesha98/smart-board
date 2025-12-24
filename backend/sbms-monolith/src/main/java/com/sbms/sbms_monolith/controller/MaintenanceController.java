package com.sbms.sbms_monolith.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceCreateDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceDecisionDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public MaintenanceResponseDTO create(
            @PathVariable Long studentId,
            @RequestBody MaintenanceCreateDTO dto
    ) {
        return maintenanceService.create(studentId, dto);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<MaintenanceResponseDTO> studentRequests(@PathVariable Long studentId) {
        return maintenanceService.getForStudent(studentId);
    }

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<MaintenanceResponseDTO> ownerRequests(@PathVariable Long ownerId) {
        return maintenanceService.getForOwner(ownerId);
    }

    @PutMapping("/owner/{ownerId}/{maintenanceId}")
    @PreAuthorize("hasRole('OWNER')")
    public MaintenanceResponseDTO decide(
            @PathVariable Long ownerId,
            @PathVariable Long maintenanceId,
            @RequestBody MaintenanceDecisionDTO dto
    ) {
        return maintenanceService.decide(ownerId, maintenanceId, dto);
    }
}
