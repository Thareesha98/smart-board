package com.sbms.sbms_monolith.dto.admin;


import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.UserRole;
import lombok.Data;


@Data
public class AdminUserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private UserRole role;
    private boolean verifiedOwner;
    private String phone;
    private String studentUniversity;

    public static AdminUserResponseDTO fromEntity(User u) {

        AdminUserResponseDTO dto = new AdminUserResponseDTO();
        dto.setId(u.getId());
        dto.setFullName(u.getFullName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole());
        dto.setVerifiedOwner(u.isVerifiedOwner());
        dto.setPhone(u.getPhone());
        dto.setStudentUniversity(u.getStudentUniversity());

        return dto;
    }
}


