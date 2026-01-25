package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.UtilityRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UtilityRepository extends JpaRepository<UtilityRecord, Long> {

   
    Optional<UtilityRecord> findByBoardingAndRecordMonth(Boarding boarding, LocalDate recordMonth);

    
    List<UtilityRecord> findAllByBoardingOrderByRecordMonthDesc(Boarding boarding);

   
    List<UtilityRecord> findByBoardingAndRecordMonthBetween(Boarding boarding, LocalDate start, LocalDate end);
}