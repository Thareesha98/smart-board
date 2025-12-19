package com.sbms.appointment_service.service;

import com.sbms.appointment_service.client.BoardingClient;
import com.sbms.appointment_service.domain.Appointment;
import com.sbms.appointment_service.domain.AppointmentStatus;
import com.sbms.appointment_service.dto.AppointmentCreateDTO;
import com.sbms.appointment_service.dto.AppointmentOwnerDecisionDTO;
import com.sbms.appointment_service.dto.AppointmentResponseDTO;
import com.sbms.appointment_service.dto.BoardingOwnerInfo;
import com.sbms.appointment_service.event.AppointmentEventPublisher;
import com.sbms.appointment_service.mapper.AppointmentMapper;
import com.sbms.appointment_service.repository.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentEventPublisher eventPublisher;
    private final BoardingClient boardingClient;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              AppointmentEventPublisher eventPublisher,
                              BoardingClient boardingClient) {
        this.appointmentRepository = appointmentRepository;
        this.eventPublisher = eventPublisher;
        this.boardingClient = boardingClient;
        
    }

    // ---------------------------------------------------------
    // STUDENT: CREATE APPOINTMENT
    // ---------------------------------------------------------
    public AppointmentResponseDTO createAppointment(
            Long studentId,
            AppointmentCreateDTO dto
    ) {
        // 🔥 Resolve ownerId internally (same as monolith)
        BoardingOwnerInfo ownerInfo =
                boardingClient.getBoardingOwner(dto.getBoardingId());

        Appointment appointment = new Appointment();
        appointment.setStudentId(studentId);
        appointment.setOwnerId(ownerInfo.ownerId());
        appointment.setBoardingId(dto.getBoardingId());
        appointment.setNumberOfStudents(dto.getNumberOfStudents());
        appointment.setRequestedStartTime(dto.getRequestedStartTime());
        appointment.setRequestedEndTime(dto.getRequestedEndTime());
        appointment.setStudentNote(dto.getStudentNote());
        appointment.setStatus(AppointmentStatus.PENDING);

        Appointment saved = appointmentRepository.save(appointment);

        // 🔔 Notify OWNER
        eventPublisher.publish(
                "appointment.created",
                ownerInfo.ownerId(),
                saved.getId(),
                Map.of(
                        "appointmentId", saved.getId(),
                        "studentId", studentId,
                        "boardingId", dto.getBoardingId(),
                        "boardingTitle", ownerInfo.boardingTitle()
                )
        );

        return AppointmentMapper.toDto(saved);
    }

    
    

    // ---------------------------------------------------------
    // STUDENT: VIEW OWN APPOINTMENTS
    // ---------------------------------------------------------
    public List<AppointmentResponseDTO> getAppointmentsForStudent(Long studentId) {
        return appointmentRepository.findByStudentId(studentId)
                .stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: VIEW APPOINTMENTS (OPTIONAL STATUS)
    // ---------------------------------------------------------
    public List<AppointmentResponseDTO> getAppointmentsForOwner(
            Long ownerId,
            AppointmentStatus status
    ) {
        List<Appointment> list = (status == null)
                ? appointmentRepository.findByOwnerId(ownerId)
                : appointmentRepository.findByOwnerIdAndStatus(ownerId, status);

        return list.stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------
    // OWNER: ACCEPT / DECLINE APPOINTMENT
    // ---------------------------------------------------------
    public AppointmentResponseDTO respondToAppointment(
            Long ownerId,
            Long appointmentId,
            AppointmentOwnerDecisionDTO dto
    ) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Ownership validation
        if (!appointment.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized");
        }

        // State validation
        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("Appointment is not in PENDING state");
        }

        if (dto.getStatus() == AppointmentStatus.DECLINED) {

            appointment.setStatus(AppointmentStatus.DECLINED);
            appointment.setOwnerNote(dto.getOwnerNote());

            // 🔔 Notify STUDENT
            eventPublisher.publish(
                    "appointment.declined",
                    appointment.getStudentId(),
                    appointment.getId(),
                    Map.of(
                            "appointmentId", appointment.getId(),
                            "boardingId", appointment.getBoardingId(),
                            "reason", dto.getOwnerNote()
                    )
            );

        } else if (dto.getStatus() == AppointmentStatus.ACCEPTED) {

            // Time slot validation
            if (dto.getOwnerStartTime() == null || dto.getOwnerEndTime() == null) {
                throw new RuntimeException("Owner time slot is required when accepting");
            }

            appointment.setOwnerStartTime(dto.getOwnerStartTime());
            appointment.setOwnerEndTime(dto.getOwnerEndTime());
            appointment.setOwnerNote(dto.getOwnerNote());
            appointment.setStatus(AppointmentStatus.ACCEPTED);

            // 🔔 Notify STUDENT
            eventPublisher.publish(
                    "appointment.accepted",
                    appointment.getStudentId(),
                    appointment.getId(),
                    Map.of(
                            "appointmentId", appointment.getId(),
                            "boardingId", appointment.getBoardingId(),
                            "ownerStartTime", dto.getOwnerStartTime(),
                            "ownerEndTime", dto.getOwnerEndTime()
                    )
            );
        }

        return AppointmentMapper.toDto(appointmentRepository.save(appointment));
    }

    // ---------------------------------------------------------
    // STUDENT: CANCEL APPOINTMENT
    // ---------------------------------------------------------
    public AppointmentResponseDTO cancelAppointment(
            Long studentId,
            Long appointmentId
    ) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Ownership validation
        if (!appointment.getStudentId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }

        // State validation
        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException("Only PENDING appointments can be cancelled");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        // 🔔 Notify OWNER
        eventPublisher.publish(
                "appointment.cancelled",
                appointment.getOwnerId(),
                appointment.getId(),
                Map.of(
                        "appointmentId", appointment.getId(),
                        "studentId", appointment.getStudentId(),
                        "boardingId", appointment.getBoardingId()
                )
        );

        return AppointmentMapper.toDto(appointmentRepository.save(appointment));
    }
}
