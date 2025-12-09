package com.sbms.sbms_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sbms.sbms_backend.events.EventMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class NotificationPublisher {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    @Value("${sbms.rabbitmq.exchange:sbms.events}")
    private String exchangeName;

    public NotificationPublisher(RabbitTemplate rabbitTemplate, ObjectMapper objectMapper) {
        this.rabbitTemplate = rabbitTemplate;
        this.objectMapper = objectMapper;
    }

    public void publish(String eventType,
                        Long targetUserId,
                        String aggregateId,
                        Map<String, Object> data) {

        try {
            EventMessage event = EventMessage.builder()
                    .eventType(eventType)
                    .sourceService("sbms-backend")
                    .aggregateId(aggregateId)
                    .userId(targetUserId != null ? String.valueOf(targetUserId) : null)
                    .data(data)
                    .occurredAt(Instant.now())
                    .build();

            // Convert manually to JSON
            String json = objectMapper.writeValueAsString(event);

            // Send JSON string
            rabbitTemplate.convertAndSend(exchangeName, eventType, json);

        } catch (Exception e) {
            throw new RuntimeException("Failed to publish event", e);
        }
    }
}
