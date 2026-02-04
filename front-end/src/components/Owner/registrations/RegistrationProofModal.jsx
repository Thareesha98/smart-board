import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaReceipt, FaPenNib, FaUndo } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";

const RegistrationProofModal = ({
  isOpen,
  onClose,
  registration,
  onDecide,
}) => {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sigPad = useRef(null);

  if (!isOpen || !registration) return null;

  const handleSubmit = async (status) => {
    // 1. Validate Signature for Approval
    if (status === "APPROVED") {
      if (sigPad.current.isEmpty()) {
        alert("Please sign the agreement to approve.");
        return;
      }
    }

    setIsSubmitting(true);

    // 2. Get Signature
    const signature =
      sigPad.current && !sigPad.current.isEmpty()
        ? sigPad.current.getTrimmedCanvas().toDataURL("image/png")
        : null;

    // 3. Send Decision
    const success = await onDecide(
      registration.id,
      status,
      note,
      signature,
      true,
    );

    setIsSubmitting(false);
    if (success) {
      setNote("");
      if (sigPad.current) sigPad.current.clear();
      onClose();
    }
  };

  const clearSignature = () => {
    if (sigPad.current) sigPad.current.clear();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-5 bg-primary shrink-0">
            <div className="bg-white/20 p-2.5 rounded-xl text-white shadow-inner">
              <FaReceipt size={24} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-black leading-none text-white">
                Verify Payment
              </h3>
              <p className="text-xs font-medium text-white/80">
                Review key money & Sign agreement
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5 overflow-y-auto">
            {/* Transaction Proof */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-black tracking-wider uppercase text-muted">
                Transaction Ref ({registration.paymentMethod || "N/A"})
              </label>
              <div className="p-4 font-mono text-sm font-bold text-center break-all border-2 border-gray-200 border-dashed text-primary bg-gray-50 rounded-xl">
                {registration.paymentTransactionRef || "No reference provided"}
              </div>
            </div>

            {/* Note Input */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-black tracking-wider uppercase text-muted">
                Owner Note
              </label>
              <textarea
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white min-h-[60px]"
                placeholder="Message to student..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Signature Section (Required for Approval) */}
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <label className="flex items-center gap-1 ml-1 text-xs font-black tracking-wider uppercase text-muted">
                  <FaPenNib /> Signature (Required for Approval)
                </label>
                <button
                  onClick={clearSignature}
                  className="text-[10px] text-primary font-bold flex items-center gap-1 hover:underline"
                >
                  <FaUndo /> Clear
                </button>
              </div>
              <div className="overflow-hidden transition-colors border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-primary/50">
                <SignatureCanvas
                  ref={sigPad}
                  penColor="black"
                  canvasProps={{ className: "w-full h-32 bg-white" }}
                />
              </div>
              <p className="text-[10px] text-muted leading-tight">
                By signing, you agree to the Terms of Service and generate a
                binding rental agreement.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                disabled={isSubmitting}
                onClick={() => handleSubmit("REJECTED")} // ⚠️ Sends "REJECTED"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-error/10 bg-error/5 text-error font-bold text-sm hover:bg-error hover:text-white hover:border-error transition-all disabled:opacity-50"
              >
                <FaTimes /> Reject
              </button>
              <button
                disabled={isSubmitting}
                // ✅ FIXED: Sends "APPROVED" (Matches Backend Enum)
                onClick={() => handleSubmit("APPROVED")}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-success text-white font-bold text-sm shadow-lg shadow-success/30 hover:bg-success-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <FaCheck /> Approve & Sign
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 mt-2 text-xs font-bold text-center text-muted hover:text-text"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationProofModal;
