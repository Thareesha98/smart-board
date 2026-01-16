import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { getOwnerBoardings, getBoardingTenants } from "../../api/owner/service";
import useReportLogic from "./useReportLogic";

export default function useAddReportLogic() {
  const navigate = useNavigate();
  const { currentOwner } = useOwnerAuth();
  const { submitNewReport, isSubmitting } = useReportLogic();

  // --- 1. DATA STATE ---
  const [properties, setProperties] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [newFiles, setNewFiles] = useState([]);

  // --- 2. FORM STATE (Matches Java DTO Exact Keys) ---
  const [formData, setFormData] = useState({
    reportTitle: "",         // Fixed: was 'title'
    reportDescription: "",   // Fixed: was 'description'
    type: "",                // Fixed: was 'reportType'
    severity: "",
    boarding: "",            // Fixed: Java expects String name
    
    senderId: "",            // Will be set on submit
    reportedUserId: "",      // Fixed: was 'studentId'
    reportedPersonName: "",  // New: Java field
    
    incidentDate: "",
    allowContact: true,
    
    // Helper for frontend logic (not sent to backend)
    propertyId: ""
  });

  // --- 3. LOAD BOARDINGS (WITH MAPPING FIX) ---
  useEffect(() => {
    const loadProperties = async () => {
      if (!currentOwner?.id) return;

      try {
        setLoadingData(true);
        const data = await getOwnerBoardings(currentOwner.id);

        if (Array.isArray(data)) {
          // 🛠️ MAPPING FIX: Force data into { id, name } format
          // This ensures SelectGroup always finds a .name to display
          const formattedBoardings = data.map(p => ({
            id: p.id || p.boardingId,
            name: p.name || p.boardingName || p.title || "Unnamed Property"
          }));
          
          setProperties(formattedBoardings);
        }
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoadingData(false);
      }
    };
    loadProperties();
  }, [currentOwner]);

  // --- 4. HANDLERS ---

  const handlePropertyChange = async (e) => {
    const selectedId = e.target.value;
    
    // Find the name for the DTO
    const selectedProp = properties.find(p => String(p.id) === String(selectedId));

    setFormData(prev => ({
      ...prev,
      propertyId: selectedId,
      boarding: selectedProp ? selectedProp.name : "", // Send Name to Backend
      reportedUserId: "", // Reset student
      reportedPersonName: ""
    }));

    // Load Tenants
    if (selectedId) {
      try {
        const tenantList = await getBoardingTenants(selectedId);
        // Map tenants if needed, assuming they have {id, name}
        setStudents(tenantList); 
      } catch (err) {
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const student = students.find(s => String(s.id) === String(studentId));

    setFormData(prev => ({
      ...prev,
      reportedUserId: studentId,
      reportedPersonName: student ? student.name : ""
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare Final Payload
    const payload = {
      ...formData,
      senderId: currentOwner.id, // Ensure ID is attached
    };

    // Remove helper fields that Java doesn't know about
    delete payload.propertyId; 

    const result = await submitNewReport(payload, newFiles);

    if (result.success) {
      alert("Report submitted successfully.");
      navigate("/owner/reports");
    } else {
      alert(result.message || "Failed to submit report.");
    }
  };

  return {
    properties,
    students,
    loadingData,
    formData,
    newFiles,
    isSubmitting,
    handlePropertyChange,
    handleStudentChange,
    handleChange,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  };
}