import { useState, useEffect } from "react";

// --- MOCK BACKEND DATA ---
const MOCK_DB_DATA = [
  {
    id: 1,
    title: "Luxury Sea View Villa",
    description: "A beautiful villa near the coast with full amenities.",
    address: "123 Galle Road, Colombo",
    pricePerMonth: 45000.0,
    availableSlots: 3,
    maxOccupants: 5,
    imageUrls: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"],
    status: "ACTIVE",
    genderType: "MIXED",
    boardingType: "ANNEX",
    tenants: [
      {
        id: 101,
        name: "Saman Perera",
        phone: "0771234567",
        joinedDate: "2024-01-15",
        email: "saman.p@gmail.com",
      },
      {
        id: 102,
        name: "Nimali Silva",
        phone: "0719876543",
        joinedDate: "2024-02-20",
        email: "nimali.s@yahoo.com",
      },
    ],
  },
  {
    id: 2,
    title: "Student Budget Room",
    description: "Affordable shared room near university.",
    address: "45 University Lane, Kandy",
    pricePerMonth: 12000.0,
    availableSlots: 1,
    maxOccupants: 2,
    imageUrls: ["https://images.unsplash.com/photo-1596276020528-c6861110757d"],
    status: "ACTIVE",
    genderType: "MALE",
    boardingType: "HOSTEL",
    tenants: [
      {
        id: 201,
        name: "Kasun Bandara",
        phone: "0765551234",
        joinedDate: "2024-03-05",
        email: "kasun.bandara@gmail.com",
      },
    ],
  },
  {
    id: 3,
    title: "Green Valley Cottage",
    description: "Quiet cottage surrounded by nature.",
    address: "88 Hill Top, Nuwara Eliya",
    pricePerMonth: 35000.0,
    availableSlots: 4,
    maxOccupants: 4,
    imageUrls: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739"],
    status: "INACTIVE",
    genderType: "FEMALE",
    boardingType: "HOUSE",
    tenants: [],
  },
];

const useBoardingLogic = () => {
  const [rawBoardings, setRawBoardings] = useState(MOCK_DB_DATA);
  const [boardings, setBoardings] = useState([]);

  const [viewMode, setViewMode] = useState("grid");
  const [activeModal, setActiveModal] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // NEW STATE: For the specific tenant being viewed
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    const formattedData = rawBoardings.map((b) => ({
      id: b.id,
      name: b.title,
      address: b.address,
      rent: `LKR ${b.pricePerMonth.toLocaleString()}`,
      availableRooms: b.availableSlots,
      status: b.status.toLowerCase(),
      image: b.imageUrls?.[0] || "https://via.placeholder.com/300",
      rawPrice: b.pricePerMonth,
      gender: b.genderType,
      type: b.boardingType,
      description: b.description,
      maxOccupants: b.maxOccupants,
      rating: 4.5,
      totalTenants: b.tenants ? b.tenants.length : 0,
      tenantsList: b.tenants || [],
    }));
    setBoardings(formattedData);
  }, [rawBoardings]);

  // --- Actions ---
  const openTenantsModal = (property) => {
    setSelectedProperty(property);
    setActiveModal("tenants");
  };

  const openManageModal = (property) => {
    setSelectedProperty(property);
    setActiveModal("manage");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProperty(null);
  };

  // --- NEW: Open Tenant Details Modal (No Alert) ---
  const openTenantDetails = (tenant) => {
    setSelectedTenant(tenant);
  };

  const closeTenantDetails = () => {
    setSelectedTenant(null);
  };

  // --- CRUD (Simulated) ---
  const addProperty = (formData) => {
    const newBackendObject = {
      id: Date.now(),
      title: formData.name,
      description: formData.description,
      address: formData.address,
      pricePerMonth: parseFloat(formData.rent.replace(/[^0-9.]/g, "")),
      availableSlots: parseInt(formData.availableRooms),
      maxOccupants: parseInt(formData.maxOccupants),
      genderType: formData.genderType,
      boardingType: formData.boardingType,
      status: "ACTIVE",
      imageUrls: [formData.image],
      tenants: [],
    };
    setRawBoardings((prev) => [newBackendObject, ...prev]);
    setIsCreateModalOpen(false);
  };

  const updateProperty = (uiData) => {
    setRawBoardings((prev) =>
      prev.map((item) => {
        if (item.id === uiData.id) {
          return {
            ...item,
            pricePerMonth: parseFloat(uiData.rent.replace(/[^0-9.]/g, "")),
            availableSlots: parseInt(uiData.availableRooms),
            status: uiData.status.toUpperCase(),
          };
        }
        return item;
      })
    );
    closeModal();
  };

  const deleteProperty = (id) => {
    setRawBoardings((prev) => prev.filter((b) => b.id !== id));
    closeModal();
  };

  return {
    boardings,
    viewMode,
    selectedProperty,
    activeModal,
    isCreateModalOpen,
    // New exports
    selectedTenant,

    setViewMode,
    setIsCreateModalOpen,
    openTenantsModal,
    openManageModal,
    closeModal,
    openTenantDetails, // Renamed from viewTenantDetails
    closeTenantDetails, // New function

    addProperty,
    updateProperty,
    deleteProperty,
  };
};

export default useBoardingLogic;
