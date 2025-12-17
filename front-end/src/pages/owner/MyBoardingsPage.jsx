import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import BoardingCard from "../../components/Owner/myboardings/BoardingCard"; 
import ViewToggle from "../../components/Owner/myboardings/ViewToggle";
import TenantModal from "../../components/Owner/myboardings/TenantModal"; 
import ManageModal from "../../components/Owner/myboardings/ManageModal"; 

import { boardingsData as initialData, ownerData } from "../../data/mockData.js";

export default function MyBoardingsPage() {
  const [boardings, setBoardings] = useState(initialData); // Local state for dummy data updates
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProperty, setSelectedProperty] = useState(null); 
  const [activeModal, setActiveModal] = useState(null); // 'tenants' | 'manage' | null
  
  const navigate = useNavigate();

  // --- Handlers ---
  const handleOpenTenants = (prop) => { setSelectedProperty(prop); setActiveModal('tenants'); };
  const handleOpenManage = (prop) => { setSelectedProperty(prop); setActiveModal('manage'); };

  const handleUpdateProperty = (updatedData) => {
    setBoardings(prev => prev.map(p => p.id === updatedData.id ? updatedData : p));
    setActiveModal(null);
  };

  const handleDeleteProperty = (id) => {
    setBoardings(prev => prev.filter(p => p.id !== id));
    setActiveModal(null);
  };

  return (
    <div className="pt-4 space-y-6 min-h-screen pb-10">
      <HeaderBar
        title="My Boardings"
        subtitle="Manage your properties and track tenant details"
        notificationCount={3}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button className="bg-(--accent) text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:scale-105 transition" 
                onClick={() => navigate('../createAd')}>
          <i className="fas fa-plus mr-2"></i> Post New Boarding
        </button>
      </HeaderBar>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-2xl font-bold text-(--primary)">Property Inventory</h2>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        <div className={`grid gap-8 ${viewMode === "list" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"}`}>
          {boardings.map((property) => (
            <BoardingCard
              key={property.id}
              property={property}
              viewMode={viewMode}
              onManage={() => handleOpenManage(property)}
              onViewTenants={() => handleOpenTenants(property)} 
            />
          ))}
        </div>
      </section>

      {/* Tenant Management Modal */}
      <TenantModal 
        isOpen={activeModal === 'tenants'} 
        onClose={() => setActiveModal(null)}
        propertyName={selectedProperty?.name}
        tenants={selectedProperty?.tenantsList}
        onRemoveTenant={(id, name) => alert(`Simulating removal of ${name}...`)}
      />

      {/* Quick Manage Modal */}
      <ManageModal 
        isOpen={activeModal === 'manage'}
        onClose={() => setActiveModal(null)}
        property={selectedProperty}
        onUpdate={handleUpdateProperty}
        onDelete={handleDeleteProperty}
      />
    </div>
  );
}