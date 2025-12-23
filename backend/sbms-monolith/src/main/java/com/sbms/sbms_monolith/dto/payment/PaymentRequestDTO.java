package com.sbms.sbms_monolith.dto.payment;


import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequestDTO {

    private Long userId;

    private Long monthlyBillId;

    private BigDecimal amount;

    private PaymentMethod paymentMethod;
}
