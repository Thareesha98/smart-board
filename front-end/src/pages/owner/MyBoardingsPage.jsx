import React, { useState } from "react";
import { Link } from "react-router-dom";

// Exact colors and styling constants from the provided CSS files
const COLORS = {
  primary: "#D84C38",
  accent: "#FF7A00",
  text: "#332720",
  muted: "#665345",
  cardBg: "#FFFFFF",
  light: "#E8DBC7",
  radius: "25px",
  shadow: "0 6px 20px rgba(0,0,0,0.08)",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
  error: "#EF4444",
};

// Mock Data for the Boardings
const boardingsData = [
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

// Mock Stat Data
const statData = {
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

// --- Helper Components ---

const StatWidget = ({ icon, title, mainValue, subValue }) => (
  <div
    className="stat-widget flex p-6 rounded-[25px] shadow-lg transition duration-300 hover:translate-y-[-5px] relative"
    style={{ backgroundColor: COLORS.cardBg, boxShadow: COLORS.shadow }}
  >
    <div
      className="widget-icon p-4 rounded-[15px] text-2xl flex-shrink-0"
      style={{ backgroundColor: COLORS.light, color: COLORS.accent }}
    >
      <i className={icon}></i>
    </div>
    <div className="widget-content ml-4 flex-1">
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: COLORS.muted }}
      >
        {title}
      </h3>
      <div className="widget-details flex flex-col gap-1">
        <strong className="text-xl font-bold" style={{ color: COLORS.text }}>
          {mainValue}
        </strong>
        <span className="text-sm" style={{ color: COLORS.muted }}>
          {subValue}
        </span>
      </div>
    </div>
  </div>
);

const BoardingCard = ({ property, viewMode, onManage, onViewTenants }) => {
  const statusColor =
    property.status === "active"
      ? COLORS.success
      : property.status === "pending"
      ? COLORS.warning
      : COLORS.muted;
  const containerClasses =
    viewMode === "list" ? "list-view flex h-[150px]" : "boardings-grid";

  // Determine action button based on status
  let actionButton;
  if (property.status === "pending") {
    actionButton = (
      <button
        className="btn btn-secondary flex-1 py-2 text-sm font-semibold rounded-[25px]"
        disabled
      >
        <i className="fas fa-clock"></i> Pending
      </button>
    );
  } else {
    actionButton = (
      <button
        className="btn btn-primary flex-1 py-2 text-sm font-semibold rounded-[25px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
        style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
        onClick={() => onManage(property.id)}
      >
        <i className="fas fa-edit"></i> Manage
      </button>
    );
  }

  return (
    <div
      className={`boarding-card rounded-[25px] shadow-lg overflow-hidden transition duration-300 hover:translate-y-[-5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] ${containerClasses}`}
      style={{ backgroundColor: COLORS.cardBg, boxShadow: COLORS.shadow }}
    >
      {/* Card Header (Image/Status) */}
      <div
        className={`card-header relative ${
          viewMode === "list" ? "w-[200px] flex-shrink-0" : ""
        }`}
      >
        <div
          className={`property-image relative ${
            viewMode === "list" ? "h-full" : "h-[200px]"
          }`}
        >
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div
            className="property-status absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-[20px] text-white"
            style={{ backgroundColor: statusColor }}
          >
            {property.status.toUpperCase().replace("-", " ")}
          </div>
          <div className="property-features absolute bottom-4 left-4 flex gap-2">
            {property.features.map((f) => (
              <span
                key={f}
                className="feature px-2 py-1 text-xs font-semibold rounded-[12px]"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: COLORS.text,
                }}
              >
                <i className="fas fa-bed mr-1"></i> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Body (Details) */}
      <div className="card-body p-6 flex-1 flex flex-col justify-center">
        <h3
          className="property-title text-xl font-bold mb-1"
          style={{ color: COLORS.text }}
        >
          {property.name}
        </h3>
        <p
          className="property-address flex items-center gap-1 text-sm mb-3"
          style={{ color: COLORS.muted }}
        >
          <i className="fas fa-map-marker-alt"></i>
          {property.address}
        </p>
        <div className="property-details grid grid-cols-2 gap-y-2 gap-x-3">
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: COLORS.muted }}
            >
              Monthly Rent
            </span>
            <span
              className="value font-semibold"
              style={{ color: COLORS.text }}
            >
              {property.rent}
            </span>
          </div>
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: COLORS.muted }}
            >
              Available Rooms
            </span>
            <span
              className="value font-semibold"
              style={{ color: COLORS.text }}
            >
              {property.availableRooms}
            </span>
          </div>
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: COLORS.muted }}
            >
              Rating
            </span>
            <span
              className="value rating font-semibold flex items-center gap-0.5"
              style={{ color: COLORS.accent }}
            >
              {property.rating} <i className="fas fa-star text-xs"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer (Actions) */}
      <div
        className={`card-footer p-4 flex gap-3 ${
          viewMode === "list"
            ? "flex-col w-[200px] flex-shrink-0 justify-center"
            : "justify-between"
        }`}
        style={{ backgroundColor: "rgba(232, 219, 199, 0.3)" }}
      >
        <button
          className={`btn-outline flex-1 py-2 text-sm font-semibold rounded-[25px] transition duration-300 ${
            property.totalTenants > 0
              ? ""
              : "text-sm text-gray-500 border-gray-300 cursor-default"
          }`}
          style={{
            border: `2px solid ${
              property.totalTenants > 0 ? COLORS.accent : COLORS.light
            }`,
            color: property.totalTenants > 0 ? COLORS.accent : COLORS.muted,
          }}
          onClick={
            property.totalTenants > 0 ? () => onViewTenants(property.id) : null
          }
          disabled={property.totalTenants === 0}
        >
          <i className="fas fa-users"></i>
          {property.totalTenants > 0
            ? `View ${property.totalTenants} Tenants`
            : "No Tenants"}
        </button>
        {actionButton}
      </div>
    </div>
  );
};

