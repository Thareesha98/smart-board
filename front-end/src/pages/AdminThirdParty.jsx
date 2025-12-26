import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout'; 
import ThirdPartyStats from '../components/thirdparty/ThirdPartyStats';
import CampaignTable from '../components/thirdparty/CampaignTable';
import SubmissionCard from '../components/thirdparty/SubmissionCard';
import AdDetailsModal from '../components/thirdparty/AdDetailsModal';
import CreateAdForm from '../components/thirdparty/CreateAdForm'; 
import EditCampaignModal from '../components/thirdparty/EditCampaignModal';
import PlanModal from '../components/thirdparty/PlanModal';
import { useThirdPartyAds } from '../hooks/useThirdPartyAds'; 

const AdminThirdParty = ({ onNavigate, onLogout }) => {
    const {
        submissions, campaigns, plans, activeTab, setActiveTab,
        stats, toast, prefillAdData, handleApprove, handleReject,
        startPublishWorkflow, createAd, toggleCampaignStatus, 
        updateCampaign, addPlan, updatePlan, togglePlanStatus, deletePlan
    } = useThirdPartyAds();

    // Modal States
    const [selectedAd, setSelectedAd] = useState(null);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [planToEdit, setPlanToEdit] = useState(null);

    return (
        <AdminLayout 
            title="Third Party Ads" 
            activePage="thirdparty" 
            onNavigate={onNavigate}
            onLogout={onLogout}
        >
            <div className="max-w-7xl mx-auto px-4 relative">
                <ThirdPartyStats stats={stats || { pending: 0, activeCampaigns: 0, totalRevenue: 0 }} />

                {/* Tab Navigation */}
                <div className="flex gap-8 mb-10 border-b border-gray-100 overflow-x-auto no-scrollbar">
                    {['submissions', 'create', 'campaigns', 'plans'].map((id) => (
                        <button 
                            key={id} 
                            onClick={() => setActiveTab(id)} 
                            className={`pb-4 px-2 font-bold capitalize transition-all border-b-2 whitespace-nowrap ${
                                activeTab === id ? 'text-[#D84C38] border-[#D84C38]' : 'text-gray-400 border-transparent'
                            }`}
                        >
                            {id === 'create' ? 'Publish Ad' : id}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in pb-24">
                    {activeTab === 'submissions' && submissions && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {submissions.map(ad => (
                                <SubmissionCard 
                                    key={ad.id} ad={ad} 
                                    onApprove={handleApprove} onReject={handleReject}
                                    onViewDetails={() => setSelectedAd(ad)}
                                    onPublishWorkflow={startPublishWorkflow}
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === 'create' && (
                        <CreateAdForm plans={plans} onSubmit={createAd} prefillData={prefillAdData} />
                    )}

                    {activeTab === 'campaigns' && campaigns && (
                        <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100">
                            <CampaignTable 
                                campaigns={campaigns} 
                                onToggleStatus={toggleCampaignStatus}
                                onEdit={(c) => setEditingCampaign(c)} 
                            />
                        </div>
                    )}

                    {activeTab === 'plans' && plans && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {plans.map(plan => (
                                <div key={plan.id} className="bg-white rounded-[40px] shadow-xl border border-gray-50 overflow-hidden flex flex-col transition-all hover:shadow-2xl">
                                    <div className="bg-[#D84C38] p-10 text-center text-white">
                                        <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest">{plan.name}</h3>
                                        <div className="flex justify-center items-baseline gap-1">
                                            <span className="text-5xl font-black">${plan.price}</span>
                                            <span className="text-sm opacity-80">/month</span>
                                        </div>
                                        <p className="mt-2 text-sm font-medium opacity-90">{plan.duration || '30 days'}</p>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <p className="text-gray-500 text-sm mb-8 text-center px-4 leading-relaxed italic">
                                            "{plan.description || "Boost your visibility with our premium ad placements."}"
                                        </p>

                                        <div className="space-y-4 mb-10">
                                            {plan.features?.map((f, i) => (
                                                <div key={i} className="flex items-start gap-4 text-sm font-medium text-[#332720]">
                                                    <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full mt-0.5">
                                                        <i className="fas fa-check text-[10px]"></i>
                                                    </div>
                                                    <span className="border-b border-gray-50 w-full pb-1">{f}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto space-y-3">
                                            <button 
                                                onClick={() => togglePlanStatus(plan.id)}
                                                className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase transition-all ${
                                                    plan.status === 'active' 
                                                    ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100' 
                                                    : 'bg-gray-100 text-gray-400 border-2 border-transparent'
                                                }`}
                                            >
                                                {plan.status === 'active' ? '● Active' : '○ Inactive'}
                                            </button>

                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => { setPlanToEdit(plan); setIsPlanModalOpen(true); }}
                                                    className="flex-1 bg-[#332720] text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg"
                                                >
                                                    Edit Plan
                                                </button>
                                                <button 
                                                    onClick={() => deletePlan(plan.id)}
                                                    className="w-14 bg-red-50 text-red-500 py-4 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-100"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button 
                                onClick={() => { setPlanToEdit(null); setIsPlanModalOpen(true); }}
                                className="border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center min-h-[400px] p-12 text-gray-300 hover:border-[#D84C38] hover:text-[#D84C38] transition-all bg-white group"
                            >
                                <i className="fas fa-plus-circle text-5xl mb-4 group-hover:scale-110 transition-transform"></i>
                                <span className="font-black uppercase tracking-widest text-sm">Add New Tier</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* MODALS */}
            {selectedAd && (
                <AdDetailsModal selectedAd={selectedAd} onClose={() => setSelectedAd(null)} />
            )}
            
            {editingCampaign && (
                <EditCampaignModal 
                    isOpen={!!editingCampaign} 
                    campaign={editingCampaign} 
                    onClose={() => setEditingCampaign(null)} 
                    onSave={updateCampaign} 
                />
            )}

            {isPlanModalOpen && (
                <PlanModal 
                    isOpen={isPlanModalOpen} 
                    planToEdit={planToEdit} 
                    onClose={() => setIsPlanModalOpen(false)} 
                    onSave={(data) => planToEdit ? updatePlan(planToEdit.id, data) : addPlan(data)} 
                />
            )}

            {/* TOASTS */}
            {toast && (
                <div className={`fixed bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 z-[1000] px-8 py-4 rounded-[20px] text-white shadow-2xl animate-bounce-in flex items-center gap-3 ${
                    toast.type === 'error' ? 'bg-red-600' : 'bg-[#332720]'
                }`}>
                    <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-triangle' : 'fa-check-circle text-green-400'}`}></i>
                    <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminThirdParty;