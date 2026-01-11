package com.sbms.sbms_monolith.security;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

public class WebSocketPrincipalHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(
            ServerHttpRequest request,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {

        Object auth = attributes.get("user");

        if (auth instanceof UsernamePasswordAuthenticationToken authentication) {
            return authentication;
        }

        // Fallback (should not happen)
        return () -> UUID.randomUUID().toString();
    }
}
