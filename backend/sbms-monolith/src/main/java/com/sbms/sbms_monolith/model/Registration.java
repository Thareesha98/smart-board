package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Registration extends BaseEntity{
	@ManyToOne
	@JoinColumn(name="boarding_id" , nullable=false)
	private Boarding boarding;
	
	@ManyToOne
	@JoinColumn(name="student_id", nullable=false)
	private User student;
	
	@Column(nullable= false)
	private int numberOfStudents;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
    private RegistrationStatus status = RegistrationStatus.PENDING;
	
	private boolean keyMoneyPaid = false;
	
	private String studentNote;
    private String ownerNote;
    
    @Column
    private String paymentTransactionRef;

    private LocalDate moveInDate;
    private String contractDuration;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String specialRequirements;

    
    
    
	
}
