package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceRequestDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.mapper.MaintenanceMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
import com.sbms.sbms_monolith.model.enums.MaintenanceUrgency;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.MaintenanceRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepo;
    private final UserRepository studentRepo;
    private final BoardingRepository boardingRepo;
    private final S3Service s3Service;

    //1. Create Request
    @Transactional
    public MaintenanceResponseDTO createMaintenance(Long studentId, MaintenanceRequestDTO dto, List<MultipartFile> files) throws IOException {
        User student = studentRepo.findById(studentId)
                .orElseThrow(()->new RuntimeException("student not found"));

        Boarding boarding = boardingRepo.findById(dto.getBoardingId())
                .orElseThrow(()->new RuntimeException("boarding not found"));

        Maintenance maintenance = new Maintenance();
        maintenance.setStudent(student);
        maintenance.setBoarding(boarding);
        maintenance.setDescription(dto.getDescription());

        // Parse Enums safely
        try {
            maintenance.setIssueType(MaintenanceIssueType.valueOf(dto.getIssueType().toUpperCase()));
        } catch (Exception e) {
            maintenance.setIssueType(MaintenanceIssueType.OTHER);
        }

        try {
            maintenance.setUrgency(MaintenanceUrgency.valueOf(dto.getUrgency().toUpperCase()));
        } catch (Exception e) {
            maintenance.setUrgency(MaintenanceUrgency.LOW);
        }

        // Upload Images
        List<String> imageUrls = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    imageUrls.add(s3Service.uploadFile(file, "maintenance"));
                }
            }
        }
        maintenance.setImages(imageUrls);
        return MaintenanceMapper.toDTO(maintenanceRepo.save(maintenance));
    }

}
