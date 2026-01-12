package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.mapper.RegistrationMapper;
import com.sbms.sbms_monolith.mapper.StudentBoardingDashboardMapper;
import com.sbms.sbms_monolith.dto.dashboard.StudentBoardingDashboardDTO;
import com.sbms.sbms_monolith.dto.payment.PaymentResult;
import com.sbms.sbms_monolith.dto.registration.*;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.Registration;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.PaymentMethod;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.RegistrationRepository;
import com.sbms.sbms_monolith.repository.ReviewRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ Added Transactional

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepo;

    @Autowired
    private BoardingRepository boardingRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ReviewRepository reviewRepo;

    // --- STUDENT REGISTRATION ---
    @Transactional // ✅ Ensures Data Integrity (Rollback if payment fails)
    public RegistrationResponseDTO register(Long studentId, RegistrationRequestDTO dto) {

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Boarding boarding = boardingRepo.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        // ✅ RESTORED: Prevent registering if boarding is already full
        // (Even though we deduct slots later, we shouldn't allow the request if it's already 0)
        if (boarding.getAvailable_slots() < dto.getNumberOfStudents()) {
            throw new RuntimeException("Sorry, this boarding is currently full.");
        }

        if (!dto.isKeyMoneyPaid()) {
            throw new RuntimeException("Key money must be paid to register");
        }

        PaymentMethod method = dto.getPaymentMethod() != null ?
                PaymentMethod.valueOf(dto.getPaymentMethod().toUpperCase()) : PaymentMethod.CARD;

        // Use defensive coding for null prices (Safe for production)
        BigDecimal amountToPay = boarding.getKeyMoney() != null ? boarding.getKeyMoney() : BigDecimal.ZERO;

        // 1. Process Payment
        PaymentResult result = paymentService.processPayment(
                studentId,
                amountToPay,
                method
        );

        if (!result.isSuccess()) {
            throw new RuntimeException("Key money payment failed: " + result.getMessage());
        }

        // 2. Save Registration
        Registration r = new Registration();
        r.setBoarding(boarding);
        r.setStudent(student);
        r.setNumberOfStudents(dto.getNumberOfStudents());
        r.setStudentNote(dto.getStudentNote());

        // Status starts as PENDING until Owner approves
        r.setStatus(RegistrationStatus.PENDING);

        r.setKeyMoneyPaid(true);
        r.setPaymentTransactionRef(result.getTransactionId());

        r.setMoveInDate(dto.getMoveInDate());
        r.setContractDuration(dto.getContractDuration());
        r.setEmergencyContactName(dto.getEmergencyContact());
        r.setEmergencyContactPhone(dto.getEmergencyPhone());
        r.setSpecialRequirements(dto.getSpecialRequirements());

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }

    // --- OWNER DECISION ---
    @Transactional // ✅ Ensures slots update and status update happen together
    public RegistrationResponseDTO decide(Long ownerId, Long regId, RegistrationDecisionDTO dto) {

        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        // Security Check
        if (!r.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized: You are not the owner of this boarding");
        }

        // Set New Status (APPROVED / REJECTED)
        r.setStatus(dto.getStatus());
        r.setOwnerNote(dto.getOwnerNote());

        // ✅ LOGIC: Deduct Slots ONLY when Approved
        if (dto.getStatus() == RegistrationStatus.APPROVED) {
            Boarding b = r.getBoarding();

            // Double check slots before final approval
            if (b.getAvailable_slots() < r.getNumberOfStudents()) {
                throw new RuntimeException("Cannot approve: Boarding has become full since the request was made.");
            }

            b.setAvailable_slots(b.getAvailable_slots() - r.getNumberOfStudents());
            boardingRepo.save(b);
        }

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }

    // --- OTHER METHODS ---

    public List<RegistrationResponseDTO> getStudentRegistrations(Long studentId) {
        return registrationRepo.findByStudentId(studentId)
                .stream().map(RegistrationMapper::toDTO)
                .toList();
    }

    public RegistrationResponseDTO cancel(Long studentId, Long regId) {
        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!r.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }
        if (r.getStatus() == RegistrationStatus.APPROVED) {
            throw new RuntimeException("Cannot cancel a registration that has already been approved.");
        }
        r.setStatus(RegistrationStatus.CANCELLED);
        registrationRepo.save(r);
        return RegistrationMapper.toDTO(r);
    }

    public List<RegistrationResponseDTO> getOwnerRegistrations(Long ownerId, RegistrationStatus status) {
        return registrationRepo.findByBoardingOwnerId(ownerId, status)
                .stream()
                .map(RegistrationMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public StudentBoardingDashboardDTO getDashboard(Long regId, Long loggedStudentId) {
        Registration reg = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!reg.getStudent().getId().equals(loggedStudentId)) {
            throw new RuntimeException("Forbidden");
        }

        BigDecimal currentMonthDue = reg.getBoarding().getPricePerMonth();
        String paymentStatus = "PENDING";
        LocalDate lastPaymentDate = null;
        int openIssues = 0;
        int resolvedIssues = 0;
        LocalDate lastIssueDate = null;

        Double avg = reviewRepo.getAverageRatingForBoarding(reg.getBoarding().getId());
        Double avgRating = (avg != null) ? Math.round(avg * 10.0) / 10.0 : 0.0; // Round to 1 decimal

        int reviewCount = reviewRepo.countByBoardingId(reg.getBoarding().getId());

        boolean reviewSubmitted = reviewRepo.existsByStudentIdAndBoardingId(loggedStudentId, reg.getBoarding().getId());

        StudentBoardingDashboardDTO dto = StudentBoardingDashboardMapper.toDTO(
                reg, currentMonthDue, paymentStatus, lastPaymentDate,
                openIssues, resolvedIssues, lastIssueDate, avgRating, reviewSubmitted
        );

        List<Registration> activeRegistrations = registrationRepo.findByBoarding_IdAndStatus(
                reg.getBoarding().getId(), RegistrationStatus.APPROVED
        );

        List<StudentBoardingDashboardDTO.MemberDTO> members = activeRegistrations.stream()
                .map(r -> {
                    StudentBoardingDashboardDTO.MemberDTO m = new StudentBoardingDashboardDTO.MemberDTO();
                    m.setId(r.getStudent().getId());
                    m.setName(r.getStudent().getFullName());
                    m.setPhone(r.getStudent().getPhone());
                    m.setJoinedDate(r.getCreatedAt().toLocalDate().toString());
                    m.setAvatar(r.getStudent().getProfileImageUrl());
                    return m;
                }).collect(Collectors.toList());

        dto.setMembers(members);

        if (reg.getBoarding().getCreatedAt() != null) {
            dto.setBoardingCreatedDate(reg.getBoarding().getCreatedAt().toLocalDate().toString());
        } else {
            dto.setBoardingCreatedDate(LocalDate.now().toString()); // Fallback
        }

        if (reg.getBoarding().getOwner() != null) {
            dto.setOwnerId(reg.getBoarding().getOwner().getId());
            dto.setOwnerName(reg.getBoarding().getOwner().getFullName());
            // ✅ Fix: Set Owner Profile Image
            dto.setOwnerProfileImage(reg.getBoarding().getOwner().getProfileImageUrl());
        }

        dto.setAverageRating(avgRating);
        dto.setReviewCount(reviewCount);

        return dto;
    }
}