package com.sbms.sbms_monolith.dto.utility;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UtilityRecordRequestDTO {

    @NotNull(message = "Boarding ID is required")
    private Long boardingId;

    @NotNull(message = "Period is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}$", message = "Period must be in YYYY-MM format")
    private String period; // Frontend sends "2023-11"

    @NotNull(message = "Electricity cost is required")
    @Min(value = 0, message = "Cost cannot be negative")
    private BigDecimal electricityCost;

    @NotNull(message = "Water cost is required")
    @Min(value = 0, message = "Cost cannot be negative")
    private BigDecimal waterCost;
}
