package com.sbms.sbms_monolith.controller;


import com.sbms.sbms_monolith.dto.profile.*;
import com.sbms.sbms_monolith.service.ProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/profile")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin
public class StudentProfileController {

    private final ProfileService profileService;

    public StudentProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponseDTO get(Authentication auth) {
        return profileService.getProfile(auth.getName());
    }

    @PutMapping
    public ProfileResponseDTO update(
            @RequestBody StudentProfileUpdateDTO dto,
            Authentication auth
    ) {
        return profileService.updateStudentProfile(auth.getName(), dto);
    }
}
