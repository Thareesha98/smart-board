package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.utility.UtilityRecordRequestDTO;
import com.sbms.sbms_monolith.dto.utility.UtilityRecordResponseDTO;
import com.sbms.sbms_monolith.mapper.UtilityMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.UtilityRecord;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.UtilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor 
public class UtilityService {

    private final UtilityRepository utilityRepository;
    private final BoardingRepository boardingRepository;
    private final UtilityMapper utilityMapper;

    /**
     * Handles the "Upsert" logic:
     * If a bill exists for this House + Month -> Update it.
     * If not -> Create a new one.
     */
    @Transactional
    public UtilityRecordResponseDTO updateUtilityRecord(UtilityRecordRequestDTO request) {
        
        // 1. Validate & Fetch Boarding House
        Boarding boarding = boardingRepository.findById(request.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding House not found with ID: " + request.getBoardingId()));

        // 2. Parse the "YYYY-MM" string to a Date object (1st of month)
        // We append "-01" to match the database format (e.g., 2023-11-01)
        LocalDate recordMonth = LocalDate.parse(request.getPeriod() + "-01", DateTimeFormatter.ISO_LOCAL_DATE);

        // 3. Check if record exists
        UtilityRecord record = utilityRepository
                .findByBoardingAndRecordMonth(boarding, recordMonth)
                .orElse(new UtilityRecord());

        // 4. Update the Entity using the Mapper
        // We pass the 'boarding' object explicitly because the DTO only had the ID
        utilityMapper.updateEntity(record, request, boarding);

        // 5. Save & Return DTO
        UtilityRecord savedRecord = utilityRepository.save(record);
        return utilityMapper.toResponseDTO(savedRecord);
    }

    /**
     * Fetches the billing history for a specific house.
     * Useful for showing trends (e.g., "Last 6 months costs").
     */
    @Transactional(readOnly = true)
    public List<UtilityRecordResponseDTO> getUtilityHistory(Long boardingId) {
        Boarding boarding = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding House not found"));

        return utilityRepository.findAllByBoardingOrderByRecordMonthDesc(boarding)
                .stream()
                .map(utilityMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}