package com.sbms.sbms_monolith.service;

import com.sbms.sbms_monolith.dto.admin.*;
import com.sbms.sbms_monolith.model.*;
import com.sbms.sbms_monolith.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sbms.sbms_monolith.model.enums.*;
import java.time.LocalDateTime;




@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final BoardingRepository boardingRepository;
    private final ReportRepository reportRepository;

    public AdminServiceImpl(
            UserRepository userRepository,
            BoardingRepository boardingRepository,
            ReportRepository reportRepository
    ) {
        this.userRepository = userRepository;
        this.boardingRepository = boardingRepository;
        this.reportRepository = reportRepository;
    }

    // =========================================================
    // DASHBOARD
    // =========================================================
    @Override
    public AdminDashboardDTO getDashboardStats() {

        long totalUsers = userRepository.count();
        long students = userRepository.countByRole(UserRole.STUDENT);
        long owners = userRepository.countByRole(UserRole.OWNER);

        long totalBoardings = boardingRepository.count();
        long pendingReports = reportRepository.countByStatus(ReportStatus.PENDING);

        return new AdminDashboardDTO(
                totalUsers,
                students,
                owners,
                totalBoardings,
                pendingReports
        );
    }

    // =========================================================
    // USERS
    // =========================================================
    @Override
    public List<AdminUserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(AdminUserResponseDTO::fromEntity)
                .toList();
    }

    @Override
    public void verifyOwner(Long userId, UserVerificationDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != UserRole.OWNER) {
            throw new RuntimeException("User is not an owner");
        }

        user.setVerifiedOwner(dto.isApproved());
        userRepository.save(user);
    }

    @Override
    public AdminUserResponseDTO promoteUserToAdmin(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(UserRole.ADMIN);
        User savedUser = userRepository.save(user);

        return AdminUserResponseDTO.fromEntity(savedUser);
    }

    // =========================================================
    // BOARDINGS
    // =========================================================
    @Override
    public List<AdminBoardingResponseDTO> getAllBoardings() {

        return boardingRepository.findAll()
                .stream()
                .map(AdminBoardingResponseDTO::fromEntity)
                .toList();
    }

    @Override
    public void approveBoarding(Long boardingId) {

        Boarding boarding = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        boarding.setStatus(Status.APPROVED);
        boardingRepository.save(boarding);
    }

    @Override
    public void rejectBoarding(Long boardingId, String reason) {

        Boarding boarding = boardingRepository.findById(boardingId)
                .orElseThrow(() -> new RuntimeException("Boarding not found"));

        boarding.setStatus(Status.REJECTED);

        // Optional: log admin reason later
        boardingRepository.save(boarding);
    }

    // =========================================================
    // REPORTS
    // =========================================================
    @Override
    public List<AdminReportResponseDTO> getReports(ReportStatus status) {

        List<Report> reports =
                (status == null)
                        ? reportRepository.findAll()
                        : reportRepository.findByStatus(status);

        return reports.stream()
                .map(AdminReportResponseDTO::fromEntity)
                .toList();
    }

    @Override
    public void resolveReport(Long reportId, ReportDecisionDTO dto) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setStatus(ReportStatus.RESOLVED);
        report.setResolutionDetails(dto.getResolutionDetails());
        report.setActionTaken(dto.getActionTaken());
        report.setActionDuration(dto.getActionDuration());
        report.setResolvedAt(LocalDateTime.now());

        reportRepository.save(report);
    }

    @Override
    public void dismissReport(Long reportId, ReportDecisionDTO dto) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setStatus(ReportStatus.DISMISSED);
        report.setDismissalReason(dto.getDismissalReason());
        report.setResolvedAt(LocalDateTime.now());

        reportRepository.save(report);
    }

    // =========================================================
    // ANALYTICS
    // =========================================================
    @Override
    public AnalyticsResponseDTO getAnalytics(String range) {
        int days = 30;
        if (range != null && range.endsWith("d")) {
            try {
                days = Integer.parseInt(range.replace("d", ""));
            } catch (NumberFormatException e) {
                days = 30;
            }
        }

        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(days - 1);
        DateTimeFormatter labelFmt = DateTimeFormatter.ofPattern("MMM d");

        // Labels for chart
        List<String> labels = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            labels.add(start.plusDays(i).format(labelFmt));
        }

        // Student trend
        List<User> students = userRepository.findByRole(com.sbms.sbms_monolith.model.enums.UserRole.STUDENT);
        List<Integer> studentData = new ArrayList<>(Collections.nCopies(days, 0));
        for (User u : students) {
            if (u.getCreatedAt() != null) {
                LocalDate d = u.getCreatedAt().toLocalDate();
                if (!d.isBefore(start) && !d.isAfter(today)) {
                    int idx = (int) ChronoUnit.DAYS.between(start, d);
                    studentData.set(idx, studentData.get(idx) + 1);
                }
            }
        }

        // Listing trend
        List<Boarding> allBoardings = boardingRepository.findAll();
        List<Integer> listingData = new ArrayList<>(Collections.nCopies(days, 0));
        for (Boarding b : allBoardings) {
            if (b.getCreatedAt() != null) {
                LocalDate d = b.getCreatedAt().toLocalDate();
                if (!d.isBefore(start) && !d.isAfter(today)) {
                    int idx = (int) ChronoUnit.DAYS.between(start, d);
                    listingData.set(idx, listingData.get(idx) + 1);
                }
            }
        }

        // Category data (by boardingType)
        Map<String, Integer> catCounts = new HashMap<>();
        for (Boarding b : allBoardings) {
            String key = b.getBoardingType() == null ? "UNKNOWN" : b.getBoardingType().name();
            catCounts.put(key, catCounts.getOrDefault(key, 0) + 1);
        }

        List<AnalyticsResponseDTO.StatDetail> stats = new ArrayList<>();
        stats.add(AnalyticsResponseDTO.StatDetail.builder().label("Total Users").value(String.valueOf(userRepository.count())).change("0").increase(false).icon("users").build());
        stats.add(AnalyticsResponseDTO.StatDetail.builder().label("Students").value(String.valueOf(userRepository.countByRole(com.sbms.sbms_monolith.model.enums.UserRole.STUDENT))).change("0").increase(false).icon("graduation-cap").build());
        stats.add(AnalyticsResponseDTO.StatDetail.builder().label("Total Listings").value(String.valueOf(boardingRepository.count())).change("0").increase(false).icon("home").build());
        stats.add(AnalyticsResponseDTO.StatDetail.builder().label("Pending Reports").value(String.valueOf(reportRepository.countByStatus(com.sbms.sbms_monolith.model.enums.ReportStatus.PENDING))).change("0").increase(false).icon("exclamation").build());

        AnalyticsResponseDTO.ChartData studentTrend = AnalyticsResponseDTO.ChartData.builder()
                .labels(labels)
                .datasets(Collections.singletonList(AnalyticsResponseDTO.Dataset.builder().label("Students").data(studentData).build()))
                .build();

        AnalyticsResponseDTO.ChartData listingTrend = AnalyticsResponseDTO.ChartData.builder()
                .labels(labels)
                .datasets(Collections.singletonList(AnalyticsResponseDTO.Dataset.builder().label("Listings").data(listingData).build()))
                .build();

        AnalyticsResponseDTO.ChartData categoryChart = AnalyticsResponseDTO.ChartData.builder()
                .labels(new ArrayList<>(catCounts.keySet()))
                .datasets(Collections.singletonList(AnalyticsResponseDTO.Dataset.builder().label("Categories").data(new ArrayList<>(catCounts.values())).build()))
                .build();

        return AnalyticsResponseDTO.builder()
                .stats(stats)
                .studentTrend(studentTrend)
                .listingTrend(listingTrend)
                .categoryData(categoryChart)
                .build();
    }
}

