import React, { useState } from "react";
import { FormGroup } from "../../components/Owner/FormGroup";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Boarding Ad Created Successfully!");
      setIsSubmitting(false);
    }, 2000);
  };


  const primaryBtnClass =
    "btn btn-primary p-[0.6rem] px-4 rounded-[25px] font-semibold shadow-md transition duration-300 flex items-center gap-1";

  return (
    <div className="space-y-6">
      {/* Horizontal Header(including Notifications/Profile) */}
      <header
        className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-3 z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          boxShadow: "var(--shadow)",
          marginTop: 0,
        }}
      >
        {/* Header Left (Title and Subtitle) */}
        <div className="header-left flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: "var(--primary)" }}
          >
            Create New Ad
          </h1>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            List a new boarding space for students (Owner View)
          </p>
        </div>

        
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Form Card */}
        <div
          className="bg-white p-8 mt-12 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow )" }}
        >
          <h2
            className="text-[1.3rem] font-bold mb-6 pb-3 border-b"
            style={{ color: "var(--primary)", borderColor: "var(--light)" }}
          >
            Boarding Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup
              label="Ad Title"
              name="title"
              placeholder="e.g., Spacious Room near Campus"
            />
            <FormGroup
              label="Full Address"
              name="address"
              placeholder="e.g., 456 Main St, Matara"
            />
            <FormGroup
              label="Monthly Rent (LKR)"
              name="rent"
              placeholder="e.g., 15000"
              type="number"
            />
            <FormGroup
              label="Key Money/Deposit (LKR)"
              name="deposit"
              placeholder="e.g., 30000"
              type="number"
            />
          </div>

          <div className="mt-6">
            <label
              className="block font-semibold mb-2"
              style={{ color: "var(--primary)" }}
            >
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your boarding space in detail."
              className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
              style={{ borderColor: "var(--light)", color: "var(--text)" }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
              required
            ></textarea>
          </div>
        </div>

        {/* Amenities & Photos Card */}
        <div
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow )" }}
        >
          <h2
            className="text-[1.3rem] font-bold mb-6 pb-3 border-b"
            style={{ color: "var(--primary)", borderColor: "var(--light)" }}
          >
            Features & Media
          </h2>

          {/* Amenities */}
          <div className="mb-8">
            <h4
              className="font-semibold text-lg mb-3"
              style={{ color: "var(--primary)" }}
            >
              Select Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableAmenities.map((item) => (
                <label
                  key={item.label}
                  className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80"
                  style={{ backgroundColor: "var(--light)" }}
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item.label}
                    onChange={handleChange}
                    className="h-5 w-5 rounded transition duration-200 checked:bg-orange-500 checked:border-transparent"
                    style={{
                      borderColor: "var(--muted)",
                      color: "var(--accent)",
                    }}
                  />
                  <i
                    className={`fas ${item.icon}`}
                    style={{ color: "var(--accent)" }}
                  ></i>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
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
              style={{ color: "var(--primary)" }}
            >
              Upload Boarding Photos (Min 3)
            </label>
            <div
              className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300"
              style={{
                borderColor: "var(--light)",
                backgroundColor: "var(--cardBg)",
              }}
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <i
                className="fas fa-upload text-3xl mb-2"
                style={{ color: "var(--accent)" }}
              ></i>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Drag and drop your images here, or{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  browse
                </span>
                .
              </p>
              <input
                type="file"
                id="imageUpload"
                name="image"
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
            className={primaryBtnClass}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--cardBg)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              transform: isSubmitting ? "none" : "translateY(-2px)",
            }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Publishing...
              </>
            ) : (
              <>
                <i className="fas fa-bullhorn"></i>
                Publish Ad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdPage;