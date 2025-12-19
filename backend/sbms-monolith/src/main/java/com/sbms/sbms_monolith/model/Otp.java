package com.sbms.sbms_monolith.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "otp_codes")
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;           

    private String otpCode;         

    private LocalDateTime expiresAt; 

    private boolean used = false;   
}
