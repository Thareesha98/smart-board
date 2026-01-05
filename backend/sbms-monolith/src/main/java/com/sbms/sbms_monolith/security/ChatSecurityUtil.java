package com.sbms.sbms_monolith.security;

import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatSecurityUtil {

    private final UserRepository userRepository;

    public User getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Unauthenticated access");
        }

        Object principal = auth.getPrincipal();

        if (!(principal instanceof UserDetails userDetails)) {
            throw new IllegalStateException("Invalid principal type");
        }

        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalStateException("User not found in database"));
    }

    public boolean isStudent(User user) {
        return user.getRole().name().equals("STUDENT");
    }

    public boolean isOwner(User user) {
        return user.getRole().name().equals("OWNER");
    }
}
