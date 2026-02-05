import { useState, useEffect } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import {
  getDashboardStats,
  getRevenueChartData,
  getDashboardTransactions,
  getRecentAppointments, // ✅ CHANGE 1: Import the new service
  getOwnerProfile,
} from "../../api/owner/service";

export const useDashboardLogic = () => {
  const { currentOwner, isLoading: authLoading } = useOwnerAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    walletBalance: 0,
    totalPlatformFees: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({
    firstName: "Owner",
    fullName: "Owner",
    avatar: "",
  });

  useEffect(() => {
    if (authLoading || !currentOwner?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const ownerId = currentOwner.id;

        console.log("Fetching Dashboard Data for Owner ID:", ownerId);

        // Execute all API calls in parallel
        const [
          statsRes,
          chartRes,
          txRes,
          appRes, // This will now be the Top 5 Recent
          profileRes,
        ] = await Promise.all([
          getDashboardStats(),
          getRevenueChartData(),
          getDashboardTransactions(),
          getRecentAppointments(ownerId), // ✅ CHANGE 2: Call the correct API
          getOwnerProfile(),
        ]);

        if (statsRes) setStats(statsRes);
        if (chartRes) setChartData(chartRes);
        if (txRes) setTransactions(txRes);
        if (profileRes) setUser(profileRes);

        // ✅ CHANGE 3: No need to sort manually, Backend does it.
        if (appRes) {
          setAppointments(appRes);
        }
      } catch (error) {
        console.error("Dashboard Logic Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentOwner, authLoading]);

  return {
    loading: loading || authLoading,
    stats,
    chartData,
    transactions,
    appointments,
    user,
  };
};
