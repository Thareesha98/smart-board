package com.sbms.sbms_backend.service;

import com.sbms.sbms_backend.mapper.AppointmentMapper;
import com.sbms.sbms_backend.dto.appointment.*;
import com.sbms.sbms_backend.model.Appointment;
import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.User;
import com.sbms.sbms_backend.model.enums.AppointmentStatus;
import com.sbms.sbms_backend.model.enums.Status;
import com.sbms.sbms_backend.model.enums.UserRole;
import com.sbms.sbms_backend.repository.AppointmentRepository;
import com.sbms.sbms_backend.repository.BoardingRepository;
import com.sbms.sbms_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BoardingRepository boardingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationPublisher notificationPublisher;

    // ---------------------------------------------------------
    // STUDENT: CREATE APPOINTMENT REQUEST
    // ---------------------------------------------------------
    public AppointmentResponseDTO createAppointment(Long studentId, AppointmentCreateDTO dto) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (student.getRole() != UserRole.STUDENT) {
            throw new RuntimeException("User is not a student");
        }

        Boarding boarding = boardingRepository.findById(dto.getBoardingId())
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (boarding.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Boarding is not approved");
        }

        if (boarding.getAvailable_slots() < dto.getNumberOfStudents()) {
            throw new RuntimeException("Not enough slots");
        }

        Appointment appointment = new Appointment();
        appointment.setStudent(student);
        appointment.setBoarding(boarding);
        appointment.setNumberOfStudents(dto.getNumberOfStudents());
        appointment.setRequestedStartTime(dto.getRequestedStartTime());
        appointment.setRequestedEndTime(dto.getRequestedEndTime());
        appointment.setStudentNote(dto.getStudentNote());
        appointment.setStatus(AppointmentStatus.PENDING);

        Appointment saved = appointmentRepository.save(appointment);

        // 🔔 Notify OWNER: appointment.created
        notificationPublisher.publish(
                "appointment.created",
                boarding.getOwner().getId(),
                String.valueOf(saved.getId()),
                Map.of(
                        "appointmentId", saved.getId(),
                        "studentId", student.getId(),
                        "studentName", student.getFullName(),
                        "boardingId", boarding.getId(),
                        "boardingTitle", boarding.getTitle()
                )
        );

        return AppointmentMapper.toDto(saved);
    }

    // ---------------------------------------------------------
    // STUDENT: VIEW OWN APPOINTMENTS
    // ---------------------------------------------------------
    public List<AppointmentResponseDTO> getAppointmentsForStudent(Long studentId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Appointment> list = appointmentRepository.findByStudent(student);

        return list.stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: VIEW ALL APPOINTMENTS (OPTIONAL FILTER BY STATUS)
    // ---------------------------------------------------------
    public List<AppointmentResponseDTO> getAppointmentsForOwner(Long ownerId, AppointmentStatus status) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        List<Appointment> list;
        if (status != null) {
            list = appointmentRepository.findByBoarding_OwnerAndStatus(owner, status);
        } else {
            list = appointmentRepository.findByBoarding_Owner(owner);
        }

        return list.stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: RESPOND TO APPOINTMENT (ACCEPT or DECLINE)
    // ---------------------------------------------------------
    public AppointmentResponseDTO respondToAppointment(Long ownerId,
                                                       Long appointmentId,
                                                       AppointmentOwnerDecisionDTO dto) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getBoarding().getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        User student = appointment.getStudent();

        if (dto.getStatus() == AppointmentStatus.DECLINED) {

            appointment.setStatus(AppointmentStatus.DECLINED);
            appointment.setOwnerNote(dto.getOwnerNote());

            // 🔔 Notify STUDENT: appointment.declined
            notificationPublisher.publish(
                    "appointment.declined",
                    student.getId(),
                    String.valueOf(appointment.getId()),
                    Map.of(
                            "appointmentId", appointment.getId(),
                            "boardingId", appointment.getBoarding().getId(),
                            "boardingTitle", appointment.getBoarding().getTitle(),
                            "reason", dto.getOwnerNote()
                    )
            );

        } else if (dto.getStatus() == AppointmentStatus.ACCEPTED) {

            appointment.setOwnerStartTime(dto.getOwnerStartTime());
            appointment.setOwnerEndTime(dto.getOwnerEndTime());
            appointment.setOwnerNote(dto.getOwnerNote());
            appointment.setStatus(AppointmentStatus.ACCEPTED);

            // 🔔 Notify STUDENT: appointment.accepted
            notificationPublisher.publish(
                    "appointment.accepted",
                    student.getId(),
                    String.valueOf(appointment.getId()),
                    Map.of(
                            "appointmentId", appointment.getId(),
                            "boardingId", appointment.getBoarding().getId(),
                            "boardingTitle", appointment.getBoarding().getTitle(),
                            "ownerStartTime", dto.getOwnerStartTime(),
                            "ownerEndTime", dto.getOwnerEndTime()
                    )
            );
        }

        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentMapper.toDto(saved);
    }

    // ---------------------------------------------------------
    // STUDENT: CANCEL APPOINTMENT
    // ---------------------------------------------------------
    public AppointmentResponseDTO cancelAppointment(Long studentId, Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        // 🔔 Notify OWNER: appointment.cancelled
        notificationPublisher.publish(
                "appointment.cancelled",
                appointment.getBoarding().getOwner().getId(),
                String.valueOf(appointment.getId()),
                Map.of(
                        "appointmentId", appointment.getId(),
                        "studentId", appointment.getStudent().getId(),
                        "studentName", appointment.getStudent().getFullName(),
                        "boardingId", appointment.getBoarding().getId(),
                        "boardingTitle", appointment.getBoarding().getTitle()
                )
        );

        Appointment saved = appointmentRepository.save(appointment);
        return AppointmentMapper.toDto(saved);
    }
}
