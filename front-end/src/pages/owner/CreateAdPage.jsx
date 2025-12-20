import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../../components/Owner/forms/FormGroup";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { ownerData } from "../../data/mockData.js";
import {
  AmenityCheckbox,
  PhotoUploader,
} from "../../components/Owner/ads/CreateAdSubComponents";

const availableAmenities = [
  { label: "Attached Bathroom", icon: "fa-bath" },
  { label: "Wi-Fi", icon: "fa-wifi" },
  { label: "Kitchen Access", icon: "fa-utensils" },
  { label: "Parking", icon: "fa-car" },
  { label: "Laundry", icon: "fa-washing-machine" },
];

const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    rent: "",
    deposit: "",
    description: "",
    amenities: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prev.amenities, value]
            : prev.amenities.filter((i) => i !== value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Boarding Ad Created Successfully!");
      navigate("../myAds");
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12 bg-light min-h-screen">
      <HeaderBar
        title="Create New Ad"
        subtitle="List a new boarding space"
        userAvatar={ownerData.avatar}
        notificationCount={3}
        userName={ownerData.firstName}
      >
        <button
          className="px-6 py-3 bg-accent text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
          onClick={() => navigate("../myAds")}
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Ads
        </button>
      </HeaderBar>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-4 max-w-6xl mx-auto"
      >
        {/* Section 1: Details */}
        <section className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
          <h2 className="text-xl font-black mb-6 pb-3 border-b border-light text-primary uppercase tracking-tight">
            Boarding Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormGroup
              label="Ad Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <FormGroup
              label="Full Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormGroup
              label="Monthly Rent (LKR)"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
            />
            <FormGroup
              label="Security Deposit (LKR)"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
            />
          </div>
          <div className="mt-8">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-muted">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the atmosphere, rules, and nearby landmarks..."
              className="w-full p-4 border border-light rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 bg-white/50 transition-all text-text font-medium"
              required
            />
          </div>
        </section>

        {/* Section 2: Amenities & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
            <h2 className="text-xl font-black mb-6 pb-3 border-b border-light text-primary uppercase tracking-tight">
              Features & Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableAmenities.map((item) => (
                <AmenityCheckbox
                  key={item.label}
                  item={item}
                  isChecked={formData.amenities.includes(item.label)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </section>

          <section className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
            <h2 className="text-xl font-black mb-6 pb-3 border-b border-light text-primary uppercase tracking-tight">
              Media Gallery
            </h2>
            <PhotoUploader
              onImageSelect={handleImageSelect}
              previews={previews}
              onRemove={handleRemoveImage}
            />
          </section>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-12 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all
              ${
                isSubmitting
                  ? "bg-muted text-white cursor-not-allowed"
                  : "bg-accent text-white hover:shadow-xl hover:-translate-y-1 active:scale-95"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <i className="fas fa-circle-notch fa-spin mr-3"></i>{" "}
                Publishing...
              </span>
            ) : (
              <span className="flex items-center">
                <i className="fas fa-bullhorn mr-3"></i> Publish Ad
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdPage;
