package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.ads.AdCreateDTO;
import com.sbms.sbms_monolith.dto.ads.AdResponseDTO;
import com.sbms.sbms_monolith.model.enums.AdStatus;
import com.sbms.sbms_monolith.service.ThirdPartyAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class ThirdPartyAdController {

    @Autowired
    private ThirdPartyAdService adService;

    // --- SUBMISSION PHASE (Admin Review) ---

    @GetMapping("/submissions")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdResponseDTO> getAllSubmissions() {
        return adService.getAllSubmissions();
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO approveAd(@PathVariable Long id) {
        return adService.updateAdStatus(id, AdStatus.APPROVED);
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO rejectAd(@PathVariable Long id) {
        return adService.updateAdStatus(id, AdStatus.REJECTED);
    }

    // --- CAMPAIGN PHASE (Live Ads) ---

    @PostMapping("/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO publishAd(@RequestBody AdCreateDTO dto) {
        // This moves an approved submission into the "ACTIVE" live state
        return adService.createActiveAd(dto);
    }

    @GetMapping("/campaigns")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdResponseDTO> getAllCampaigns() {
        // Returns ads that are ACTIVE, PAUSED, or EXPIRED
        return adService.getCampaigns();
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO toggleCampaignStatus(@PathVariable Long id) {
        // Switches between ACTIVE and PAUSED
        return adService.toggleAdStatus(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public AdResponseDTO updateCampaignDetails(
            @PathVariable Long id, 
            @RequestBody AdCreateDTO dto
    ) {
        return adService.updateAdDetails(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAd(@PathVariable Long id) {
        adService.deleteAd(id);
    }

    // --- PUBLIC/CONSUMER ENDPOINT ---

    @GetMapping("/active")
    public List<AdResponseDTO> getActiveAdsForPanels() {
        // Only returns ads with status 'ACTIVE' for the frontend to display
        return adService.getActiveCampaigns();
    }
}