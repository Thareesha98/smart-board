package com.sbms.sbms_backend.dto.registration;

import lombok.Data;

@Data
public class RegistrationRequestDTO {

    private Long boardingId;

    private int numberOfStudents;

    private String studentNote;
}
