package com.sbms.sbms_backend.controller;

import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSearchRequest;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.model.enums.BoardingType;
import com.sbms.sbms_backend.model.enums.Gender;
import com.sbms.sbms_backend.model.enums.BoardingType;
import com.sbms.sbms_backend.service.BoardingService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/boardings")
@CrossOrigin
public class BoardingController {

    private final BoardingService boardingService;

    public BoardingController(BoardingService boardingService) {
        this.boardingService = boardingService;
    }

    // GET /api/boardings?genderType=MALE&boardingType=ROOM&minPrice=5000&maxPrice=15000&addressKeyword=uni
    @GetMapping
    public Page<BoardingSummaryDTO> searchBoardings(
            @RequestParam(required = false) String genderType,
            @RequestParam(required = false) String boardingType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String addressKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        BoardingSearchRequest request = new BoardingSearchRequest();

        if (genderType != null && !genderType.isBlank()) {
            request.setGenderType(Gender.valueOf(genderType.toUpperCase()));
        }

        if (boardingType != null && !boardingType.isBlank()) {
            request.setBoardingType(BoardingType.valueOf(boardingType.toUpperCase()));
        }

        request.setMinPrice(minPrice);
        request.setMaxPrice(maxPrice);
        request.setAddressKeyword(addressKeyword);
        request.setPage(page);
        request.setSize(size);

        return boardingService.searchBoardings(request);
    }

    // GET /api/boardings/{id}
    @GetMapping("/{id}")
    public BoardingDetailDTO getBoarding(@PathVariable Long id) {
        return boardingService.getBoardingById(id);
    }
}
