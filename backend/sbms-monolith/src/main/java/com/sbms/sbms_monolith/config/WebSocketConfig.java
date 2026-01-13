package com.sbms.sbms_monolith.config;

import com.sbms.sbms_monolith.security.WebSocketJwtAuthInterceptor;
import com.sbms.sbms_monolith.security.WebSocketPrincipalHandshakeHandler;
import com.sbms.sbms_monolith.security.WebSocketHandshakeInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.*;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebSocketJwtAuthInterceptor jwtAuthInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry
            .addEndpoint("/ws")
            .setHandshakeHandler(new WebSocketPrincipalHandshakeHandler())
            .addInterceptors(new WebSocketHandshakeInterceptor())
            .setAllowedOriginPatterns("*")
            .withSockJS(); 
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }

    /**
     * 🔥 THIS WAS MISSING
     * Without this, CONNECT succeeds but MESSAGE/SUBSCRIBE fails silently
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(jwtAuthInterceptor);
    }
}
