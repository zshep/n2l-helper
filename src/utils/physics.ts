import type { ForceVector } from '../types/physics';

function isNearZero(num: number, tolerance: number = 1e-6): boolean {
  return Math.abs(num) < tolerance;
}

export function decomposeVector(force: ForceVector): { fx: number; fy: number } {
  const radians = force.angleDegrees * (Math.PI / 180);
  const fx = force.mangitude * Math.cos(radians);
  const fy = force.mangitude * Math.sin(radians);

  return {
    fx: isNearZero(fx) ? 0 : fx,
    fy: isNearZero(fy) ? 0 : fy
  };
}

export function generateNewtonsEquations(forces: ForceVector[], mass?: number): { latexX: string; latexY: string } {
  const effectiveMass = mass !== undefined ? mass : 1;

  let sumFx = 0;
  let sumFy = 0;

  for (const force of forces) {
    const { fx, fy } = decomposeVector(force);
    sumFx += fx;
    sumFy += fy;
  }

  const latexX = `F_{net,x} = ${sumFx} = m \\cdot a_x`;
  const latexY = `F_{net,y} = ${sumFy} = m \\cdot a_y`;

  return { latexX, latexY };
}
