// src/data/mockAnalyticsData.js

export const mockAnalyticsData = {
  // Key metrics - current snapshot
  currentMetrics: {
    totalUsers: '2,847',
    activeListings: '428',
    platformRevenue: '287,500',
    onlineUsers: '247',
    systemStatus: 'online',
    monthlyGrowth: 12.5,
    listingGrowth: 8.2,
    revenueGrowth: 22.1,
    pendingAds: 12,
    pendingReports: 10,
    occupancyRate: 78,
    avgRating: 4.2
  },

  // Time series data for charts
  timeSeriesData: {
    // Monthly data for line charts
    studentGrowth: [
      { month: 'Jan', students: 1200 },
      { month: 'Feb', students: 1350 },
      { month: 'Mar', students: 1450 },
      { month: 'Apr', students: 1550 },
      { month: 'May', students: 1650 },
      { month: 'Jun', students: 1750 },
      { month: 'Jul', students: 1850 },
      { month: 'Aug', students: 1950 },
      { month: 'Sep', students: 2050 },
      { month: 'Oct', students: 2100 },
      { month: 'Nov', students: 2120 },
      { month: 'Dec', students: 2154 }
    ],

    ownerGrowth: [
      { month: 'Jan', owners: 400 },
      { month: 'Feb', owners: 420 },
      { month: 'Mar', owners: 450 },
      { month: 'Apr', owners: 480 },
      { month: 'May', owners: 520 },
      { month: 'Jun', owners: 560 },
      { month: 'Jul', owners: 590 },
      { month: 'Aug', owners: 610 },
      { month: 'Sep', owners: 630 },
      { month: 'Oct', owners: 650 },
      { month: 'Nov', owners: 670 },
      { month: 'Dec', owners: 693 }
    ],

    listingPerformance: [
      {
        month: 'Jan',
        approved: 32,
        pending: 8,
        rejected: 4
      },
      {
        month: 'Feb',
        approved: 38,
        pending: 10,
        rejected: 5
      },
      {
        month: 'Mar',
        approved: 42,
        pending: 12,
        rejected: 6
      },
      {
        month: 'Apr',
        approved: 48,
        pending: 14,
        rejected: 7
      },
      {
        month: 'May',
        approved: 52,
        pending: 15,
        rejected: 8
      },
      {
        month: 'Jun',
        approved: 58,
        pending: 16,
        rejected: 9
      },
      {
        month: 'Jul',
        approved: 62,
        pending: 18,
        rejected: 10
      },
      {
        month: 'Aug',
        approved: 68,
        pending: 20,
        rejected: 11
      },
      {
        month: 'Sep',
        approved: 72,
        pending: 22,
        rejected: 12
      },
      {
        month: 'Oct',
        approved: 78,
        pending: 24,
        rejected: 13
      },
      {
        month: 'Nov',
        approved: 82,
        pending: 26,
        rejected: 14
      },
      {
        month: 'Dec',
        approved: 88,
        pending: 28,
        rejected: 15
      }
    ],

    revenueGrowth: [
      {
        month: 'Jan',
        revenue: 150000,
        growth: 0
      },
      {
        month: 'Feb',
        revenue: 165000,
        growth: 10
      },
      {
        month: 'Mar',
        revenue: 180000,
        growth: 9.1
      },
      {
        month: 'Apr',
        revenue: 195000,
        growth: 8.3
      },
      {
        month: 'May',
        revenue: 210000,
        growth: 7.7
      },
      {
        month: 'Jun',
        revenue: 225000,
        growth: 7.1
      },
      {
        month: 'Jul',
        revenue: 240000,
        growth: 6.7
      },
      {
        month: 'Aug',
        revenue: 255000,
        growth: 6.3
      },
      {
        month: 'Sep',
        revenue: 270000,
        growth: 5.9
      },
      {
        month: 'Oct',
        revenue: 280000,
        growth: 3.7
      },
      {
        month: 'Nov',
        revenue: 285000,
        growth: 1.8
      },
      {
        month: 'Dec',
        revenue: 287500,
        growth: 0.9
      }
    ]
  },

  // Categorical data
  categoricalData: {
    reportsByCategory: [
      { category: 'Safety', value: 35, color: '#EF4444' },
      { category: 'Payment', value: 28, color: '#F59E0B' },
      { category: 'Harassment', value: 18, color: '#8B5CF6' },
      { category: 'Misconduct', value: 12, color: '#3B82F6' },
      { category: 'Fraud', value: 5, color: '#10B981' },
      { category: 'Other', value: 2, color: '#665345' }
    ],

    userDistribution: [
      { role: 'Student', count: 2154, percentage: 75.6 },
      { role: 'Owner', count: 693, percentage: 24.4 }
    ],

    listingTypes: [
      { type: 'Hostel', count: 168, percentage: 39.3 },
      { type: 'Apartment', count: 128, percentage: 29.9 },
      { type: 'Boarding', count: 89, percentage: 20.8 },
      { type: 'House', count: 43, percentage: 10.0 }
    ],

    regionalDistribution: [
      { region: 'Colombo', listings: 168, users: 950, revenue: 120000 },
      { region: 'Kandy', listings: 89, users: 420, revenue: 65000 },
      { region: 'Galle', listings: 56, users: 320, revenue: 42000 },
      { region: 'Negombo', listings: 48, users: 280, revenue: 38000 },
      { region: 'Peradeniya', listings: 67, users: 360, revenue: 45000 }
    ]
  },

  // Top performers
  topPerformers: {
    topBoardings: [
      {
        id: 1,
        name: 'Green View Hostel',
        location: 'Colombo',
        owner: 'Kamal Perera',
        occupancy: 95,
        rating: 4.8,
        revenue: 450000,
        reviews: 128
      },
      {
        id: 2,
        name: 'Sunshine Boarding',
        location: 'Kandy',
        owner: 'Nimali Fernando',
        occupancy: 88,
        rating: 4.6,
        revenue: 380000,
        reviews: 95
      },
      {
        id: 3,
        name: 'City Center Hostel',
        location: 'Galle',
        owner: 'Saman Kumara',
        occupancy: 92,
        rating: 4.5,
        revenue: 420000,
        reviews: 112
      },
      {
        id: 4,
        name: 'University Dorm',
        location: 'Peradeniya',
        owner: 'Priya Silva',
        occupancy: 78,
        rating: 4.2,
        revenue: 320000,
        reviews: 76
      },
      {
        id: 5,
        name: 'Pearl Boarding',
        location: 'Negombo',
        owner: 'Anura Bandara',
        occupancy: 85,
        rating: 4.4,
        revenue: 360000,
        reviews: 89
      }
    ],

    topOwners: [
      {
        id: 1,
        name: 'Kamal Perera',
        email: 'kamal@example.com',
        listings: 5,
        totalRevenue: 850000,
        rating: 4.8,
        joined: '2023-05-15'
      },
      {
        id: 2,
        name: 'Nimali Fernando',
        email: 'nimali@example.com',
        listings: 3,
        totalRevenue: 720000,
        rating: 4.7,
        joined: '2023-08-22'
      },
      {
        id: 3,
        name: 'Saman Kumara',
        email: 'saman@example.com',
        listings: 4,
        totalRevenue: 680000,
        rating: 4.6,
        joined: '2023-07-10'
      }
    ],

    activeStudents: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        bookings: 3,
        totalSpent: 75000,
        lastActive: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Maria Silva',
        email: 'maria@example.com',
        bookings: 2,
        totalSpent: 50000,
        lastActive: '2024-01-14',
        status: 'active'
      },
      {
        id: 3,
        name: 'Raj Kumar',
        email: 'raj@example.com',
        bookings: 4,
        totalSpent: 95000,
        lastActive: '2024-01-15',
        status: 'active'
      }
    ]
  },

  // Performance metrics over time
  performanceMetrics: {
    weekly: {
      userGrowth: [142, 145, 148, 152, 155, 158, 160],
      revenue: [15000, 15200, 15500, 15800, 16000, 16200, 16500],
      listings: [12, 14, 15, 16, 18, 20, 22]
    },
    
    monthly: {
      userGrowth: [1200, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 2100, 2120, 2154],
      revenue: [150000, 165000, 180000, 195000, 210000, 225000, 240000, 255000, 270000, 280000, 285000, 287500]
    },
    
    quarterly: {
      userGrowth: [1200, 1550, 1950, 2154],
      revenue: [150000, 195000, 255000, 287500],
      growthRate: [0, 12.5, 10.8, 8.2]
    }
  },

  // System performance
  systemPerformance: {
    uptime: 99.8,
    responseTime: 120, // ms
    activeSessions: 247,
    apiCalls: 12450,
    errorRate: 0.2,
    serverLoad: 45
  },

  // Date ranges available
  dateRanges: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']
};

