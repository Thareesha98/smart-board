package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.ads.AdCreateDTO;
import com.sbms.sbms_monolith.dto.ads.AdResponseDTO;
import com.sbms.sbms_monolith.events.EventMessage;
import com.sbms.sbms_monolith.mapper.AdMapper;
import com.sbms.sbms_monolith.model.ThirdPartyAd;
import com.sbms.sbms_monolith.model.enums.Status;
import com.sbms.sbms_monolith.repository.ThirdPartyAdRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThirdPartyAdService {

    @Autowired
    private ThirdPartyAdRepository adRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Transactional
    public AdResponseDTO submitAd(AdCreateDTO dto) {
        ThirdPartyAd ad = AdMapper.toEntity(dto);
        return AdMapper.toResponse(adRepository.save(ad));
    }

    @Transactional
    public AdResponseDTO updateAdStatus(Long id, Status status) {
        ThirdPartyAd ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));
        ad.setStatus(status);
        
        // Notify via RabbitMQ if approved
        if (status == Status.APPROVED) {
            publishAdEvent(ad, "ad.approved");
        }
        
        return AdMapper.toResponse(adRepository.save(ad));
    }

    public Page<AdResponseDTO> getSubmissions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return adRepository.findAll(pageable).map(AdMapper::toResponse);
    }

    public List<AdResponseDTO> getActiveCampaigns() {
        return adRepository.findByStatus(Status.APPROVED).stream()
                .map(AdMapper::toResponse)
                .collect(Collectors.toList());
    }

    private void publishAdEvent(ThirdPartyAd ad, String type) {
        EventMessage event = EventMessage.builder()
                .eventType(type)
                .sourceService("sbms-backend")
                .aggregateId(ad.getId().toString())
                .occurredAt(Instant.now())
                .build();
        rabbitTemplate.convertAndSend("sbms.events", "ad.update", event);
    }
}