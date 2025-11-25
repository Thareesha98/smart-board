// ===================================
// Mock Data for Owner Dashboard Pages
// ===================================

export const dashboardData = {
  userName: "Rajesh K.",
  totalAds: 8,
  activeAds: 6,
  pendingAds: 2,
  totalTenants: 12,
  occupancyRate: "75%",
  monthlyRevenue: 2400,
  revenueGrowth: "+12%",
  avgRating: "4.2/5.0",
  newAppointmentsCount: 3,
};

export const recentAppointments = [
  {
    id: "apt1",
    student: "Priya Sharma",
    property: "Sunshine Hostel",
    time: "Tomorrow 2:00 PM",
    status: "pending",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    isNew: true,
  },
  {
    id: "apt2",
    student: "Arun Kumar",
    property: "City View Apartments",
    time: "Dec 28, 3:30 PM",
    status: "confirmed",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    isNew: true,
  },
  {
    id: "apt3",
    student: "Meena Patel",
    property: "Green Valley Hostel",
    time: "Dec 29, 11:00 AM",
    status: "pending",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    isNew: false,
  },
  {
    id: "apt4",
    student: "Rahul Verma",
    property: "Sunshine Hostel",
    time: "Dec 27, 4:00 PM",
    status: "completed",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    isNew: false,
  },
];

export const recentActivity = [
  {
    icon: "fas fa-calendar-plus",
    text: "New appointment requested by",
    bold: "Priya Sharma",
    time: "2 hours ago",
  },
  {
    icon: "fas fa-credit-card",
    text: "Payment received from",
    bold: "Rohan Mehta - $250",
    time: "1 day ago",
  },
  {
    icon: "fas fa-tools",
    text: "Maintenance request submitted for",
    bold: "Room 5 plumbing",
    time: "2 days ago",
  },
  {
    icon: "fas fa-star",
    text: "New review received for",
    bold: "Sunshine Hostel - 5 stars",
    time: "3 days ago",
  },
];

export const mockAdDatabase = [
    // ... (mock data remains the same)
    {
        id : '456',
        title: 'Budget Friendly Room, 10 min to Campus',
        address: '777 Suburb Road, Matara',
        rent: '10000',
        deposit: '20000',
        description: "A secure, clean room suitable for male students. Shared bathroom. Includes essential furniture.",
        amenities: ['Kitchen Access', 'Laundry'],
        currentImages: ['url-to-budget-room-img-1', 'url-to-budget-room-img-2'],
        adStatus: 'Draft',
    },
    {
        id : '123',
        title: 'Luxury Studio near University',
        address: 'No. 34, Temple Road, Matara',
        rent: '18000',
        deposit: '36000',
        description: "A newly built, fully furnished luxury studio apartment...",
        amenities: ['Attached Bathroom', 'Wi-Fi', 'Parking'],
        currentImages: ['url-to-luxury-img-1', 'url-to-luxury-img-2', 'url-to-luxury-img-3'],
        adStatus: 'Active',
    }
];

export const mockAds = [
  {
      id: '101',
      title: 'Luxury Studio near University',
      address: '34, Temple Rd, Matara',
      rent: 18000,
      status: 'Active',
      views: 1240,
      appointments: 42,
      selected: 3,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=200&q=80',
  },
  {
      id: '102',
      title: 'Budget Friendly Room, 10 min to Campus',
      address: '777 Suburb Rd, Matara',
      rent: 10000,
      status: 'Draft',
      views: 5,
      appointments: 0,
      selected: 0,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=200&q=80',
  },
  {
      id: '103',
      title: 'Spacious Family Boarding',
      address: '12, Galle Rd, Matara',
      rent: 25000,
      status: 'Inactive',
      views: 450,
      appointments: 15,
      selected: 1,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=200&q=80',
  },
  {
      id: '104',
      title: 'Semi-Luxury Single Room',
      address: '9, Lake View Lane, Matara',
      rent: 15000,
      status: 'Active',
      views: 890,
      appointments: 30,
      selected: 2,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80',
  },
  {
      id: '105',
      title: 'Room with Garden Access',
      address: '20, Green Valley Rd, Matara',
      rent: 12000,
      status: 'Pending',
      views: 200,
      appointments: 5,
      selected: 0,
      image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '456',
    title: 'Budget Friendly Room, 10 min to Campus',
    address: '777 Suburb Road, Matara',
    rent: 10000,
    status: 'Draft', // Using 'status' field for consistency
    views: 10,
    appointments: 0,
    selected: 0,
    image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=200&q=80',
  },
  // Added from mockAdDatabase '123'
  {
    id: '123',
    title: 'Luxury Studio near University',
    address: 'No. 34, Temple Road, Matara',
    rent: 18000,
    status: 'Active',
    views: 2000,
    appointments: 60,
    selected: 5,
    image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=200&q=80',
  },
];

