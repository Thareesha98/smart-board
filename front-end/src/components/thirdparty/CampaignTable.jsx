import React from 'react';

const CampaignTable = ({ campaigns, onToggleStatus, onEdit }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-separate border-spacing-y-3">
      <thead>
        <tr className="text-[#665345] text-[11px] uppercase tracking-widest border-b border-gray-100">
          <th className="pb-4 px-4 font-black">Ad Preview</th>
          <th className="pb-4 font-black">Campaign Details</th>
          <th className="pb-4 font-black text-center">Panels</th>
          <th className="pb-4 font-black text-center">Status</th>
          <th className="pb-4 font-black text-right pr-6">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {campaigns.map(c => (
          <tr key={c.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
            <td className="py-4 px-4">
              <div className="w-16 h-10 rounded-lg overflow-hidden border border-gray-200">
                <img src={c.image} className="w-full h-full object-cover" alt="ad" />
              </div>
            </td>
            <td className="py-4">
              <div className="flex flex-col">
                <span className="font-bold text-[#332720]">{c.title}</span>
                <span className="text-[10px] text-gray-400 font-mono truncate max-w-[150px]">{c.redirectUrl}</span>
              </div>
            </td>
            <td className="py-4 text-center">
              <div className="flex justify-center gap-1">
                {c.targetPanels?.map(panel => (
                  <span key={panel} className="px-2 py-0.5 bg-gray-100 text-[#332720] text-[9px] font-bold rounded-md uppercase">
                    {panel}
                  </span>
                ))}
              </div>
            </td>
            <td className="py-4 text-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                c.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {c.status}
              </span>
            </td>
            <td className="py-4 text-right pr-4">
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => onToggleStatus(c.id)}
                  className={`p-2 rounded-xl transition-all ${
                    c.status === 'active' 
                    ? 'text-orange-500 hover:bg-orange-50' 
                    : 'text-green-500 hover:bg-green-50'
                  }`}
                  title={c.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                >
                  <i className={`fas ${c.status === 'active' ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button 
                  onClick={() => onEdit(c)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                  title="Edit Campaign"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {campaigns.length === 0 && (
      <div className="text-center py-20 text-gray-400">
        <i className="fas fa-ad text-4xl mb-3 block opacity-20"></i>
        <p className="font-bold">No live campaigns found</p>
      </div>
    )}
  </div>
);

export default CampaignTable;