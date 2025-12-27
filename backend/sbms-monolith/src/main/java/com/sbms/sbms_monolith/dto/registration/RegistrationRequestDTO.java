package com.sbms.sbms_monolith.dto.registration;

import lombok.Data;

@Data
public class RegistrationRequestDTO {

    private Long boardingId;

    private int numberOfStudents;

    private String studentNote;
    
    private boolean keyMoneyPaid; 
}
