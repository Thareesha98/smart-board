package com.sbms.sbms_notification_service.dto;


import java.time.Instant;
import java.util.Map;

public record EventMessageDto(
    String eventType,
    String sourceService,
    String aggregateId,      // e.g., appointmentId, registrationId
    String userId,           // target user if included
    Map<String, Object> data,
    Instant occurredAt
) {}
