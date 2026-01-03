import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import { ownerData } from "../../data/mockData";

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
    colorClass: "text-info",
    bgClass: "bg-info",
    borderClass: "border-info",
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
      "Detailed dashboard",
      "Homepage rotation",
    ],
    colorClass: "text-accent",
    bgClass: "bg-accent",
    borderClass: "border-accent",
    icon: "fas fa-rocket",
  },
  {
    id: 3,
    name: "Max Occupancy",
    price: 4500,
    duration: "90 Days",
    benefits: [
      "Guaranteed top placement",
      "Unlimited impressions",
      "Email blast",
      "Priority support",
    ],
    colorClass: "text-primary",
    bgClass: "bg-primary",
    borderClass: "border-primary",
    icon: "fas fa-crown",
  },
];

const PlanCard = ({ plan, adId }) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    const confirmation = window.confirm(
      `Confirm purchase of the ${
        plan.name
      } for LKR ${plan.price.toLocaleString()}?`
    );

    if (confirmation) {
      const boostedAds = JSON.parse(
        sessionStorage.getItem("boostedAds") || "[]"
      );
      if (!boostedAds.includes(adId)) {
        boostedAds.push(adId);
        sessionStorage.setItem("boostedAds", JSON.stringify(boostedAds));
      }
      alert(`SUCCESS: Ad #${adId} is now boosted!`);
      navigate("/ownerLayout/myAds");
    }
  };

  return (
    <div
      className={`
      relative flex flex-col p-8 rounded-report bg-card-bg shadow-custom border-t-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
      ${plan.borderClass}
    `}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-black text-text uppercase tracking-tight">
          {plan.name}
        </h3>
        <div className={`p-3 rounded-2xl bg-light ${plan.colorClass}`}>
          <i className={`${plan.icon} text-2xl`}></i>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-4xl font-black text-primary tracking-tighter">
          LKR {plan.price.toLocaleString()}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
          per {plan.duration}
        </span>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm font-medium text-text"
          >
            <i
              className={`fas fa-check-circle mt-1 shrink-0 ${plan.colorClass}`}
            ></i>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelectPlan}
        className={`
          w-full py-4 text-xs font-black uppercase tracking-widest rounded-full text-white shadow-lg transition-all active:scale-95
          ${plan.bgClass} hover:brightness-110
        `}
      >
        Activate {plan.name}
      </button>
    </div>
  );
};

export default function SubscriptionPlanPage() {
  const { adId } = useParams();
  const navigate = useNavigate();

  if (!adId) {
    setTimeout(() => navigate("/ownerLayout/myAds"), 0);
    return null;
  }

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-12">
      <HeaderBar
        title="Choose Your Subscription Plan"
        subtitle="Select a plan to boost your ad visibility and attract more students."
        navBtnText="Back to My Ads"
        navBtnPath="/owner/myAds"
      />
        

      {/* Why Boost Section */}
      <section className="mx-4 p-8 rounded-report bg-card-bg shadow-custom border border-light text-center max-w-4xl lg:mx-auto">
        <h2 className="text-xl font-black text-accent uppercase tracking-widest mb-3">
          Why Boost Your Ads?
        </h2>
        <p className="text-muted font-medium italic">
          Boosted ads appear higher in search results, reach more students, and
          convert appointments faster than standard listings.
        </p>
      </section>

      {/* Subscription Grid */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} adId={adId} />
          ))}
        </div>
      </section>
    </div>
  );
}