// --- Main Component ---

export default function MyBoardingsPage() {
  const [viewMode, setViewMode] = useState("grid");

  const handleManage = (id) => {
    // In a real app, this would open the Manage Boarding Modal
    alert(`Opening Manage Modal for Property ID: ${id}`);
  };

  const handleViewTenants = (id) => {
    // In a real app, this would open the View Tenants Modal/Page
    alert(`Opening Tenants List for Property ID: ${id}`);
  };

  return (
    <div className="pt-4 space-y-6">
      {/* Horizontal Header (Replicated from CreateAdPage for consistency) */}
      <header
        className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-[1.5rem] z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          boxShadow: COLORS.shadow,
        }}
      >
        <div className="header-left flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: COLORS.primary }}
          >
            My Boardings
          </h1>
          <p className="text-base" style={{ color: COLORS.muted }}>
            Manage your properties and view tenant details
          </p>
        </div>
        <div className="header-right flex items-center gap-[1.5rem]">
          <button
            className="btn btn-primary px-4 py-2 rounded-[25px] font-semibold"
            style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
          >
            <i className="fas fa-plus"></i>
            Post New Boarding
          </button>
          {/* Notification/User Menu omitted for brevity, assuming they are in OwnerLayout or a separate header component */}
        </div>
      </header>

      {/* 1. Stats Overview */}
      <section className="stats-overview">
        <div className="widget-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatWidget
            icon="fas fa-building"
            title="Total Properties"
            mainValue={`${statData.totalProperties} Boardings`}
            subValue={`${statData.activeProperties} Active, ${statData.pendingProperties} Pending`}
          />
          <StatWidget
            icon="fas fa-users"
            title="Current Tenants"
            mainValue={`${statData.currentTenants} Students`}
            subValue={`${statData.occupancyRate} Occupancy Rate`}
          />
          <StatWidget
            icon="fas fa-bed"
            title="Available Rooms"
            mainValue={`${statData.availableRooms} Rooms`}
            subValue={`Out of ${statData.totalRooms} total`}
          />
          <StatWidget
            icon="fas fa-star"
            title="Average Rating"
            mainValue={statData.avgRating}
            subValue={`Based on ${statData.reviewCount} reviews`}
          />
        </div>
      </section>

      {/* 2. Boardings Management */}
      <section className="boardings-management">
        <div className="section-header flex justify-between items-center mb-4">
          <h2
            className="text-[1.5rem] font-bold"
            style={{ color: COLORS.primary }}
          >
            My Boarding Properties
          </h2>
          <div
            className="view-toggle flex p-1 rounded-[25px]"
            style={{ backgroundColor: COLORS.light }}
          >
            <button
              className={`toggle-btn px-4 py-2 rounded-[20px] font-semibold transition duration-300 flex items-center gap-1 ${
                viewMode === "grid" ? "active" : ""
              }`}
              style={{
                backgroundColor:
                  viewMode === "grid" ? COLORS.accent : "transparent",
                color: viewMode === "grid" ? COLORS.cardBg : COLORS.muted,
              }}
              onClick={() => setViewMode("grid")}
            >
              <i className="fas fa-th"></i>
              Grid View
            </button>
            <button
              className={`toggle-btn px-4 py-2 rounded-[20px] font-semibold transition duration-300 flex items-center gap-1 ${
                viewMode === "list" ? "active" : ""
              }`}
              style={{
                backgroundColor:
                  viewMode === "list" ? COLORS.accent : "transparent",
                color: viewMode === "list" ? COLORS.cardBg : COLORS.muted,
              }}
              onClick={() => setViewMode("list")}
            >
              <i className="fas fa-list"></i>
              List View
            </button>
          </div>
        </div>

        {/* Boardings Grid/List */}
        <div
          className={`boardings-grid grid gap-6 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
          }`}
          id="boardingsView"
        >
          {boardingsData.map((property) => (
            <BoardingCard
              key={property.id}
              property={property}
              viewMode={viewMode}
              onManage={handleManage}
              onViewTenants={handleViewTenants}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
