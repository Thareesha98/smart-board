package com.sbms.sbms_notification_service.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sbms.sbms_notification_service.dto.EventMessageDto;
import com.sbms.sbms_notification_service.model.Notification;
import com.sbms.sbms_notification_service.model.NotificationType;
import com.sbms.sbms_notification_service.service.NotificationService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationEventListener {

    private final NotificationService notificationService;
    private final ObjectMapper mapper = new ObjectMapper();

    public NotificationEventListener(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @RabbitListener(queues = "${rabbitmq.queue:sbms.notification.queue}")
    public void onEvent(@Payload String rawPayload) {
        try {
            EventMessageDto event = mapper.readValue(rawPayload, EventMessageDto.class);
            // decide how to convert event to notification
            String userId = (event.userId() != null)
                    ? event.userId()
                    : (String) event.data().get("email"); // fallback

            String title = buildTitle(event.eventType());
            String message = buildMessage(event.eventType(), event.data());
            NotificationType type = mapType(event.eventType());

            if (userId == null || userId.isBlank()) {
                // optionally skip or resolve user via another service
                return;
            }

            Notification n = Notification.builder()
                    .notificationId(null) // let service create UUID
                    .userId(userId)
                    .title(title)
                    .message(message)
                    .type(type)
                    .meta(mapper.writeValueAsString(event.data()))
                    .build();

            notificationService.create(n);
        } catch (Exception e) {
            // log and handle failures (dead-lettering, etc.)
            e.printStackTrace();
        }
    }

    private String buildTitle(String eventType) {
        return switch (eventType.toLowerCase()) {
            case "appointment.created" -> "Appointment requested";
            case "appointment.accepted" -> "Appointment accepted";
            case "appointment.declined" -> "Appointment declined";
            case "registration.submitted" -> "Registration submitted";
            case "registration.approved" -> "Registration approved";
            case "review.added" -> "New review received";
            case "maintenance.requested" -> "Maintenance request sent";
            default -> "Notification";
        };
    }

    private String buildMessage(String eventType, Map<String, Object> data) {
        // Simple templating; customize as per event payload
        return eventType + " — " + (data != null ? data.toString() : "");
    }

    private NotificationType mapType(String eventType) {
        return switch (eventType.toLowerCase()) {
            case "appointment.declined" -> NotificationType.WARNING;
            case "registration.approved", "appointment.accepted" -> NotificationType.SUCCESS;
            case "maintenance.requested", "review.added" -> NotificationType.INFO;
            default -> NotificationType.INFO;
        };
    }
}
