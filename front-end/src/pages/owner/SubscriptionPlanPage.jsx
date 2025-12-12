import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import { ownerData } from '../../data/mockData'; // Centralized owner data

// --- Mock Data for Subscription Plans ---
const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Boost",
    price: 500,
    duration: "7 Days",
    benefits: [
      "Top placement for 1 week",
      "2x view impressions",
      "Email summary report",
    ],
    color: "var(--info)",
    icon: "fas fa-star",
  },
  {
    id: 2,
    name: "Pro Visibility",
    price: 1800,
    duration: "30 Days",
    benefits: [
      "Highest placement for 1 month",
      "5x view impressions",
      "Detailed performance dashboard",
      "Featured on homepage (weekly rotation)",
    ],
    color: "var(--accent)",
    icon: "fas fa-rocket",
  },
  {
    id: 3,
    name: "Max Occupancy",
    price: 4500,
    duration: "90 Days",
    benefits: [
      "Guaranteed top placement",
      "Unlimited view impressions",
      "Dedicated marketing email blast",
      "Priority support",
    ],
    color: "var(--primary)",
    icon: "fas fa-crown",
  },
];

// --- Helper Component: Plan Card ---
const PlanCard = ({ plan, adId }) => {
  const navigate = useNavigate();

  const handleSelectPlan = async () => {
    const confirmation = window.confirm(
      `Confirm purchase of the ${
        plan.name
      } plan for LKR ${plan.price.toLocaleString()}? This will boost Ad ID: ${adId}`
    );

    if (confirmation) {
      // 🌟 MOCK API CALL: Simulate payment and boosting the ad
      alert(`Simulating payment for ${plan.name}...`);

      try {
        // --- START PERSISTENCE SIMULATION ---
        // 1. Get current list of boosted IDs from storage, or initialize an empty array
        const boostedAds = JSON.parse(sessionStorage.getItem('boostedAds') || '[]');
        
        // 2. Add the new adId if it's not already there
        if (!boostedAds.includes(adId)) {
            boostedAds.push(adId);
            // 3. Save the updated list back to session storage
            sessionStorage.setItem('boostedAds', JSON.stringify(boostedAds));
        }
        // --- END PERSISTENCE SIMULATION ---

        alert(
          `SUCCESS: Ad ID ${adId} has been successfully boosted with the ${plan.name} plan!`
        );

        // REDIRECT: Go back to My Ads Page
        navigate("/ownerLayout/myAds");
      } catch (error) {
        alert("Payment failed. Please try again.");
        navigate("/ownerLayout/myAds");
      }
    }
  };

  return (
    <div
      className="plan-card flex flex-col p-8 rounded-[25px] shadow-xl transition duration-300 hover:scale-[1.02] relative"
      style={{
        backgroundColor: "var(--card-bg)",
        boxShadow: "var(--shadow)",
        borderTop: `8px solid ${plan.color}`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
          {plan.name}
        </h3>
        <i
          className={`${plan.icon} text-3xl p-3 rounded-full`}
          style={{ color: plan.color, backgroundColor: "var(--light)" }}
        ></i>
      </div>

      <div className="mb-6">
        <div
          className="text-5xl font-extrabold mb-1"
          style={{ color: "var(--primary)" }}
        >
          LKR {plan.price.toLocaleString()}
        </div>
        <span
          className="text-sm font-medium uppercase"
          style={{ color: "var(--muted)" }}
        >
          for {plan.duration}
        </span>
      </div>

      <ul className="flex-1 list-none p-0 space-y-3 mb-6">
        {plan.benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-base"
            style={{ color: "var(--text)" }}
          >
            <i
              className="fas fa-check-circle mt-1 shrink-0"
              style={{ color: plan.color }}
            ></i>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-full py-3 mt-auto text-lg font-bold rounded-[25px] transition duration-300 hover:shadow-lg"
        style={{ backgroundColor: plan.color, color: "var(--card-bg)" }}
        onClick={handleSelectPlan}
      >
        Activate {plan.name}
      </button>
    </div>
  );
};

// --- Main Component ---
export default function SubscriptionPlanPage() {
  const { adId } = useParams(); // Read the adId from the URL
  const navigate = useNavigate();
  const notificationCount = 0;

  // Safety Check: If adId is missing, redirect
  if (!adId) {
    setTimeout(() => navigate("/ownerLayout/myAds"), 0);
    return null;
  }

  return (
    <div className="pt-4 space-y-8">
      {/* 🌟 HeaderBar */}
      <HeaderBar
        title="Boost & Subscription Plans"
        subtitle={`Select a plan to boost Ad ID: #${adId}`}
        notificationCount={notificationCount}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Plan Explanation */}
      <section
        className="text-center p-6 rounded-[25px]"
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "var(--shadow)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--accent)" }}
        >
          Why Boost Your Ads?
        </h2>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          Boosted ads appear higher in search results, reach more students, and
          convert appointments faster than standard listings.
        </p>
      </section>

      {/* Subscription Grid */}
      <section className="plans-grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} adId={adId} />
          ))}
        </div>
      </section>
    </div>
  );
}