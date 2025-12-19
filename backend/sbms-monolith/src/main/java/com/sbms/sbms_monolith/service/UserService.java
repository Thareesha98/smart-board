package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.user.*;
import com.sbms.sbms_monolith.mapper.UserMapper;
import com.sbms.sbms_monolith.model.Otp;
import com.sbms.sbms_monolith.model.PendingUser;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.UserRole;
import com.sbms.sbms_monolith.repository.PendingUserRepository;
import com.sbms.sbms_monolith.repository.UserRepository;

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


    public UserResponseDTO register(UserRegisterDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = UserMapper.toEntity(dto);

        // Password hashing (if passwordEncoder is available)
        if (passwordEncoder != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        User saved = userRepository.save(user);

        return UserMapper.toUserResponse(saved);
    }


    public UserResponseDTO login(UserLoginDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder != null) {
            if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
        } else {
            // fallback (ONLY for development before JWT module)
            if (!user.getPassword().equals(dto.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
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

        // Update only updatable fields
        user.setFullName(dto.getFullName());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setGender(dto.getGender());
        user.setStudentUniversity(dto.getStudentUniversity());
        user.setAccNo(dto.getAccNo());
        user.setNicNumber(dto.getNicNumber());

        User saved = userRepository.save(user);

        return UserMapper.toUserResponse(saved);
    }


    public OwnerProfileDTO getOwnerProfile(Long ownerId) {
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        if (user.getRole() != UserRole.OWNER) {
            throw new RuntimeException("User is not an owner");
        }

        return UserMapper.toOwnerProfile(user);
    }


    public List<AdminUserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toAdminUser)
                .collect(Collectors.toList());
    }


    // ---------------------------------------------------------
    // ADMIN: GET ALL OWNERS
    // ---------------------------------------------------------
    public List<AdminUserDTO> getAllOwners() {
        return userRepository.findByRole(UserRole.OWNER).stream()
                .map(UserMapper::toAdminUser)
                .collect(Collectors.toList());
    }
    
    
    public String registerRequest(UserRegisterDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already registered");

        // Save registration data temporarily
        PendingUser pending = new PendingUser();
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

        Otp otp = otpService.createOtp(dto.getEmail());

        emailService.sendOtpEmail(dto.getEmail(), otp.getOtpCode());

        return "OTP sent to email!";
    }

    public UserResponseDTO verifyRegistration(String email, String otpCode) {

        boolean valid = otpService.validateOtp(email, otpCode);

        if (!valid) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        PendingUser p = pendingRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No pending registration found"));

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
        user.setVerifiedOwner(p.getRole().name().equals("OWNER"));

        User saved = userRepository.save(user);

        pendingRepo.delete(p);

        return UserMapper.toUserResponse(saved);
    }
    
    

    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        Otp otp = otpService.createOtp(email);

        emailService.sendResetToken(email, otp.getOtpCode());

        return "Reset OTP sent to email";
    }

    public String resetPassword(String email, String otpCode, String newPassword) {

        boolean valid = otpService.validateOtp(email, otpCode);

        if (!valid)
            throw new RuntimeException("Invalid or expired OTP");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        return "Password reset successful";
    }

    
}
