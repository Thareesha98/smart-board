package com.sbms.sbms_monolith.mapper;


import com.sbms.sbms_monolith.dto.report.ReportResponseDTO;
import com.sbms.sbms_monolith.model.Report;
import com.sbms.sbms_monolith.model.User;

public class ReportMapper {

    public static ReportResponseDTO toDTO(Report r) {
        ReportResponseDTO dto = new ReportResponseDTO();

        dto.setId(r.getReportId());
        dto.setTitle(r.getTitle());
        dto.setDescription(r.getDescription());
        dto.setType(r.getType());
        dto.setSeverity(r.getSeverity());
        dto.setBoarding(r.getBoardingName());
        dto.setReportedPerson(r.getReportedPerson());
        dto.setAllowContact(r.isAllowContact());
        dto.setIncidentDate(r.getIncidentDate());

        dto.setStatus(r.getStatus());
        dto.setSubmissionDate(r.getSubmissionDate());
        dto.setAdminResponse(r.getAdminResponse());

        dto.setEvidenceUrls(r.getEvidence());

        return dto;
    }

    public static Report toEntity(ReportResponseDTO dto, User user) {
        Report r = new Report();

        r.setTitle(dto.getTitle());
        r.setDescription(dto.getDescription());
        r.setType(dto.getType());
        r.setSeverity(dto.getSeverity());
        r.setBoardingName(dto.getBoarding());
        r.setReportedPerson(dto.getReportedPerson());

        if (dto.getAllowContact() != null) {
            r.setAllowContact(dto.getAllowContact());
        } else  {
            r.setAllowContact(false);
        }

        r.setIncidentDate(dto.getIncidentDate());
        r.setStudent(user);

        return r;
    }
}
