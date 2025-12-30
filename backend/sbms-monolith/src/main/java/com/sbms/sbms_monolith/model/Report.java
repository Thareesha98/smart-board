package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.ReportSeverity;
import com.sbms.sbms_monolith.model.enums.ReportStatus;
import com.sbms.sbms_monolith.model.enums.ReportType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "report_id"))
public class Report extends BaseEntity {


    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ReportType type; // boarding, owner, safety, fraud, other

    @Enumerated(EnumType.STRING)
    private ReportSeverity severity; // low, medium, high, critical

    @Enumerated(EnumType.STRING)
    private ReportStatus status; // pending, under-review, resolved, dismissed

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @Column(name = "incident_date")
    private LocalDate incidentDate;

    @Column(name = "boarding_name")
    private String boardingName;

    // WHO IS INVOLED ?

    // The person submitting the report (Student OR Owner)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // The person being reported (Target).
    // e.g., If Owner reports a Student, this holds the Student.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reported_user_id")
    private User reportedUser;

    @Column(name = "reported_person_name")
    private String reportedPersonName;


    @Column(name = "allow_contact")
    private boolean allowContact;


    // --- ADMIN ACTION FIELDS ---
    @Column(name = "resolution_details", columnDefinition = "TEXT")
    private String resolutionDetails; // Admin's response text

    @Column(name = "dismissal_reason", columnDefinition = "TEXT")
    private String dismissalReason;

    @Column(name = "action_taken")
    private String actionTaken;

    @Column(name = "action_duration")
    private String actionDuration;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @ElementCollection
    @CollectionTable(name = "report_evidence", joinColumns = @JoinColumn(name = "report_id"))
    @Column(name = "file_url")
    private List<String> evidence;


    @Override
    public void onCreate() {
        super.onCreate();
        if (this.submissionDate == null) this.submissionDate = LocalDateTime.now();
        if (this.status == null) this.status = ReportStatus.PENDING;
    }

}
