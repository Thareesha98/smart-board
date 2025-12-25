package com.sbms.sbms_monolith.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceCreateDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceDecisionDTO;
import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.mapper.MaintenanceMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.MaintenanceRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepo;

    @Autowired
    private BoardingRepository boardingRepo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private S3Service s3Service;

    public MaintenanceResponseDTO create(Long studentId, MaintenanceCreateDTO dto) {

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Boarding boarding = boardingRepo.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        Maintenance m = new Maintenance();
        m.setStudent(student);
        m.setBoarding(boarding);
        m.setTitle(dto.getTitle());
        m.setDescription(dto.getDescription());
        m.setStudentNote(dto.getStudentNote());
        m.setImageUrl(dto.getImageUrl());

        maintenanceRepo.save(m);

     /*   NotificationEvent event = new NotificationEvent();
        event.setReceiverId(boarding.getOwner().getId());
        event.setTitle("New Maintenance Request");
        event.setMessage("New maintenance request for " + boarding.getTitle());
        event.setType("ACTION_REQUIRED");

        notificationPublisher.sendNotification(event); */

        return MaintenanceMapper.toDTO(m);
    }

    // -----------------------------------------
    // STUDENT: VIEW MY REQUESTS
    // -----------------------------------------
    public List<MaintenanceResponseDTO> getForStudent(Long studentId) {

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return maintenanceRepo.findByStudent(student)
                .stream()
                .map(MaintenanceMapper::toDTO)
                .toList();
    }

    // -----------------------------------------
    // OWNER: VIEW REQUESTS
    // -----------------------------------------
    public List<MaintenanceResponseDTO> getForOwner(Long ownerId) {

        User owner = userRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        return maintenanceRepo.findByBoarding_Owner(owner)
                .stream()
                .map(MaintenanceMapper::toDTO)
                .toList();
    }

    // -----------------------------------------
    // OWNER: UPDATE STATUS
    // -----------------------------------------
    public MaintenanceResponseDTO decide(Long ownerId, Long maintenanceId, MaintenanceDecisionDTO dto) {

        Maintenance m = maintenanceRepo.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Maintenance not found"));

        if (!m.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        m.setStatus(dto.getStatus());
        m.setOwnerNote(dto.getOwnerNote());
        maintenanceRepo.save(m);

        // 🔔 Notify STUDENT
     /*   NotificationEvent event = new NotificationEvent();
        event.setReceiverId(m.getStudent().getId());
        event.setTitle("Maintenance Update");
        event.setMessage("Your maintenance request '" + m.getTitle() +
                "' is now " + dto.getStatus());
        event.setType("INFO");

        notificationPublisher.sendNotification(event); */
        
        if (dto.getStatus() == MaintenanceStatus.REJECTED && m.getImageUrl() != null) {
            s3Service.deleteFile(m.getImageUrl());
        }


        return MaintenanceMapper.toDTO(m);
    }
}
