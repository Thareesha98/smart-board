import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus } from 'react-icons/fa';

const PaymentMethodModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
    setFormData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card-bg rounded-large shadow-2xl w-full max-w-md"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-primary">Add Payment Method</h3>
                <button
                  onClick={onClose}
                  className="text-text-muted hover:text-text-dark transition-colors duration-200"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block font-semibold text-text-dark mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-4 border-2 border-gray-200 rounded-btn transition-colors duration-200 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full p-4 border-2 border-gray-200 rounded-btn transition-colors duration-200 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-text-dark mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className="w-full p-4 border-2 border-gray-200 rounded-btn transition-colors duration-200 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-text-dark mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-4 border-2 border-gray-200 rounded-btn transition-colors duration-200 focus:border-accent focus:outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-large font-semibold bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg"
                >
                  <FaPlus />
                  Add Payment Method
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentMethodModal;