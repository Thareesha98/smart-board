package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.mapper.RegistrationMapper;
import com.sbms.sbms_monolith.dto.registration.*;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.Registration;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.RegistrationStatus;
import com.sbms.sbms_monolith.model.enums.Status;
import com.sbms.sbms_monolith.model.enums.UserRole;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.RegistrationRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public RegistrationResponseDTO register(Long studentId, RegistrationRequestDTO dto) {

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Boarding boarding = boardingRepo.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (boarding.getAvailable_slots() < dto.getNumberOfStudents()) {
            throw new RuntimeException("Not enough slots available");
        }

        if (!dto.isKeyMoneyPaid()) {
            throw new RuntimeException("Key money must be paid to register");
        }

        boolean success = paymentService.processPayment(
                studentId,
                boarding.getKeyMoney()
        );

        if (!success) {
            throw new RuntimeException("Payment failed");
        }

        Registration r = new Registration();
        r.setBoarding(boarding);
        r.setStudent(student);
        r.setNumberOfStudents(dto.getNumberOfStudents());
        r.setStudentNote(dto.getStudentNote());
        r.setStatus(RegistrationStatus.PENDING);
        r.setKeyMoneyPaid(true);

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }


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
            throw new RuntimeException("Cannot cancel approved registration");
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

    public RegistrationResponseDTO decide(Long ownerId, Long regId, RegistrationDecisionDTO dto) {

        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!r.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        r.setStatus(dto.getStatus());
        r.setOwnerNote(dto.getOwnerNote());

        if (dto.getStatus() == RegistrationStatus.APPROVED) {
            Boarding b = r.getBoarding();
            b.setAvailable_slots(b.getAvailable_slots() - r.getNumberOfStudents());
            boardingRepo.save(b);
        }

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }
}
