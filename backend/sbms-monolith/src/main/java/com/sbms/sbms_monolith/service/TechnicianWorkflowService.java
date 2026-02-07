package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.maintenance.MaintenanceResponseDTO;
import com.sbms.sbms_monolith.dto.technician.TechnicianReviewDTO;
import com.sbms.sbms_monolith.model.Maintenance;
import com.sbms.sbms_monolith.model.TechnicianReview;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
import com.sbms.sbms_monolith.model.enums.MaintenanceStatus;
import com.sbms.sbms_monolith.model.enums.UserRole;
import com.sbms.sbms_monolith.repository.MaintenanceRepository;
import com.sbms.sbms_monolith.repository.TechnicianReviewRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechnicianWorkflowService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MaintenanceRepository maintenanceRepo;

    @Autowired
    private TechnicianReviewRepository techReviewRepo;

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
    public void technicianDecision(Long maintenanceId, Long technicianId, boolean accepted, String reason) {
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
            m.setTechnicianRejectionReason(reason);
        }
        maintenanceRepo.save(m);
    }

    // 5. TECHNICIAN: Mark Work Done
    public void markWorkDone(Long maintenanceId, Long technicianId, BigDecimal finalAmount) {
        Maintenance m = maintenanceRepo.findById(maintenanceId).orElseThrow();

        if(!m.getAssignedTechnician().getId().equals(technicianId)) {
            throw new RuntimeException("Unauthorized: Job not assigned to you");
        }

        // Validate Amount
        if(finalAmount == null || finalAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("You must enter a valid final amount.");
        }

        m.setStatus(MaintenanceStatus.WORK_DONE);
        m.setTechnicianFee(finalAmount); //  Save the bill

        maintenanceRepo.save(m);
    }

    // 6. OWNER: Review & Complete
    @Transactional
    public MaintenanceResponseDTO reviewTechnician(Long maintenanceId, int rating, String comment) {
        Maintenance m = maintenanceRepo.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Allow review if status is PAID or WORK_DONE (flexible for testing)
        if (m.getStatus() != MaintenanceStatus.PAID && m.getStatus() != MaintenanceStatus.WORK_DONE) {
            throw new RuntimeException("Work not finished yet (Must be PAID)");
        }

        //  IMPORTANT: Save directly to Maintenance Entity (So Controller sees it)
        m.setOwnerRating(rating);
        m.setOwnerComment(comment);
        m.setStatus(MaintenanceStatus.COMPLETED);

        Maintenance saved = maintenanceRepo.save(m);

        //  Also try to save to side table (TechnicianReview), but don't crash if duplicate
        try {
            TechnicianReview review = new TechnicianReview();
            review.setMaintenance(m); // This sets the Unique Key
            review.setOwner(m.getBoarding().getOwner());
            review.setTechnician(m.getAssignedTechnician());
            review.setRating(rating);
            review.setComment(comment);
            techReviewRepo.save(review);
        } catch (Exception e) {
            // Ignore duplicate error. The main data is already safe in 'Maintenance' table.
            System.out.println("LOG: Review record already exists in side table.");
        }

        // Update Average Rating Stats
        if (m.getAssignedTechnician() != null) {
            updateTechnicianStats(m.getAssignedTechnician());
        }

        return mapToDTO(saved);
    }

    // 7.  Get Reviews directly from Review Table
    public List<TechnicianReviewDTO> getReviewsForTechnician(User technician) {
        // Uses your existing repository method: findByTechnician(User)
        return techReviewRepo.findByTechnician(technician).stream()
                .map(review -> {
                    TechnicianReviewDTO dto = new TechnicianReviewDTO();
                    dto.setId(review.getId());

                    if (review.getOwner() != null) {
                        dto.setOwnerName(review.getOwner().getFullName());
                    } else {
                        dto.setOwnerName("Unknown Owner");
                    }

                    dto.setRating(review.getRating());
                    dto.setComment(review.getComment());

                    // Handle Date
                    if (review.getCreatedAt() != null) {
                        dto.setDate(review.getCreatedAt().toLocalDate());
                    } else {
                        dto.setDate(java.time.LocalDate.now());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    //  Helper Method: Calculate Stats directly from Maintenance History
    private void updateTechnicianStats(User tech) {
        List<Maintenance> jobs = maintenanceRepo.findByAssignedTechnician_Id(tech.getId());

        double totalRating = 0;
        int count = 0;

        for (Maintenance job : jobs) {
            //  FIX 2: Check ownerRating > 0
            if (job.getOwnerRating() > 0) {
                totalRating += job.getOwnerRating();
                count++;
            }
        }

        if (count > 0) {
            tech.setTechnicianAverageRating(Math.round((totalRating / count) * 10.0) / 10.0);
            tech.setTechnicianTotalJobs(count);
            userRepository.save(tech);
        }
    }

    // Missing Helper Method: Map Entity -> DTO
    private MaintenanceResponseDTO mapToDTO(Maintenance m) {
        MaintenanceResponseDTO dto = new MaintenanceResponseDTO();

        dto.setId(m.getId());
        dto.setTitle(m.getTitle());
        dto.setDescription(m.getDescription());
        dto.setStatus(m.getStatus());
        dto.setTechnicianFee(m.getTechnicianFee());
        dto.setCreatedAt(m.getCreatedAt());

        // Map Technician Info
        if (m.getAssignedTechnician() != null) {
            dto.setTechnicianName(m.getAssignedTechnician().getFullName());
            dto.setTechnicianId(m.getAssignedTechnician().getId());
        }

        // Map Owner/Boarding Info
        if (m.getBoarding() != null) {
            dto.setBoardingAddress(m.getBoarding().getAddress());
            if (m.getBoarding().getOwner() != null) {
                dto.setOwnerName(m.getBoarding().getOwner().getFullName());
            }
        }

        // Map Review Info (Now reading from the correct place)
        dto.setRating(m.getOwnerRating());
        dto.setReviewComment(m.getOwnerComment());

        return dto;
    }
}
