package com.sbms.sbms_monolith.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "OTP verification request")
public class OtpVerifyRequest {

    @Schema(
        description = "Email address used during registration",
        example = "user@gmail.com",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String email;

    @Schema(
        description = "One-time password sent to email",
        example = "123456",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String otp;
}
