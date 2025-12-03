package com.sbms.sbms_notification_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sbms.sbms_notification_service.model.Notification;
import com.sbms.sbms_notification_service.service.NotificationService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    private String getEmail(HttpServletRequest request) {
        String email = request.getHeader("X-User-Email");
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Unauthorized: Missing X-User-Email header from gateway");
        }
        return email;
    }

    // GET /api/notifications/unread-count
    @GetMapping("/unread-count")
    public ResponseEntity<Long> unreadCount(HttpServletRequest request) {
        String email = getEmail(request);
        long count = service.getUnreadCount(email);
        return ResponseEntity.ok(count);
    }

    // GET /api/notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(HttpServletRequest request) {
        String email = getEmail(request);
        return ResponseEntity.ok(service.getNotificationsForUser(email));
    }

    // PUT /api/notifications/{id}/read
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markRead(@PathVariable("id") String id) {
        var n = service.markAsRead(id);
        if (n == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(n);
    }

    // PUT /api/notifications/read-all
    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllRead(HttpServletRequest request) {
        String email = getEmail(request);
        service.markAllAsRead(email);
        return ResponseEntity.noContent().build();
    }
}
