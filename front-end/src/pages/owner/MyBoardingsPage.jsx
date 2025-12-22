import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome } from "react-icons/fa";

// Logic Hook
import useBoardingLogic from "../../hooks/owner/useBoardingLogic"; // Adjust path as needed

// Components
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import BoardingCard from "../../components/Owner/myboardings/BoardingCard";
import ViewToggle from "../../components/Owner/myboardings/ViewToggle";
import TenantModal from "../../components/Owner/myboardings/TenantModal";
import ManageModal from "../../components/Owner/myboardings/ManageModal";
import CreateBoardingModal from "../../components/Owner/myboardings/CreateBoardingModal.jsx";

// Data
import { boardingsData as initialData } from "../../data/mockData.js";

export default function MyBoardingsPage() {
  // Extract logic from custom hook
  const {
    boardings,
    viewMode,
    selectedProperty,
    activeModal,
    isCreateModalOpen,
    setViewMode,
    setIsCreateModalOpen,
    openTenantsModal,
    openManageModal,
    closeModal,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useBoardingLogic(initialData);

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-12 bg-light">
      <HeaderBar
        title="My Boarding Properties"
        subtitle="Manage your property inventory and tenant details"
        navBtnText="Add New Property"
        onNavBtnClick={() => setIsCreateModalOpen(true)}
      />

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
        <motion.div
          layout
          className={`grid gap-8 transition-all duration-500 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {boardings.length > 0 ? (
              boardings.map((property) => (
                <BoardingCard
                  key={property.id}
                  property={property}
                  viewMode={viewMode}
                  onManage={() => openManageModal(property)}
                  onViewTenants={() => openTenantsModal(property)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 bg-card-bg rounded-boarding border-2 border-dashed border-light flex flex-col items-center justify-center text-muted"
              >
                <FaHome className="text-5xl mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-xs">
                  Your inventory is empty.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- Modals --- */}
      
      <CreateBoardingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={addProperty}
      />

      <TenantModal
        isOpen={activeModal === "tenants"}
        onClose={closeModal}
        propertyName={selectedProperty?.name}
        tenants={selectedProperty?.tenantsList}
        onMessageTenant={(id) => alert(`Opening chat for tenant ID: ${id}`)}
      />

      <ManageModal
        isOpen={activeModal === "manage"}
        onClose={closeModal}
        property={selectedProperty}
        onUpdate={updateProperty}
        onDelete={deleteProperty}
      />
    </div>
  );
}