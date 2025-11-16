import React, { useState } from "react";

const COLORS = {
  primary: "#D84C38", // --primary
  accent: "#FF7A00", // --accent
  text: "#332720", // --text
  muted: "#665345", // --muted
  cardBg: "#FFFFFF", // --card-bg
  light: "#E8DBC7", // --light
};

const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    rent: "",
    deposit: "",
    description: "",
    amenities: [],
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Ad Data Submitted:", formData);
      alert("Boarding Ad Created Successfully!");
      setIsSubmitting(false);
      // Reset form
      setFormData({
        title: "",
        address: "",
        rent: "",
        deposit: "",
        description: "",
        amenities: [],
        image: null,
      });
    }, 2000);
  };

  const availableAmenities = [
    { label: "Attached Bathroom", icon: "fa-bath" },
    { label: "Wi-Fi", icon: "fa-wifi" },
    { label: "Kitchen Access", icon: "fa-utensils" },
    { label: "Parking", icon: "fa-car" },
    { label: "Laundry", icon: "fa-washing-machine" },
  ];

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.light }}>
      {/* Header - Adapting the content-header style */}
      <header
        className="flex justify-between items-center mb-8 p-6 rounded-3xl shadow-lg sticky top-6 z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)", // for safari
        }}
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Create New Boarding Ad
          </h1>
          <p className="text-sm" style={{ color: COLORS.muted }}>
            List a new boarding space for students
          </p>
        </div>
        <button
          className="px-6 py-2 font-semibold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
          onClick={() => console.log("View Drafts")}
        >
          <i className="fas fa-file-alt mr-2"></i>
          View Drafts
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Form Card */}
        <div
          className="bg-white p-8 rounded-3xl shadow-xl"
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
        >
          <h2
            className="text-xl font-semibold mb-6 pb-3 border-b"
            style={{ color: COLORS.primary, borderColor: COLORS.light }}
          >
            Boarding Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup
              label="Ad Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Spacious Room near Campus"
              type="text"
            />
            <FormGroup
              label="Full Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 456 Main St, Matara"
              type="text"
            />
            <FormGroup
              label="Monthly Rent (LKR)"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              placeholder="e.g., 15000"
              type="number"
            />
            <FormGroup
              label="Key Money/Deposit (LKR)"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="e.g., 30000"
              type="number"
            />
          </div>

          <div className="mt-6">
            <label
              className="block font-semibold mb-2"
              style={{ color: COLORS.primary }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your boarding space in detail (e.g., proximity to university, facilities, rules)."
              className="w-full p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
              style={{
                borderColor: COLORS.light,
                color: COLORS.text,
                backgroundColor: COLORS.cardBg,
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.light)}
              required
            ></textarea>
          </div>
        </div>

        {/* Amenities & Photos Card */}
        <div
          className="bg-white p-8 rounded-3xl shadow-xl"
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
        >
          <h2
            className="text-xl font-semibold mb-6 pb-3 border-b"
            style={{ color: COLORS.primary, borderColor: COLORS.light }}
          >
            Features & Media
          </h2>

          {/* Amenities */}
          <div className="mb-8">
            <h4
              className="font-semibold mb-3"
              style={{ color: COLORS.primary }}
            >
              Select Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableAmenities.map((item) => (
                <label
                  key={item.label}
                  className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80"
                  style={{ backgroundColor: COLORS.light }}
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item.label}
                    checked={formData.amenities.includes(item.label)}
                    onChange={handleChange}
                    className="h-5 w-5 rounded transition duration-200 checked:bg-orange-500 checked:border-transparent"
                    style={{ borderColor: COLORS.muted, color: COLORS.accent }} // Custom style for checkmark color
                  />
                  <i
                    className={`fas ${item.icon}`}
                    style={{ color: COLORS.accent }}
                  ></i>
                  <span
                    className="text-sm font-medium"
                    style={{ color: COLORS.text }}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos Upload */}
          <div className="mt-6">
            <label
              className="block font-semibold mb-2"
              style={{ color: COLORS.primary }}
            >
              Upload Boarding Photos (Min 3)
            </label>
            <div
              className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300"
              style={{
                borderColor: COLORS.light,
                backgroundColor: COLORS.cardBg,
              }}
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <i
                className="fas fa-upload text-3xl mb-2"
                style={{ color: COLORS.accent }}
              ></i>
              <p className="text-sm" style={{ color: COLORS.muted }}>
                Drag and drop your images here, or{" "}
                <span
                  className="font-semibold"
                  style={{ color: COLORS.accent }}
                >
                  browse
                </span>
                .
              </p>
              {formData.image && (
                <p className="mt-2 text-sm" style={{ color: COLORS.success }}>
                  File selected: {formData.image.name}
                </p>
              )}
              <input
                type="file"
                id="imageUpload"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submission Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-lg font-bold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.cardBg,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                Publishing...
              </>
            ) : (
              <>
                <i className="fas fa-bullhorn mr-2"></i>
                Publish Ad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable form group component
const FormGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  const COLORS = {
    primary: "#D84C38",
    accent: "#FF7A00",
    text: "#332720",
    light: "#E8DBC7",
    cardBg: "#FFFFFF",
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block font-semibold mb-2"
        style={{ color: COLORS.primary }}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
        style={{
          borderColor: COLORS.light,
          color: COLORS.text,
          backgroundColor: COLORS.cardBg,
        }}
        onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
        onBlur={(e) => (e.target.style.borderColor = COLORS.light)}
      />
    </div>
  );
};

export default CreateAdPage;
