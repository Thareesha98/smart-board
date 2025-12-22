package com.sbms.sbms_monolith.repository;

import com.sbms.sbms_monolith.model.RefreshToken;
import com.sbms.sbms_monolith.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);

    void deleteByUser(User user);
}
