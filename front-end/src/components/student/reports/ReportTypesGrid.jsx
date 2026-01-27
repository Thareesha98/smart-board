import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBuilding,
  FaUserTie,
  FaUsers,
  FaShieldAlt,
  FaExclamationTriangle,
  FaQuestionCircle,
} from 'react-icons/fa';

const ALL_REPORT_TYPES = [
  {
    type: 'BOARDING',
    icon: FaBuilding,
    title: 'Boarding Issue',
    description: 'Report problems with boarding facilities, amenities, or living conditions',
  },
  {
    type: 'OWNER',
    icon: FaUserTie,
    title: 'Owner Behavior',
    description: 'Report inappropriate behavior, harassment, or unfair treatment by owners',
  },
  {
    type: 'STUDENT',
    icon: FaUsers,
    title: 'Other Student',
    description: 'Report issues with other students sharing the boarding facility',
  },
  {
    type: 'SAFETY',
    icon: FaShieldAlt,
    title: 'Safety Concern',
    description: 'Report safety hazards, security issues, or emergency situations',
  },
  {
    type: 'FRAUD',
    icon: FaExclamationTriangle,
    title: 'Fraudulent Listing',
    description: 'Report fake, misleading, or scam boarding advertisements',
  },
  {
    type: 'OTHER',
    icon: FaQuestionCircle,
    title: 'Other Issue',
    description: 'Report any other concerns not covered by the categories above',
  },
];

const ReportTypesGrid = ({ onSelectType, isRegistered }) => {
  
  // ✅ Filter logic: If not registered, only allow Fraud & Other
  const visibleTypes = isRegistered 
    ? ALL_REPORT_TYPES 
    : ALL_REPORT_TYPES.filter(t => ['FRAUD', 'OTHER'].includes(t.type));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-3 gap-6">
      {visibleTypes.map((reportType, index) => (
        <ReportTypeCard
          key={reportType.type}
          reportType={reportType}
          onSelect={() => onSelectType(reportType.type, reportType.title)}
          index={index}
        />
      ))}
    </div>
  );
};

const ReportTypeCard = ({ reportType, onSelect, index }) => {
  const Icon = reportType.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, borderColor: 'var(--accent)' }}
      onClick={onSelect}
      // Added h-full and flex flex-col to ensure uniform card height
      className="bg-card-bg p-8 rounded-large shadow-custom text-center cursor-pointer transition-all duration-300 border-2 border-transparent hover:shadow-xl h-full flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)', color: 'white' }}
        className="w-20 h-20 bg-background-light rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-accent transition-all duration-300"
      >
        <Icon />
      </motion.div>
      <h3 className="text-xl font-bold text-text-dark mb-2">{reportType.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed flex-1">{reportType.description}</p>
    </motion.div>
  );
};

export default ReportTypesGrid;