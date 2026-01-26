import { useState, useMemo, useEffect, useCallback } from 'react';
import AdminService from '../services/AdminService';

export const useThirdPartyAds = () => {
    const [submissions, setSubmissions] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('submissions');
    const [prefillAdData, setPrefillAdData] = useState(null); 
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [subData, campData] = await Promise.all([
                AdminService.getSubmissions(),
                AdminService.getCampaigns()
            ]);
            setSubmissions(subData);
            setCampaigns(campData);
        } catch (error) {
            showToast("Error connecting to server", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleApprove = async (id) => {
        try {
            await AdminService.approveAd(id);
            showToast("Ad approved successfully");
            fetchData();
        } catch (err) { showToast("Action failed", "error"); }
    };

    const handleToggleCampaignStatus = async (id) => {
        try {
            await AdminService.toggleCampaignStatus(id);
            fetchData();
        } catch (err) { showToast("Update failed", "error"); }
    };

    const createAd = async (data) => {
        try {
            await AdminService.publishAd(data);
            showToast("Ad published successfully");
            setActiveTab('campaigns');
            fetchData();
        } catch (err) { showToast("Publishing failed", "error"); }
    };

    const stats = useMemo(() => ({
        pending: submissions.filter(s => s.status === 'PENDING').length,
        activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
        totalRevenue: campaigns.reduce((acc, c) => acc + (c.planPrice || 0), 0)
    }), [submissions, campaigns]);

    return {
        submissions, campaigns, activeTab, setActiveTab, toast, stats, loading,
        prefillAdData,
        handleApprove,
        handleToggleCampaignStatus,
        startPublishWorkflow: (ad) => {
            setPrefillAdData(ad);
            setActiveTab('create');
        },
        createAd,
        refresh: fetchData
    };
};