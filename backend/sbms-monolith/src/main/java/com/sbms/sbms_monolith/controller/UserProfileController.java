package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.user.UserProfileViewDTO;
import com.sbms.sbms_monolith.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/public/{id}")
    public ResponseEntity<UserProfileViewDTO> getPublicProfile(@PathVariable Long id){
        return ResponseEntity.ok(userProfileService.getPublicProfile(id));
    }
}
