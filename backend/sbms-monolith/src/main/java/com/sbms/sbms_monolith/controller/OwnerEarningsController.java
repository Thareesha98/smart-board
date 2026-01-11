package com.sbms.sbms_monolith.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.sbms.sbms_monolith.dto.dashboard.OwnerEarningTransactionDTO;
import com.sbms.sbms_monolith.dto.dashboard.OwnerEarningsSummaryDTO;
import com.sbms.sbms_monolith.service.OwnerEarningsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owner/earnings")
@RequiredArgsConstructor
public class OwnerEarningsController {

    private final OwnerEarningsService earningsService;

    @GetMapping("/summary")
    @PreAuthorize("hasRole('OWNER')")
    public OwnerEarningsSummaryDTO summary(Authentication auth) {

        Long ownerId = Long.parseLong(auth.getName());
        return earningsService.getSummary(ownerId);
    }

    @GetMapping("/transactions")
    @PreAuthorize("hasRole('OWNER')")
    public List<OwnerEarningTransactionDTO> recentTransactions(Authentication auth) {

        Long ownerId = Long.parseLong(auth.getName());
        return earningsService.recentTransactions(ownerId);
    }
}
