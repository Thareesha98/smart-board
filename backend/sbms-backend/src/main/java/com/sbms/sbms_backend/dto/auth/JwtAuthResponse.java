package com.sbms.sbms_backend.dto.auth;

import com.sbms.sbms_backend.dto.user.UserResponseDTO;
import lombok.Data;

@Data
public class JwtAuthResponse {

    private String token;          // JWT token
    private String tokenType = "Bearer";

    private UserResponseDTO user;  // user info (id, name, role, etc.)
}
