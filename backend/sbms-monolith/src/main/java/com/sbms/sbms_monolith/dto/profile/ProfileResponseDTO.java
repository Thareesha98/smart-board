package com.sbms.sbms_monolith.dto.profile;


import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.UserRole;
import lombok.Data;

@Data
public class ProfileResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String profileImageUrl;
    private UserRole role;

    private String accNo;
    private String studentUniversity;

    public static ProfileResponseDTO from(User user) {
        ProfileResponseDTO dto = new ProfileResponseDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setProfileImageUrl(user.getProfileImageUrl());
        dto.setRole(user.getRole());
        dto.setAccNo(user.getAccNo());
        dto.setStudentUniversity(user.getStudentUniversity());
        return dto;
    }
}
