package com.sbms.sbms_monolith.dto.report;

import com.sbms.sbms_monolith.model.Boarding;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String type;
    private String severity;
    private Boarding boarding;
//    private String reportedPerson;
    private Boolean allowContact;
    private LocalDate incidentDate;

    // System fields
    private String status;
    private LocalDateTime submissionDate;
    private String adminResponse;

    // The S3 URLs for the images
    private List<String> evidenceUrls;
}
