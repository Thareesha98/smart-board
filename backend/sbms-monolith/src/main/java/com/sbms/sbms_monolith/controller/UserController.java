package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.user.*;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody UserRegisterDTO dto) {
        return userService.register(dto);
    }

    @PostMapping("/login")
    public UserResponseDTO login(@RequestBody UserLoginDTO dto) {
        return userService.login(dto);
    }


    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }


    @PutMapping("/{id}")
    public UserResponseDTO updateUser(@PathVariable Long id, @RequestBody UserRegisterDTO dto) {
        return userService.updateUser(id, dto);
    }


    @GetMapping("/owner/{ownerId}")
    public OwnerProfileDTO getOwnerProfile(@PathVariable Long ownerId) {
        return userService.getOwnerProfile(ownerId);
    }


   
    @GetMapping("/all")
    public List<AdminUserDTO> getAllUsers() {
        return userService.getAllUsers();
    }


   
    @GetMapping("/owners")
    public List<AdminUserDTO> getAllOwners() {
        return userService.getAllOwners();
    }

    @PutMapping("/profile")
    public UserResponseDTO updateMyProfile(@RequestBody UserRegisterDTO dto, Authentication auth) {
        // Find the user who is currently logged in
        User currentUser = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Reuse the existing update logic using their ID
        return userService.updateUser(currentUser.getId(), dto);
    }

}
