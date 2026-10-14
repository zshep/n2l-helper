import { decomposeVector } from '../utils/physics';

describe('decomposeVector', () => {
  it('should decompose a horizontal 10 N force at 0 degrees', () => {
    const force: ForceVector = {
      id: 'F1',
      label: 'F1',
      mangitude: 10,
      angleDegrees: 0,
    };

    const result = decomposeVector(force);

    expect(result.fx).toBe(10);
    expect(result.fy).toBe(0);
  });

  it('should decompose a vertical 10 N force at 90 degrees', () => {
    const force: ForceVector = {
      id: 'F2',
      label: 'F2',
      mangitude: 10,
      angleDegrees: 90,
    };

    const result = decomposeVector(force);

    expect(result.fx).toBe(0);
    expect(result.fy).toBe(10);
  });

  it('should decompose a force at 45 degrees', () => {
    const force: ForceVector = {
      id: 'F3',
      label: 'F3',
      mangitude: 10,
      angleDegrees: 45,
    };

    const result = decomposeVector(force);

    expect(result.fx).toBeCloseTo(7.071, 3); // 10 * cos(45) = 7.071
    expect(result.fy).toBeCloseTo(7.071, 3); // 10 * sin(45) = 7.071
  });
});
