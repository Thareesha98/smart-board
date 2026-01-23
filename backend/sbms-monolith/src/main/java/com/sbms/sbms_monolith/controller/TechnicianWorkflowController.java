package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.technician.TechnicianCardDTO;
import com.sbms.sbms_monolith.model.enums.MaintenanceIssueType;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.TechnicianWorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/technician-workflow")
public class TechnicianWorkflowController {

    @Autowired
    private TechnicianWorkflowService workflowService;

    @Autowired
    private UserRepository userRepository;

    // --- OWNER ACTIONS ---

    @GetMapping("/search")
    @PreAuthorize("hasRole('OWNER')")
    public List<TechnicianCardDTO> findTechnicians(
            @RequestParam MaintenanceIssueType skill,
            @RequestParam(required = false) String city
    ) {
        return workflowService.findTechniciansForIssue(skill, city).stream()
                .map(user -> {
                    TechnicianCardDTO dto = new TechnicianCardDTO();
                    dto.setId(user.getId());
                    dto.setFullName(user.getFullName());
                    dto.setProfileImageUrl(user.getProfileImageUrl());
                    dto.setCity(user.getCity());
                    dto.setBasePrice(user.getBasePrice());
                    dto.setSkills(user.getSkills());
                    dto.setAverageRating(user.getTechnicianAverageRating());
                    dto.setTotalJobs(user.getTechnicianTotalJobs());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
