package com.sbms.sbms_monolith.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // -----------------------------------------------------------
                        // -----------------------------------------------------------
                        .requestMatchers("/api/boardings/owner/**").hasRole("OWNER")
                        .requestMatchers("/api/owner/**").hasRole("OWNER")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // -----------------------------------------------------------
                        //  PUBLIC RULES (AFTER SPECIFIC RULES)
                        // -----------------------------------------------------------
                        // 1. Allow Login/Register
                        .requestMatchers("/api/auth/**").permitAll()

                        // 2. Allow Students to VIEW boardings (GET Only)
                        // We use HttpMethod.GET to ensure they can't POST/DELETE
                        .requestMatchers(HttpMethod.GET, "/api/boardings/**").permitAll()

                        // 3. Other Public endpoints
                        .requestMatchers(
                                "/api/users/public/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // -----------------------------------------------------------
                        // 🔒 RESTRICTED AREAS
                        // -----------------------------------------------------------
                        .requestMatchers("/api/reports/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/reports/**").hasAnyRole("STUDENT", "OWNER")
                        .requestMatchers("/api/student/**").hasRole("STUDENT")
                        .requestMatchers("/api/registrations/**").authenticated()
                        .requestMatchers("/api/payment/**").authenticated()

                        .requestMatchers("/api/technician-workflow/search").hasRole("OWNER")
                        .requestMatchers("/api/technician-workflow/*/assign/*").hasRole("OWNER")
                        .requestMatchers("/api/technician-workflow/*/review").hasRole("OWNER")
                        .requestMatchers("/api/payments/intent/technician").hasRole("OWNER")

                        .requestMatchers("/api/technician-workflow/my-jobs").hasRole("TECHNICIAN")
                        .requestMatchers("/api/technician-workflow/*/decision").hasRole("TECHNICIAN")
                        .requestMatchers("/api/technician-workflow/*/complete").hasRole("TECHNICIAN")
                        .requestMatchers("/api/technician-workflow/profile").hasRole("TECHNICIAN")

                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        // 🔥 NEW constructor (Spring Security 6.3)
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(customUserDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

  
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
        		"https://smartboard.thareesha.software",
                "http://13.233.34.226:8086",
                "http://localhost:5173"
        		));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
