package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.report.ReportCreateDTO;
import com.sbms.sbms_monolith.dto.report.ReportResponseDTO;
import com.sbms.sbms_monolith.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Report submit
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReportResponseDTO> create(
            @RequestPart("data") ReportCreateDTO dto,
            @RequestPart(value = "evidence", required = false) List<MultipartFile> evidence
    ) throws IOException {
        dto.setEvidence(evidence);
        ReportResponseDTO response = reportService.create(dto);
        return ResponseEntity.ok(response);
    }

    // Get all reports
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ReportResponseDTO>> findAllByStudentId(@PathVariable Long studentId) {
        List<ReportResponseDTO> reports = reportService.getReportsByStudent(studentId);
        return ResponseEntity.ok(reports);
    }

    // Get single report detail
    @GetMapping("/{reportId}")
    public ResponseEntity<ReportResponseDTO> findById(@PathVariable Long reportId) {
        ReportResponseDTO report = reportService.getReportsById(reportId);
        return ResponseEntity.ok(report);
    }

}
