import React from "react";

const BoardingCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      
      {/* Left: Image Placeholder */}
      <div className="w-full md:w-72 h-56 md:h-auto bg-gray-200 shrink-0"></div>

      {/* Right: Content Placeholders */}
      <div className="flex-1 p-5 md:p-7 flex flex-col">
        
        {/* Header: Title & Rent */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="w-full space-y-2">
            {/* Title Line */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            {/* Address Line */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Rent Box */}
          <div className="flex flex-col items-end space-y-1">
             <div className="h-6 bg-gray-200 rounded w-24"></div>
             <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Feature Chips (3 items) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Deposit Line */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

        {/* Footer Buttons */}
        <div className="mt-auto flex gap-3">
          <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
        </div>

      </div>
    </div>
  );
};

export default BoardingCardSkeleton;