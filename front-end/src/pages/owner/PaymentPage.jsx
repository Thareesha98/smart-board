import React, { useState } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { boardingsData, ownerData } from "../../data/mockData";

const PaymentPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("December 2025");

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-[#fdfaf5] pb-10">
      <HeaderBar
        title="Revenue & Payments"
        subtitle={`Monitoring rental collections for ${selectedMonth}`}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      <div className="grid grid-cols-1 gap-8 px-2">
        {boardingsData.map((boarding) => {
          // Calculate property totals
          const totalExpected =
            boarding.tenantsList.length *
            parseInt(boarding.rent.replace(/\D/g, ""));
          const paidTenants = boarding.tenantsList.filter((t) => t.id !== "T1"); // Mock: T1 (Kasun) hasn't paid
          const totalCollected =
            paidTenants.length * parseInt(boarding.rent.replace(/\D/g, ""));
          const remainingBalance = totalExpected - totalCollected;

          return (
            <section
              key={boarding.id}
              className="bg-white rounded-[35px] shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Property Header */}
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                    {boarding.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {boarding.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Total Remaining
                  </span>
                  <p className="text-2xl font-black text-red-500">
                    LKR {remainingBalance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Tenant Payment List */}
              <div className="p-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                      <th className="pb-4">Resident</th>
                      <th className="pb-4 text-center">Monthly Rent</th>
                      <th className="pb-4 text-center">Status</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {boarding.tenantsList.length > 0 ? (
                      boarding.tenantsList.map((tenant) => {
                        const isPaid = tenant.id !== "T1"; // Mocking Kasun Perera (T1) as unpaid
                        return (
                          <tr
                            key={tenant.id}
                            className="group hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-5">
                              <p className="font-bold text-gray-800">
                                {tenant.name}
                              </p>
                              <p className="text-xs text-gray-400 font-medium">
                                {tenant.university || "Resident"}
                              </p>
                            </td>
                            <td className="py-5 text-center font-bold text-gray-700">
                              {boarding.rent}
                            </td>
                            <td className="py-5 text-center">
                              <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  isPaid
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-500 animate-pulse"
                                }`}
                              >
                                {isPaid ? "Paid" : "Pending"}
                              </span>
                            </td>
                            <td className="py-5 text-right">
                              {!isPaid && (
                                <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">
                                  Send Reminder
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-10 text-center text-gray-400 italic"
                        >
                          No tenants currently assigned.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentPage;
