package com.sbms.sbms_monolith.dto.admin;

import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.enums.Status;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class AdminBoardingResponseDTO {
    private Long id;
    private String title;
    private String address;
    private String description;
    private String price;
    private String boardingType;
    private Integer availableSlots;
    private String genderType;
    private List<String> amenities;
    private List<String> images;
    private Status status;
    private Long ownerId;
    private String ownerName;
    private OwnerInfoDTO owner;

    public static AdminBoardingResponseDTO fromEntity(Boarding b) {
        AdminBoardingResponseDTO dto = new AdminBoardingResponseDTO();
        dto.setId(b.getId());
        dto.setTitle(b.getTitle());
        dto.setAddress(b.getAddress());
        dto.setDescription(b.getDescription());
        dto.setPrice(b.getPricePerMonth() != null ? b.getPricePerMonth().toString() : "0.00");
        dto.setBoardingType(b.getBoardingType() != null ? b.getBoardingType().toString() : "");
        dto.setAvailableSlots(b.getAvailable_slots());
        dto.setGenderType(b.getGenderType() != null ? b.getGenderType().toString() : "");
        dto.setAmenities(b.getAmenities());
        dto.setStatus(b.getStatus());
        dto.setOwnerId(b.getOwner().getId());
        dto.setOwnerName(b.getOwner().getFullName());
        
        // Map the image URLs from Boarding model
        if (b.getImageUrls() != null) {
            dto.setImages(b.getImageUrls());
        }
        
        // Include full owner information
        if (b.getOwner() != null) {
            dto.setOwner(OwnerInfoDTO.fromEntity(b.getOwner()));
        }

        return dto;
    }
}
