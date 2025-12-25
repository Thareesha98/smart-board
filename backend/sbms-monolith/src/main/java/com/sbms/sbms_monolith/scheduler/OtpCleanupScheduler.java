package com.sbms.sbms_monolith.scheduler;


import com.sbms.sbms_monolith.repository.OtpRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class OtpCleanupScheduler {

    private final OtpRepository otpRepository;

    public OtpCleanupScheduler(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    // Runs every 10 minutes
    @Scheduled(cron = "0 */10 * * * *")
    public void cleanupExpiredOtps() {
        otpRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
