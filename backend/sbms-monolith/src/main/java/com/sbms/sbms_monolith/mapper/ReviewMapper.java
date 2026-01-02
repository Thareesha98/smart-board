package com.sbms.sbms_monolith.mapper;

import com.sbms.sbms_monolith.dto.review.ReviewCreateDTO;
import com.sbms.sbms_monolith.dto.review.ReviewResponseDTO;
import com.sbms.sbms_monolith.model.Review;
import com.sbms.sbms_monolith.model.User;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class ReviewMapper {

    // Formatter for the createdAt string
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    /*
     * Converts ReviewCreateDto to Review Entity
     */
    public Review toEntity(ReviewCreateDTO dto) {
        if (dto == null) {
            return null;
        }

        Review review = new Review();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        return review;
    }

    /*
     * Converts Review Entity to ReviewResponseDto
     */
    public ReviewResponseDTO  toResponseDto(Review review) {
        if (review == null) {
            return null;
        }

        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());

        // Format LocalDateTime to String
        if (review.getCreatedAt() != null) {
            dto.setCreatedAt(review.getCreatedAt().format(DATE_FORMATTER));
        }

        User student = review.getStudent();
        if (student != null) {
            dto.setUserId(student.getId());
            dto.setUserName(student.getFullName());
            dto.setUserAvatar(student.getProfileImageUrl());
        }

        return dto;
    }

}
