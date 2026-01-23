package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;
import com.sbms.sbms_monolith.model.enums.UserRole;
import com.sbms.sbms_monolith.repository.MaintenanceRepository;
import com.sbms.sbms_monolith.repository.TechnicianReviewRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechnicianWorkflowService {

    @Autowired private UserRepository userRepository;
    @Autowired private MaintenanceRepository maintenanceRepo;
    @Autowired private TechnicianReviewRepository techReviewRepo;

    // 1. OWNER: Find Technicians matching the issue (e.g., Plumbing)
    public List<User> findTechniciansForIssue(MaintenanceIssueType skill, String city) {
        return userRepository.findByRole(UserRole.TECHNICIAN).stream()
                .filter(t -> t.getSkills() != null && t.getSkills().contains(skill))
                .filter(t -> city == null || city.isEmpty() || (t.getCity() != null && t.getCity().equalsIgnoreCase(city)))
                .collect(Collectors.toList());
    }

    // 2. OWNER: Assign Technician
    public void assignTechnician(Long maintenanceId, Long technicianId, Long ownerId) {
        Maintenance m = maintenanceRepo.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!m.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        User tech = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        m.setAssignedTechnician(tech);
        m.setStatus(MaintenanceStatus.ASSIGNED);
        m.setRejectedByTechnician(false);
        maintenanceRepo.save(m);
    }

    // 3. TECHNICIAN: Get Assigned Jobs
    public List<Maintenance> getAssignedJobs(Long technicianId) {
        return maintenanceRepo.findByAssignedTechnician_Id(technicianId);
    }

    // 4. TECHNICIAN: Accept/Reject
    public void technicianDecision(Long maintenanceId, Long technicianId, boolean accepted) {
        Maintenance m = maintenanceRepo.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!m.getAssignedTechnician().getId().equals(technicianId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (accepted) {
            m.setStatus(MaintenanceStatus.IN_PROGRESS);
        } else {
            m.setAssignedTechnician(null);
            m.setStatus(MaintenanceStatus.PENDING); // Goes back to owner
            m.setRejectedByTechnician(true);
        }
        maintenanceRepo.save(m);
    }

    // 5. TECHNICIAN: Mark Work Done
    public void markWorkDone(Long maintenanceId, Long technicianId) {
        Maintenance m = maintenanceRepo.findById(maintenanceId).orElseThrow();
        if(!m.getAssignedTechnician().getId().equals(technicianId)) throw new RuntimeException("Unauthorized");

        m.setStatus(MaintenanceStatus.WORK_DONE);
        maintenanceRepo.save(m);
    }
}
