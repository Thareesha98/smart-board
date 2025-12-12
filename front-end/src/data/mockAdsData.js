// src/data/mockAdsData.js

// Initial sample data based on the provided admin-ads.js
export const initialAdsData = {
  pending: [
    {
      id: 1,
      title: "Sunset Hostel - Premium Rooms",
      location: "Colombo 07",
      price: "12500",
      type: "hostel",
      description: "Beautiful hostel with AC rooms, Wi-Fi, and 24/7 security. Perfect for university students. Spacious rooms with attached bathrooms, study tables, and wardrobe. Common kitchen and laundry facilities available.",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
      ],
      imageCount: 5,
      owner: { name: "Kamal Perera", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
      datePosted: "2025-11-20",
    },
    {
      id: 2,
      title: "Luxury Single Apartment - Near Uni",
      location: "Kandy",
      price: "25000",
      type: "apartment",
      description: "Brand new fully furnished apartment for a single student. Includes private balcony, generator power, and easy access to all major bus routes.",
      images: [
        "https://images.unsplash.com/photo-1512918728675-ed5a7ecdebfd?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574031641042-4f323714241e?w=400&h=300&fit=crop",
      ],
      imageCount: 3,
      owner: { name: "Nimali Fernando", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
      datePosted: "2025-11-22",
    },
    // Add more mock data for pending, approved, and rejected lists
  ],
  approved: [
    {
        id: 3,
        title: "Girls Boarding - Gampaha",
        location: "Gampaha",
        price: "10000",
        type: "boarding",
        description: "Safe and secure boarding for female university students.",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0b8c?w=800&h=500&fit=crop"],
        imageCount: 2,
        owner: { name: "Saman Kumara", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
        datePosted: "2025-10-01",
        dateApproved: "2025-10-05"
    },
  ],
  rejected: [
    {
        id: 4,
        title: "Suspicious Property Listing",
        location: "Jaffna",
        price: "5000",
        type: "house",
        description: "Low price for a whole house. Likely scam.",
        images: ["https://images.unsplash.com/photo-1507001321458-1557ad0d276b?w=800&h=500&fit=crop"],
        imageCount: 1,
        owner: { name: "Unknown User", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        datePosted: "2025-11-01",
        rejectionReason: "Suspicious content, images are stock photos."
    }
  ]
};