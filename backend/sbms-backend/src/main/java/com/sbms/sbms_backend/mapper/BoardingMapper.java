package com.sbms.sbms_backend.mapper;


import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.model.Boarding;



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
}
