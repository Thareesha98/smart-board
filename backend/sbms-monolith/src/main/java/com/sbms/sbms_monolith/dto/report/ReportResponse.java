package com.sbms.sbms_monolith.dto.report;

import lombok.Data;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportResponse {
    private Long id;
    private String title;
    private String description;
    private String type;
    private String severity;
    private String boarding;
    private String reportedPerson;
    private Boolean allowContact;
    private LocalDate incidentDate;

    // System fields
    private String status;
    private LocalDateTime submissionDate;
    private String adminResponse;

    // The S3 URLs for the images
    private List<String> evidenceUrls;
}
