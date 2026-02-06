package com.sbms.sbms_monolith.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Check if Header is present
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // System.out.println("⚠️ JWT Filter: No Token found in request to " + request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 2. Load User from DB
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // 3. Validate Token
                if (jwtService.isTokenValid(jwt, userDetails)) {

                    // 🔍 DEBUG LOG: Print the roles the backend SEES
//                    System.out.println("✅ JWT Filter: Authenticated User -> " + username);
//                    System.out.println("🛡️ Roles Loaded from DB -> " + userDetails.getAuthorities());

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    System.out.println("❌ JWT Filter: Token Invalid for user " + username);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ JWT Filter Error: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}