import { useState } from 'react';
import { sampleBoardingData } from '../data/boardingsData';

const useBoardingsLogic = () => {
  const [currentBoarding, setCurrentBoarding] = useState(sampleBoardingData);
  const [hasBoarding] = useState(true); // Set to false to show empty state

  const payRent = () => {
    setCurrentBoarding(prev => ({
      ...prev,
      nextPayment: {
        ...prev.nextPayment,
        isPaid: true
      }
    }));
  };

  return {
    currentBoarding,
    hasBoarding,
    payRent
  };
};

export default useBoardingsLogic;