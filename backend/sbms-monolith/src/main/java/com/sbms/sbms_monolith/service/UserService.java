package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.user.*;
import com.sbms.sbms_monolith.mapper.UserMapper;
import com.sbms.sbms_monolith.model.Otp;
import com.sbms.sbms_monolith.model.PendingUser;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.OtpPurpose;
import com.sbms.sbms_monolith.model.enums.UserRole;
import com.sbms.sbms_monolith.repository.PendingUserRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PendingUserRepository pendingRepo;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    // ---------------------------------------------------------
    // BASIC USER OPERATIONS
    // ---------------------------------------------------------

    public UserResponseDTO register(UserRegisterDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User saved = userRepository.save(user);
        return UserMapper.toUserResponse(saved);
    }
    
    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public UserResponseDTO login(UserLoginDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return UserMapper.toUserResponse(user);
    }

    public UserResponseDTO getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserMapper.toUserResponse(user);
    }

    public UserResponseDTO updateUser(Long id, UserRegisterDTO dto) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(dto.getFullName());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setGender(dto.getGender());
        user.setStudentUniversity(dto.getStudentUniversity());
        user.setAccNo(dto.getAccNo());
        user.setNicNumber(dto.getNicNumber());

        if(dto.getProfileImageUrl() != null) {
            user.setProfileImageUrl(dto.getProfileImageUrl());
        }

        User saved = userRepository.save(user);
        return UserMapper.toUserResponse(saved);
    }

    // ---------------------------------------------------------
    // OWNER / ADMIN
    // ---------------------------------------------------------

    public OwnerProfileDTO getOwnerProfile(Long ownerId) {

        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        if (user.getRole() != UserRole.OWNER) {
            throw new RuntimeException("User is not an owner");
        }

        return UserMapper.toOwnerProfile(user);
    }

    public List<AdminUserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toAdminUser)
                .collect(Collectors.toList());
    }

    public List<AdminUserDTO> getAllOwners() {
        return userRepository.findByRole(UserRole.OWNER)
                .stream()
                .map(UserMapper::toAdminUser)
                .collect(Collectors.toList());
    }

    public boolean hasAdmins() {
        return userRepository.countByRole(UserRole.ADMIN) > 0;
    }

    // ---------------------------------------------------------
    // REGISTRATION WITH OTP
    // ---------------------------------------------------------

    public String registerRequest(UserRegisterDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        PendingUser pending = pendingRepo.findByEmail(dto.getEmail())
                .orElse(new PendingUser());

        pending.setFullName(dto.getFullName());
        pending.setEmail(dto.getEmail());
        pending.setPassword(passwordEncoder.encode(dto.getPassword()));
        pending.setPhone(dto.getPhone());
        pending.setAddress(dto.getAddress());
        pending.setGender(dto.getGender());
        pending.setNicNumber(dto.getNicNumber());
        pending.setAccNo(dto.getAccNo());
        pending.setStudentUniversity(dto.getStudentUniversity());
        pending.setRole(dto.getRole());

        pendingRepo.save(pending);

        Otp otp = otpService.createRegistrationOtp(dto.getEmail());
        emailService.sendOtpEmail(dto.getEmail(), otp.getOtpCode());

        return "OTP sent to email!";
    }

    @Transactional
    public UserResponseDTO verifyRegistration(String email, String otpCode) {

        boolean valid = otpService.validateOtp(
                email,
                otpCode,
                OtpPurpose.REGISTRATION
        );

        if (!valid) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        PendingUser p = pendingRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Registration already verified"));

        User user = new User();
        user.setFullName(p.getFullName());
        user.setEmail(p.getEmail());
        user.setPassword(p.getPassword());
        user.setPhone(p.getPhone());
        user.setAddress(p.getAddress());
        user.setGender(p.getGender());
        user.setNicNumber(p.getNicNumber());
        user.setAccNo(p.getAccNo());
        user.setStudentUniversity(p.getStudentUniversity());
        user.setRole(p.getRole());
        // Admins and Owners are verified by default, Students need verification later
        user.setVerifiedOwner(p.getRole() == UserRole.OWNER || p.getRole() == UserRole.ADMIN);

        User saved = userRepository.save(user);
        pendingRepo.delete(p);

        return UserMapper.toUserResponse(saved);
    }

    // ---------------------------------------------------------
    // FORGOT PASSWORD WITH OTP
    // ---------------------------------------------------------

    public String forgotPassword(String email) {

        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        Otp otp = otpService.createPasswordResetOtp(email);
        emailService.sendResetToken(email, otp.getOtpCode());

        return "Reset OTP sent to email";
    }

    public String resetPassword(String email, String otpCode, String newPassword) {

        boolean valid = otpService.validateOtp(
                email,
                otpCode,
                OtpPurpose.PASSWORD_RESET
        );

        if (!valid) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "Password reset successful";
    }
}
