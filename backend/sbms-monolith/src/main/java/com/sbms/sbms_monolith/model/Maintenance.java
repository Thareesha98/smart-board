package com.sbms.sbms_monolith.model;

import com.sbms.sbms_monolith.common.BaseEntity;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;
import com.sbms.sbms_monolith.model.enums.MaintenanceUrgency;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "maintenance_request")
@Data
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "request_id"))
public class Maintenance extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceIssueType issueType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceUrgency urgency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceStatus status;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "incident_date")
    private LocalDateTime date;

    // --- RELATIONSHIPS ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boarding_id", nullable = false)
    private Boarding boarding;

    @ElementCollection
    @CollectionTable(name = "maintenance_images", joinColumns = @JoinColumn(name = "request_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Override
    public void onCreate() {
        // 1. Run the BaseEntity logic (sets createdAt/updatedAt)
        super.onCreate();

        // 2. Run your MaintenanceRequest logic
        if (this.status == null) this.status = MaintenanceStatus.PENDING;
        if (this.date == null) this.date = LocalDateTime.now();
    }

}
