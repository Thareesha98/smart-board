import React from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { boardingsData, ownerData } from "../../data/mockData";

const PaymentPage = () => {
  const currentMonth = "December 2025";

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-10">
      <HeaderBar
        title="Revenue Tracker"
        subtitle={`Monthly property rental status for ${currentMonth}`}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {boardingsData.map((boarding) => {
          // --- Fixed Rental Logic ---
          // Rent is fixed per property, paid once a month.
          const monthlyRentValue = parseInt(boarding.rent.replace(/\D/g, ""));
          
          // Mocking payment status: 
          // Sunshine Hostel (B001) is unpaid, others are paid.
          const isPaidThisMonth = boarding.id !== "B001"; 
          const amountCollected = isPaidThisMonth ? monthlyRentValue : 0;
          const amountRemaining = isPaidThisMonth ? 0 : monthlyRentValue;
          const collectionProgress = isPaidThisMonth ? 100 : 0;

          // Header Style based on Payment Status
          const headerBg = isPaidThisMonth ? "bg-zinc-900" : "bg-(--accent)";

          return (
            <div 
              key={boarding.id} 
              className="bg-white rounded-[35px] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-xl group"
            >
              {/* --- Property Header --- */}
              <div className={`p-8 ${headerBg} text-white relative transition-all duration-500`}>
                <div className="absolute top-0 right-0 p-5">
                   <div className={`w-3 h-3 rounded-full border-2 border-white/30 ${isPaidThisMonth ? 'bg-green-400 shadow-[0_0_15px_#4ade80]' : 'bg-white animate-pulse'}`}></div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                    Ref: {boarding.id}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight leading-tight">
                    {boarding.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 opacity-70">
                    <i className="fas fa-calendar-alt text-[10px]"></i>
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                      Cycle: {currentMonth}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body: Financial Ledger */}
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Fixed Monthly Rent</span>
                    <p className="text-2xl font-black text-gray-800">LKR {monthlyRentValue.toLocaleString()}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    isPaidThisMonth ? 'border-green-200 text-green-600 bg-green-50' : 'border-orange-200 text-(--accent) bg-orange-50'
                  }`}>
                    {isPaidThisMonth ? "Settled" : "Awaiting"}
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Payment Progress</span>
                    <span className={isPaidThisMonth ? "text-green-500" : "text-(--accent)"}>
                        {collectionProgress}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isPaidThisMonth ? 'bg-green-500' : 'bg-(--accent)'}`}
                      style={{ width: `${collectionProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Additional Property Data */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</span>
                    <span className="text-xs font-bold text-gray-700">05 {currentMonth.split(' ')[0]}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Occupancy</span>
                    <span className="text-xs font-bold text-gray-700">{boarding.tenantsList?.length || 0} Residents</span>
                  </div>
                </div>
              </div>

              {/* View Action */}
              <button 
                className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-t border-gray-50 ${
                  isPaidThisMonth ? 'text-gray-300 hover:text-gray-800' : 'text-(--accent) bg-orange-50/30'
                }`}
              >
                {isPaidThisMonth ? "View Receipt" : "Notify Property Manager"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentPage;