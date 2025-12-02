package com.sbms.sbms_notification_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${security.jwt.jwk-set-uri:}")
    private String jwkSetUri;

    @Value("${security.jwt.shared-secret:}")
    private String sharedSecret; // base64-encoded for symmetric testing

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                .requestMatchers("/api/**").authenticated()
            )
            .oauth2ResourceServer(oauth2 -> {
                if (jwkSetUri != null && !jwkSetUri.isBlank()) {
                    oauth2.jwt(jwt -> jwt.jwkSetUri(jwkSetUri));
                } else {
                    // symmetric key (not recommended for prod) - demonstrates local testing
                    oauth2.jwt(Customizer.withDefaults());
                    // For symmetric, you'd configure JwtDecoder bean separately
                }
            });

        return http.build();
    }
}
