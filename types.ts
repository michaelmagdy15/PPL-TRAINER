
export interface VSpeed {
  name: string;
  speed: number;
  description: string;
  code: string;
}

export interface SimState {
  pitch: number;      // Degrees: positive up
  bank: number;       // Degrees: positive right
  heading: number;    // Degrees: 0-360
  altitude: number;   // Relative units (0 = ground, 10 = pattern)
  power: number;      // 0.0 to 1.0 (prop speed)
  flaps: number;      // 0, 1, 2 (visual angle)
  gear?: boolean;     // For fixed gear visual
  yaw?: number;       // Sideslip degrees
  failProp?: boolean; // If true, prop stops
}

export interface ManeuverStep {
  id: number;
  description: string;
  action: string;
  imageHint: string;
  simState?: SimState; // Optional 3D state
}

export interface Maneuver {
  id: string;
  title: string;
  objective: string;
  steps: ManeuverStep[];
}

export interface ChecklistItem {
  id: string;
  task: string;
  action: string;
}

export interface Checklist {
  id: string;
  title: string;
  category: 'preflight' | 'normal' | 'emergency';
  items: ChecklistItem[];
}

export interface WnBStation {
  name: string;
  weight: number; // kg
  arm: number; // mm
}
