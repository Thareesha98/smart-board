package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    // Find reports submitted by a specific student
    List<Report> findByStudent(Long studentId);

    // Find reports by status (for filtering)
//    List <Report> findByStudent_StudentIdAndStatus(Long studentId, String status);

}
