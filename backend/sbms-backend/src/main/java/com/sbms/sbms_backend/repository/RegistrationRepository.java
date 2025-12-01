package com.sbms.sbms_backend.repository;

import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.Registration;
import com.sbms.sbms_backend.model.User;
import com.sbms.sbms_backend.model.enums.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    List<Registration> findByStudent(User student);
    
    List<Registration> findByStudentId(Long studentId);


    List<Registration> findByBoarding(Boarding boarding);

    List<Registration> findByBoarding_Owner(User owner);

    List<Registration> findByBoarding_OwnerAndStatus(User owner, RegistrationStatus status);
    
    @Query("SELECT r FROM Registration r WHERE r.boarding.owner.id = :ownerId " +
            "AND (:status IS NULL OR r.status = :status)")
     List<Registration> findByBoardingOwnerId(Long ownerId, RegistrationStatus status);
}
