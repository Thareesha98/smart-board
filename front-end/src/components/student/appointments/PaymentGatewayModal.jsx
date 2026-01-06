import React, { useState, useEffect } from "react";
import { FaCreditCard, FaLock, FaCcVisa, FaCcMastercard, FaCcAmex, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentGatewayModal = ({ isOpen, onClose, defaultAmount, onPaymentComplete }) => {
  // ✅ State for the editable amount
  const [paymentAmount, setPaymentAmount] = useState("");
  
  const [cardData, setCardData] = useState({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [processing, setProcessing] = useState(false);

  // Set default amount when modal opens
  useEffect(() => {
    if (isOpen && defaultAmount) {
      setPaymentAmount(defaultAmount);
    }
  }, [isOpen, defaultAmount]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === "cardNumber") {
        formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    } else if (id === "expiry") {
        formattedValue = value.replace(/\D/g, '').substring(0, 4);
        if (formattedValue.length >= 3) formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
    } else if (id === "cvv") {
        formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setCardData({ ...cardData, [id]: formattedValue });
  };

  const handlePay = (e) => {
    e.preventDefault();
    
    // Validation
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
        alert("Please enter a valid payment amount");
        return;
    }
    if (cardData.cardNumber.length < 16 || !cardData.cvv || !cardData.expiry) {
        alert("Please enter valid card details");
        return;
    }

    setProcessing(true);
    
    // Simulate Bank Processing Delay
    setTimeout(() => {
        setProcessing(false);
        const transactionId = "TXN-" + Math.floor(Math.random() * 1000000000);
        // ✅ Return both Transaction ID and the Actual Amount Paid
        onPaymentComplete(transactionId, paymentAmount);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold flex items-center gap-2"><FaLock className="text-green-400"/> Secure Payment</h3>
                <p className="text-xs text-gray-400">SSL Encrypted Transaction</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400">Paying Key Money</p>
            </div>
        </div>

        {/* Body */}
        <div className="p-6">
            <div className="flex gap-3 mb-6 justify-center text-3xl text-gray-400">
                <FaCcVisa className="hover:text-blue-600 transition-colors"/>
                <FaCcMastercard className="hover:text-red-500 transition-colors"/>
                <FaCcAmex className="hover:text-blue-400 transition-colors"/>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
                
                {/* ✅ NEW: Payment Amount Input */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
                    <label className="block text-xs font-bold text-green-700 uppercase mb-1">Amount to Pay (LKR)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-green-600 font-bold">LKR</span>
                        <input 
                            type="number" 
                            value={paymentAmount} 
                            onChange={(e) => setPaymentAmount(e.target.value)} 
                            className="w-full p-2 pl-12 text-xl font-bold text-green-800 bg-transparent border-b-2 border-green-300 focus:border-green-600 outline-none" 
                            placeholder="0.00"
                            required
                        />
                    </div>
                </div>

                {/* Card Details */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cardholder Name</label>
                    <input type="text" id="holderName" value={cardData.holderName} onChange={handleInputChange} placeholder="JOHN DOE" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase" required />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                    <div className="relative">
                        <input type="text" id="cardNumber" value={cardData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                        <FaCreditCard className="absolute left-3 top-3.5 text-gray-400"/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                        <input type="text" id="expiry" value={cardData.expiry} onChange={handleInputChange} placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center" required />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV / CVC</label>
                        <input type="password" id="cvv" value={cardData.cvv} onChange={handleInputChange} placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center" required />
                    </div>
                </div>

                {/* Pay Button */}
                <button 
                    type="submit" 
                    disabled={processing}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg mt-4 transition-all ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'}`}
                >
                    {processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> 
                            Processing...
                        </span>
                    ) : (
                        `Pay LKR ${paymentAmount ? parseFloat(paymentAmount).toLocaleString() : '0'}`
                    )}
                </button>
            </form>
            
            <button onClick={onClose} disabled={processing} className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">
                Cancel Transaction
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentGatewayModal;