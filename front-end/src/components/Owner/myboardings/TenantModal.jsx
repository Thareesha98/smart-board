import React from "react";

const TenantModal = ({ isOpen, onClose, propertyName, tenants = [], onRemoveTenant }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-(--light)">
          <div>
            <h3 className="text-xl font-bold text-(--primary)">Current Tenants</h3>
            <p className="text-sm text-(--muted)">{propertyName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-xl">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {tenants && tenants.length > 0 ? (
            <div className="space-y-4">
              {tenants.map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-(--accent) flex items-center justify-center text-white font-bold">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{tenant.name}</p>
                      <p className="text-[10px] uppercase text-gray-400 tracking-wider">Joined: {tenant.joinedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => window.location.href = `tel:${tenant.phone}`}
                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-sm">
                      <i className="fas fa-phone-alt"></i>
                    </button>
                    <button onClick={() => onRemoveTenant(tenant.id, tenant.name)}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition shadow-sm">
                      <i className="fas fa-user-minus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <i className="fas fa-users-slash text-4xl mb-3"></i>
              <p>No active tenants found.</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-(--primary) text-white rounded-full font-bold text-sm">Close</button>
        </div>
      </div>
    </div>
  );
};
export default TenantModal;