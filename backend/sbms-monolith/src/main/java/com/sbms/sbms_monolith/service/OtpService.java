package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.model.Otp;
import com.sbms.sbms_monolith.model.enums.OtpPurpose;
import com.sbms.sbms_monolith.repository.OtpRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;

    public OtpService(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    // -------------------------------
    // CREATE OTPs
    // -------------------------------
    public Otp createRegistrationOtp(String email) {
        return createOtp(email, OtpPurpose.REGISTRATION);
    }

    public Otp createPasswordResetOtp(String email) {
        return createOtp(email, OtpPurpose.PASSWORD_RESET);
    }

    private Otp createOtp(String email, OtpPurpose purpose) {

        Otp otp = otpRepository
                .findByEmailAndPurpose(email, purpose)
                .orElse(new Otp());

        if (otp.getId() != null &&
            otp.getExpiresAt().isAfter(LocalDateTime.now()) &&
            !otp.isUsed()) {
            return otp; // reuse valid OTP
        }

        otp.setEmail(email);
        otp.setPurpose(purpose);
        otp.setOtpCode(generateOtp());
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otp.setUsed(false);

        return otpRepository.save(otp);
    }

    // -------------------------------
    // VALIDATE OTP
    // -------------------------------
    public boolean validateOtp(String email, String otpCode, OtpPurpose purpose) {

        Otp otp = otpRepository
                .findByEmailAndOtpCodeAndPurpose(
                        email.trim(),
                        otpCode.trim(),
                        purpose
                )
                .orElse(null);

        if (otp == null) return false;
        if (otp.isUsed()) return false;
        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        otp.setUsed(true);
        otpRepository.save(otp);

        return true;
    }
}
