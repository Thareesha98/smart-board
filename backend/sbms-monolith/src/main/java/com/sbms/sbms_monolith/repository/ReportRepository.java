package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Report;
import com.sbms.sbms_monolith.model.enums.ReportStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    // 1. Get reports created by a specific user (Owner or Student)
    List<Report> findBySender_Id(Long senderId);

    // 2. Get reports AGAINST a user (To show on their profile as "History")
    List<Report> findByReportedUser_Id(Long userId);

    // 3. Admin: Get all reports, newest first
    List<Report> findAllByOrderBySubmissionDateDesc();
    
    long countByStatus(ReportStatus status);
    List<Report> findByStatus(ReportStatus status);

}
