package com.sbms.sbms_monolith.dto.profile;


import lombok.Data;

@Data
public class StudentProfileUpdateDTO {

    private String fullName;
    private String phone;
    private String profileImageUrl;

    private String studentUniversity;
}
