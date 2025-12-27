package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    // For Student: My History
    List<Maintenance> findByStudent_IdOrderByDateDesc(Long studentId);

    // For Owner: My Tasks (via Boarding ownership)
    @Query("SELECT m FROM Maintenance m WHERE m.boarding.owner.id = :ownerId ORDER BY m.date DESC")
    List<Maintenance> findRequestsByOwnerId(@Param("ownerId") Long ownerId);
}
