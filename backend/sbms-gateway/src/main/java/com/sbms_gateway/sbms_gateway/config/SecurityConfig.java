package com.sbms_gateway.sbms_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        http.csrf(ServerHttpSecurity.CsrfSpec::disable);

        http.authorizeExchange(ex -> ex
                .pathMatchers("/api/auth/**").permitAll()
                .pathMatchers("/actuator/**").permitAll()
                .anyExchange().authenticated()
        );

        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
