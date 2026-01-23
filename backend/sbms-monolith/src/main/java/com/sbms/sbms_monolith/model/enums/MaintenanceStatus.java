package com.sbms.sbms_monolith.model.enums;

public enum MaintenanceStatus {
    PENDING,        // Created by Student
    ASSIGNED,       // Assigned to Tech (Waiting for acceptance)
    IN_PROGRESS,    // Tech Accepted
    WORK_DONE,      // Tech Finished
    COMPLETED,      // Owner Reviewed & Closed
    CANCELLED,
    REJECTED        // Rejected by Owner or Tech
}
