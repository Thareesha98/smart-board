package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.boarding.*;
import com.sbms.sbms_monolith.model.Boarding;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.model.enums.Status;
import com.sbms.sbms_monolith.repository.BoardingRepository;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.mapper.BoardingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OwnerBoardingService {

    @Autowired
    private BoardingRepository boardingRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    public OwnerBoardingResponseDTO create(Long ownerId, BoardingCreateDTO dto) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Boarding b = BoardingMapper.toEntityFromCreate(dto);
        b.setOwner(owner); // link owner

        Boarding saved = boardingRepository.save(b);

        return BoardingMapper.toOwnerResponse(saved);
    }

    // UPDATE
    public OwnerBoardingResponseDTO update(Long ownerId, Long boardingId, BoardingUpdateDTO dto) {

        Boarding b = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (!b.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("You are not allowed to update this boarding");
        }

        b.setTitle(dto.getTitle());
        b.setDescription(dto.getDescription());
        b.setAddress(dto.getAddress());
        b.setPricePerMonth(dto.getPricePerMonth());
        b.setKeyMoney(dto.getKeyMoney());
        b.setGenderType(dto.getGenderType());
        b.setAvailable_slots(dto.getAvailableSlots());
        b.setMaxOccupants(dto.getMaxOccupants());
        b.setBoardingType(dto.getBoardingType());
        b.setAmenities(dto.getAmenities());
        b.setImageUrls(dto.getImageUrls());
        b.setNearbyPlaces(dto.getNearbyPlaces());

        // status stays same (admin approval needed)

        Boarding saved = boardingRepository.save(b);
        return BoardingMapper.toOwnerResponse(saved);
    }

    // DELETE
    public void delete(Long ownerId, Long boardingId) {
        Boarding b = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (!b.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Not allowed to delete this boarding");
        }

        boardingRepository.delete(b);
    }

    // GET ALL OWNER BOARDINGS
    public List<OwnerBoardingResponseDTO> getAllByOwner(Long ownerId) {

        return boardingRepository.findAll().stream()
                .filter(b -> b.getOwner().getId().equals(ownerId))
                .map(BoardingMapper::toOwnerResponse)
                .collect(Collectors.toList());
    }

    // BOOST AD (FR11)
    public OwnerBoardingResponseDTO boost(Long ownerId, Long boardingId, int days) {

        Boarding b = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        if (!b.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Not allowed");
        }

        b.setBosted(true);
        b.setBoostEndDate(LocalDateTime.now().plusDays(days));

        return BoardingMapper.toOwnerResponse(boardingRepository.save(b));
    }
}
