import React from 'react';

const FBDCanvas: React.FC = () => {
  return (
    <div className="app-container">
      <svg width="100%" height="100%" style="border: 1px solid black;">
        {/* Simple grid lines example */}
        <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="black" strokeWidth="1"/>
      </svg>
      {/* Content will be added here */}
    </div>
  );
};

export default FBDCanvas;
