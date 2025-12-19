package com.sbms.appointment_service.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.sbms.appointment_service.dto.BoardingOwnerInfo;

@Service
public class BoardingClient {

    private final WebClient webClient;

    public BoardingClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("http://sbms-backend:8080")
                .build();
    }

    public BoardingOwnerInfo getBoardingOwner(Long boardingId) {
        return webClient.get()
                .uri("/internal/boardings/{id}/owner", boardingId)
                .retrieve()
                .bodyToMono(BoardingOwnerInfo.class)
                .block();
    }
}

