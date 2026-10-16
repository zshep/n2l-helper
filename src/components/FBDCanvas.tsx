import React, { useRef, useState } from 'react';


const FBDCanvas: React.FC = () => {
  const canvasRef = useRef<SVGSVGElement | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [arrow, setArrow] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPoint, setDraggingPoint] = useState<'origin' |'start' | 'end' | null>(null);

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    const { clientX, clientY } = event;
    const rect = canvasRef.current?.getBoundingClientRect();
    const offsetX = clientX - rect?.left!;
    const offsetY = clientY - rect?.top!;

    if (offsetX >= origin.x - 10 && offsetX <= origin.x + 10 && offsetY >= origin.y - 10 && offsetY <= origin.y + 10) {
      setIsDragging(true);
      setDraggingPoint('origin');
    } else if (arrow) {
      const { start, end } = arrow;
      const distanceToStart = Math.sqrt((offsetX - start.x) ** 2 + (offsetY - start.y) ** 2);
      const distanceToEnd = Math.sqrt((offsetX - end.x) ** 2 + (offsetY - end.y) ** 2);

      if (distanceToStart < 10) {
        setIsDragging(true);
        setDraggingPoint('start');
      } else if (distanceToEnd < 10) {
        setIsDragging(true);
        setDraggingPoint('end');
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      const rect = canvasRef.current?.getBoundingClientRect();
      const offsetX = clientX - rect?.left!;
      const offsetY = clientY - rect?.top!;

      if (draggingPoint === 'origin') {
        // Origin is fixed, so we do not update the state here.
      } else if (draggingPoint === 'start' && arrow) {
        setArrow({ ...arrow, start: { x: offsetX, y: offsetY } });
      } else if (draggingPoint === 'end' && arrow) {
        setArrow({ ...arrow, end: { x: offsetX, y: offsetY } });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingPoint(null);
  };

  const snapAngle = (angle: number): number => {
    const angles = [0, 30, 45, 60, 90];
    const closestAngle = angles.reduce((prev, curr) => {
      return Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev;
    });
    return closestAngle;
  };

  const calculateArrow = (start: { x: number; y: number }, end: { x: number; y: number }): { start: { x: number; y: number }; end: { x: number; y: number }; angle: number } => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const snappedAngle = snapAngle(angle);
    const length = Math.sqrt(dx ** 2 + dy ** 2);
    const newEnd = {
      x: start.x + length * Math.cos(snappedAngle * (Math.PI / 180)),
      y: start.y + length * Math.sin(snappedAngle * (Math.PI / 180)),
    };
    return { start, end: newEnd, angle: snappedAngle };
  };

  const handleCreateArrow = (event: React.MouseEvent<SVGSVGElement>) => {
    const { clientX, clientY } = event;
    const rect = canvasRef.current?.getBoundingClientRect();
    const offsetX = clientX - rect?.left!;
    const offsetY = clientY - rect?.top!;

    const isNearOrigin = offsetX >= origin.x - 10 && offsetX <= origin.x + 10 && offsetY >= origin.y - 10 && offsetY <= origin.y + 10;

    if (arrow) {
      const { start, end } = arrow;
      const newArrow = calculateArrow(start, { x: offsetX, y: offsetY });
      setArrow(newArrow);
    } else if (isNearOrigin) {
      setArrow({ start: { x: origin.x, y: origin.y }, end: { x: offsetX, y: offsetY } });
    }
  };

  return (
    
    <svg
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleCreateArrow}
    >
      {/* Grid Lines */}
      {/* Vertical lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`v-${i}`}
          x={origin.x - 10 * i}
          y="0"
          stroke="white"
          strokeWidth="1"
        />
      ))}
      {/* Horizontal lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`h-${i}`}
          x="0"
          y={origin.y - 10 * i}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Origin Circle */}
      <circle cx={origin.x} cy={origin.y} r="10" fill="red" />
      
      {/* Arrow */}
      {arrow && (
        <line
          x1={arrow.start.x}
          y1={arrow.start.y}
          x2={arrow.end.x}
          y2={arrow.end.y}
          stroke="blue"
          strokeWidth="2"
        />
      )}
    </svg>
    
    
  );
};

export default FBDCanvas;
