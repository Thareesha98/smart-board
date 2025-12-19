package com.sbms.sbms_backend.service;

import com.sbms.sbms_backend.mapper.RegistrationMapper;
import com.sbms.sbms_backend.dto.registration.*;
import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.Registration;
import com.sbms.sbms_backend.model.User;
import com.sbms.sbms_backend.model.enums.RegistrationStatus;
import com.sbms.sbms_backend.model.enums.Status;
import com.sbms.sbms_backend.model.enums.UserRole;
import com.sbms.sbms_backend.repository.BoardingRepository;
import com.sbms.sbms_backend.repository.RegistrationRepository;
import com.sbms.sbms_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
    private NotificationPublisher notificationPublisher;

    // ---------------------------------------------------------
    // STUDENT REGISTRATION
    // ---------------------------------------------------------
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

        // 🔔 Notify OWNER: registration.submitted
        notificationPublisher.publish(
                "registration.submitted",
                boarding.getOwner().getId(),
                String.valueOf(r.getId()),
                Map.of(
                        "registrationId", r.getId(),
                        "studentId", student.getId(),
                        "studentName", student.getFullName(),
                        "boardingId", boarding.getId(),
                        "boardingTitle", boarding.getTitle()
                )
        );

        return RegistrationMapper.toDTO(r);
    }

    // ---------------------------------------------------------
    // STUDENT: GET ALL MY REGISTRATIONS
    // ---------------------------------------------------------
    public List<RegistrationResponseDTO> getStudentRegistrations(Long studentId) {
        return registrationRepo.findByStudentId(studentId)
                .stream()
                .map(RegistrationMapper::toDTO)
                .toList();
    }

    // ---------------------------------------------------------
    // STUDENT: CANCEL
    // ---------------------------------------------------------
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

        // 🔔 Notify OWNER: registration.cancelled
        notificationPublisher.publish(
                "registration.cancelled",
                r.getBoarding().getOwner().getId(),
                String.valueOf(r.getId()),
                Map.of(
                        "registrationId", r.getId(),
                        "studentId", r.getStudent().getId(),
                        "studentName", r.getStudent().getFullName(),
                        "boardingId", r.getBoarding().getId(),
                        "boardingTitle", r.getBoarding().getTitle()
                )
        );

        return RegistrationMapper.toDTO(r);
    }

    // ---------------------------------------------------------
    // OWNER: VIEW REGISTRATIONS
    // ---------------------------------------------------------
    public List<RegistrationResponseDTO> getOwnerRegistrations(Long ownerId, RegistrationStatus status) {
        return registrationRepo.findByBoardingOwnerId(ownerId, status)
                .stream()
                .map(RegistrationMapper::toDTO)
                .toList();
    }

    // ---------------------------------------------------------
    // OWNER: APPROVE / DECLINE
    // ---------------------------------------------------------
    public RegistrationResponseDTO decide(Long ownerId, Long regId, RegistrationDecisionDTO dto) {

        Registration r = registrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!r.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        Boarding boarding = r.getBoarding();
        User student = r.getStudent();

        r.setStatus(dto.getStatus());
        r.setOwnerNote(dto.getOwnerNote());

        if (dto.getStatus() == RegistrationStatus.APPROVED) {
            boarding.setAvailable_slots(boarding.getAvailable_slots() - r.getNumberOfStudents());
            boardingRepo.save(boarding);

            // 🔔 Notify STUDENT: registration.approved
            notificationPublisher.publish(
                    "registration.approved",
                    student.getId(),
                    String.valueOf(r.getId()),
                    Map.of(
                            "registrationId", r.getId(),
                            "studentId", student.getId(),
                            "studentName", student.getFullName(),
                            "boardingId", boarding.getId(),
                            "boardingTitle", boarding.getTitle()
                    )
            );

        } else if (dto.getStatus() == RegistrationStatus.DECLINED) {

            // 🔔 Notify STUDENT: registration.declined
            notificationPublisher.publish(
                    "registration.declined",
                    student.getId(),
                    String.valueOf(r.getId()),
                    Map.of(
                            "registrationId", r.getId(),
                            "studentId", student.getId(),
                            "studentName", student.getFullName(),
                            "boardingId", boarding.getId(),
                            "boardingTitle", boarding.getTitle(),
                            "reason", dto.getOwnerNote()
                    )
            );
        }

        registrationRepo.save(r);

        return RegistrationMapper.toDTO(r);
    }
}
