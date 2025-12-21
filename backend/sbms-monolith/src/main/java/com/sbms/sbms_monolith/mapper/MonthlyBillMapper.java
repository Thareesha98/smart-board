package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.billing.MonthlyBillResponseDTO;
import com.sbms.sbms_monolith.model.MonthlyBill;

public class MonthlyBillMapper {

    public static MonthlyBillResponseDTO toDTO(MonthlyBill b) {

        MonthlyBillResponseDTO dto = new MonthlyBillResponseDTO();

        dto.setId(b.getId());
        dto.setStudentId(b.getStudent().getId());
        dto.setStudentName(b.getStudent().getFullName());

        dto.setBoardingId(b.getBoarding().getId());
        dto.setBoardingTitle(b.getBoarding().getTitle());

        dto.setMonth(b.getMonth());

        dto.setBoardingFee(b.getBoardingFee());
        dto.setElectricityFee(b.getElectricityFee());
        dto.setWaterFee(b.getWaterFee());
        dto.setTotalAmount(b.getTotalAmount());

        dto.setStatus(b.getStatus());

        return dto;
    }
}
