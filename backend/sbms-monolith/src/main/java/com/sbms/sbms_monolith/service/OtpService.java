package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.model.Otp;
import com.sbms.sbms_monolith.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public Otp createOtp(String email) {
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setOtpCode(generateOtp());
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otp.setUsed(false);

        return otpRepository.save(otp);
    }

    public boolean validateOtp(String email, String otpCode) {
        Otp otp = otpRepository.findByEmailAndOtpCode(email, otpCode)
                .orElse(null);

        if (otp == null) return false;

        if (otp.isUsed()) return false;

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        otp.setUsed(true);
        otpRepository.save(otp);

        return true;
    }
}
