package com.sbms.sbms_backend.mapper;


import com.sbms.sbms_backend.dto.boarding.BoardingCreateDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.dto.boarding.OwnerBoardingResponseDTO;
import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.enums.Status;



public class BoardingMapper {

    public static BoardingSummaryDTO toSummary(Boarding b) {
        BoardingSummaryDTO dto = new BoardingSummaryDTO();

        dto.setId(b.getId());
        dto.setTitle(b.getTitle());
        dto.setAddress(b.getAddress());
        dto.setPricePerMonth(b.getPricePerMonth());
        

        dto.setGenderType(b.getGenderType());
        dto.setBoardingType(b.getBoardingType());
        dto.setStatus(b.getStatus());

        dto.setImageUrls(b.getImageUrls());
        dto.setAvailableSlots(b.getAvailable_slots());

        return dto;
    }

    public static BoardingDetailDTO toDetail(Boarding b) {
        BoardingDetailDTO dto = new BoardingDetailDTO();

        dto.setId(b.getId());
        dto.setTitle(b.getTitle());
        dto.setDescription(b.getDescription());
        dto.setAddress(b.getAddress());
        dto.setPricePerMonth(b.getPricePerMonth());
        dto.setKeyMoney(b.getKeyMoney());

        dto.setGenderType(b.getGenderType());
        dto.setBoardingType(b.getBoardingType());
        dto.setStatus(b.getStatus());

        dto.setImageUrls(b.getImageUrls());
        dto.setAvailableSlots(b.getAvailable_slots());
        dto.setMaxOccupants(b.getMaxOccupants());

        dto.setAmenities(b.getAmenities());
        dto.setNearbyPlaces(b.getNearbyPlaces());

        dto.setBosted(b.isBosted());
        dto.setBoostEndDate(b.getBoostEndDate());

        return dto;
    }
    
    
    public static Boarding toEntityFromCreate(BoardingCreateDTO dto) {
        Boarding b = new Boarding();

        b.setTitle(dto.getTitle());
        b.setDescription(dto.getDescription());
        b.setAddress(dto.getAddress());
        b.setPricePerMonth(dto.getPricePerMonth());
        b.setKeyMoney(dto.getKeyMoney());
        b.setGenderType(dto.getGenderType());
        b.setAvailable_slots(dto.getAvailableSlots());
        b.setMaxOccupants(dto.getMaxOccupants());
        b.setBoardingType(dto.getBoardingType());
        b.setImageUrls(dto.getImageUrls());
        b.setAmenities(dto.getAmenities());
        b.setNearbyPlaces(dto.getNearbyPlaces());

        // New ads are always pending admin approval
        b.setStatus(Status.PENDING);

        return b;
    }

    public static OwnerBoardingResponseDTO toOwnerResponse(Boarding b) {
        OwnerBoardingResponseDTO dto = new OwnerBoardingResponseDTO();

        dto.setId(b.getId());
        dto.setTitle(b.getTitle());
        dto.setDescription(b.getDescription());
        dto.setAddress(b.getAddress());
        dto.setPricePerMonth(b.getPricePerMonth());
        dto.setKeyMoney(b.getKeyMoney());
        dto.setGenderType(b.getGenderType());
        dto.setBoardingType(b.getBoardingType());
        dto.setAvailableSlots(b.getAvailable_slots());
        dto.setMaxOccupants(b.getMaxOccupants());
        dto.setImageUrls(b.getImageUrls());
        dto.setAmenities(b.getAmenities());
        dto.setNearbyPlaces(b.getNearbyPlaces());

        dto.setStatus(b.getStatus());
        dto.setBoosted(b.isBosted());
        dto.setBoostEndDate(b.getBoostEndDate());

        return dto;
    }

    
    
    
}
