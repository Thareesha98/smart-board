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

    return {
        submissions, campaigns, plans, activeTab, setActiveTab, toast,
        prefillAdData, togglePlanStatus, updatePlan, addPlan, deletePlan,
        handleApprove: (id) => {}, // Placeholder
        handleReject: (id) => {}, // Placeholder
        startPublishWorkflow: (ad) => {}, // Placeholder
        createAd: (data) => {}, // Placeholder
        toggleCampaignStatus: (id) => {}, // Placeholder
        updateCampaign: (id, data) => {} // Placeholder
    };
};