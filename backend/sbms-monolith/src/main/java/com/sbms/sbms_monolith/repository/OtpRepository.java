package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Otp;
import com.sbms.sbms_monolith.model.enums.OtpPurpose;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;


public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmail(String email);

    //Optional<Otp> findByEmailAndOtpCode(String email, String otpCode);
    
    Optional<Otp> findByEmailAndOtpCodeAndPurpose(
    	    String email,
    	    String otpCode,
    	    OtpPurpose purpose
    	);

    	Optional<Otp> findByEmailAndPurpose(String email, OtpPurpose purpose);


    void deleteByEmail(String email);
    
    void deleteByExpiresAtBefore(LocalDateTime time);
}
