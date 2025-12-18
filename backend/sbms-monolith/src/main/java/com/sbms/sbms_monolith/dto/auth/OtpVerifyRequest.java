package com.sbms.sbms_monolith.dto.auth;

import lombok.Data;

@Data
public class OtpVerifyRequest {
    private String email;
    private String otp;
}