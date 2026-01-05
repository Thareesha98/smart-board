import React from "react";

const SkeletonAppointmentRow = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 md:p-6 rounded-report bg-card-bg border border-light animate-pulse shadow-sm">
      {/* 1. Student & Property Details Skeleton */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Name Placeholder */}
        <div className="h-4 bg-gray-200 rounded w-1/2 md:w-3/4"></div>
        {/* Boarding Name Placeholder */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <div className="h-2 bg-gray-100 rounded w-2/3"></div>
        </div>
      </div>

      {/* 2. Contact & Date Skeleton */}
      <div className="grid grid-cols-2 md:flex md:flex-row flex-[2] gap-4 md:gap-6 py-3 md:py-0 border-y md:border-y-0 border-light/50">
        <div className="flex flex-col justify-center gap-2 md:flex-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="hidden md:block h-2 bg-gray-100 rounded w-3/4"></div>
        </div>

        <div className="text-left md:text-center shrink-0 md:w-32 md:border-x border-light md:px-4 space-y-2">
          <div className="h-2 bg-gray-100 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-2 bg-gray-100 rounded w-1/2 mx-auto"></div>
        </div>
      </div>

      {/* 3. Actions Skeleton */}
      <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 mt-2 md:mt-0">
        <div className="flex gap-2 w-full md:w-auto">
          {/* Button 1 */}
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          {/* Button 2 */}
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        </div>
        {/* Status Badge */}
        <div className="hidden md:block h-8 w-20 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonAppointmentRow;
