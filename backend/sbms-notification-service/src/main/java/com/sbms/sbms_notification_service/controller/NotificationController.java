package com.sbms.sbms_notification_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.sbms.sbms_notification_service.model.Notification;
import com.sbms.sbms_notification_service.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // GET /api/notifications/unread-count
    @GetMapping("/unread-count")
    public ResponseEntity<Long> unreadCount(@AuthenticationPrincipal Jwt jwt) {
        String userId = getUserIdFromJwt(jwt);
        long count = service.getUnreadCount(userId);
        return ResponseEntity.ok(count);
    }

    // GET /api/notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@AuthenticationPrincipal Jwt jwt) {
        String userId = getUserIdFromJwt(jwt);
        return ResponseEntity.ok(service.getNotificationsForUser(userId));
    }

    // PUT /api/notifications/{id}/read
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markRead(@PathVariable("id") String id, @AuthenticationPrincipal Jwt jwt) {
        // Optionally verify ownership
        var n = service.markAsRead(id);
        if (n == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(n);
    }

    // PUT /api/notifications/read-all
    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllRead(@AuthenticationPrincipal Jwt jwt) {
        String userId = getUserIdFromJwt(jwt);
        service.markAllAsRead(userId);
        return ResponseEntity.noContent().build();
    }

    private String getUserIdFromJwt(Jwt jwt) {
        // adapt to your JWT claims. Common claims: sub, userId, preferred_username
        if (jwt == null) throw new RuntimeException("Unauthorized");
        return jwt.getClaimAsString("sub"); // or "userId" if you use custom claim
    }
}
