package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.ReportSeverity;
import com.sbms.sbms_monolith.model.enums.ReportStatus;
import com.sbms.sbms_monolith.model.enums.ReportType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
public class Report extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private ReportType type; // boarding, owner, safety, fraud, other

    private ReportSeverity severity; // low, medium, high, critical

    private ReportStatus status; // pending, under-review, resolved, dismissed

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @Column(name = "incident_date")
    private LocalDate incidentDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "boarding_id")
    private Boarding boarding;

//    @Column(name = "reported_person")
//    private String reportedPerson;

    @Column(name = "allow_contact")
    private boolean allowContact;

    @Column(name = "admin_response", columnDefinition = "TEXT")
    private String adminResponse;

    // Stores image/file URLs
    @ElementCollection
    @CollectionTable(name = "report_evidence", joinColumns = @JoinColumn(name = "report_id"))
    @Column(name = "file_url")
    private List<String> evidence;

    // Relationships
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @PrePersist
    public void creteOn() {
        if (this.submissionDate == null) this.submissionDate = LocalDateTime.now();
        if (this.status == null) this.status = "pending";
    }

}
