package com.sbms.sbms_monolith.dto.review;

import lombok.Data;

import java.util.List;

@Data
public class ReviewResponseDTO {
    private Long id;
    private int rating;
    private String comment;
    private String createdAt;

    private Long userId;
    private String userName;
    private String userAvatar;

    private List<String> imageUrls;
}
