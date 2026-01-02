package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.user.*;
import com.sbms.sbms_monolith.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody UserRegisterDTO dto) {
        return userService.register(dto);
    }

    @PostMapping("/register/request")
    public String registerRequest(@RequestBody UserRegisterDTO dto) {
        return userService.registerRequest(dto);
    }

    @PostMapping("/register/verify")
    public UserResponseDTO verifyRegistration(@RequestBody VerifyOtpDTO dto) {
        return userService.verifyRegistration(dto.getEmail(), dto.getOtp());
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
}
