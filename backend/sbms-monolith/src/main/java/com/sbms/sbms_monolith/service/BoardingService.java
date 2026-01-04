package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_monolith.dto.boarding.BoardingSearchRequest;
import com.sbms.sbms_monolith.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_monolith.mapper.BoardingMapper;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.enums.Status;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class BoardingService {

    @Autowired
    private BoardingRepository boardingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public Page<BoardingSummaryDTO> searchBoardings(BoardingSearchRequest request) {

        List<Boarding> all = boardingRepository.findAll();

        List<Boarding> filtered = all.stream()
                // 1. Status Filter (Null Safe)
                .filter(b -> b.getStatus() != null && b.getStatus() == Status.APPROVED)

                // 2. Gender Filter (Null Safe)
                .filter(b -> request.getGenderType() == null ||
                        (b.getGenderType() != null && b.getGenderType() == request.getGenderType()))

                // 3. Boarding Type Filter (Null Safe)
                .filter(b -> request.getBoardingType() == null ||
                        (b.getBoardingType() != null && b.getBoardingType() == request.getBoardingType()))

                // 4. Min Price Filter (Null Safe - Fixes Crash)
                .filter(b -> request.getMinPrice() == null ||
                        (b.getPricePerMonth() != null && b.getPricePerMonth().compareTo(request.getMinPrice()) >= 0))

                // 5. Max Price Filter (Null Safe - Fixes Crash)
                .filter(b -> request.getMaxPrice() == null ||
                        (b.getPricePerMonth() != null && b.getPricePerMonth().compareTo(request.getMaxPrice()) <= 0))

                // 6. Min KeyMoney (Null Safe)
                .filter(b -> request.getMinKeyMoney() == null ||
                        (b.getKeyMoney() != null && b.getKeyMoney().compareTo(request.getMinKeyMoney()) >= 0))

                // 7. Max KeyMoney (Null Safe)
                .filter(b -> request.getMaxKeyMoney() == null ||
                        (b.getKeyMoney() != null && b.getKeyMoney().compareTo(request.getMaxKeyMoney()) <= 0))

                // 8. Keyword Search (Title OR Address)
                .filter(b -> {
                    if (request.getAddressKeyword() == null || request.getAddressKeyword().isBlank()) {
                        return true;
                    }
                    String keyword = request.getAddressKeyword().toLowerCase(Locale.ROOT);

                    boolean matchesAddress = b.getAddress() != null &&
                            b.getAddress().toLowerCase(Locale.ROOT).contains(keyword);
                    boolean matchesTitle = b.getTitle() != null &&
                            b.getTitle().toLowerCase(Locale.ROOT).contains(keyword);

                    return matchesAddress || matchesTitle;
                })
                .collect(Collectors.toList());

        return toPagedResult(request, filtered);
    }

    public Page<BoardingSummaryDTO> getAllFiltered(BoardingSearchRequest request) {
//        List<Boarding> all = boardingRepository.findAll();
//
//        List<Boarding> filtered = all.stream()
//                .filter(b -> b.getStatus() == Status.APPROVED)
//                .filter(b -> request.getGenderType() == null ||
//                             b.getGenderType() == request.getGenderType())
//                .filter(b -> request.getBoardingType() == null ||
//                             b.getBoardingType() == request.getBoardingType())
//                .filter(b -> request.getMinPrice() == null ||
//                             b.getPricePerMonth().compareTo(request.getMinPrice()) >= 0)
//                .filter(b -> request.getMaxPrice() == null ||
//                             b.getPricePerMonth().compareTo(request.getMaxPrice()) <= 0)
//                .filter(b -> request.getMinKeyMoney() == null ||
//                b.getKeyMoney().compareTo(request.getMinKeyMoney()) <= 0)
//
//                .filter(b -> request.getMaxKeyMoney() == null ||
//                b.getKeyMoney().compareTo(request.getMaxKeyMoney()) <= 0)
//                .collect(Collectors.toList());
//
//        return toPagedResult(request, filtered);

        return searchBoardings(request);
    }


    public Page<BoardingSummaryDTO> getAll(BoardingSearchRequest request) {
        List<Boarding> all = boardingRepository.findAll();

        List<Boarding> filtered = all.stream()
                .filter(b -> b.getStatus() == Status.APPROVED)
                .collect(Collectors.toList());

        return toPagedResult(request, filtered);
    }

    public BoardingDetailDTO getById(Long id) {
        Boarding b = boardingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boarding not found with id: " + id));

        if (b.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Boarding is not approved yet");
        }

        BoardingDetailDTO dto = BoardingMapper.toDetail(b);

        dto.setReviewCount(reviewRepository.countByBoardingId(id));
        Double avg = reviewRepository.getAverageRatingForBoarding(id);
        dto.setRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);

        return dto;
    }

    private Page<BoardingSummaryDTO> toPagedResult(BoardingSearchRequest request, List<Boarding> filtered) {

        int page = request.getPage();
        int size = request.getSize();

        int from = page * size;
        int to = Math.min(from + size, filtered.size());
        if (from > filtered.size()) {
            from = filtered.size();
        }

        List<BoardingSummaryDTO> content = filtered.subList(from, to).stream()
                .map(boarding -> {
                    // 1. Convert to DTO
                    BoardingSummaryDTO dto = BoardingMapper.toSummary(boarding);

                    // 2. ✅ Fetch & Set Real Rating Data
                    dto.setReviewCount(reviewRepository.countByBoardingId(boarding.getId()));
                    Double avg = reviewRepository.getAverageRatingForBoarding(boarding.getId());
                    dto.setRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);

                    return dto;
                })
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);
        return new PageImpl<>(content, pageable, filtered.size());
    }
}
