import { ForceVector } from '../types/physics';

export function decomposeVector(force: ForceVector): { fx: number; fy: number } {
  const radians = force.angleDegrees * (Math.PI / 180);
  const fx = force.mangitude * Math.cos(radians);
  const fy = force.mangitude * Math.sin(radians);
  return { fx, fy };
}

export function generateNewtonsEquations(forces: ForceVector[], mass?: number): { latexX: string; latexY: string } {
  if (!mass) {
    throw new Error('Mass must be provided to generate Newton\'s equations');
  }

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
