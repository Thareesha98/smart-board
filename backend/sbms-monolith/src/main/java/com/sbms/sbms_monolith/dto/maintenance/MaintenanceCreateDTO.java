package com.sbms.sbms_monolith.dto.maintenance;


import lombok.Data;

@Data
public class MaintenanceCreateDTO {

    private Long boardingId;
    private String title;
    private String description;
    private String studentNote;
    private String imageUrl; // optional
}
