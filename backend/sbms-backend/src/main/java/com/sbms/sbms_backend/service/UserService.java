package com.sbms.sbms_backend.service;

import com.sbms.sbms_backend.dto.user.*;
import com.sbms.sbms_backend.mapper.UserMapper;
import com.sbms.sbms_backend.model.User;
import com.sbms.sbms_backend.model.enums.UserRole;
import com.sbms.sbms_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // NOTE: bcrypt will be added during JWT implementation
    @Autowired
    private PasswordEncoder passwordEncoder;


    // ---------------------------------------------------------
    // REGISTER NEW USER (Student or Owner)
    // ---------------------------------------------------------
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


    // ---------------------------------------------------------
    // LOGIN (Simple version — JWT will replace this later)
    // ---------------------------------------------------------
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


    // ---------------------------------------------------------
    // GET PROFILE
    // ---------------------------------------------------------
    public UserResponseDTO getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserMapper.toUserResponse(user);
    }


    // ---------------------------------------------------------
    // UPDATE PROFILE (basic fields only)
    // ---------------------------------------------------------
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


    // ---------------------------------------------------------
    // OWNER PROFILE (role-specific)
    // ---------------------------------------------------------
    public OwnerProfileDTO getOwnerProfile(Long ownerId) {
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        if (user.getRole() != UserRole.OWNER) {
            throw new RuntimeException("User is not an owner");
        }

        return UserMapper.toOwnerProfile(user);
    }


    // ---------------------------------------------------------
    // ADMIN: GET ALL USERS
    // ---------------------------------------------------------
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
}
