package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.TechnicianReview;
import com.sbms.sbms_monolith.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechnicianReviewRepository extends JpaRepository<TechnicianReview,Long> {
    List<TechnicianReview> findByTechnician(User technician);
}
