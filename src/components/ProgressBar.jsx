import React from 'react';

const ProgressBar = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          进度
        </span>
        <span className="text-sm text-gray-500">
          {current} / {total}
        </span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">
          {percentage}% 完成
        </span>
        <span className="text-xs text-gray-500">
          还剩 {total - current} 题
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;