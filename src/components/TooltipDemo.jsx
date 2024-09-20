import React from 'react';

const TooltipDemo = ({ isTooltipVisible, tooltipContent }) => {
  return (
    <div className="tooltip-demo bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tooltip Demo</h2>
      <div className="relative inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {isTooltipVisible && (
          <div className="absolute z-10 w-48 px-2 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg shadow-sm -top-10 left-1/2 -translate-x-1/2">
            {tooltipContent}
            <div className="absolute w-2 h-2 bg-gray-700 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TooltipDemo;