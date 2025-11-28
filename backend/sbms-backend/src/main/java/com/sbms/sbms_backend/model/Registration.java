package com.sbms.sbms_backend.model;

import com.sbms.sbms_backend.common.BaseEntity;
import com.sbms.sbms_backend.model.enums.RegistrationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

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
	
	private String studentNote;
    private String ownerNote;
	
}
