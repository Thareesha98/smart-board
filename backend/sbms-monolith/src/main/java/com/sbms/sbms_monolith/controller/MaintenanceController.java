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
