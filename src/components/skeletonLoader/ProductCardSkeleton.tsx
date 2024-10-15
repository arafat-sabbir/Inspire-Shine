import React from "react";

const ServiceCardSkeleton = () => {
  return (
    <div className="max-w-[350px] w-full p-6 bg-white shadow-lg rounded-lg border border-gray-100 animate-pulse">
      <div className="space-y-4">
        <div className="w-full bg-gray-300 h-6 rounded-lg"></div>
        <div className="w-full bg-gray-300 h-4 rounded-lg"></div>
        <div className="w-full bg-gray-300 h-3 rounded-lg"></div>
        <div className="w-1/2 bg-gray-300 h-3 rounded-lg"></div>
        <div className="flex justify-between items-center pt-4">
          <div className="w-1/3 bg-gray-300 h-8 rounded-lg"></div>
          <div className="w-24 bg-gray-300 h-8 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
