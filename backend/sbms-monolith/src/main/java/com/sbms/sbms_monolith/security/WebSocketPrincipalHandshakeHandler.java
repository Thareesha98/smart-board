/*package com.sbms.sbms_monolith.security;

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
*/




package com.sbms.sbms_monolith.security;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

public class WebSocketPrincipalHandshakeHandler extends DefaultHandshakeHandler {

    private final JwtService jwtService;

    public WebSocketPrincipalHandshakeHandler(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected Principal determineUser(
            ServerHttpRequest request,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {

        String token = (String) attributes.get("token");

        if (token == null || token.isBlank()) {
            return null; // ❌ block unauthenticated socket
        }

        String email = jwtService.extractUsername(token);

        if (email == null) {
            return null;
        }

        // ✅ Principal name = email
        return () -> email;
    }
}

