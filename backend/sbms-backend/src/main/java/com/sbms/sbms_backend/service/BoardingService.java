package com.sbms.sbms_backend.service;


import com.sbms.sbms_backend.dto.boarding.BoardingDetailDTO;
import com.sbms.sbms_backend.dto.boarding.BoardingSearchRequest;
import com.sbms.sbms_backend.dto.boarding.BoardingSummaryDTO;
import com.sbms.sbms_backend.model.Boarding;
import com.sbms.sbms_backend.model.enums.Status;
import com.sbms.sbms_backend.BoardingMapper;
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

    public Page<BoardingSummaryDTO> searchBoardings(BoardingSearchRequest request) {

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
                .filter(b -> {
                    if (request.getAddressKeyword() == null ||
                        request.getAddressKeyword().isBlank()) {
                        return true;
                    }

                    String keyword = request.getAddressKeyword().toLowerCase(Locale.ROOT);

                    return b.getAddress().toLowerCase(Locale.ROOT).contains(keyword) ||
                           b.getTitle().toLowerCase(Locale.ROOT).contains(keyword);
                })
                .collect(Collectors.toList());

        // Pagination (simple in-memory)
        int from = request.getPage() * request.getSize();
        int to = Math.min(from + request.getSize(), filtered.size());
        if (from > filtered.size()) from = filtered.size();

        List<BoardingSummaryDTO> content = filtered.subList(from, to)
                .stream()
                .map(BoardingMapper::toSummary)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

        return new PageImpl<>(content, pageable, filtered.size());
    }

    
    public BoardingDetailDTO getById(Long id) {
        Boarding b = boardingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boarding not found with id: " + id));

        if (b.getStatus() != Status.APPROVED) {
            throw new RuntimeException("Boarding is not approved yet");
        }

        return BoardingMapper.toDetail(b);
    }
    
    public Page<BoardingSummaryDTO> getAllFiltered(BoardingSearchRequest request) {
        List<Boarding> all = boardingRepository.findAll();
        List<Boarding> filtered = all.stream()
                // Only approved boardings visible
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
        int from = request.getPage() * request.getSize();
        int to = Math.min(from + request.getSize(), filtered.size());
        if (from > filtered.size()) from = filtered.size();
        List<BoardingSummaryDTO> content = filtered.subList(from, to)
                .stream()
                .map(BoardingMapper::toSummary)
                .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageImpl<>(content, pageable, filtered.size());
    }
    
    
    
    
    
    public Page<BoardingSummaryDTO> getAll(BoardingSearchRequest request) {
        List<Boarding> all = boardingRepository.findAll();
        List<Boarding> filtered = all.stream()
                .filter(b -> b.getStatus() == Status.APPROVED)
                .collect(Collectors.toList());
        int from = request.getPage() * request.getSize();
        int to = Math.min(from + request.getSize(), filtered.size());
        if (from > filtered.size()) from = filtered.size();
        List<BoardingSummaryDTO> content = filtered.subList(from, to)
                .stream()
                .map(BoardingMapper::toSummary)
                .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageImpl<>(content, pageable, filtered.size());
    }
    
    
    
    
    
}
