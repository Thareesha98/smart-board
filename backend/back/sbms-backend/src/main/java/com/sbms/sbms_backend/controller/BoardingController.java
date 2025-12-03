package com.sbms.sbms_backend.controller;

import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSearchRequest;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.model.enums.BoardingType;
import com.sbms.sbms_backend.model.enums.Gender;
import com.sbms.sbms_backend.service.BoardingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/boardings")
@CrossOrigin
public class BoardingController {
	
	@Autowired
    private BoardingService boardingService;

   

   
    @GetMapping
    public Page<BoardingSummaryDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        BoardingSearchRequest req = new BoardingSearchRequest();
        req.setPage(page);
        req.setSize(size);
        return boardingService.getAll(req);
    }

    // -------------------------------------------------------
    // 2) FILTER ONLY – gender / type / price (NO keyword)
    // GET /api/boardings/filter?genderType=MALE&boardingType=ROOM&minPrice=5000&maxPrice=15000&page=0&size=10
    // -------------------------------------------------------
    @GetMapping("/filter")
    public Page<BoardingSummaryDTO> getAllFiltered(
            @RequestParam(required = false) String genderType,
            @RequestParam(required = false) String boardingType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minKeyMoney,
            @RequestParam(required = false) BigDecimal maxKeyMoney,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        BoardingSearchRequest req = new BoardingSearchRequest();

        if (genderType != null && !genderType.isBlank()) {
            req.setGenderType(Gender.valueOf(genderType.toUpperCase()));
        }
        if (boardingType != null && !boardingType.isBlank()) {
            req.setBoardingType(BoardingType.valueOf(boardingType.toUpperCase()));
        }

        req.setMinPrice(minPrice);
        req.setMaxPrice(maxPrice);
        req.setMinKeyMoney(minPrice);
        req.setMaxKeyMoney(maxPrice);
        req.setPage(page);
        req.setSize(size);

        return boardingService.getAllFiltered(req);
    }

    // -------------------------------------------------------
    // 3) SEARCH with filters + keyword
    // GET /api/boardings/search?genderType=MALE&boardingType=ROOM&addressKeyword=uni&page=0&size=10
    // -------------------------------------------------------
    @GetMapping("/search")
    public Page<BoardingSummaryDTO> search(
            @RequestParam(required = false) String genderType,
            @RequestParam(required = false) String boardingType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minKeyMoney,
            @RequestParam(required = false) BigDecimal maxKeyMoney,
            @RequestParam(required = false) String addressKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        BoardingSearchRequest req = new BoardingSearchRequest();

        if (genderType != null && !genderType.isBlank()) {
            req.setGenderType(Gender.valueOf(genderType.toUpperCase()));
        }
        if (boardingType != null && !boardingType.isBlank()) {
            req.setBoardingType(BoardingType.valueOf(boardingType.toUpperCase()));
        }

        req.setMinPrice(minPrice);
        req.setMaxPrice(maxPrice);
        req.setMinPrice(minKeyMoney);
        req.setMaxPrice(maxKeyMoney);
        req.setAddressKeyword(addressKeyword);
        req.setPage(page);
        req.setSize(size);

        return boardingService.searchBoardings(req);
    }

    // -------------------------------------------------------
    // 4) GET ONE BOARDING BY ID
    // GET /api/boardings/{id}
    // -------------------------------------------------------
    @GetMapping("/{id}")
    public BoardingDetailDTO getOne(@PathVariable Long id) {
        return boardingService.getById(id);
    }
}
