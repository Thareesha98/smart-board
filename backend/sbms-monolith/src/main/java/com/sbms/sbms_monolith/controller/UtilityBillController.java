package com.sbms.sbms_monolith.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sbms.sbms_monolith.dto.utility.UtilityBillCreateDTO;
import com.sbms.sbms_monolith.dto.utility.UtilityBillResponseDTO;
import com.sbms.sbms_monolith.service.UtilityBillService;

import java.util.List;

@RestController
@RequestMapping("/api/utilities")
public class UtilityBillController {

    @Autowired
    private UtilityBillService utilityBillService;

    // OWNER: Add or update monthly utilities
    @PostMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public UtilityBillResponseDTO save(
            @PathVariable Long ownerId,
            @RequestBody UtilityBillCreateDTO dto
    ) {
        return utilityBillService.saveOrUpdate(ownerId, dto);
    }

    // OWNER: View all utility bills
    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<UtilityBillResponseDTO> ownerBills(
            @PathVariable Long ownerId
    ) {
        return utilityBillService.getForOwner(ownerId);
    }

    // View utilities for a boarding (Student/Admin later)
    @GetMapping("/boarding/{boardingId}")
    public List<UtilityBillResponseDTO> boardingBills(
            @PathVariable Long boardingId
    ) {
        return utilityBillService.getForBoarding(boardingId);
    }
}
