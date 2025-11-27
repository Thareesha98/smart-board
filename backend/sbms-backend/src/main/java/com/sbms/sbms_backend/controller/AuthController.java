package com.sbms.sbms_backend.controller;

import com.sbms.sbms_backend.dto.auth.JwtAuthResponse;
import com.sbms.sbms_backend.dto.auth.RefreshTokenRequest;
import com.sbms.sbms_backend.dto.user.UserLoginDTO;
import com.sbms.sbms_backend.dto.user.UserRegisterDTO;
import com.sbms.sbms_backend.dto.user.UserResponseDTO;
import com.sbms.sbms_backend.model.RefreshToken;
import com.sbms.sbms_backend.model.User;
import com.sbms.sbms_backend.repository.UserRepository;
import com.sbms.sbms_backend.security.JwtService;
import com.sbms.sbms_backend.service.RefreshTokenService;
import com.sbms.sbms_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenService refreshTokenService;


    // ---------------------------------------------------------
    // REGISTER + return accessToken + refreshToken
    // ---------------------------------------------------------
    @PostMapping("/register")
    public JwtAuthResponse register(@RequestBody UserRegisterDTO dto) {

        UserResponseDTO userDto = userService.register(dto);

        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after registration"));

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .build();

        String jwt = jwtService.generateToken(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken.getToken());
        response.setUser(userDto);

        return response;
    }


    // ---------------------------------------------------------
    // LOGIN + return accessToken + refreshToken
    // ---------------------------------------------------------
    @PostMapping("/login")
    public JwtAuthResponse login(@RequestBody UserLoginDTO dto) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        authenticationManager.authenticate(authToken);

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .build();

        String jwt = jwtService.generateToken(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        UserResponseDTO userDto = userService.getUser(user.getId());

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken.getToken());
        response.setUser(userDto);

        return response;
    }


    // ---------------------------------------------------------
    // REFRESH ACCESS TOKEN
    // POST /api/auth/refresh
    // body: { "refreshToken": "..." }
    // ---------------------------------------------------------
    @PostMapping("/refresh")
    public JwtAuthResponse refresh(@RequestBody RefreshTokenRequest request) {

        String requestToken = request.getRefreshToken();

        RefreshToken refreshToken = refreshTokenService.findByToken(requestToken);
        refreshTokenService.verifyExpiration(refreshToken);

        User user = refreshToken.getUser();

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .build();

        String newJwt = jwtService.generateToken(userDetails);

        UserResponseDTO userDto = userService.getUser(user.getId());

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(newJwt);
        response.setRefreshToken(requestToken); // reuse same refresh token
        response.setUser(userDto);

        return response;
    }
}
