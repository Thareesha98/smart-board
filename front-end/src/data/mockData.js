// src/data/mockData.js

/**
 * 1. DASHBOARD STATS
 * Used by StatsGrid.jsx
 */
export const statsData = [
  { label: "Total Users", value: "1,284", change: "+12%", increase: true, icon: "fa-users" },
  { label: "Active Ads", value: "452", change: "+5.4%", increase: true, icon: "fa-home" },
  { label: "Monthly Revenue", value: "Rs. 142k", change: "-2.1%", increase: false, icon: "fa-wallet" },
  { label: "Pending Reviews", value: "12", change: null, increase: null, icon: "fa-clock" },
];

/**
 * 2. USER MANAGEMENT DATA
 * Used by AdminUsers.jsx
 */
export const initialUsers = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "student",
    status: "active",
    registrationDate: "2023-10-12",
    lastActive: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    phone: "+94 77 123 4567"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@property.lk",
    role: "owner",
    status: "active",
    registrationDate: "2023-08-05",
    lastActive: "1 day ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+94 71 998 2231"
  }
];

/**
 * 3. ADVERTISEMENT DATA
 * Optimized for AdDetailsModal.jsx with Amenities and Reviews
 */
export const initialAds = [
  {
    id: 1,
    title: "Sunset Hostel - Premium Rooms",
    location: "Colombo 07",
    price: "Rs. 12,500",
    type: "hostel",
    status: "pending",
    dateSubmitted: "2024-03-20",
    description: "Beautiful hostel with AC rooms, Wi-Fi, and 24/7 security. Perfect for university students. Walking distance to major transport hubs.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800"
    ],
    owner: {
      name: "Kamal Perera",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    // New data fields for modal
    amenities: [
      { label: "Free Wi-Fi", icon: "fa-wifi" },
      { label: "AC Rooms", icon: "fa-snowflake" },
      { label: "Kitchen", icon: "fa-utensils" },
      { label: "24/7 Security", icon: "fa-shield-alt" },
      { label: "Laundry", icon: "fa-tshirt" }
    ],
    reviews: [
      { studentName: "Saman Kumara", rating: 5, comment: "Very clean and near the campus. Highly recommended for first-year students!" },
      { studentName: "Dulaj Perera", rating: 4, comment: "Great place but the kitchen can get crowded in the evenings." }
    ]
  },
  {
    id: 2,
    title: "Modern Annex near University",
    location: "Kandy City",
    price: "Rs. 25,000",
    type: "annex",
    status: "pending",
    dateSubmitted: "2024-03-21",
    description: "Private entrance annex with one bedroom and attached bathroom. Includes electricity and water bills.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    owner: {
      name: "Sunil Dharmasiri",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    amenities: [
      { label: "Private Entrance", icon: "fa-door-open" },
      { label: "Parking", icon: "fa-car" },
      { label: "Attached Bath", icon: "fa-bath" }
    ],
    reviews: [] 
  }
];

/**
 * 4. SYSTEM REPORTS
 * Used by RecentReports.jsx
 */
export const recentReports = [
  { 
    id: 1, 
    type: 'urgent', 
    icon: 'fa-exclamation-circle', 
    title: 'Fraudulent Ad Reported', 
    desc: 'User reported "Luxury Villa" as a scam.', 
    meta: '15 mins ago' 
  }
];

/**
 * 5. ACTIVITY FEED
 * Used by ActivityFeed.jsx
 */
export const initialActivities = [
  { id: 1, type: 'success', icon: 'fa-check-circle', text: 'Admin approved Sunset Hostel listing', time: '5 mins ago' }
];

/**
 * 6. DASHBOARD APPROVALS LIST
 * Derived from initialAds
 */
export const initialApprovals = initialAds
  .filter(ad => ad.status === 'pending')
  .map(ad => ({
    id: ad.id,
    title: ad.title,
    submittedBy: ad.owner.name,
    time: ad.dateSubmitted
  }));