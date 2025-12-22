package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.utility.UtilityBillResponseDTO;
import com.sbms.sbms_monolith.model.UtilityBill;

public class UtilityBillMapper {

    public static UtilityBillResponseDTO toDTO(UtilityBill b) {

        UtilityBillResponseDTO dto = new UtilityBillResponseDTO();

        dto.setId(b.getId());
        dto.setBoardingId(b.getBoarding().getId());
        dto.setBoardingTitle(b.getBoarding().getTitle());
        dto.setMonth(b.getMonth());

        dto.setElectricityAmount(b.getElectricityAmount());
        dto.setWaterAmount(b.getWaterAmount());

        dto.setTotalUtilityCost(
                b.getElectricityAmount().add(b.getWaterAmount())
        );

        return dto;
    }
}
