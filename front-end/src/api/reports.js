// src/api/reports.js
import { initialReportsData } from '../data/mockReportsData.js';

let currentReportsState = initialReportsData;
const REPORTS_PER_PAGE = 10;

// Helper to calculate statistics
export const getReportStats = () => {
    return {
        totalReports: currentReportsState.pending.length + currentReportsState.investigating.length + currentReportsState.resolved.length,
        pending: currentReportsState.pending.length,
        resolved: currentReportsState.resolved.length,
    };
}

// Helper to filter reports by category (Student/Owner reported)
const filterReportsByCategory = (reports, category) => {
    if (category === 'all') return reports;
    if (category === 'students') return reports.filter(r => r.reported.role === 'Student');
    if (category === 'owners') return reports.filter(r => r.reported.role === 'Owner');
    return reports;
}

// Simulates fetching reports with filtering and pagination
export const fetchReports = async (tab, page, category, search = '') => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let reports = currentReportsState[tab] || [];
  
  // Apply Category Filter
  reports = filterReportsByCategory(reports, category);

  // Apply Search/Filter
  if (search) {
      const term = search.toLowerCase();
      reports = reports.filter(report => 
          report.title.toLowerCase().includes(term) || 
          report.reported.name.toLowerCase().includes(term)
      );
  }

  // Apply Pagination
  const startIndex = (page - 1) * REPORTS_PER_PAGE;
  const paginatedReports = reports.slice(startIndex, startIndex + REPORTS_PER_PAGE);
  const totalPages = Math.ceil(reports.length / REPORTS_PER_PAGE);
  
  return {
    reports: paginatedReports,
    totalPages: totalPages,
    totalCount: reports.length,
  };
};

// Simulates dismissing an ad (moves it to resolved)
export const dismissReport = async (reportId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Check pending first
    let index = currentReportsState.pending.findIndex(r => r.id === reportId);
    let adToMove = index !== -1 ? currentReportsState.pending.splice(index, 1)[0] : null;

    if (!adToMove) {
        // Check investigating
        index = currentReportsState.investigating.findIndex(r => r.id === reportId);
        adToMove = index !== -1 ? currentReportsState.investigating.splice(index, 1)[0] : null;
    }

    if (adToMove) {
        adToMove.status = 'resolved';
        adToMove.dismissalReason = reason;
        adToMove.resolvedDate = new Date().toISOString().split('T')[0];
        currentReportsState.resolved.push(adToMove);
        return { success: true, message: `Report ID ${reportId} dismissed.` };
    }
    return { success: false, message: `Report ID ${reportId} not found in pending/investigating list.` };
};

// Simulates suspending a user (placeholder - would typically use a separate user API)
export const suspendUser = async (userEmail, duration, reason) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`User ${userEmail} suspended for ${duration} because: ${reason}`);
    
    // In a real app, this would update user status in the database
    // For the mock, we just return success
    return { 
        success: true, 
        message: `User ${userEmail} suspended for ${duration}.`,
        user: userEmail
    };
};