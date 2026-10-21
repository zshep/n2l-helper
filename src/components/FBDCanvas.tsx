import React, { useState, useCallback } from 'react';

const FBDCanvas: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [currentArrow, setCurrentArrow] = useState<any>(null);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const svgX = e.clientX - svgRect.left;
    const svgY = e.clientY - svgRect.top;

    // Check if the click is near the origin (50%, 50% of the SVG)
    const originX = 50;
    const originY = 50;
    const tolerance = 10; // Tolerance for clicking the origin dot

    if (Math.abs(svgX - originX) < tolerance && Math.abs(svgY - originY) < tolerance) {
      setIsDragging(true);
      setStartPoint({ x: svgX, y: svgY });
      setCurrentArrow(null); // Clear previous arrow
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;

    const svgRect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - svgRect.left;
    const currentY = e.clientY - svgRect.top;

    // Create the arrow based on the drag movement
    setCurrentArrow({
      x1: startPoint.x,
      y1: startPoint.y,
      x2: currentX,
      y2: currentY,
    });
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    // Optionally, you might want to finalize the arrow data here and store it in state
    // For this implementation, we just stop dragging.
    setCurrentArrow(null);
  };

  return (
    <div className="app-container">
      <h2 style={{ color: "black" }}>Free Body Diagram Canvas</h2>
      <svg width="500" height="400" style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
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
        {/* Origin dot at middle of grid */}
        <circle cx="50%" cy="50%" r="10" fill="blue" />
        {/* Dynamic Arrow Drawing */}
        {currentArrow && (
          <line
            x1={currentArrow.x1}
            y1={currentArrow.y1}
            x2={currentArrow.x2}
            y2={currentArrow.y2}
            stroke="red"
            strokeWidth="2"
          />
        )}
      </svg>
      {/* Content will be added here */}
    </div>
  );
};

export default FBDCanvas;
