package com.sbms.sbms_monolith.dto.admin;




import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.enums.Status;
import lombok.Data;

@Data
public class AdminBoardingResponseDTO {

    private Long id;
    private String title;
    private String address;
    private Status status;

    private Long ownerId;
    private String ownerName;

    public static AdminBoardingResponseDTO fromEntity(Boarding b) {

        AdminBoardingResponseDTO dto = new AdminBoardingResponseDTO();
        dto.setId(b.getId());
        dto.setTitle(b.getTitle());
        dto.setAddress(b.getAddress());
        dto.setStatus(b.getStatus());
        dto.setOwnerId(b.getOwner().getId());
        dto.setOwnerName(b.getOwner().getFullName());

        return dto;
    }
}

