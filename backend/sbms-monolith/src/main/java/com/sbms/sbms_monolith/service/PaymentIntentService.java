package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.payment.CreatePaymentIntentDTO;
import com.sbms.sbms_monolith.model.MonthlyBill;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentType;
import com.sbms.sbms_monolith.repository.MonthlyBillRepository;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentIntentService {

    private final PaymentIntentRepository intentRepo;
    private final MonthlyBillRepository monthlyBillRepo;

    /**
     * Create a new payment intent with lifecycle state
     */
    @Transactional
    public PaymentIntent create(CreatePaymentIntentDTO dto) {

        validate(dto);

        // Prevent duplicate active intents
        intentRepo.findByStudentId(dto.getStudentId())
                .stream()
                .filter(i -> i.getStatus() != PaymentIntentStatus.SUCCESS)
                .filter(i -> i.getStatus() != PaymentIntentStatus.EXPIRED)
                .filter(i ->
                        i.getType() == dto.getType()
                        && i.getBoardingId().equals(dto.getBoardingId())
                )
                .findAny()
                .ifPresent(i -> {
                    throw new RuntimeException("Active payment intent already exists");
                });

        PaymentIntent intent = new PaymentIntent();
        intent.setStudentId(dto.getStudentId());
        intent.setOwnerId(dto.getOwnerId());
        intent.setBoardingId(dto.getBoardingId());
        intent.setType(dto.getType());
        intent.setAmount(dto.getAmount());
        intent.setDescription(dto.getDescription());

        // ✅ lifecycle fields
        intent.setStatus(PaymentIntentStatus.CREATED);
        intent.setCreatedAt(LocalDateTime.now());
        intent.setExpiresAt(calculateExpiry(dto));

        // Link monthly bill if applicable
        if (dto.getType() != PaymentType.KEY_MONEY) {

            MonthlyBill bill = monthlyBillRepo.findById(dto.getMonthlyBillId())
                    .orElseThrow(() -> new RuntimeException("Monthly bill not found"));

            if (!bill.getStudent().getId().equals(dto.getStudentId())) {
                throw new RuntimeException("Bill does not belong to student");
            }

            intent.setDescription(
                    dto.getType() == PaymentType.MONTHLY_RENT
                            ? "Monthly Boarding Fee - " + bill.getMonth()
                            : "Utilities Payment - " + bill.getMonth()
            );
        }

        return intentRepo.save(intent);
    }

    // -------------------- EXPIRY RULES --------------------

    private LocalDateTime calculateExpiry(CreatePaymentIntentDTO dto) {

        return switch (dto.getType()) {
            case KEY_MONEY -> LocalDateTime.now().plusHours(24);
            case MONTHLY_RENT, UTILITIES -> LocalDateTime.now().plusDays(14);
        };
    }

    // -------------------- VALIDATION --------------------

    private void validate(CreatePaymentIntentDTO dto) {

        if (dto.getStudentId() == null)
            throw new RuntimeException("Student ID required");

        if (dto.getOwnerId() == null)
            throw new RuntimeException("Owner ID required");

        if (dto.getBoardingId() == null)
            throw new RuntimeException("Boarding ID required");

        if (dto.getType() == null)
            throw new RuntimeException("Payment type required");

        if (dto.getAmount() == null || dto.getAmount().signum() <= 0)
            throw new RuntimeException("Invalid amount");

        if (dto.getType() != PaymentType.KEY_MONEY && dto.getMonthlyBillId() == null)
            throw new RuntimeException("Monthly bill ID required");

        if (dto.getType() == PaymentType.KEY_MONEY && dto.getMonthlyBillId() != null)
            throw new RuntimeException("Key money cannot reference monthly bill");
    }
}
