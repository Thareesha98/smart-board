// package com.sbms.sbms_monolith.mapper;

// import java.math.BigDecimal;
// import java.time.LocalDate;
// import java.time.format.DateTimeFormatter;

// import org.springframework.stereotype.Component;


// import com.sbms.sbms_monolith.dto.utility.UtilityRecordResponseDTO;
// import com.sbms.sbms_monolith.model.Boarding;
// import com.sbms.sbms_monolith.model.UtilityRecord;

// @Component
// public class UtilityMapper {
    
//     private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

//     /**
//      * Converts Entity to Response DTO
//      */
//     public UtilityRecordResponseDTO toResponseDTO(UtilityRecord entity) {
//         if (entity == null) {
//             return null;
//         }

//         UtilityRecordResponseDTO dto = new UtilityRecordResponseDTO();
//         dto.setId(entity.getId());
        
//         // Map Relationship Data
//         if (entity.getBoarding() != null) {
//             dto.setBoardingId(entity.getBoarding().getId());
//             dto.setBoardingName(entity.getBoarding().getTitle());
//         }

//         // Map Date: LocalDate -> String "YYYY-MM"
//         if (entity.getRecordMonth() != null) {
//             dto.setPeriod(entity.getRecordMonth().format(MONTH_FORMATTER));
//         }

//         dto.setElectricityCost(entity.getElectricityCost());
//         dto.setWaterCost(entity.getWaterCost());
//         dto.setProofImageUrl(entity.getProofImageUrl());
//         dto.setLastUpdated(entity.getUpdatedAt()); 

//         // Calculate Total Cost
//         BigDecimal total = BigDecimal.ZERO;
//         if (entity.getElectricityCost() != null) total = total.add(entity.getElectricityCost());
//         if (entity.getWaterCost() != null) total = total.add(entity.getWaterCost());
//         dto.setTotalCost(total);

//         return dto;
//     }

//     /**
//      * Updates an existing Entity from the Request DTO.
//      */
//     public UtilityRecord toEntity(UtilityRecordRequestDTO dto, Boarding boarding) {
//         UtilityRecord entity = new UtilityRecord();
//         updateEntity(entity, dto, boarding);
//         return entity;
//     }

//     /**
//      * Helper to update fields on an existing entity
//      */
//     public void updateEntity(UtilityRecord entity, UtilityRecordRequestDTO dto, Boarding boarding) {
//         entity.setBoarding(boarding);
        
//         // Parse String "2023-11" -> LocalDate "2023-11-01"
//         if (dto.getPeriod() != null) {
//             // Append "-01" to make it a full date compatible with LocalDate
//             LocalDate date = LocalDate.parse(dto.getPeriod() + "-01", DateTimeFormatter.ISO_LOCAL_DATE);
//             entity.setRecordMonth(date);
//         }

//         entity.setElectricityCost(dto.getElectricityCost());
//         entity.setWaterCost(dto.getWaterCost());
        
        
//     }
// }
