package com.sbms.sbms_monolith.dto.auth;

import com.sbms.sbms_monolith.dto.user.UserResponseDTO;
import lombok.Data;

@Data
public class JwtAuthResponse {

    private String token;          // Access token (JWT)
    private String refreshToken;   // DB-based refresh token
    private String tokenType = "Bearer";

    private UserResponseDTO user;
}
