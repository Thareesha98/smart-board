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

    public ReportResponseDTO create(ReportCreateDTO dto) throws IOException {

        User student = userRepo.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Use Static Mapper
        Report report = ReportMapper.toEntity(dto, student);

        // Upload files
        List<String> fileUrls  = new ArrayList<>();

        if (dto.getEvidence() != null && !dto.getEvidence().isEmpty()) {
            for (MultipartFile file : dto.getEvidence()) {
                String s3Url = s3Service.uploadFile(file, "reports");
                fileUrls.add(s3Url);
            }
        }
        report.setEvidence(fileUrls);

        Report savedReport = reportRepo.save(report);

        // Use Static Mapper
        return ReportMapper.toDTO(savedReport);
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
