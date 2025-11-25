import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import StatWidget from "../../components/Owner/dashboard/StatWidget"; // Reusable StatWidget

import { boardingsData, statData, ownerData } from "../../data/mockData.js";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";

// --- Helper Component (BoardingCard is kept here as it's complex and unique to this page) ---
const BoardingCard = ({ property, viewMode, onManage, onViewTenants }) => {
  const statusColor =
    property.status === "active"
      ? "var(--success)"
      : property.status === "pending"
      ? "var(--warning)"
      : "var(--muted)";
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
        style={{ backgroundColor: "var(--accent)", color: "var(--card-bg)" }}
        onClick={() => onManage(property.id)}
      >
        <i className="fas fa-edit"></i> Manage
      </button>
    );
  }

  return (
    <div
      className={`boarding-card rounded-[25px] shadow-lg overflow-hidden transition duration-300 hover:translate-y-[-5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] ${containerClasses}`}
      style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
    >
      {/* Card Header (Image/Status) */}
      <div
        className={`card-header relative ${
          viewMode === "list" ? "w-[200px] shrink-0" : ""
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
                className="feature px-2 py-1 text-xs font-semibold rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "var(--text)",
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
          style={{ color: "var(--text)" }}
        >
          {property.name}
        </h3>
        <p
          className="property-address flex items-center gap-1 text-sm mb-3"
          style={{ color: "var(--muted)" }}
        >
          <i className="fas fa-map-marker-alt"></i>
          {property.address}
        </p>
        <div className="property-details grid grid-cols-2 gap-y-2 gap-x-3">
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: "var(--muted)" }}
            >
              Monthly Rent
            </span>
            <span
              className="value font-semibold"
              style={{ color: "var(--text)" }}
            >
              {property.rent}
            </span>
          </div>
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: "var(--muted)" }}
            >
              Available Rooms
            </span>
            <span
              className="value font-semibold"
              style={{ color: "var(--text)" }}
            >
              {property.availableRooms}
            </span>
          </div>
          <div className="detail">
            <span
              className="label text-xs mb-0.5"
              style={{ color: "var(--muted)" }}
            >
              Rating
            </span>
            <span
              className="value rating font-semibold flex items-center gap-0.5"
              style={{ color: "var(--accent)" }}
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
            ? "flex-col w-[200px] shrink-0 justify-center"
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
              property.totalTenants > 0 ? "var(--accent)" : "var(--light)"
            }`,
            color: property.totalTenants > 0 ? "var(--accent)" : "var(--muted)",
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

const notificationCount = 3;

// --- Main Component ---
export default function MyBoardingsPage() {
  const [viewMode, setViewMode] = useState("grid");

  const handleCreateNewAd = () => {
        Navigate('../createAd');
    };

  const handleManage = (id) => {
    alert(`Opening Manage Modal for Property ID: ${id}`);
  };

  const handleViewTenants = (id) => {
    alert(`Opening Tenants List for Property ID: ${id}`);
  };

  return (
    <div className="pt-4 space-y-6">
      {/* Horizontal Header (Inline, can be replaced by HeaderBar if needed) */}
      <HeaderBar
        title="My Boardings"
        subtitle="Manage your properties and view tenant details"
        notificationCount={notificationCount}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          className="btn btn-primary px-4 py-2 rounded-[25px] font-semibold"
          style={{ backgroundColor: "var(--accent)", color: "var(--card-bg)" }}
          onClick={handleCreateNewAd}
        >
          <i className="fas fa-plus"></i>
          Post New Boarding
        </button>
      </HeaderBar>

      {/* 1. Stats Overview (using StatWidget) */}
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
            style={{ color: "var(--primary)" }}
          >
            My Boarding Properties
          </h2>
          <div
            className="view-toggle flex p-1 rounded-[25px]"
            style={{ backgroundColor: "var(--light)" }}
          >
            <button
              className={`toggle-btn px-4 py-2 rounded-[20px] font-semibold transition duration-300 flex items-center gap-1 ${
                viewMode === "grid" ? "active" : ""
              }`}
              style={{
                backgroundColor:
                  viewMode === "grid" ? "var(--accent)" : "transparent",
                color: viewMode === "grid" ? "var(--card-bg)" : "var(--muted)",
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
                  viewMode === "list" ? "var(--accent)" : "transparent",
                color: viewMode === "list" ? "var(--card-bg)" : "var(--muted)",
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