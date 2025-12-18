// --- Sub-Component: Utility Summary ---
export const BillingSummary = ({ totalUtility, totalMonthly, baseRent }) => (
  <div className="p-5 rounded-[20px] bg-orange-50/50 border border-orange-100 space-y-3">
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500 font-medium">Monthly Base Rent</span>
      <span className="text-gray-800 font-bold">LKR {baseRent.toLocaleString()}</span>
    </div>
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500 font-medium">Variable Utilities</span>
      <span className="text-gray-800 font-bold">+ LKR {totalUtility.toLocaleString()}</span>
    </div>
    <div className="pt-3 border-t border-orange-200 flex justify-between items-center">
      <span className="text-gray-700 font-bold">Estimated Total</span>
      <span className="text-xl font-black text-orange-600">
        LKR {totalMonthly.toLocaleString()}
      </span>
    </div>
  </div>
);

// --- Sub-Component: Nice Input ---
export const NiceInput = ({ label, name, value, onChange, icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
        <i className={`fas ${icon}`}></i>
      </div>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-orange-400 outline-none transition-all font-semibold text-gray-700"
        placeholder="0.00"
      />
    </div>
  </div>
);