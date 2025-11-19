import React from 'react';
import { motion } from 'framer-motion';
import { FaCcVisa, FaUniversity, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const PaymentMethodsList = ({
  paymentMethods,
  activeMethodId,
  onSelectMethod,
  onAddMethod,
  onEditMethod,
  onRemoveMethod,
}) => {
  const getMethodIcon = (type) => {
    switch (type) {
      case 'visa':
        return FaCcVisa;
      case 'bank':
        return FaUniversity;
      default:
        return FaCcVisa;
    }
  };

  return (
    <section className="bg-card-bg rounded-large shadow-custom p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Payment Methods</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddMethod}
          className="flex items-center gap-2 px-4 py-2 rounded-large font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          <FaPlus />
          Add New
        </motion.button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = getMethodIcon(method.type);
          const isActive = method.id === activeMethodId;

          return (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectMethod(method.id)}
              className={`flex items-center gap-4 p-4 rounded-large border-2 cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent'
              }`}
            >
              <Icon className="text-3xl text-accent flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-text-dark">{method.name}</h4>
                <span className="text-sm text-text-muted">{method.details}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditMethod(method.id);
                  }}
                  className="p-2 rounded-lg text-text-muted hover:bg-background-light hover:text-text-dark transition-colors duration-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveMethod(method.id);
                  }}
                  className="p-2 rounded-lg text-text-muted hover:bg-error/10 hover:text-error transition-colors duration-200"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethodsList;