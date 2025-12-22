package com.sbms.sbms_monolith.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbms.sbms_monolith.model.Boarding;

public interface BoardingRepository extends JpaRepository<Boarding, Long> {
}
