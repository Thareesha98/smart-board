package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    // Find reports submitted by a specific student
    List<Report> findByStudent_StudentId(Long studentId);

    // Find reports by status (for filtering)
    List <Report> findByStudent_StudentIdAndStatus(Long studentId, String status);

}
