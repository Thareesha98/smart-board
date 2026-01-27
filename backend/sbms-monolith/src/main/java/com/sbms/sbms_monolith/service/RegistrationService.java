
package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.agreement.AgreementPdfResult;
import com.sbms.sbms_monolith.dto.dashboard.StudentBoardingDashboardDTO;
import com.sbms.sbms_monolith.dto.registration.*;
import com.sbms.sbms_monolith.mapper.RegistrationMapper;
import com.sbms.sbms_monolith.mapper.StudentBoardingDashboardMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.PaymentIntent;
import com.sbms.sbms_monolith.model.Registration;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.PaymentIntentStatus;
import com.sbms.sbms_monolith.model.enums.PaymentType;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.PaymentIntentRepository;
import com.sbms.sbms_monolith.repository.RegistrationRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RegistrationService {

    @Autowired private RegistrationRepository registrationRepo;
    @Autowired private BoardingRepository boardingRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private PaymentIntentRepository paymentIntentRepo;
    @Autowired private AgreementPdfService agreementPdfService;
    @Autowired private AgreementBlockchainService agreementBlockchainService;

    // ================= STUDENT REGISTER =================

    @Transactional
    public RegistrationResponseDTO register(Long studentId, RegistrationRequestDTO dto) {

        Boarding boarding = boardingRepo.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        PaymentIntent intent = paymentIntentRepo
                .findTopByStudentIdAndBoardingIdAndTypeOrderByCreatedAtDesc(
                        studentId,
                        boarding.getId(),
                        PaymentType.KEY_MONEY
                )
                .orElseThrow(() -> new RuntimeException("Key money payment required"));

        boolean keyMoneyPaid =
                intent.getStatus() == PaymentIntentStatus.SUCCESS
             || intent.getStatus() == PaymentIntentStatus.AWAITING_MANUAL_APPROVAL;

        if (!keyMoneyPaid) {
            throw new RuntimeException("Key money not paid");
        }

        Registration r = new Registration();
        r.setBoarding(boarding);
        r.setStudent(student);
        r.setNumberOfStudents(dto.getNumberOfStudents());
        r.setStudentNote(dto.getStudentNote());
        r.setMoveInDate(dto.getMoveInDate());
        r.setContractDuration(dto.getContractDuration());
        r.setEmergencyContactName(dto.getEmergencyContact());
        r.setSpecialRequirements(dto.getSpecialRequirements());
        r.setStudentSignatureBase64(dto.getStudentSignatureBase64());

        r.setKeyMoneyPaid(true);
     // payment method
        r.setPaymentMethod(intent.getMethod().name());
        r.setPaymentTransactionRef(intent.getReferenceId());


        // transaction / slip reference
        r.setPaymentTransactionRef(intent.getReferenceId());
 // CARD / BANK_SLIP / CASH
        r.setPaymentTransactionRef(intent.getReferenceId());
        r.setStatus(RegistrationStatus.PENDING);

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }


    // ================= STUDENT VIEWS =================

    public List<RegistrationResponseDTO> getStudentRegistrations(Long studentId) {
        return registrationRepo.findByStudentId(studentId)
                .stream()
                .map(RegistrationMapper::toDTO)
                .toList();
    }

    public RegistrationResponseDTO cancel(Long studentId, Long regId) {

        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!r.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (r.getStatus() == RegistrationStatus.APPROVED) {
            throw new RuntimeException("Cannot cancel approved registration");
        }

        r.setStatus(RegistrationStatus.CANCELLED);
        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }

    // ================= OWNER VIEWS =================

    public List<RegistrationResponseDTO> getOwnerRegistrations(Long ownerId, RegistrationStatus status) {
        return registrationRepo.findByBoardingOwnerId(ownerId, status)
                .stream()
                .map(RegistrationMapper::toDTO)
                .toList();
    }

    // ================= OWNER DECISION =================

    @Transactional
    public RegistrationResponseDTO decide(Long ownerId, Long regId, RegistrationDecisionDTO dto) {

        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!r.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        //  Fetch payment intent again (source of truth)
        PaymentIntent intent = paymentIntentRepo
                .findTopByStudentIdAndBoardingIdAndTypeOrderByCreatedAtDesc(
                        r.getStudent().getId(),
                        r.getBoarding().getId(),
                        PaymentType.KEY_MONEY
                )
                .orElseThrow(() -> new RuntimeException("Key money payment missing"));

        // PAYMENT GATE (NEW)
        if (dto.getStatus() == RegistrationStatus.APPROVED) {

            if (intent.getStatus() == PaymentIntentStatus.AWAITING_MANUAL_APPROVAL
                    && !dto.isApproveWithPendingPayment()) {

                throw new RuntimeException(
                    "Payment is not verified. Owner must confirm override."
                );
            }

            if (intent.getStatus() != PaymentIntentStatus.SUCCESS
                    && intent.getStatus() != PaymentIntentStatus.AWAITING_MANUAL_APPROVAL) {

                throw new RuntimeException("Registration cannot be approved without payment");
            }
        }

        // ================= APPLY DECISION =================

        r.setStatus(dto.getStatus());
        r.setOwnerNote(dto.getOwnerNote());

        if (dto.getStatus() == RegistrationStatus.APPROVED) {

            if (dto.getOwnerSignatureBase64() == null) {
                throw new RuntimeException("Owner signature required");
            }

            r.setOwnerSignatureBase64(dto.getOwnerSignatureBase64());

            //  AGREEMENT
            AgreementPdfResult result =
                    agreementPdfService.generateAndUploadAgreement(r);

            r.setAgreementPdfPath(result.getPdfUrl());
            r.setAgreementHash(result.getPdfHash());

            // 🔗 BLOCKCHAIN
            agreementBlockchainService.addAgreementBlock(
                    r.getId(),
                    result.getPdfHash()
            );

            //  UPDATE SLOTS
            Boarding b = r.getBoarding();
            b.setAvailable_slots(b.getAvailable_slots() - r.getNumberOfStudents());
            boardingRepo.save(b);
        }

        registrationRepo.save(r);
        return RegistrationMapper.toDTO(r);
    }

    // ================= DASHBOARD =================

    public StudentBoardingDashboardDTO getDashboard(Long regId, Long loggedStudentId) {

    	Registration reg = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!reg.getStudent().getId().equals(loggedStudentId)) {
            throw new RuntimeException("Forbidden");
        }

        BigDecimal currentMonthDue = reg.getBoarding().getPricePerMonth();

        return StudentBoardingDashboardMapper.toDTO(
                reg,
                currentMonthDue,
                "PENDING",
                null,
                0,
                0,
                null,
                0.0,
                false
        );
    }
}