export const boardingsData = [
  {
    id: "sunshine-hostel",
    name: "Sunshine Hostel",
    address: "123 University Road, Colombo 03",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
    rent: "$200 - $300",
    availableRooms: 2,
    totalRooms: 4,
    totalTenants: 6,
    rating: 4.5,
    status: "active",
    features: ["4 Rooms", "6 Tenants"],
  },
  {
    id: "city-view",
    name: "City View Apartments",
    address: "45 Galle Road, Colombo 04",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=250&fit=crop",
    rent: "$350 - $500",
    availableRooms: 2,
    totalRooms: 6,
    totalTenants: 4,
    rating: 4.2,
    status: "active",
    features: ["6 Rooms", "4 Tenants"],
  },
  {
    id: "green-valley",
    name: "Green Valley Hostel",
    address: "78 Kandy Road, Kadawatha",
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=250&fit=crop",
    rent: "$150 - $250",
    availableRooms: 3,
    totalRooms: 3,
    totalTenants: 0,
    rating: 0.0,
    status: "pending",
    features: ["3 Rooms", "0 Tenants"],
  },
];

export const statData = {
  totalProperties: 8,
  activeProperties: 6,
  pendingProperties: 2,
  currentTenants: 12,
  occupancyRate: "75%",
  availableRooms: 4,
  totalRooms: 16,
  avgRating: "4.2/5.0",
  reviewCount: 45,
};

export const INITIAL_BOARDINGS_DATA = [
  {
    id: "sunshine-hostel",
    name: "Sunshine Hostel",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop",
    address: "123 University Road, Colombo 03",
    baseRent: 30000,
    lastUpdated: "Nov 2025",
    electricityCost: 5500, // Initial Mock Value
    waterCost: 1200, // Initial Mock Value
    totalTenants: 6,
    status: "active",
  },
  {
    id: "city-view",
    name: "City View Apartments",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=200&h=150&fit=crop",
    address: "45 Galle Road, Colombo 04",
    baseRent: 40000,
    lastUpdated: "Dec 2025",
    electricityCost: 4800,
    waterCost: 900,
    totalTenants: 4,
    status: "active",
  },
  {
    id: "green-valley",
    name: "Green Valley Hostel",
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=200&h=150&fit=crop",
    address: "78 Kandy Road, Kadawatha",
    baseRent: 20000,
    lastUpdated: "N/A",
    electricityCost: 0,
    waterCost: 0,
    totalTenants: 0,
    status: "pending",
  },
  {
    id: "Eliyakanda-hostel",
    name: "Eliyakanda Hostel",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop",
    address: "123 University Road, Colombo 03",
    baseRent: 30000,
    lastUpdated: "Nov 2025",
    electricityCost: 5500, // Initial Mock Value
    waterCost: 1200, // Initial Mock Value
    totalTenants: 6,
    status: "active",
  },
];

export const ownerData = {
  firstName: 'Mr.',
  lastName: 'Silva',
  businessName: 'Sunshine Hostels & Rooms',
  email: 'sunshinehostels@gmail.com',
  role: 'Boarding Owner',
  avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
  totalAds: 4,
  activeTenants: 15,
  appointmentsCompleted: 78,
  rating: '4.7 / 5',
  phone: '+94 77 123 4567',
  contactAddress: '123 University Avenue, Matara',
  joined: 'January 2023',
  verificationStatus: 'University Verified',
  paymentAcc: 'BOC Account **** 5678',
};

export const mockAppointments = [
  // PENDING APPOINTMENTS
  {
    id: 1,
    student: "Priya S.",
    date: "2025-11-20",
    time: "14:00",
    status: "pending",
    boardingName: "Sunshine Hostel",
    boardingId: "sunshine-hostel",
    contact: "+94 77 123 4567",
    notes: "Prefers morning slots.",
    createdAt: "2025-11-15",
  },
  {
    id: 2,
    student: "Kamal D.",
    date: "2025-11-22",
    time: "10:00",
    status: "pending",
    boardingName: "City View Apartments",
    boardingId: "city-view",
    contact: "+94 76 234 5678",
    notes: "Will bring a parent.",
    createdAt: "2025-11-14",
  },

  // CONFIRMED APPOINTMENTS
  {
    id: 3,
    student: "Nimali R.",
    date: "2025-11-18",
    time: "15:30",
    status: "confirmed",
    boardingName: "Green Valley Hostel",
    boardingId: "green-valley",
    contact: "+94 71 888 9999",
    notes: "Eco-friendly environment.",
    createdAt: "2025-11-10",
  },
  {
    id: 4,
    student: "Gayan B.",
    date: "2025-11-25",
    time: "11:00",
    status: "confirmed",
    boardingName: "Student Paradise",
    boardingId: "student-paradise",
    contact: "+94 76 555 4444",
    notes: "Study room available.",
    createdAt: "2025-11-09",
  },

  // VISITED
  {
    id: 5,
    student: "Anusha K.",
    date: "2025-11-15",
    time: "16:00",
    status: "visited",
    boardingName: "Lake View Rooms",
    boardingId: "lake-view",
    contact: "+94 77 666 7777",
    notes: "Peaceful lakeside location.",
    createdAt: "2025-11-05",
  },

  // CANCELLED/REJECTED
  {
    id: 6,
    student: "Sunil M.",
    date: "2025-11-05",
    time: "09:30",
    status: "cancelled",
    boardingName: "Modern Studios",
    boardingId: "modern-studios",
    contact: "+94 70 333 2222",
    notes: "Owner rejected due to unavailability.",
    createdAt: "2025-11-01",
  },
];