
package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.auth.*;
import com.sbms.sbms_monolith.dto.user.UserLoginDTO;
import com.sbms.sbms_monolith.dto.user.UserRegisterDTO;
import com.sbms.sbms_monolith.dto.user.UserResponseDTO;
import com.sbms.sbms_monolith.model.RefreshToken;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.security.JwtService;
import com.sbms.sbms_monolith.service.RefreshTokenService;
import com.sbms.sbms_monolith.service.UserService;

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
    private RefreshTokenService refreshTokenService;

    // ---------------------------------------------------------
    // LOGIN
    // ---------------------------------------------------------

    @PostMapping("/login")
    public JwtAuthResponse login(@RequestBody UserLoginDTO dto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        User user = userService.getUserEntityByEmail(dto.getEmail());

        return generateAuthResponse(user);
    }

    // ---------------------------------------------------------
    // REFRESH TOKEN
    // ---------------------------------------------------------

    @PostMapping("/refresh")
    public JwtAuthResponse refresh(@RequestBody RefreshTokenRequest request) {

        RefreshToken refreshToken =
                refreshTokenService.findByToken(request.getRefreshToken());

        refreshTokenService.verifyExpiration(refreshToken);

        User user = refreshToken.getUser();

        String jwt = generateJwt(user);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken.getToken());
        response.setUser(userService.getUser(user.getId()));

        return response;
    }

    // ---------------------------------------------------------
    // REGISTRATION WITH OTP
    // ---------------------------------------------------------

    @PostMapping("/register/request")
    public String registerRequest(@RequestBody UserRegisterDTO dto) {
        return userService.registerRequest(dto);
    }

    @PostMapping("/register/verify")
    public JwtAuthResponse verifyOtp(@RequestBody OtpVerifyRequest req) {

        UserResponseDTO userDto =
                userService.verifyRegistration(req.getEmail(), req.getOtp());

        User user = userService.getUserEntityByEmail(req.getEmail());

        return generateAuthResponse(user);
    }

    // ---------------------------------------------------------
    // FORGOT PASSWORD
    // ---------------------------------------------------------

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ResetPasswordRequest req) {
        return userService.forgotPassword(req.getEmail());
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest req) {
        return userService.resetPassword(
                req.getEmail(),
                req.getOtp(),
                req.getNewPassword()
        );
    }

    // ---------------------------------------------------------
    // JWT HELPERS
    // ---------------------------------------------------------

    private JwtAuthResponse generateAuthResponse(User user) {

        String jwt = generateJwt(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setRefreshToken(refreshToken.getToken());
        response.setUser(userService.getUser(user.getId()));

        return response;
    }

    private String generateJwt(User user) {

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities("ROLE_" + user.getRole().name())
                        .build();

        return jwtService.generateToken(userDetails);
    }
}


























//@PostMapping("/register")
//public JwtAuthResponse register(@RequestBody UserRegisterDTO dto) {
//
//  UserResponseDTO userDto = userService.register(dto);
//
//  User user = userRepository.findByEmail(userDto.getEmail())
//          .orElseThrow(() -> new RuntimeException("User not found after registration"));
//
//  UserDetails userDetails = org.springframework.security.core.userdetails.User
//          .withUsername(user.getEmail())
//          .password(user.getPassword())
//          .authorities("ROLE_" + user.getRole().name())
//          .build();
//
//  String jwt = jwtService.generateToken(userDetails);
//  RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
//
//  JwtAuthResponse response = new JwtAuthResponse();
//  response.setToken(jwt);
//  response.setRefreshToken(refreshToken.getToken());
//  response.setUser(userDto);
//
//  return response;
//}

