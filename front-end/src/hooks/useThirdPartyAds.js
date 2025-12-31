import { useState, useMemo, useCallback } from 'react';
import { initialSubmissions, initialCampaigns, initialPlans } from '../data/mockData';

export const useThirdPartyAds = () => {
    const [submissions, setSubmissions] = useState(initialSubmissions || []);
    const [campaigns, setCampaigns] = useState(initialCampaigns || []);
    const [plans, setPlans] = useState(initialPlans || []);
    const [activeTab, setActiveTab] = useState('submissions');
    const [prefillAdData, setPrefillAdData] = useState(null); 
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // --- Submission Handlers ---
    const handleApprove = (id) => {
        setSubmissions(prev => prev.map(ad => 
            ad.id === id ? { ...ad, status: 'approved' } : ad
        ));
        showToast("Ad submission approved");
    };

    const handleReject = (id) => {
        setSubmissions(prev => prev.map(ad => 
            ad.id === id ? { ...ad, status: 'rejected' } : ad
        ));
        showToast("Ad submission rejected", "error");
    };

    const handleDeleteSubmission = (id) => {
        setSubmissions(prev => prev.filter(ad => ad.id !== id));
        showToast("Submission removed from history");
    };

    // --- Plan Handlers ---
    const togglePlanStatus = (id) => {
        setPlans(prev => prev.map(p => 
            p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
        ));
        showToast("Plan status updated");
    };

    const updatePlan = (id, updatedData) => {
        setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
        showToast("Plan updated");
    };

    const addPlan = (newPlan) => {
        setPlans(prev => [...prev, { ...newPlan, id: Date.now(), status: 'active' }]);
        showToast("New plan created");
    };

    const deletePlan = (id) => {
        setPlans(prev => prev.filter(p => p.id !== id));
        showToast("Plan deleted", "error");
    };

    // --- Stats Calculation ---
    const stats = useMemo(() => ({
        pending: submissions.filter(s => s.status === 'pending').length,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        totalRevenue: plans.reduce((acc, p) => acc + (parseInt(p.price) || 0), 0)
    }), [submissions, campaigns, plans]);

    return {
        submissions, campaigns, plans, activeTab, setActiveTab, toast, stats,
        prefillAdData, togglePlanStatus, updatePlan, addPlan, deletePlan,
        handleApprove, 
        handleReject, 
        handleDeleteSubmission,
        startPublishWorkflow: (ad) => {
            setPrefillAdData(ad);
            setActiveTab('create');
        },
        createAd: (data) => {
            setCampaigns(prev => [...prev, { ...data, id: Date.now(), status: 'active' }]);
            showToast("Ad published successfully");
            setActiveTab('campaigns');
        },
        toggleCampaignStatus: (id) => {
            setCampaigns(prev => prev.map(c => 
                c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
            ));
        },
        updateCampaign: (id, data) => {
            setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
            showToast("Campaign updated");
        }
    };
};