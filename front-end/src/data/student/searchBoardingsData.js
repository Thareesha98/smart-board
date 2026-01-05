export const sampleBoardings = [
  {
    id: 1,
    name: "Sunshine Hostel",
    price: 350,
    priceNote: "Utilities included",
    // rating: 4.5,
    reviewCount: 23,
    location: "1.2 km from campus",
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "AC", "Laundry", "Security"],
    badge: "Verified",
    gender: "any",
    roomType: "single",
    description: [
      "Modern hostel with high-speed WiFi, air conditioning, and 24/7 security. Perfect for students seeking comfort and safety.",
      "Recently renovated with new furniture and appliances. Quiet neighborhood with nearby facilities."
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "Single Room" },
      { icon: "ruler", label: "200 sq ft" },
      { icon: "users", label: "4 Roommates" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "10:00 PM - 7:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Max 2 guests, overnight requires approval" },
      { icon: "smoking-ban", title: "Smoking", description: "Strictly prohibited indoors" },
      { icon: "paw", title: "Pets", description: "Small pets allowed with deposit" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 1.2km",
      "Supermarket - 0.5km",
      "Bus Stop - 0.2km",
      "Library - 0.8km",
      "Hospital - 2.1km"
    ],
    reviewsSummary: {
      // overall: 4.5,
      breakdown: [
        { stars: 5, percentage: 60 },
        { stars: 4, percentage: 25 },
        { stars: 3, percentage: 10 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 }
      ]
    },
    owner: {
      name: "Kamal Perera",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
      rating: 4.7,
      reviewCount: 45,
      // ✅ Added Contact Info
      contact: "077-1234567",
      email: "kamal.p@example.com",
      stats: {
        properties: 3,
        years: 2,
        responseRate: 92
      },
      description: "Experienced property manager with student-friendly accommodations."
    }
  },
  {
    id: 2,
    name: "City View Apartments",
    price: 420,
    priceNote: "Utilities included",
    rating: 4.2,
    reviewCount: 15,
    location: "0.8 km from campus",
    distance: 0.8,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "AC", "Parking", "Furnished"],
    badge: "Premium",
    gender: "any",
    roomType: "apartment",
    description: [
      "Luxury apartments with stunning city views and modern amenities. Perfect for students who want premium living.",
      "Fully furnished with contemporary furniture. Close to public transport and shopping centers."
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "1 Bedroom" },
      { icon: "ruler", label: "350 sq ft" },
      { icon: "users", label: "Private" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "10:00 PM - 7:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Guests allowed with notice" },
      { icon: "smoking-ban", title: "Smoking", description: "Balcony only" },
      { icon: "paw", title: "Pets", description: "Not allowed" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 0.8km",
      "Shopping Mall - 0.3km",
      "Bus Stop - 0.1km",
      "Gym - 0.4km",
      "Restaurant - 0.2km"
    ],
    reviewsSummary: {
      overall: 4.2,
      breakdown: [
        { stars: 5, percentage: 50 },
        { stars: 4, percentage: 30 },
        { stars: 3, percentage: 15 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 }
      ]
    },
    owner: {
      name: "Nimal Silva",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      verified: true,
      // rating: 4.5,
      reviewCount: 32,
      // ✅ Added Contact Info
      contact: "071-9876543",
      email: "nimal.silva@example.com",
      stats: {
        properties: 8,
        years: 5,
        responseRate: 96
      },
      description: "Professional property owner specializing in premium student accommodations."
    }
  },
  {
    id: 3,
    name: "Garden View Rooms",
    price: 380,
    priceNote: "Water & electricity extra",
    rating: 4.7,
    reviewCount: 31,
    location: "1.5 km from campus",
    distance: 1.5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "Laundry", "Security"],
    badge: "Eco-Friendly",
    gender: "female",
    roomType: "shared",
    description: [
      "Peaceful environment with beautiful garden views. Female-only accommodation with strict security.",
      "Spacious rooms with natural lighting. Quiet study environment perfect for focused students."
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "Shared Room" },
      { icon: "ruler", label: "180 sq ft" },
      { icon: "users", label: "2 Roommates" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "9:00 PM - 7:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Female guests only, day visits" },
      { icon: "smoking-ban", title: "Smoking", description: "Strictly prohibited" },
      { icon: "paw", title: "Pets", description: "Not allowed" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 1.5km",
      "Market - 0.6km",
      "Bus Stop - 0.3km",
      "Pharmacy - 0.4km",
      "Park - 0.2km"
    ],
    reviewsSummary: {
      overall: 4.7,
      breakdown: [
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 7 },
        { stars: 2, percentage: 2 },
        { stars: 1, percentage: 1 }
      ]
    },
    owner: {
      name: "Sangeeta Fernando",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true,
      rating: 4.8,
      reviewCount: 67,
      // ✅ Added Contact Info
      contact: "070-5551234",
      email: "sangeeta.f@example.com",
      stats: {
        properties: 4,
        years: 4,
        responseRate: 98
      },
      description: "Trusted female property owner with focus on student safety and comfort."
    }
  },
  {
    id: 4,
    name: "University Heights",
    price: 320,
    priceNote: "All inclusive",
    rating: 4.3,
    reviewCount: 18,
    location: "0.5 km from campus",
    distance: 0.5,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "AC", "Security"],
    badge: "Student Favorite",
    gender: "any",
    roomType: "single",
    description: [
      "Located right next to campus for maximum convenience. Budget-friendly with essential amenities.",
      "Popular among students for its proximity and friendly community atmosphere."
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "Single Room" },
      { icon: "ruler", label: "150 sq ft" },
      { icon: "users", label: "6 Roommates" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "11:00 PM - 6:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Max 1 guest at a time" },
      { icon: "smoking-ban", title: "Smoking", description: "Outdoor areas only" },
      { icon: "paw", title: "Pets", description: "Not allowed" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 0.5km",
      "Cafeteria - 0.2km",
      "Bus Stop - 0.1km",
      "Bookstore - 0.3km",
      "ATM - 0.2km"
    ],
    reviewsSummary: {
      overall: 4.3,
      breakdown: [
        { stars: 5, percentage: 55 },
        { stars: 4, percentage: 25 },
        { stars: 3, percentage: 15 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 }
      ]
    },
    owner: {
      name: "Ravi Mendis",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      verified: true,
      rating: 4.4,
      reviewCount: 41,
      // ✅ Added Contact Info
      contact: "076-4449988",
      email: "ravi.mendis@example.com",
      stats: {
        properties: 2,
        years: 3,
        responseRate: 89
      },
      description: "Friendly landlord known for maintaining affordable student housing."
    }
  },
  {
    id: 5,
    name: "Ocean Breeze Hostel",
    price: 400,
    priceNote: "Premium package",
    rating: 4.8,
    reviewCount: 27,
    location: "2.0 km from campus",
    distance: 2.0,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "AC", "Laundry"],
    badge: "Luxury",
    gender: "any",
    roomType: "single",
    description: [
      "Experience luxury living with beach access and ocean views. Premium facilities for discerning students.",
      "Features include rooftop terrace, modern gym, and study lounges with stunning sea views."
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "Deluxe Room" },
      { icon: "ruler", label: "300 sq ft" },
      { icon: "users", label: "Private" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "10:00 PM - 7:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Guests welcome with registration" },
      { icon: "smoking-ban", title: "Smoking", description: "Designated areas only" },
      { icon: "paw", title: "Pets", description: "Service animals only" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 2.0km",
      "Beach - 0.3km",
      "Bus Stop - 0.2km",
      "Restaurant Row - 0.4km",
      "Spa - 0.5km"
    ],
    reviewsSummary: {
      overall: 4.8,
      breakdown: [
        { stars: 5, percentage: 80 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 3 },
        { stars: 2, percentage: 1 },
        { stars: 1, percentage: 1 }
      ]
    },
    owner: {
      name: "Dinesh Jayawardena",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      verified: true,
      rating: 4.9,
      reviewCount: 93,
      // ✅ Added Contact Info
      contact: "072-9993322",
      email: "dinesh.j@example.com",
      stats: {
        properties: 6,
        years: 7,
        responseRate: 99
      },
      description: "Award-winning property manager with luxury accommodation expertise."
    }
  },
  {
    id: 6,
    name: "Campus Comfort",
    price: 290,
    priceNote: "Basic utilities included",
    rating: 4.1,
    reviewCount: 12,
    location: "0.3 km from campus",
    distance: 0.3,
    image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "Security"],
    badge: "Budget",
    gender: "male",
    roomType: "shared",
    description: [
      "Affordable accommodation with essential amenities. Perfect for budget-conscious students.",
      "Male-only facility with secure environment. Walking distance to campus and local amenities."
    ],
    images: [
      "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80"
    ],
    quickStats: [
      { icon: "bed", label: "Shared Room" },
      { icon: "ruler", label: "140 sq ft" },
      { icon: "users", label: "3 Roommates" }
    ],
    houseRules: [
      { icon: "clock", title: "Quiet Hours", description: "11:00 PM - 6:00 AM" },
      { icon: "user-friends", title: "Guest Policy", description: "Day visits only" },
      { icon: "smoking-ban", title: "Smoking", description: "Outdoor designated area" },
      { icon: "paw", title: "Pets", description: "Not allowed" }
    ],
    nearbyPlaces: [
      "University of Ruhuna - 0.3km",
      "Food Court - 0.1km",
      "Bus Stop - 0.1km",
      "Convenience Store - 0.2km",
      "Laundromat - 0.3km"
    ],
    reviewsSummary: {
      overall: 4.1,
      breakdown: [
        { stars: 5, percentage: 45 },
        { stars: 4, percentage: 30 },
        { stars: 3, percentage: 20 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 }
      ]
    },
    owner: {
      name: "Sunil Wickramasinghe",
      avatar: "https://randomuser.me/api/portraits/men/71.jpg",
      verified: true,
      rating: 4.2,
      reviewCount: 28,
      // ✅ Added Contact Info
      contact: "078-7771122",
      email: "sunil.w@example.com",
      stats: {
        properties: 3,
        years: 2,
        responseRate: 85
      },
      description: "Budget accommodation specialist serving students for over 2 years."
    }
  }
];

export const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
];

export const safetyTips = [
  "Always verify the owner's identity before paying any advance.",
  "Visit the boarding place in person before making a final decision.",
  "Read the contract carefully and understand the refund policy.",
  "Check the neighborhood for safety, especially if you have late classes.",
  "Keep a record of all payments and communications with the owner."
];