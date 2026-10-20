import React from 'react';

const FBDCanvas: React.FC = () => {
  return (
    <div className="app-container">
      <svg width="100%" height="100%" style="border: 1px solid black;">
        {/* 10x10 Grid Lines */}
        {/* Vertical lines (9 lines for 10 columns) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v-${i}`} x={i * 100 / 10} y="0" stroke="black" strokeWidth="1" />
        ))}
        {/* Horizontal lines (9 lines for 10 rows) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h-${i}`} x="0" y={i * 100 / 10} stroke="black" strokeWidth="1" />
        ))}
      </svg>
      {/* Content will be added here */}
    </div>
  );
};

export default FBDCanvas;
