export interface ForceVector {
  id: string;
  label: string;        // e.g "F_g", "F_N", "F_T", "F_f"
  mangitude: number;    // not sure if I want number
  angleDegrees: number; //would be ok if angle is just theta
  color?: string;
}

export interface ForceComponents {
  id: string;
  fx: number;
  fy: number;
  angleDegrees: number | string; //theta 
  expressionX: string; // e.g. "+ F_T * cos(theta)"
  expressionY: string; // e.g. "+ F_T * sin(theta)"
  color?: string;
}

export interface FBDState {
  mass: number; // in kg; not sure if I care about this currently 
  forceVectors: ForceVector[];
  forceComponents: ForceComponents[];
  origin: { x: number; y: number };
  scale: number; // pixels per unit
  selectedId: string | null; 

}


