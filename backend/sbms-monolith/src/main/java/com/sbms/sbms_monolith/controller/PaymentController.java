package com.sbms.sbms_monolith.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sbms.sbms_monolith.dto.payment.PaymentHistoryDTO;
import com.sbms.sbms_monolith.dto.payment.PaymentRequestDTO;
import com.sbms.sbms_monolith.dto.payment.PaymentResult;
import com.sbms.sbms_monolith.model.MonthlyBill;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.MonthlyBillStatus;
import com.sbms.sbms_monolith.repository.MonthlyBillRepository;
import com.sbms.sbms_monolith.service.PaymentService;

@RequestMapping("/api/payment")
public class PaymentController {
	
	@Autowired
	public MonthlyBillRepository monthlyBillRepo;
	
	public PaymentService paymentService;

	@PostMapping("/pay-bill")
	@PreAuthorize("hasRole('STUDENT')")
	public ResponseEntity<?> payMonthlyBill(
	        @RequestBody PaymentRequestDTO dto,
	        Authentication authentication
	) {
	    User student = (User) authentication.getPrincipal();

	    if (!student.getId().equals(dto.getUserId())) {
	        throw new RuntimeException("Unauthorized");
	    }

	    MonthlyBill bill = monthlyBillRepo.findById(dto.getMonthlyBillId())
	            .orElseThrow(() -> new RuntimeException("Bill not found"));

	    if (!bill.getStudent().getId().equals(student.getId())) {
	        throw new RuntimeException("Forbidden");
	    }

	    PaymentResult result = paymentService.processPayment(
	            student.getId(),
	            bill.getTotalAmount(),
	            dto.getPaymentMethod()
	    );

	    if (!result.isSuccess()) {
	        throw new RuntimeException("Payment failed");
	    }

	    bill.setStatus(MonthlyBillStatus.PAID);
	    monthlyBillRepo.save(bill);

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/my")
    public ResponseEntity<List<PaymentHistoryDTO>> myPayments(Authentication auth) {

        // Extract logged-in user ID safely
        Long userId = Long.parseLong(auth.getName());

        List<PaymentHistoryDTO> payments =
                paymentService.getPaymentHistory(userId);

        return ResponseEntity.ok(payments);
    }
	
	

}
