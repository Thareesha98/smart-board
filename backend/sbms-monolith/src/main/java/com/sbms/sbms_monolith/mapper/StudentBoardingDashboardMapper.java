package com.sbms.sbms_monolith.mapper;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import com.sbms.sbms_monolith.dto.dashboard.StudentBoardingDashboardDTO;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.Registration;

public class StudentBoardingDashboardMapper {

    public static StudentBoardingDashboardDTO toDTO(
            Registration reg,
            BigDecimal currentMonthDue,
            String paymentStatus,
            LocalDate lastPaymentDate,
            int openIssues,
            int resolvedIssues,
            LocalDate lastIssueDate,
            Double avgRating,
            boolean reviewSubmitted
    ) {

        Boarding b = reg.getBoarding();

        StudentBoardingDashboardDTO dto = new StudentBoardingDashboardDTO();

        // Registration
        dto.setRegistrationId(reg.getId());
        dto.setStatus(reg.getStatus());
        dto.setRegisteredAt(reg.getCreatedAt());

        // Boarding
        dto.setBoardingId(b.getId());
        dto.setBoardingTitle(b.getTitle());
        dto.setBoardingAddress(b.getAddress());
        dto.setOwnerName(b.getOwner().getFullName());

        // Payment
        dto.setKeyMoney(b.getKeyMoney());
        dto.setMonthlyPrice(b.getPricePerMonth());
        dto.setCurrentMonthDue(currentMonthDue);
        dto.setPaymentStatus(paymentStatus);
        dto.setLastPaymentDate(lastPaymentDate);

        // Due calculation (mock: 30 days cycle)
        long daysSinceReg =
                ChronoUnit.DAYS.between(reg.getCreatedAt().toLocalDate(), LocalDate.now());
        dto.setDueInDays(Math.max(0, 30 - (int) daysSinceReg));

        // Maintenance
        dto.setOpenIssues(openIssues);
        dto.setResolvedIssues(resolvedIssues);
        dto.setLastIssueDate(lastIssueDate);

        // Reviews
        dto.setAverageRating(avgRating);
        dto.setYourReviewSubmitted(reviewSubmitted);

        return dto;
    }
}
