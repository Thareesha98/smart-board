package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
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
}
