package com.sbms.sbms_monolith.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import com.sbms.sbms_monolith.model.enums.OtpPurpose;

@Data
@Entity
//@Table(name = "otp_codes")
@Table(
	    name = "otp_codes",
	    uniqueConstraints = {
	        @UniqueConstraint(columnNames = {"email", "purpose"})
	    }
	)
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;           

    private String otpCode;         

    private LocalDateTime expiresAt; 
    
    @Enumerated(EnumType.STRING)
    private OtpPurpose purpose;

    private boolean used = false;   
    
}
