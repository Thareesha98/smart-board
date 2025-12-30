package com.sbms.sbms_monolith.dto.boarding;

import java.math.BigDecimal;

import com.sbms.sbms_monolith.model.enums.BoardingType;
import com.sbms.sbms_monolith.model.enums.Gender;

import lombok.Data;

@Data
public class BoardingViewRequest {

    private Gender genderType;            // optional
    private BoardingType boardingType;    // optional

    private BigDecimal minPrice;          // optional
    private BigDecimal maxPrice;          // optional

    // pagination
    private int page = 0;
    private int size = 10;
}
