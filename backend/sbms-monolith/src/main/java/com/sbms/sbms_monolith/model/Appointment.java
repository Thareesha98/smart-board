package com.sbms.sbms_monolith.model;


import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "appointments")
public class Appointment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "boarding_id", nullable = false)
    private Boarding boarding;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;   // representative student (logged-in user)
    

    @Column(nullable = false)
    private int numberOfStudents;  // total students in group (>=1)

  
    @Column(nullable = false)
    private LocalDateTime requestedStartTime;

    @Column(nullable = false)
    private LocalDateTime requestedEndTime;

  
    private LocalDateTime ownerStartTime;
    private LocalDateTime ownerEndTime;

   
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    private String studentNote;
    private String ownerNote;  
}
