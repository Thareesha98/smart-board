package com.sbms.sbms_monolith.service;


import com.sbms.sbms_monolith.dto.profile.*;
import com.sbms.sbms_monolith.model.User;

public interface ProfileService {

    ProfileResponseDTO getProfile(String email);

    ProfileResponseDTO updateStudentProfile(String email, StudentProfileUpdateDTO dto);

    ProfileResponseDTO updateOwnerProfile(String email, OwnerProfileUpdateDTO dto);

    ProfileResponseDTO updateAdminProfile(String email, CommonProfileUpdateDTO dto);
}
