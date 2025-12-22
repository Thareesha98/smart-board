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

// src/data/mockData.js for Reports page

export const initialReportsData = {
  pending: [
    {
      id: "R-1001",
      title: "Safety Concern - Exposed Wiring",
      type: "Safety",
      priority: "High",
      date: "2023-11-20",
      status: "pending",
      reporter: { name: "John Doe", role: "student", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
      reported: { name: "Kamal Perera", role: "owner", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      description: "There are exposed electrical wires in the common area that pose serious safety risks. The owner has been notified but hasn't acted.",
      evidence: {
        type: "image",
        url: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80",
        caption: "Exposed junction box in the shared kitchen"
      }
    },
    {
      id: "R-1002",
      title: "Unauthorized Guest Fee",
      type: "Financial",
      priority: "Medium",
      date: "2023-11-22",
      status: "pending",
      reporter: { name: "Priya Silva", role: "student", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
      reported: { name: "Nimal Siri", role: "owner", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
      description: "Owner is demanding an extra 5,000 LKR for weekend guests which was specifically listed as 'Free' in the original agreement.",
      evidence: {
        type: "document",
        url: "#",
        name: "Rental_Agreement_Oct_2023.pdf"
      }
    },
    {
      id: "R-1003",
      title: "Noise Complaint - Frequent Parties",
      type: "Conduct",
      priority: "Low",
      date: "2023-11-24",
      status: "pending",
      reporter: { name: "Arjun Mehta", role: "student", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
      reported: { name: "Suresh G.", role: "student", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
      description: "The reported student frequently hosts loud parties past midnight on weekdays, making it impossible to study.",
      evidence: null
    }
  ],
  investigating: [
    {
      id: "R-1004",
      title: "Misleading Photos in Listing",
      type: "Misinformation",
      priority: "Medium",
      date: "2023-11-15",
      status: "investigating",
      reporter: { name: "Saman Kumara", role: "student", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      reported: { name: "Sunil Perera", role: "owner", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
      description: "The photos show a renovated room, but the actual room provided has mold on the walls and a broken window.",
      evidence: {
        type: "image",
        url: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&w=800&q=80",
        caption: "Actual condition of the room upon arrival"
      }
    },
    {
      id: "R-1005",
      title: "Water Supply Cut-off",
      type: "Utility",
      priority: "High",
      date: "2023-11-18",
      status: "investigating",
      reporter: { name: "Dilini W.", role: "student", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
      reported: { name: "Bandara K.", role: "owner", avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
      description: "The property has had no water for 3 days. Landlord claims a pipe burst but hasn't called a plumber."
    },
    {
      id: "R-1006",
      title: "Suspicious Payment Request",
      type: "Fraud",
      priority: "High",
      date: "2023-11-25",
      status: "investigating",
      reporter: { name: "Liam O.", role: "student", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
      reported: { name: "Unknown User", role: "owner", avatar: "https://randomuser.me/api/portraits/men/60.jpg" },
      description: "User asked for a 'Holding Deposit' via a third-party link before I even saw the house."
    }
  ],
  resolved: [
    {
      id: "R-0995",
      title: "Broken Main Door Lock",
      type: "Safety",
      priority: "High",
      date: "2023-11-05",
      status: "resolved",
      reporter: { name: "Kasun T.", role: "student", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
      reported: { name: "Nimal Siri", role: "owner", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
      description: "The electronic lock on the main entrance is malfunctioning, leaving the house unlocked at night.",
      solution: "Owner provided proof of repair from a locksmith. Tenant confirmed the fix is working."
    },
    {
      id: "R-0992",
      title: "Incorrect Utility Billing",
      type: "Financial",
      priority: "Medium",
      date: "2023-11-02",
      status: "resolved",
      reporter: { name: "Maya R.", role: "student", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
      reported: { name: "Ruwan Dias", role: "owner", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
      description: "Charged double for electricity this month without any increase in usage.",
      solution: "Admin verified the meter reading error. Landlord agreed to deduct the excess from next month's rent."
    },
    {
      id: "R-0990",
      title: "Wifi Services Not Provided",
      type: "Utility",
      priority: "Low",
      date: "2023-10-28",
      status: "resolved",
      reporter: { name: "Kevin L.", role: "student", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
      reported: { name: "Bandara K.", role: "owner", avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
      description: "Listing promised High-Speed Wifi, but it has been disconnected for weeks.",
      solution: "Landlord upgraded the plan and provided a new router."
    }
  ],
  dismissed: [
    {
      id: "R-0985",
      title: "Neighbor's Dog Barking",
      type: "Conduct",
      priority: "Low",
      date: "2023-10-25",
      status: "dismissed",
      reporter: { name: "John Doe", role: "student", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
      description: "The neighbor's dog barks every morning for 10 minutes.",
      dismissalReason: "Not a violation of platform policy. This is a general residential issue outside of the platform's control."
    },
    {
      id: "R-0982",
      title: "Listing price is too high",
      type: "Feedback",
      priority: "Low",
      date: "2023-10-20",
      status: "dismissed",
      reporter: { name: "Sarah J.", role: "student", avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
      description: "This hostel is overpriced compared to others in the area.",
      dismissalReason: "Owners are allowed to set their own prices. No policy violation detected."
    },
    {
      id: "R-0980",
      title: "Unfriendly Landlord",
      type: "Conduct",
      priority: "Low",
      date: "2023-10-15",
      status: "dismissed",
      reporter: { name: "Alex K.", role: "student", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
      description: "The landlord spoke rudely to me when I asked about the deposit.",
      dismissalReason: "Insufficient evidence of harassment. Warning sent to landlord regarding professional conduct."
    }
  ]
};

// ... Analytics page


export const analyticsMockData = {
  '30d': {
    stats: [
      { label: 'Total Boarders', value: '1,240', change: '12%', increase: true, icon: 'fa-user-graduate' },
      { label: 'Verified Owners', value: '84', change: '5%', increase: true, icon: 'fa-house-user' },
      { label: 'Active Listings', value: '156', change: '8%', increase: true, icon: 'fa-bed' },
      { label: 'Monthly Revenue', value: 'LKR 450k', change: '2%', increase: true, icon: 'fa-wallet' }
    ],
    studentTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{ 
        label: 'New Boarders',
        data: [1100, 1150, 1200, 1240], 
        borderColor: '#D84C38', 
        backgroundColor: 'rgba(216, 76, 56, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    listingTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{ 
        label: 'Bookings',
        data: [90, 105, 130, 156], 
        borderColor: '#FF7A00', 
        backgroundColor: 'rgba(255, 122, 0, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    categoryData: {
      labels: ['Single Rooms', 'Shared Rooms', 'Annexes', 'Full House'],
      datasets: [{ 
        data: [45, 25, 20, 10], 
        backgroundColor: ['#D84C38', '#FF7A00', '#332720', '#E8DBC7'],
        borderWidth: 0
      }]
    },
    revenueTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{ 
        label: 'Revenue',
        data: [380, 410, 425, 450], 
        borderColor: '#10B981', 
        tension: 0.4 
      }]
    }
  }
};

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