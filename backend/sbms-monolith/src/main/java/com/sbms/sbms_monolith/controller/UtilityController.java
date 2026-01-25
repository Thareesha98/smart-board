package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.utility.UtilityRecordRequestDTO;
import com.sbms.sbms_monolith.dto.utility.UtilityRecordResponseDTO;
import com.sbms.sbms_monolith.service.UtilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owner/utilities")
@RequiredArgsConstructor
public class UtilityController {

    private final UtilityService utilityService;

    /**
     * ENDPOINT: Save or Update a Utility Bill
     * POST /api/owner/utilities
     */
    @PostMapping
    public ResponseEntity<UtilityRecordResponseDTO> updateUtility(@Valid @RequestBody UtilityRecordRequestDTO request) {
        UtilityRecordResponseDTO savedRecord = utilityService.updateUtilityRecord(request);
        return ResponseEntity.ok(savedRecord);
    }

    /**
     * ENDPOINT: Get History for a specific Boarding House
     * GET /api/owner/utilities/history/{boardingId}
     */
    @GetMapping("/history/{boardingId}")
    public ResponseEntity<List<UtilityRecordResponseDTO>> getUtilityHistory(@PathVariable Long boardingId) {
        List<UtilityRecordResponseDTO> history = utilityService.getUtilityHistory(boardingId);
        return ResponseEntity.ok(history);
    }
}