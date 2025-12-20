package com.sbms.sbms_monolith.dto.report;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReportCreateDTO {

    private String reportTitle;
    private String reportDescription;
    private String type;
    private String severity;
    private String boarding;             // Name of the boarding
    private String reportedPerson;
    private Boolean allowContact;
    private LocalDate incidentDate;
    private Long studentId;              // ID of the student sending it

    // The files uploaded by user
    private List<MultipartFile> evidence;
}
