package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.report.ReportCreateDTO;
import com.sbms.sbms_monolith.dto.report.ReportResponseDTO;
import com.sbms.sbms_monolith.mapper.ReportMapper;
import com.sbms.sbms_monolith.model.Report;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.ReportRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private S3Service s3Service;

    // 1. Create Report (Unified)
    public ReportResponseDTO create(ReportCreateDTO dto, List<MultipartFile> files) throws IOException {
        User sender = userRepo.findById(dto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User reportedTarget = null;
        if (dto.getReportedUserId() != null) {
            reportedTarget = userRepo.findById(dto.getReportedUserId()).orElse(null);
        }

        // Pass both users to Mapper
        Report report = ReportMapper.toEntity(dto, sender, reportedTarget);

        // Upload
        List<String> fileUrls = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if(!file.isEmpty()) {
                    fileUrls.add(s3Service.uploadFile(file, "reports"));
                }
            }
        }
        report.setEvidence(fileUrls);

        return ReportMapper.toDTO(reportRepo.save(report));
    }

    public List<ReportResponseDTO> getReportsByStudent(Long studentId) {
        return reportRepo.findByStudent(studentId)
                .stream()
                .map(ReportMapper::toDTO)
                .toList();
    }

    public ReportResponseDTO getReportsById(Long reportId) {
        Report report = reportRepo.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with id " + reportId));

        return ReportMapper.toDTO(report);
    }
}
