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

const notificationCount = 3;

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

    // Store actual files for the form submission
    setSelectedFiles((prev) => [...prev, ...files]);

    // Generate temporary URLs for immediate display
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    // Remove the file
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Remove the preview and revoke the URL to save memory
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
    <div className="space-y-6">
      <HeaderBar
        title="Create New Ad"
        subtitle="List a new boarding space"
        userAvatar={ownerData.avatar}
        notificationCount={notificationCount}
        userName={ownerData.firstName}
      >
        <button
          className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--card-bg)",
          }}
          onClick={() => navigate("../myAds")}
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Ads
        </button>
      </HeaderBar>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Details */}
        <div className="bg-white p-8 mt-12 rounded-[25px] shadow-xl">
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b border-(--light) text-(--primary)">
            Boarding Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              label="Monthly Rent"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
            />
            <FormGroup
              label="Deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <label className="block font-semibold mb-2 text-(--primary)">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none border-[var(--light)]"
              required
            />
          </div>
        </div>

        {/* Section 2: Amenities & Media */}
        <div className="bg-white p-8 rounded-[25px] shadow-xl">
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b border-(--light) text-(--primary)">
            Features & Media
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableAmenities.map((item) => (
              <AmenityCheckbox
                key={item.label}
                item={item}
                isChecked={formData.amenities.includes(item.label)}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="bg-white p-8 rounded-[25px] shadow-xl">
        <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b border-(--light) text-(--primary)">
          Media Gallery
        </h2>
        
        <PhotoUploader 
          onImageSelect={handleImageSelect} 
          previews={previews} 
          onRemove={handleRemoveImage} 
        />
      </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-[25px] font-bold bg-(--accent) text-(--card-bg) shadow-lg transition hover:translate-y-[-2px]"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin mr-2"></i>{" "}
                Publishing...
              </>
            ) : (
              <>
                <i className="fas fa-bullhorn mr-2"></i> Publish Ad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdPage;
