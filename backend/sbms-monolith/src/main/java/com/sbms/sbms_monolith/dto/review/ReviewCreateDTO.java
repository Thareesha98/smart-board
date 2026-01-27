package com.sbms.sbms_monolith.dto.review;

import lombok.Data;

import java.util.List;

@Data
public class ReviewCreateDTO {
    private int rating;
    private String comment;
    private Long studentId;
    private Long boardingId;

    private List<String> imageUrls;
}
