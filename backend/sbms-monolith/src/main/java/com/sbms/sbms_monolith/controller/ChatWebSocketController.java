package com.sbms.sbms_monolith.controller;

import com.sbms.sbms_monolith.dto.chat.ChatMessageResponse;
import com.sbms.sbms_monolith.dto.chat.SendMessageRequest;
import com.sbms.sbms_monolith.mapper.ChatMapper;
import com.sbms.sbms_monolith.model.ChatMessage;
import com.sbms.sbms_monolith.model.User;
import com.sbms.sbms_monolith.repository.UserRepository;
import com.sbms.sbms_monolith.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;





@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;
    private final ChatMapper chatMapper;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;

    @MessageMapping("/chat.send")
    public void sendMessage(
            SendMessageRequest request,
            Principal principal
    ) {
        if (principal == null) {
            throw new IllegalStateException("Unauthenticated WebSocket message");
        }

        // ✅ Principal username = email
        String email = principal.getName();

        User sender = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException("WS user not found: " + email)
                );

        ChatMessage saved =
                chatService.sendMessage(request, sender);

        ChatMessageResponse response =
                chatMapper.toMessageResponse(saved);

        messagingTemplate.convertAndSend(
                "/topic/chat/" + response.getChatRoomId(),
                response
        );
    }
}
