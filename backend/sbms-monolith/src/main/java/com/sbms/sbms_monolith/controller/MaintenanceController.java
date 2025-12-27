package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceRequestDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    // Student Submit
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MaintenanceResponseDTO> createMaintenance(
            @ModelAttribute MaintenanceRequestDTO dto,
            @RequestParam("studentId") Long studentId,
            @RequestPart(value = "images", required = false)List<MultipartFile> images
     ) throws IOException {
        return ResponseEntity.ok(maintenanceService.createMaintenance(studentId, dto, images));
    }

    // Student History
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MaintenanceResponseDTO>> getStudentMaintenance(@PathVariable Long studentId) {
        return ResponseEntity.ok(maintenanceService.getStudentMaintenances(studentId));
    }

    // Owner Tasks
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<MaintenanceResponseDTO>> getOwnerMaintenance(@PathVariable Long ownerId) {
        return ResponseEntity.ok(maintenanceService.getOwnerMaintenance(ownerId));
    }

    // Owner Status Update
    @PatchMapping("/{requestId}/status")
    public ResponseEntity<MaintenanceResponseDTO> updateStatus(
            @PathVariable Long requestId,
            @RequestBody Map<String, String> body
    ) {
        return ResponseEntity.ok(maintenanceService.updateStatus(requestId, body.get("status")));
    }
}
