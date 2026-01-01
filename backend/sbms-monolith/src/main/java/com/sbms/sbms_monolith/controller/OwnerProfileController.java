package com.sbms.sbms_monolith.controller;


import com.sbms.sbms_monolith.dto.profile.*;
import com.sbms.sbms_monolith.service.ProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/owner/profile")
@PreAuthorize("hasRole('OWNER')")
public class OwnerProfileController {

    private final ProfileService profileService;

    public OwnerProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponseDTO get(Authentication auth) {
        return profileService.getProfile(auth.getName());
    }

    @PutMapping
    public ProfileResponseDTO update(
            @RequestBody OwnerProfileUpdateDTO dto,
            Authentication auth
    ) {
        return profileService.updateOwnerProfile(auth.getName(), dto);
    }
}
