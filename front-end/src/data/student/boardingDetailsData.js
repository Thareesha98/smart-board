export const boardingDetails = {
  id: 1,
  name: "Sunshine Hostel",
  price: 350,
  priceNote: "Utilities included",
  rating: 4.8,
  reviewCount: 127,
  badge: "Premium",
  location: {
    address: "123 University Road, Colombo 03",
    distance: "1.2 km from University of Ruhuna"
  },
  quickStats: [
    { icon: "bed", label: "Single Room" },
    { icon: "ruler", label: "200 sq ft" },
    { icon: "users", label: "4 Roommates" }
  ],
  description: [
    "Modern hostel with high-speed WiFi, air conditioning, and 24/7 security. Perfect for students seeking comfort and safety. Located just 1.2km from University of Ruhuna with easy access to public transportation.",
    "Recently renovated with new furniture and appliances. Quiet neighborhood with nearby supermarkets, restaurants, and study spaces."
  ],
  amenities: [
    { icon: "wifi", label: "High-Speed WiFi" },
    { icon: "snowflake", label: "Air Conditioning" },
    { icon: "tshirt", label: "Laundry Facility" },
    { icon: "shield-alt", label: "24/7 Security" },
    { icon: "utensils", label: "Shared Kitchen" },
    { icon: "tv", label: "Common TV Area" },
    { icon: "dumbbell", label: "Fitness Center" },
    { icon: "bicycle", label: "Bicycle Storage" }
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
    overall: 4.8,
    breakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 }
    ]
  },
  owner: {
    name: "Kamal Perera",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 89,
    stats: {
      properties: 5,
      years: 3,
      responseRate: 94
    },
    description: "Professional property manager with 3 years experience. All properties are well-maintained and student-friendly."
  },
  images: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
  ]
};

export const timeSlots = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" }
];

export const safetyTips = [
  "Always meet in public first",
  "Bring a friend for viewings",
  "Verify owner identity",
  "Never pay before viewing"
];