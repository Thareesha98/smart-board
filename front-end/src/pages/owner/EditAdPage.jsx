import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMyAdsLogic from "../../hooks/owner/useMyAdsLogic";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import FormGroup from "../../components/Owner/forms/FormGroup";
import LocationPicker from "../../components/common/LocationPicker";

import {
  AdStatusBadge,
  AmenityItem,
  ImagePreview,
  ImageUploader,
  LoadingSpinner,
} from "../../components/Owner/ads/EditAdSubComponents";

// ✅ 1. Constants (Copied from CreateAdPage)
const BOARDING_TYPES = ["ANNEX", "ROOM", "HOUSE"];
const GENDER_TYPES = ["MALE", "FEMALE", "MIXED"];

const availableAmenities = [
  { label: "Attached Bathroom", icon: "fa-bath" },
  { label: "Wi-Fi", icon: "fa-wifi" },
  { label: "Kitchen Access", icon: "fa-utensils" },
  { label: "Parking", icon: "fa-car" },
  { label: "Laundry", icon: "fa-washing-machine" },
];

const EditAdPage = () => {
  const { adId } = useParams();
  const navigate = useNavigate();
  const { currentOwner } = useOwnerAuth();
  const { fetchSingleAd, updateAd, isLoading } = useMyAdsLogic();

  const [formData, setFormData] = useState(null);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // --- Load Data ---
  useEffect(() => {
    const loadAdData = async () => {
      const data = await fetchSingleAd(adId);
      if (data) {
        setFormData({
          ...data,
          rent: data.rent || "",
          deposit: data.deposit || "",
          description: data.description || "",
          amenities: data.amenities || [],
          currentImages: data.currentImages || [],
          adStatus: data.status || "Draft",

          // ✅ 2. Initialize new fields (with defaults if missing)
          genderType: data.genderType || "MIXED",
          boardingType: data.boardingType || "ROOM",
          availableSlots: data.availableSlots || 1,
          maxOccupants: data.maxOccupants || 1,


          latitude: data.latitude || 6.9271, 
          longitude: data.longitude || 79.8612
        });
      }
    };
    loadAdData();
  }, [adId, fetchSingleAd]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImageFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleRemoveExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentImages: prev.currentImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAd(
      adId,
      formData, // Now contains gender, boarding type, slots, etc.
      newImageFiles,
      formData.currentImages,
      formData.adStatus
    );
  };

  if (isLoading && !formData) return <LoadingSpinner id={adId} />;
  if (!formData)
    return <div className="p-8 text-center text-error">Ad not found.</div>;

  return (
    <div className="pt-4 space-y-8 bg-light min-h-screen pb-12">
      <HeaderBar
        title={`Edit Ad: ${adId}`}
        subtitle={`Editing details for **${formData.title}**`}
        userAvatar={currentOwner?.avatar}
        userName={currentOwner?.firstName}
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-4 max-w-6xl mx-auto"
      >
        {/* Ad Information */}
        <div className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-light">
            <h2 className="text-xl font-black text-primary uppercase tracking-tight">
              Ad Information
            </h2>
            <AdStatusBadge
              status={formData.adStatus}
              className={
                formData.adStatus === "Active"
                  ? "bg-success text-white"
                  : formData.adStatus === "Pending"
                  ? "bg-accent text-white"
                  : "bg-muted text-white"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormGroup
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <FormGroup
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormGroup
              label="Monthly Rent (LKR)"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              type="number"
            />
            <FormGroup
              label="Security Deposit (LKR)"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              type="number"
            />

            {/* ✅ 3. Added Dropdowns (Gender & Boarding Type) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-muted tracking-wider">
                Gender Preference
              </label>
              <select
                name="genderType"
                value={formData.genderType}
                onChange={handleChange}
                className="p-3 border border-light rounded-xl bg-white/50 focus:border-accent font-medium text-text"
              >
                {GENDER_TYPES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-muted tracking-wider">
                Boarding Type
              </label>
              <select
                name="boardingType"
                value={formData.boardingType}
                onChange={handleChange}
                className="p-3 border border-light rounded-xl bg-white/50 focus:border-accent font-medium text-text"
              >
                {BOARDING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ 4. Added Slot & Occupant Inputs */}
            <FormGroup
              label="Available Slots"
              name="availableSlots"
              type="number"
              value={formData.availableSlots}
              onChange={handleChange}
            />
            <FormGroup
              label="Max Occupants"
              name="maxOccupants"
              type="number"
              value={formData.maxOccupants}
              onChange={handleChange}
            />

            {/* Description */}
            <div className="md:col-span-2 mt-4">
              <label className="block text-xs font-bold uppercase text-muted tracking-wider mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 border border-light rounded-xl bg-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all text-text font-medium"
              />
            </div>
          </div>
        </div>

        {/* Map Section (Inserted Here) */}
        <div className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
          <h2 className="text-xl font-black mb-6 pb-3 border-b border-light text-primary uppercase tracking-tight">
             Update Location
          </h2>
          <LocationPicker 
             lat={formData.latitude} 
             lng={formData.longitude} 
             onLocationSelect={handleLocationSelect} 
          />
        </div>

        {/* Features & Media */}
        <div className="bg-card-bg p-8 rounded-report shadow-custom border border-light">
          <h2 className="text-xl font-black mb-6 pb-4 border-b border-light text-primary uppercase tracking-tight">
            Features & Media
          </h2>

          <div className="mb-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">
              Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableAmenities.map((item) => (
                <AmenityItem
                  key={item.label}
                  item={item}
                  isChecked={formData.amenities.includes(item.label)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">
              Photos
            </h4>
            <div className="flex flex-wrap gap-4">
              {formData.currentImages.map((src, idx) => (
                <ImagePreview
                  key={`curr-${idx}`}
                  src={src}
                  onRemove={() => handleRemoveExistingImage(idx)}
                />
              ))}
              {newImagePreviews.map((src, idx) => (
                <ImagePreview
                  key={`new-${idx}`}
                  src={src}
                  isNew={true}
                  onRemove={() => handleRemoveNewImage(idx)}
                />
              ))}
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-4 space-x-4">
          <button
            type="button"
            onClick={() => navigate("/owner/myAds")}
            className="px-8 py-3 font-black text-[10px] uppercase tracking-widest rounded-full border-2 border-primary text-primary transition-all hover:bg-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`
                px-10 py-3 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg text-white transition-all 
                ${
                  isLoading
                    ? "bg-muted cursor-not-allowed"
                    : "bg-accent hover:shadow-xl hover:-translate-y-1 active:scale-95"
                }
            `}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdPage;
