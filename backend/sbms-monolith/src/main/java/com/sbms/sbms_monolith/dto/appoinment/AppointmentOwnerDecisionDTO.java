
package com.sbms.sbms_monolith.dto.appoinment;

import java.time.LocalDateTime;

import com.sbms.sbms_monolith.model.enums.AppointmentStatus;

import lombok.Data;

@Data
public class AppointmentOwnerDecisionDTO {

    private AppointmentStatus status;  // ACCEPTED or DECLINED

    // If ACCEPTED → owner chooses slot inside student's range
    private LocalDateTime ownerStartTime;
    private LocalDateTime ownerEndTime;

    private String ownerNote;
}
