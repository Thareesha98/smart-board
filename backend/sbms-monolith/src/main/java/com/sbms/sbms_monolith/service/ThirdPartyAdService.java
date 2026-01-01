package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.ads.AdCreateDTO;
import com.sbms.sbms_monolith.dto.ads.AdResponseDTO;
import com.sbms.sbms_monolith.mapper.AdMapper;
import com.sbms.sbms_monolith.model.ThirdPartyAd;
import com.sbms.sbms_monolith.model.enums.AdStatus;
import com.sbms.sbms_monolith.repository.ThirdPartyAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThirdPartyAdService {

    @Autowired
    private ThirdPartyAdRepository adRepository;

    @Transactional
    public AdResponseDTO updateAdStatus(Long id, AdStatus status) { // Parameter updated
        ThirdPartyAd ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));
        ad.setStatus(status);
        return AdMapper.toResponse(adRepository.save(ad));
    }

    public List<AdResponseDTO> getActiveCampaigns() {
        return adRepository.findByStatus(AdStatus.ACTIVE).stream() // Updated to ACTIVE
                .map(AdMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    // ... rest of the methods using AdStatus
}