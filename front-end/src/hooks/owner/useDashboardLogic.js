import { useState, useEffect } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import {
  getDashboardStats,
  getRevenueChartData,
  getDashboardTransactions,
  getOwnerAppointments,
  getOwnerProfile
} from "../../services/service";

export const useDashboardLogic = () => {
  const { currentOwner, isLoading: authLoading } = useOwnerAuth(); // 2. Get Real User

  const [loading, setLoading] = useState(true);
  
  // State for dashboard widgets
  const [stats, setStats] = useState({ 
    totalEarnings: 0, 
    monthlyEarnings: 0, 
    walletBalance: 0,
    totalPlatformFees: 0
  });
  
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({ 
    firstName: "Owner", 
    fullName: "Owner", 
    avatar: "" 
  });

  useEffect(() => {
    // 3. Wait until Auth is finished and we have a User
    if (authLoading || !currentOwner?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 4. Use the REAL ID from context
        const ownerId = currentOwner.id; 

        console.log("Fetching Dashboard Data for Owner ID:", ownerId);

        // Execute all API calls in parallel
        const [
          statsRes, 
          chartRes, 
          txRes, 
          appRes, 
          profileRes
        ] = await Promise.all([
           getDashboardStats(),             // Backend gets ID from Token automatically
           getRevenueChartData(),           // Backend gets ID from Token automatically
           getDashboardTransactions(),      // Backend gets ID from Token automatically
           getOwnerAppointments(ownerId),   // This one requires ID in URL
           getOwnerProfile()                // Backend gets ID from Token
        ]);

        if(statsRes) setStats(statsRes);
        if(chartRes) setChartData(chartRes);
        if(txRes) setTransactions(txRes);
        if(profileRes) setUser(profileRes);

        if(appRes) {
           const sortedApps = appRes.sort((a, b) => 
             new Date(b.requestedStartTime) - new Date(a.requestedStartTime)
           );
           setAppointments(sortedApps);
        }

      } catch (error) {
        console.error("Dashboard Logic Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentOwner, authLoading]); // 5. Re-run when user loads

  return { 
    loading: loading || authLoading, // Show loading if either Auth or Data is fetching
    stats, 
    chartData, 
    transactions, 
    appointments, 
    user 
  };
};