import React from 'react';

const FBDCanvas: React.FC = () => {
  return (
    <div className="app-container">
      <h2 style={{ color: "black"}}>Free Body Diagram Canvas</h2>
      <svg width="500" height="400" style={{ border: "1px solid black" }}>                                                                 
        {/* Vertical grid lines (10 lines for 10 columns) */}                                                                                 
        {Array.from({ length: 10 }).map((_, i) => (                                                                                           
          <line                                                                                                                               
            key={`v-${i}`}                                                                                                                    
            x1={`${i * 100/10}%`}                                                                                                           
            y1="0"                                                                                                                           
            x2={`${i * 100/10}%`}                                                                                                           
            y2="100%"                                                                                                                         
            stroke="black"                                                                                                                    
            strokeWidth="1"                                                                                                                   
          />                                                                                                                                  
        ))}                                                                                                                                   
        {/* Horizontal grid lines (10 lines for 10 rows) */}                                                                                  
        {Array.from({ length: 10 }).map((_, i) => (                                                                                           
          <line                                                                                                                               
            key={`h-${i}`}                                                                                                                    
            x1="0"                                                                                                                           
            y1={`${i * 100/10}%`}                                                                                                           
            x2="100%"                                                                                                                         
            y2={`${i * 100/10}%`}                                                                                                           
            stroke="black"                                                                                                                    
            strokeWidth="1"                                                                                                                   
          />                                                                                                                                  
        ))}                                                                                                                                   
      </svg>                      
      {/* Content will be added here */}
    </div>
  );
};

export default FBDCanvas;
