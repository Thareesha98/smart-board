package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_monolith.dto.user.UserProfileViewDTO;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.User;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class UserProfileMapper {

    public static UserProfileViewDTO toProfileDTO(User user, List<BoardingSummaryDTO> listings) {

        UserProfileViewDTO dto = new UserProfileViewDTO();

        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole().toString());

        // Avatar Fallback
        dto.setAvatar(user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()
                ? user.getProfileImageUrl()
                : "https://ui-avatars.com/api/?name=" + user.getFullName().replace(" ", "%+"));

        dto.setGender(user.getGender() != null ? user.getGender().toString() : "N/A");

        if (user.getCreatedAt() != null) {
            dto.setJoinedDate(user.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM yyyy")));
        } else {
            dto.setJoinedDate("N/A");
        }

        // Student Specific
        dto.setUniversity(user.getStudentUniversity());

        // Owner Specific
        dto.setAddress(user.getAddress());
        dto.setVerifiedOwner(user.isVerifiedOwner());
        dto.setBusinessName(user.getFullName());

        // Set Listings
        dto.setActiveListings(listings);

        return dto;
    }

    public static BoardingSummaryDTO toBoardingSummary(Boarding b) {
        BoardingSummaryDTO summary = new BoardingSummaryDTO();
        summary.setId(b.getId());
        summary.setTitle(b.getTitle());
        summary.setAddress(b.getAddress());
        summary.setPricePerMonth(b.getPricePerMonth());

        summary.setGenderType(b.getGenderType());
        summary.setBoardingType(b.getBoardingType());
        summary.setStatus(b.getStatus());

        summary.setImageUrls(b.getImageUrls());
        summary.setAvailableSlots(b.getAvailable_slots());

        return summary;
    }
}
