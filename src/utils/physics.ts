import { ForceVector } from '../types/physics';

export function decomposeVector(force: ForceVector): { fx: number; fy: number } {
  const radians = force.angleDegrees * (Math.PI / 180);
  const fx = force.mangitude * Math.cos(radians);
  const fy = force.mangitude * Math.sin(radians);
  return { fx, fy };
}