// Helper function to get data for specific date range
export const getAnalyticsDataByRange = (range = 'monthly') => {
  const baseData = { ...mockAnalyticsData };
  
  switch(range) {
    case 'daily':
      // Return last 7 days of data
      return {
        ...baseData,
        timeSeriesData: {
          studentGrowth: baseData.timeSeriesData.studentGrowth.slice(-7),
          ownerGrowth: baseData.timeSeriesData.ownerGrowth.slice(-7),
          listingPerformance: baseData.timeSeriesData.listingPerformance.slice(-7),
          revenueGrowth: baseData.timeSeriesData.revenueGrowth.slice(-7)
        }
      };
    
    case 'weekly':
      // Return weekly aggregated data
      return {
        ...baseData,
        timeSeriesData: baseData.performanceMetrics.weekly
      };
    
    case 'quarterly':
      // Return quarterly data
      return {
        ...baseData,
        timeSeriesData: baseData.performanceMetrics.quarterly
      };
    
    default: // monthly
      return baseData;
  }
};

// Helper function to update metrics (simulate real-time updates)
export const updateMetrics = () => {
  // Simulate minor fluctuations in data
  const updatedData = { ...mockAnalyticsData };
  
  // Randomly update online users
  const fluctuation = Math.floor(Math.random() * 20) - 10; // -10 to +10
  const currentOnline = parseInt(updatedData.currentMetrics.onlineUsers.replace(',', ''));
  updatedData.currentMetrics.onlineUsers = (currentOnline + fluctuation).toLocaleString();
  
  // Update last updated timestamp
  updatedData.lastUpdated = new Date().toISOString();
  
  return updatedData;
};

export default mockAnalyticsData;