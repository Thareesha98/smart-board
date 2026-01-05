package com.sbms.sbms_monolith.dto.user;

import lombok.Data;

@Data
public class VerifyOtpDTO {
    private String email;
    private String otp;
}
