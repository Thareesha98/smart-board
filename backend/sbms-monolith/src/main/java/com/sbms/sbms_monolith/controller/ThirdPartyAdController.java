package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.ads.AdCreateDTO;
import com.sbms.sbms_monolith.dto.ads.AdResponseDTO;
import com.sbms.sbms_monolith.model.enums.Status;
import com.sbms.sbms_monolith.service.ThirdPartyAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class ThirdPartyAdController {

    @Autowired
    private ThirdPartyAdService adService;

    // Public or Student/Owner submission
    @PostMapping("/submit")
    public AdResponseDTO submit(@RequestBody AdCreateDTO dto) {
        return adService.submitAd(dto);
    }

    // Admin Only: Manage Submissions
    @GetMapping("/admin/submissions")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<AdResponseDTO> getSubmissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return adService.getSubmissions(page, size);
    }

    // Admin Only: Approve/Reject/Pause
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO updateStatus(@PathVariable Long id, @RequestParam Status status) {
        return adService.updateAdStatus(id, status);
    }

    // Public: Used by the mobile app or web panels to show live ads
    @GetMapping("/active")
    public List<AdResponseDTO> getActive() {
        return adService.getActiveCampaigns();
    }
}