package com.sbms.sbms_monolith.dto.utility;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class UtilityBillCreateDTO {

    private Long boardingId;
    private String month; // YYYY-MM

    private BigDecimal electricityAmount;
    private BigDecimal waterAmount;
}
