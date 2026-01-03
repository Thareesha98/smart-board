package com.sbms.sbms_monolith.mapper;


import com.sbms.sbms_monolith.dto.report.ReportCreateDTO;
import com.sbms.sbms_monolith.dto.report.ReportResponseDTO;
import com.sbms.sbms_monolith.model.Report;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.ReportSeverity;
import com.sbms.sbms_monolith.model.enums.ReportStatus;
import com.sbms.sbms_monolith.model.enums.ReportType;

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
        else if (r.getStatus() == ReportStatus.DISMISSED) dto.setStatus("Dismissed"); // Or "Resolved"
        else dto.setStatus("New");

        // Date Formatting
        if (r.getSubmissionDate() != null) {
            dto.setDate(r.getSubmissionDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        }

        // Context Mapping
        dto.setProperty(r.getBoardingName());
        dto.setAdminResponse(r.getResolutionDetails());
        dto.setActionTaken(r.getActionTaken());
        dto.setActionDuration(r.getActionDuration());

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

        // Map Users using helper
        if (r.getSender() != null) dto.setSender(mapUser(r.getSender()));
        if (r.getReportedUser() != null) dto.setReportedUser(mapUser(r.getReportedUser()));

        return dto;
    }

    // Helper to map User Entity -> Safe UserDTO
    private static ReportResponseDTO.UserDTO mapUser(User user) {
        ReportResponseDTO.UserDTO dto = new ReportResponseDTO.UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getFullName());

        if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
            dto.setAvatar(user.getProfileImageUrl());
        } else {
            dto.setAvatar("https://ui-avatars.com/api/?name=" + user.getFullName());
        }

        if (user.getRole() != null) dto.setRole(user.getRole().toString());

        return dto;
    }

    public static Report toEntity(ReportCreateDTO dto, User sender, User reportedTarget) {
        Report r = new Report();
        r.setTitle(dto.getReportTitle());
        r.setDescription(dto.getReportDescription());
        r.setBoardingName(dto.getBoarding());
        r.setReportedPersonName(dto.getReportedPersonName());

        try { r.setType(ReportType.valueOf(dto.getType().toUpperCase())); }
        catch (Exception e) { r.setType(ReportType.OTHER); }

        try { r.setSeverity(ReportSeverity.valueOf(dto.getSeverity().toUpperCase())); }
        catch (Exception e) { r.setSeverity(ReportSeverity.LOW); }

        r.setSender(sender);
        r.setReportedUser(reportedTarget);

        r.setAllowContact(dto.getAllowContact() != null ? dto.getAllowContact() : false);
        r.setIncidentDate(dto.getIncidentDate());

        return r;
    }
}
