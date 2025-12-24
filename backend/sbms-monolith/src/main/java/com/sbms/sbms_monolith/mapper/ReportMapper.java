package com.sbms.sbms_monolith.mapper;


import com.sbms.sbms_monolith.dto.report.ReportCreateDTO;
import com.sbms.sbms_monolith.dto.report.ReportResponseDTO;
import com.sbms.sbms_monolith.model.Report;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.ReportStatus;

import java.time.format.DateTimeFormatter;

public class ReportMapper {

    public static ReportResponseDTO toDTO(Report r) {
        ReportResponseDTO dto = new ReportResponseDTO();

        dto.setId(r.getId());
        dto.setTitle(r.getTitle());
        dto.setDescription(r.getDescription());
        dto.setType(r.getType() != null ? r.getType().toString() : "OTHER");
        dto.setPriority(r.getSeverity());

        // --- KEY MAPPING FOR FRONTEND BADGES ---
        if (r.getStatus() == ReportStatus.PENDING) dto.setStatus("New");
        else if (r.getStatus() == ReportStatus.INVESTIGATING) dto.setStatus("In Progress");
        else if (r.getStatus() == ReportStatus.RESOLVED) dto.setStatus("Resolved");
        else if (r.getStatus() == ReportStatus.DISMISSED) dto.setStatus("Resolved"); // Or "Dismissed"
        else dto.setStatus("New");

        // Date Formatting
        if (r.getSubmissionDate() != null) {
            dto.setDate(r.getSubmissionDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        }

        // Context Mapping
        dto.setProperty(r.getBoardingName());
        dto.setAdminResponse(r.getResolutionDetails());
        dto.setActionTaken(r.getActionTaken());

        // Map "Student" name field (For Owner View)
        if (r.getReportedUser() != null) {
            dto.setStudent(r.getReportedUser().getFullName());
        } else {
            dto.setStudent("N/A");
        }

        // Evidence Mapping
        if (r.getEvidence() != null && !r.getEvidence().isEmpty()) {
            dto.setEvidenceCount(r.getEvidence().size());

            ReportResponseDTO.EvidenceDTO ev = new ReportResponseDTO.EvidenceDTO();
            String url = r.getEvidence().getFirst();
            ev.setUrl(url);
            ev.setName("Evidence Attachment");
            String lower = url.toLowerCase();
            ev.setType((lower.endsWith(".jpg") || lower.endsWith(".png")) ? "image" : "document");
            dto.setEvidence(ev);
        } else {
            dto.setEvidenceCount(0);
        }

        // Sender Mapping
        if (r.getSender() != null) {
            ReportResponseDTO.UserDTO userDto = new ReportResponseDTO.UserDTO();
            userDto.setId(r.getSender().getId());
            userDto.setName(r.getSender().getFullName());
            userDto.setAvatar("https://ui-avatars.com/api/?name=" + r.getSender().getFullName());
            dto.setSender(userDto);
        }

        return dto;
    }

    public static Report toEntity(ReportCreateDTO dto, User user) {
        Report r = new Report();



        return r;
    }
}
