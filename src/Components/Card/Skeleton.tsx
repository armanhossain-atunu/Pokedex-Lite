import React from "react";

const Skeleton = ({ loading = true }) => {
  if (!loading) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-xl shadow-md p-4"
        >
          {/* Image skeleton */}
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>

          {/* Name skeleton */}
          <div className="h-4 bg-gray-300 mt-4 rounded w-2/3 mx-auto"></div>

          {/* ID / subtitle */}
          <div className="h-3 bg-gray-200 mt-2 rounded w-1/3 mx-auto"></div>

          {/* Type badges */}
          <div className="flex justify-center gap-2 mt-3">
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;