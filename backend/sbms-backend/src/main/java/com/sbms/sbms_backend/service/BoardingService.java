package com.sbms.sbms_backend.service;

import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSearchRequest;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.mapper.BoardingMapper;
import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.enums.Status;
import com.sbms.sbms_backend.repository.BoardingRepository;
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

    // -------------------------------------------------------
    // 1) SEARCH with filters + addressKeyword
    // -------------------------------------------------------
    public Page<BoardingSummaryDTO> searchBoardings(BoardingSearchRequest request) {

        List<Boarding> all = boardingRepository.findAll();

        List<Boarding> filtered = all.stream()
                // Only approved boardings visible
                .filter(b -> b.getStatus() == Status.APPROVED)
                // Gender filter
                .filter(b -> request.getGenderType() == null ||
                             b.getGenderType() == request.getGenderType())
                // Boarding type filter
                .filter(b -> request.getBoardingType() == null ||
                             b.getBoardingType() == request.getBoardingType())
                // Min price
                .filter(b -> request.getMinPrice() == null ||
                             b.getPricePerMonth().compareTo(request.getMinPrice()) >= 0)
                // Max price
                .filter(b -> request.getMaxPrice() == null ||
                             b.getPricePerMonth().compareTo(request.getMaxPrice()) <= 0)
                // Search keyword (title + address)
                .filter(b -> {
                    if (request.getAddressKeyword() == null ||
                        request.getAddressKeyword().isBlank()) {
                        return true;
                    }
                    String keyword = request.getAddressKeyword().toLowerCase(Locale.ROOT);
                    return (b.getAddress() != null &&
                            b.getAddress().toLowerCase(Locale.ROOT).contains(keyword))
                        || (b.getTitle() != null &&
                            b.getTitle().toLowerCase(Locale.ROOT).contains(keyword));
                })
                .collect(Collectors.toList());

        return toPagedResult(request, filtered);
    }

    // -------------------------------------------------------
    // 2) FILTER ONLY (NO SEARCH KEYWORD)
    // -------------------------------------------------------
    public Page<BoardingSummaryDTO> getAllFiltered(BoardingSearchRequest request) {
        List<Boarding> all = boardingRepository.findAll();

        List<Boarding> filtered = all.stream()
                .filter(b -> b.getStatus() == Status.APPROVED)
                .filter(b -> request.getGenderType() == null ||
                             b.getGenderType() == request.getGenderType())
                .filter(b -> request.getBoardingType() == null ||
                             b.getBoardingType() == request.getBoardingType())
                .filter(b -> request.getMinPrice() == null ||
                             b.getPricePerMonth().compareTo(request.getMinPrice()) >= 0)
                .filter(b -> request.getMaxPrice() == null ||
                             b.getPricePerMonth().compareTo(request.getMaxPrice()) <= 0)
                .collect(Collectors.toList());

        return toPagedResult(request, filtered);
    }

    // -------------------------------------------------------
    // 3) GET ALL (NO FILTERS, NO SEARCH) – only APPROVED
    // -------------------------------------------------------
    public Page<BoardingSummaryDTO> getAll(BoardingSearchRequest request) {
        List<Boarding> all = boardingRepository.findAll();

        List<Boarding> filtered = all.stream()
                .filter(b -> b.getStatus() == Status.APPROVED)
                .collect(Collectors.toList());

        return toPagedResult(request, filtered);
    }

    // -------------------------------------------------------
    // GET ONE (DETAIL)
    // -------------------------------------------------------
    public BoardingDetailDTO getById(Long id) {
        Boarding b = boardingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boarding not found with id: " + id));

        if (b.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Boarding is not approved yet");
        }

        return BoardingMapper.toDetail(b);
    }

    // -------------------------------------------------------
    // Helper: common pagination + mapping
    // -------------------------------------------------------
    private Page<BoardingSummaryDTO> toPagedResult(BoardingSearchRequest request,
                                                   List<Boarding> filtered) {

        int page = request.getPage();
        int size = request.getSize();

        int from = page * size;
        int to = Math.min(from + size, filtered.size());
        if (from > filtered.size()) {
            from = filtered.size();
        }

        List<BoardingSummaryDTO> content = filtered.subList(from, to).stream()
                .map(BoardingMapper::toSummary)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);
        return new PageImpl<>(content, pageable, filtered.size());
    }
}
