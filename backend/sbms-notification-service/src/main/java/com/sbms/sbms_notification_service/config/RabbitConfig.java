package com.sbms.sbms_notification_service.config;


import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Value("${rabbitmq.exchange:sbms.events}")
    private String exchangeName;

    @Value("${rabbitmq.queue:sbms.notification.queue}")
    private String queueName;

    @Value("${rabbitmq.routing-key:notification.#}")
    private String routingKey;

    @Bean
    public TopicExchange eventsExchange() {
        return new TopicExchange(exchangeName, true, false);
    }

    @Bean
    public Queue notificationQueue() {
        return QueueBuilder.durable(queueName).build();
    }

    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(notificationQueue).to(eventsExchange).with(routingKey);
    }

}
