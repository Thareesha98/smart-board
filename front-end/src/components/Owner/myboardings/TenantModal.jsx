import React from "react";

const TenantModal = ({
  isOpen,
  onClose,
  propertyName,
  tenants = [],
  onRemoveTenant,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
      <div className="bg-card-bg w-full max-w-2xl rounded-boarding shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-light">
        {/* Modal Header */}
        <div className="p-6 border-b border-light flex justify-between items-center bg-light/30">
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight uppercase">
              Current Tenants
            </h3>
            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
              {propertyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors p-2 text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Content - Tenant List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {tenants && tenants.length > 0 ? (
            <div className="space-y-4">
              {tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-light bg-white/50 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Tenant Avatar using Accent color */}
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-black text-lg shadow-sm">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-text">{tenant.name}</p>
                      <p className="text-[9px] font-black uppercase text-muted tracking-widest">
                        Joined: {tenant.joinedDate}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `tel:${tenant.phone}`)
                      }
                      className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center hover:bg-info hover:text-white transition-all shadow-sm active:scale-95"
                      title="Call Tenant"
                    >
                      <i className="fas fa-phone-alt"></i>
                    </button>
                    <button
                      onClick={() => onRemoveTenant(tenant.id, tenant.name)}
                      className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm active:scale-95"
                      title="Remove Tenant"
                    >
                      <i className="fas fa-user-minus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted/40">
              <i className="fas fa-users-slash text-5xl mb-4"></i>
              <p className="font-black uppercase tracking-widest text-xs">
                No active tenants found.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-light bg-light/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantModal;
