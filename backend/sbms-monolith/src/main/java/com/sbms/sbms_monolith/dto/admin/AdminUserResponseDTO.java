package com.sbms.sbms_monolith.dto.admin;


import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.UserRole;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class AdminUserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private UserRole role;
    private boolean verifiedOwner;
    private String phone;
    private String studentUniversity;
    private String profileImageUrl;
    private String address;
    private String studentIdNumber;
    private LocalDateTime createdAt;
    private int boardingCount; // Number of boardings owned

    public static AdminUserResponseDTO fromEntity(User u) {

        AdminUserResponseDTO dto = new AdminUserResponseDTO();
        dto.setId(u.getId());
        dto.setFullName(u.getFullName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole());
        dto.setVerifiedOwner(u.isVerifiedOwner());
        dto.setPhone(u.getPhone());
        dto.setStudentUniversity(u.getStudentUniversity());
        dto.setProfileImageUrl(u.getProfileImageUrl());
        dto.setAddress(u.getAddress());
        dto.setStudentIdNumber(u.getStudentIdNumber());
        dto.setCreatedAt(u.getCreatedAt());
        
        // Set boarding count for owners
        if (u.getBoardings() != null) {
            dto.setBoardingCount(u.getBoardings().size());
        } else {
            dto.setBoardingCount(0);
        }

        return dto;
    }
}


