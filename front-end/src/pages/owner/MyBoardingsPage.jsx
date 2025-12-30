import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome } from "react-icons/fa";

// Logic Hook
import useBoardingLogic from "../../hooks/owner/useBoardingLogic";

// Components
import HeaderBar from "../../components/Owner/common/HeaderBar";
import BoardingCard from "../../components/Owner/myboardings/BoardingCard";
import ViewToggle from "../../components/Owner/myboardings/ViewToggle";
import TenantModal from "../../components/Owner/myboardings/TenantModal";
import TenantDetailsModal from "../../components/Owner/myboardings/TenantDetailsModal";
import ManageModal from "../../components/Owner/myboardings/ManageModal";
import CreateBoardingModal from "../../components/Owner/myboardings/CreateBoardingModal";

export default function MyBoardingsPage() {
  const {
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
  } = useBoardingLogic();

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-12 bg-light">
      <HeaderBar
        title="My Boardings"
        subtitle="Manage your properties and track tenant details"
        notificationCount={3}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          className="bg-accent text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="fas fa-plus mr-2"></i> Post New Boarding
        </button>
      </HeaderBar>

      <section className="space-y-6 px-4 max-w-[1600px] mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center border-b border-light pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-primary"></div>
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight">
              Property Inventory
            </h2>
          </div>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {/* Dynamic Grid/List Container */}
        <div
          className={`grid gap-8 transition-all duration-500 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {boardings.length > 0 ? (
            boardings.map((property) => (
              <BoardingCard
                key={property.id}
                property={property}
                viewMode={viewMode}
                onManage={() => handleOpenManage(property)}
                onViewTenants={() => handleOpenTenants(property)}
              />
            ))
          ) : (
            <div className="col-span-full py-32 bg-card-bg rounded-boarding border-2 border-dashed border-light flex flex-col items-center justify-center text-muted">
              <i className="fas fa-home text-5xl mb-4 opacity-20"></i>
              <p className="font-black uppercase tracking-widest text-xs">
                Your inventory is empty.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- Modals --- */}
      <CreateBoardingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateNew}
      />

      <TenantModal
        isOpen={activeModal === "tenants"}
        onClose={() => setActiveModal(null)}
        propertyName={selectedProperty?.name}
        tenants={selectedProperty?.tenantsList}
        onViewTenant={openTenantDetails} // Pass the open function here
      />

      {/* NEW: Render the details modal */}
      <TenantDetailsModal
        tenant={selectedTenant}
        onClose={closeTenantDetails}
      />

      <ManageModal
        isOpen={activeModal === "manage"}
        onClose={() => setActiveModal(null)}
        property={selectedProperty}
        onUpdate={handleUpdateProperty}
        onDelete={handleDeleteProperty}
      />
    </div>
  );
}
