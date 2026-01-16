import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { getOwnerBoardings, getBoardingTenants } from "../../api/owner/service";
import useReportLogic from "./useReportLogic"; 

export default function useAddReportLogic() {
  const navigate = useNavigate();
  const { currentOwner } = useOwnerAuth();
  
  // Reuse existing submission logic
  const { submitNewReport, isSubmitting } = useReportLogic();

  // --- State Management ---
  const [properties, setProperties] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [newFiles, setNewFiles] = useState([]);

  const [formData, setFormData] = useState({
    propertyId: "",
    boardingName: "",
    studentId: "",
    reportType: "",
    severity: "",
    title: "",
    description: "",
    incidentDate: "",
    allowContact: true,
  });

  // --- Effects ---
  
  // Fetch properties on mount
  useEffect(() => {
    const loadProperties = async () => {
      if (currentOwner?.id) {
        try {
          const data = await getOwnerBoardings(currentOwner.id);
          setProperties(data);
        } catch (error) {
          console.error("Failed to load properties", error);
        } finally {
          setLoadingData(false);
        }
      }
    };
    loadProperties();
  }, [currentOwner]);

  // --- Handlers ---

  const handlePropertyChange = async (e) => {
    const newPropertyId = e.target.value;

    // Find name for the backend DTO logic
    // Using loose comparison logic from original code to handle string/int mismatch
    const selectedProp = properties.find(
      (p) => p.id === parseInt(newPropertyId) || p.id === newPropertyId
    );

    setFormData((prev) => ({
      ...prev,
      propertyId: newPropertyId,
      boardingName: selectedProp ? selectedProp.name : "",
      studentId: "", // Reset student when property changes
    }));

    // Fetch Students for this property
    if (newPropertyId) {
      try {
        const tenantList = await getBoardingTenants(newPropertyId);
        setStudents(tenantList);
      } catch (error) {
        console.error("Failed to load tenants", error);
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await submitNewReport(formData, newFiles);

    if (result.success) {
      alert("Report submitted successfully.");
      navigate("/owner/reports");
    } else {
      alert(result.message || "Failed to submit report.");
    }
  };

  // --- Return ---
  return {
    // Data
    properties,
    students,
    loadingData,
    formData,
    newFiles,
    isSubmitting,
    
    // Handlers
    handlePropertyChange,
    handleChange,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  };
}