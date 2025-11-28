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
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private BoardingRepository boardingRepository;

    @Autowired
    private UserRepository userRepository;

    // ---------------------------------------------------------
    // STUDENT: REGISTER FOR BOARDING (with x students)
    // ---------------------------------------------------------
    public RegistrationResponseDTO register(Long studentId, RegistrationRequestDTO dto) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (student.getRole() != UserRole.STUDENT) {
            throw new RuntimeException("Only students can register for boardings");
        }

        Boarding boarding = boardingRepository.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (boarding.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Boarding not approved yet");
        }

        if (dto.getNumberOfStudents() <= 0) {
            throw new RuntimeException("Group size must be at least 1");
        }

        if (boarding.getAvailable_slots() < dto.getNumberOfStudents()) {
            throw new RuntimeException("Not enough available slots");
        }

        Registration r = new Registration();
        r.setBoarding(boarding);
        r.setStudent(student);
        r.setNumberOfStudents(dto.getNumberOfStudents());
        r.setStudentNote(dto.getStudentNote());
        r.setStatus(RegistrationStatus.PENDING);

        Registration saved = registrationRepository.save(r);

        return RegistrationMapper.toDto(saved);
    }

    // ---------------------------------------------------------
    // STUDENT: VIEW REGISTRATIONS
    // ---------------------------------------------------------
    public List<RegistrationResponseDTO> getStudentRegistrations(Long studentId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return registrationRepository.findByStudent(student).stream()
                .map(RegistrationMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: VIEW ALL REGISTRATIONS (with optional status)
    // ---------------------------------------------------------
    public List<RegistrationResponseDTO> getOwnerRegistrations(Long ownerId, RegistrationStatus status) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        List<Registration> regs;

        if (status != null) {
            regs = registrationRepository.findByBoarding_OwnerAndStatus(owner, status);
        } else {
            regs = registrationRepository.findByBoarding_Owner(owner);
        }

        return regs.stream()
                .map(RegistrationMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: APPROVE / DECLINE REGISTRATION
    // ---------------------------------------------------------
    public RegistrationResponseDTO decide(Long ownerId,
                                          Long registrationId,
                                          RegistrationDecisionDTO dto) {

        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        Boarding boarding = reg.getBoarding();

        if (!boarding.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Not authorized to approve this registration");
        }

        if (dto.getStatus() == RegistrationStatus.APPROVED) {

            if (boarding.getAvailable_slots() < reg.getNumberOfStudents()) {
                throw new RuntimeException("Not enough slots to approve");
            }

            boarding.setAvailable_slots(
                    boarding.getAvailable_slots() - reg.getNumberOfStudents()
            );
            reg.setStatus(RegistrationStatus.APPROVED);
        }
        else if (dto.getStatus() == RegistrationStatus.DECLINED) {
            reg.setStatus(RegistrationStatus.DECLINED);
        }
        else {
            throw new RuntimeException("Invalid status. Only APPROVED or DECLINED allowed");
        }

        reg.setOwnerNote(dto.getOwnerNote());

        registrationRepository.save(reg);
        boardingRepository.save(boarding);

        return RegistrationMapper.toDto(reg);
    }

    // ---------------------------------------------------------
    // STUDENT: CANCEL REGISTRATION
    // ---------------------------------------------------------
    public RegistrationResponseDTO cancel(Long studentId, Long regId) {

        Registration reg = registrationRepository.findById(regId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!reg.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Not your registration");
        }

        reg.setStatus(RegistrationStatus.CANCELLED);
        registrationRepository.save(reg);

        return RegistrationMapper.toDto(reg);
    }
}
