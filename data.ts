import { VSpeed, Maneuver } from './types';

export const vSpeeds: VSpeed[] = [
  { code: 'VNE', name: 'Never Exceed Speed', speed: 163, description: 'Speed limit that may not be exceeded at any time.' },
  { code: 'VNO', name: 'Max Structural Cruising', speed: 120, description: 'Speed not to be exceeded except in smooth air.' },
  { code: 'VA', name: 'Maneuvering Speed', speed: 100, description: 'Max speed at which full control travel may be used.' },
  { code: 'VFE', name: 'Max Flap Extended (+1)', speed: 81, description: 'Highest speed permissible with wing flaps extended at (+1).' },
  { code: 'VY', name: 'Best Rate of Climb', speed: 78, description: 'Gains greatest altitude over a given period of time.' },
  { code: 'VBG', name: 'Best Glide Speed', speed: 70, description: 'Greatest horizontal distance for altitude lost.' },
  { code: 'VX', name: 'Best Angle of Climb', speed: 60, description: 'Shortest possible horizontal distance climb.' },
  { code: 'VS', name: 'Stall (Clean)', speed: 53, description: 'Stall speed with flaps retracted.' },
  { code: 'VSO', name: 'Stall (Landing)', speed: 47, description: 'Stall speed in landing configuration (+2).' },
];

export const maneuvers: Maneuver[] = [
  // --- BASICS ---
  {
      id: 'effects-controls',
      title: 'Primary & Secondary Effects',
      objective: 'Understand how control inputs affect the aircraft attitude.',
      steps: [
          {
              id: 1, action: 'Aileron Input', description: 'Primary: Roll. Secondary: Adverse Yaw (nose yaw away from turn).', imageHint: 'Roll',
              simState: { pitch: 0, bank: 30, heading: 0, yaw: -5, altitude: 2000, power: 0.7, flaps: 0 }
          },
          {
              id: 2, action: 'Elevator Input', description: 'Primary: Pitch. Secondary: Airspeed change.', imageHint: 'Pitch',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 2000, power: 0.7, flaps: 0 }
          },
          {
              id: 3, action: 'Rudder Input', description: 'Primary: Yaw. Secondary: Roll (into the yaw).', imageHint: 'Yaw',
              simState: { pitch: 0, bank: 10, heading: 10, yaw: 10, altitude: 2000, power: 0.7, flaps: 0 }
          },
          {
              id: 4, action: 'Throttle Input', description: 'Primary: Rate of Climb/Descent. Secondary: Pitch/Yaw (P-factor).', imageHint: 'Power',
              simState: { pitch: 5, bank: 0, heading: 0, altitude: 2000, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'straight-level',
      title: 'Straight & Level Flight',
      objective: 'Maintain constant heading and altitude.',
      steps: [
          {
              id: 1, action: 'Power', description: 'Set Cruise Power (e.g., 4800-5000 RPM).', imageHint: 'Set Power',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.7, flaps: 0 }
          },
          {
              id: 2, action: 'Attitude', description: 'Set nose position relative to horizon.', imageHint: 'Sight Picture',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.7, flaps: 0 }
          },
          {
              id: 3, action: 'Trim', description: 'Relieve control pressures.', imageHint: 'Trim',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.7, flaps: 0 }
          }
      ]
  },
  {
      id: 'normal-climb',
      title: 'Climb',
      objective: 'Gain altitude efficiently.',
      steps: [
          {
              id: 1, action: 'Power', description: 'Full Power. Check RPM.', imageHint: 'Full Power',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 1.0, flaps: 0 }
          },
          {
              id: 2, action: 'Attitude', description: 'Raise nose for Vy (78 kts).', imageHint: 'Pitch Up',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 2100, power: 1.0, flaps: 0 }
          },
          {
              id: 3, action: 'Trim', description: 'Trim to maintain speed hands-off.', imageHint: 'Trim',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 2200, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'normal-descent',
      title: 'Descent',
      objective: 'Lose altitude at a constant airspeed.',
      steps: [
          {
              id: 1, action: 'Power', description: 'Reduce Power (e.g. 3000 RPM). Carb heat if required.', imageHint: 'Reduce',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 4000, power: 0.4, flaps: 0 }
          },
          {
              id: 2, action: 'Attitude', description: 'Hold attitude initially, then lower nose to maintain speed.', imageHint: 'Pitch Down',
              simState: { pitch: -5, bank: 0, heading: 0, altitude: 3900, power: 0.4, flaps: 0 }
          },
          {
              id: 3, action: 'Balance', description: 'Right rudder usually required as power reduces.', imageHint: 'Rudder',
              simState: { pitch: -5, bank: 0, heading: 0, altitude: 3800, power: 0.4, flaps: 0 }
          }
      ]
  },
  {
      id: 'turns-basic',
      title: 'Shallow & Medium Turns',
      objective: 'Change heading using up to 30° bank.',
      steps: [
          {
              id: 1, action: 'Lookout', description: 'Clear the airspace in direction of turn.', imageHint: 'Look',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 3000, power: 0.7, flaps: 0 }
          },
          {
              id: 2, action: 'Roll In', description: 'Coordinated Aileron and Rudder.', imageHint: 'Roll',
              simState: { pitch: 0, bank: 20, heading: 10, altitude: 3000, power: 0.7, flaps: 0 }
          },
          {
              id: 3, action: 'Maintain', description: 'Neutralize ailerons. Slight back pressure for 30° bank.', imageHint: 'Neutral',
              simState: { pitch: 2, bank: 30, heading: 45, altitude: 3000, power: 0.7, flaps: 0 }
          },
          {
              id: 4, action: 'Roll Out', description: 'Lead heading by 10-15°. Coordinated opposite inputs.', imageHint: 'Level',
              simState: { pitch: 0, bank: 0, heading: 90, altitude: 3000, power: 0.7, flaps: 0 }
          }
      ]
  },

  // --- TAKEOFFS ---
  {
    id: 'normal-takeoff',
    title: 'Normal Takeoff & Climb',
    objective: 'Takeoff and climb out to a designated direction smoothly and safely.',
    steps: [
      { 
          id: 1, action: 'Line Up', description: 'Line up on runway centerline. Nose wheel straight.', imageHint: 'Ready',
          simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0.2, flaps: 0 }
      },
      { 
          id: 2, action: 'Apply Power', description: 'Apply full throttle smoothly. Check 5700 RPM. Heels on floor.', imageHint: 'Full Power',
          simState: { pitch: -1, bank: 0, heading: 0, altitude: 0, power: 1.0, flaps: 0 }
      },
      { 
          id: 3, action: 'Rotate', description: 'Rotate smoothly at 45-48 KIAS. Use right rudder to offset torque.', imageHint: 'Rotate',
          simState: { pitch: 7, bank: 0, heading: 0, altitude: 50, power: 1.0, flaps: 0 }
      },
      { 
          id: 4, action: 'Initial Climb', description: 'Accelerate to 78 KIAS (Vy). Trim. Maintain wings level.', imageHint: 'Climb',
          simState: { pitch: 10, bank: 0, heading: 0, altitude: 200, power: 1.0, flaps: 0 }
      },
      { 
          id: 5, action: 'Safe Altitude', description: 'At 300ft AAL, verify flaps UP and 5500 RPM. Climb 85-90 KIAS.', imageHint: 'Cruise Climb',
          simState: { pitch: 8, bank: 0, heading: 0, altitude: 400, power: 0.9, flaps: 0 }
      },
    ]
  },
  {
      id: 'xwind-takeoff',
      title: 'Crosswind Takeoff',
      objective: 'Maintain centerline and positive control in crosswind conditions.',
      steps: [
          {
              id: 1, action: 'Aileron into Wind', description: 'Full aileron into the wind at start. Reduce as speed increases.', imageHint: 'Aileron Input',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0.2, flaps: 0 }
          },
          {
              id: 2, action: 'Roll', description: 'Keep nose straight with Rudder. Keep upwind wing low.', imageHint: 'Roll',
              simState: { pitch: -1, bank: -5, heading: 0, altitude: 0, power: 1.0, flaps: 0 }
          },
          {
              id: 3, action: 'Liftoff', description: 'Clean liftoff. Firm rotation. Prevent side-skipping.', imageHint: 'Liftoff',
              simState: { pitch: 7, bank: -3, heading: 0, altitude: 10, power: 1.0, flaps: 0 }
          },
          {
              id: 4, action: 'Crab', description: 'Turn nose into wind to track runway centerline extended.', imageHint: 'Crab',
              simState: { pitch: 10, bank: 0, heading: -10, altitude: 200, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'short-field-takeoff',
      title: 'Short-Field Takeoff',
      objective: 'Takeoff in minimum distance and clear obstacles.',
      steps: [
          {
              id: 1, action: 'Setup', description: 'Flaps +1. Use all runway. Hold Brakes.', imageHint: 'Brakes',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0.2, flaps: 1 }
          },
          {
              id: 2, action: 'Full Power', description: 'Throttle Full. Check Gauges green. Release Brakes.', imageHint: 'Release',
              simState: { pitch: -1, bank: 0, heading: 0, altitude: 0, power: 1.0, flaps: 1 }
          },
          {
              id: 3, action: 'Rotate Vx', description: 'Rotate to climb at Vx (60 KIAS) until obstacle cleared.', imageHint: 'Steep Climb',
              simState: { pitch: 15, bank: 0, heading: 0, altitude: 50, power: 1.0, flaps: 1 }
          },
          {
              id: 4, action: 'Accelerate', description: 'Obstacle clear (50ft). Lower nose. Accel to Vy (78). Flaps Up.', imageHint: 'Accelerate',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 200, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'soft-field-takeoff',
      title: 'Soft-Field Takeoff',
      objective: 'Takeoff from grass/soft surfaces transferring weight to wings ASAP.',
      steps: [
          {
              id: 1, action: 'Setup', description: 'Flaps +1. Stick Full Back (protect nosewheel). Keep rolling if able.', imageHint: 'Stick Back',
              simState: { pitch: 5, bank: 0, heading: 0, altitude: 0, power: 0.2, flaps: 1 }
          },
          {
              id: 2, action: 'Roll', description: 'Full Power. Reduce back pressure slightly as nose rises.', imageHint: 'Nose High',
              simState: { pitch: 8, bank: 0, heading: 0, altitude: 0, power: 1.0, flaps: 1 }
          },
          {
              id: 3, action: 'Ground Effect', description: 'Lift off at min speed. Lower nose to stay in Ground Effect.', imageHint: 'Level Low',
              simState: { pitch: 2, bank: 0, heading: 0, altitude: 10, power: 1.0, flaps: 1 }
          },
          {
              id: 4, action: 'Climb', description: 'Accelerate in ground effect to Vx/Vy then climb away.', imageHint: 'Climb',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 100, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'rejected-takeoff',
      title: 'Rejected Takeoff',
      objective: 'Safely abort takeoff run.',
      steps: [
          {
              id: 1, action: 'Decision', description: 'Abnormality (RPM drop, alarm, oil pressure). "Stopping!"', imageHint: 'Abort',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 1.0, flaps: 0 }
          },
          {
              id: 2, action: 'Throttle IDLE', description: 'Immediately reduce power to Idle.', imageHint: 'Idle',
              simState: { pitch: -2, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 0 }
          },
          {
              id: 3, action: 'Braking', description: 'Apply maximum braking required. Maintain directional control.', imageHint: 'Brakes',
              simState: { pitch: -2, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 0 }
          }
      ]
  },

  // --- ADVANCED HANDLING ---
  {
    id: 'steep-turns',
    title: 'Steep Turns (45°)',
    objective: 'Perform a 360° turn at 45° bank maintaining altitude and airspeed.',
    steps: [
        {
            id: 1, action: 'Entry', description: 'Speed Va (100kts). Clear airspace. Pick a visual reference point.', imageHint: 'Level 100kts',
            simState: { pitch: 0, bank: 0, heading: 0, altitude: 500, power: 0.7, flaps: 0 }
        },
        {
            id: 2, action: 'Roll In', description: 'Smoothly roll to 45° bank. Passing 30°, add back pressure + power.', imageHint: 'Rolling',
            simState: { pitch: 1, bank: 30, heading: 10, altitude: 500, power: 0.75, flaps: 0 }
        },
        {
            id: 3, action: 'Maintained', description: 'Hold 45° bank. Pitch 2-3° up to hold altitude. Look outside.', imageHint: '45° Bank',
            simState: { pitch: 3, bank: 45, heading: 90, altitude: 500, power: 0.8, flaps: 0 }
        },
        {
            id: 4, action: 'Roll Out', description: 'Start rollout 15-20° before heading. Reduce pitch & power.', imageHint: 'Leveling',
            simState: { pitch: 1, bank: 10, heading: 340, altitude: 500, power: 0.7, flaps: 0 }
        }
    ]
  },
  {
      id: 'steep-spiral',
      title: 'Steep Spiral',
      objective: 'Rapidly descend over a fixed point (emergency simulation).',
      steps: [
          {
              id: 1, action: 'Entry', description: 'Altitude >3000 AGL. Throttle Idle. Speed VBG (70) or VNO.', imageHint: 'Idle',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 4000, power: 0.0, flaps: 0 }
          },
          {
              id: 2, action: 'Bank', description: 'Bank 45° to 55°. Maintain constant radius around point.', imageHint: 'Bank',
              simState: { pitch: -10, bank: 50, heading: 45, altitude: 3800, power: 0.0, flaps: 0 }
          },
          {
              id: 3, action: 'Clear Engine', description: 'Momentarily advance throttle every 1000ft to prevent fouling.', imageHint: 'Warm Engine',
              simState: { pitch: -10, bank: 50, heading: 180, altitude: 3000, power: 0.3, flaps: 0 }
          },
          {
              id: 4, action: 'Recovery', description: 'Roll out on specified heading. Gently pitch for level flight.', imageHint: 'Recover',
              simState: { pitch: 0, bank: 0, heading: 360, altitude: 2000, power: 0.7, flaps: 0 }
          }
      ]
  },
  {
    id: 'slow-flight',
    title: 'Slow Flight',
    objective: 'Maintain controlled flight at minimum controllable airspeed (MCA).',
    steps: [
        {
            id: 1, action: 'Entry - HASELL', description: 'Clearance turns. Reduce power to 3000 RPM. Maintain altitude.', imageHint: 'Level Decel',
            simState: { pitch: 2, bank: 0, heading: 0, altitude: 500, power: 0.5, flaps: 0 }
        },
        {
            id: 2, action: 'Configuration', description: 'Below Vfe, extend Flaps +1. Speed reduces.', imageHint: 'Flaps 1',
            simState: { pitch: 4, bank: 0, heading: 0, altitude: 500, power: 0.4, flaps: 1 }
        },
        {
            id: 3, action: 'Established', description: 'Maintain altitude with Power. Maintain heading with Rudder. High Angle of Attack.', imageHint: 'High Nose',
            simState: { pitch: 12, bank: 0, heading: 0, altitude: 500, power: 0.8, flaps: 1 }
        },
        {
            id: 4, action: 'Turns', description: 'Shallow turns (max 15° bank). Add power in turn to maintain altitude.', imageHint: 'Shallow Bank',
            simState: { pitch: 13, bank: 15, heading: 30, altitude: 500, power: 0.9, flaps: 1 }
        },
        {
            id: 5, action: 'Recovery', description: 'Full Power. Lower nose to level horizon. Retract flaps >60kts.', imageHint: 'Accelerate',
            simState: { pitch: 0, bank: 0, heading: 0, altitude: 500, power: 1.0, flaps: 0 }
        }
    ]
  },
  {
      id: 'forward-slip',
      title: 'Forward Slip',
      objective: 'Rapidly lose altitude without gaining airspeed.',
      steps: [
          {
              id: 1, action: 'Entry', description: 'Power Idle. Lower one wing (bank into wind).', imageHint: 'Bank',
              simState: { pitch: 0, bank: 15, heading: 0, altitude: 1000, power: 0.0, flaps: 0 }
          },
          {
              id: 2, action: 'Opposite Rudder', description: 'Apply opposite rudder to keep track aligned with runway.', imageHint: 'Cross Controls',
              simState: { pitch: -5, bank: 15, heading: 0, yaw: -15, altitude: 900, power: 0.0, flaps: 0 }
          },
          {
              id: 3, action: 'Control', description: 'Adjust pitch for speed. Adjust bank for drag/descent rate.', imageHint: 'Descent',
              simState: { pitch: -8, bank: 15, heading: 0, yaw: -15, altitude: 500, power: 0.0, flaps: 0 }
          },
          {
              id: 4, action: 'Recovery', description: 'Neutralize controls before flare. Level wings.', imageHint: 'Recover',
              simState: { pitch: -2, bank: 0, heading: 0, yaw: 0, altitude: 50, power: 0.0, flaps: 0 }
          }
      ]
  },

  // --- STALLS ---
  {
    id: 'stall-clean',
    title: 'Stall (Clean - Power Off)',
    objective: 'Recognize and recover from a stall in clean configuration.',
    steps: [
      { 
          id: 1, action: 'Setup', description: 'Height > 2500ft AGL. HASELL checks. Throttle IDLE.', imageHint: 'Idle',
          simState: { pitch: 0, bank: 0, heading: 0, altitude: 600, power: 0.0, flaps: 0 }
      },
      { 
          id: 2, action: 'Induce', description: 'Maintain altitude by pulling back. Speed decays.', imageHint: 'Pulling',
          simState: { pitch: 10, bank: 0, heading: 0, altitude: 600, power: 0.0, flaps: 0 }
      },
      { 
          id: 3, action: 'The Stall', description: 'Buffet, Nose Drops. Sink rate increases.', imageHint: 'Nose Drop',
          simState: { pitch: -15, bank: 5, heading: 10, altitude: 550, power: 0.0, flaps: 0 }
      },
      { 
          id: 4, action: 'Recovery', description: 'Unload wings (Stick Forward). Full Power. Level Wings.', imageHint: 'Dive',
          simState: { pitch: -5, bank: 0, heading: 10, altitude: 500, power: 1.0, flaps: 0 }
      },
      { 
          id: 5, action: 'Climb Away', description: 'Establish positive rate of climb. Check ball centered.', imageHint: 'Climb',
          simState: { pitch: 8, bank: 0, heading: 10, altitude: 520, power: 1.0, flaps: 0 }
      }
    ]
  },
  {
      id: 'stall-landing-config',
      title: 'Stall (Landing Config)',
      objective: 'Recover from a stall in approach configuration.',
      steps: [
          {
              id: 1, action: 'Setup', description: 'Flaps Full (Landing). Gear Down (fixed). Throttle Idle.', imageHint: 'Dirty',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 3000, power: 0.0, flaps: 2 }
          },
          {
              id: 2, action: 'Induce', description: 'Simulate Final Approach flair. Pull back until break.', imageHint: 'Flare',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 3000, power: 0.0, flaps: 2 }
          },
          {
              id: 3, action: 'Recovery', description: 'Stick Forward. Full Power. Flaps to Takeoff (+1).', imageHint: 'Recover',
              simState: { pitch: -5, bank: 0, heading: 0, altitude: 2900, power: 1.0, flaps: 1 }
          },
          {
              id: 4, action: 'Clean Up', description: 'Positive Climb. Retract Flaps >60 kts.', imageHint: 'Climb',
              simState: { pitch: 8, bank: 0, heading: 0, altitude: 2950, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'stall-power-on',
      title: 'Stall (Power On)',
      objective: 'Recover from stall during takeoff/departure.',
      steps: [
          {
              id: 1, action: 'Setup', description: 'Takeoff Config. Power 65-75%. Slow to rotate speed.', imageHint: 'Takeoff Power',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 3000, power: 0.7, flaps: 0 }
          },
          {
              id: 2, action: 'Induce', description: 'Increase pitch attitude smoothly (>20°).', imageHint: 'High Pitch',
              simState: { pitch: 25, bank: 0, heading: 0, altitude: 3100, power: 0.7, flaps: 0 }
          },
          {
              id: 3, action: 'Break', description: 'Nose drops, potentially wing drop (use rudder, NOT aileron).', imageHint: 'Break',
              simState: { pitch: -10, bank: -10, heading: -5, altitude: 3100, power: 0.7, flaps: 0 }
          },
          {
              id: 4, action: 'Recovery', description: 'Simultaneously reduce angle of attack and level wings with rudder.', imageHint: 'Recover',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 3050, power: 1.0, flaps: 0 }
          }
      ]
  },
  {
      id: 'spin-recovery',
      title: 'Spin Recovery',
      objective: 'Recover from an inadvertent spin.',
      steps: [
          {
              id: 1, action: 'Incipient Spin', description: 'Stall with Yaw. Aircraft autorotates.', imageHint: 'Rotation',
              simState: { pitch: -25, bank: 20, heading: 45, yaw: 30, altitude: 600, power: 0.0, flaps: 0 }
          },
          {
              id: 2, action: 'Power IDLE', description: 'Throttle to IDLE. Ailerons NEUTRAL.', imageHint: 'Inputs Neutral',
              simState: { pitch: -30, bank: 20, heading: 180, yaw: 30, altitude: 500, power: 0.0, flaps: 0 }
          },
          {
              id: 3, action: 'Rudder OPPOSITE', description: 'Full rudder opposite to direction of rotation.', imageHint: 'Full Rudder',
              simState: { pitch: -30, bank: 10, heading: 270, yaw: -10, altitude: 400, power: 0.0, flaps: 0 }
          },
          {
              id: 4, action: 'Stick FORWARD', description: 'Break the stall. Rotation stops.', imageHint: 'Nose Down',
              simState: { pitch: -20, bank: 0, heading: 360, altitude: 300, power: 0.0, flaps: 0 }
          },
          {
              id: 5, action: 'Pull Out', description: 'Gently pull out of dive. Apply power.', imageHint: 'Level',
              simState: { pitch: 0, bank: 0, heading: 360, altitude: 250, power: 0.8, flaps: 0 }
          }
      ]
  },

  // --- TRAFFIC PATTERN & LANDING ---
  {
      id: 'circuit-pattern',
      title: 'Standard Circuit (L/H)',
      objective: 'Fly a standard rectangular traffic pattern.',
      steps: [
          {
              id: 1, action: 'Upwind / Departure', description: 'Climb on runway heading to 500ft.', imageHint: 'Climb',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 300, power: 1.0, flaps: 0 }
          },
          {
              id: 2, action: 'Crosswind', description: 'Turn Left 90°. Climb to 1000ft (TPA).', imageHint: 'Turn Left',
              simState: { pitch: 5, bank: -20, heading: 90, altitude: 600, power: 0.9, flaps: 0 }
          },
          {
              id: 3, action: 'Downwind', description: 'Level 1000ft. Parallel to runway. BUMPFICH Checks.', imageHint: 'Level',
              simState: { pitch: 0, bank: 0, heading: 180, altitude: 800, power: 0.6, flaps: 0 }
          },
          {
              id: 4, action: 'Base Leg', description: 'Turn Left. Reduce Power. Flaps +1. Descend.', imageHint: 'Descent',
              simState: { pitch: -3, bank: -20, heading: 270, altitude: 500, power: 0.3, flaps: 1 }
          },
          {
              id: 5, action: 'Final', description: 'Turn Left. Align. Full Flaps. 60kts.', imageHint: 'Approach',
              simState: { pitch: -3, bank: 0, heading: 360, altitude: 200, power: 0.3, flaps: 2 }
          }
      ]
  },
  {
      id: 'pattern-flaps-1',
      title: 'Traffic Pattern (Flaps +1)',
      objective: 'Landing with reduced flap setting (strong winds/turbulence).',
      steps: [
          {
              id: 1, action: 'Base Leg', description: 'Flaps +1. Speed 70 kts (higher than normal).', imageHint: 'Base',
              simState: { pitch: -2, bank: 0, heading: 270, altitude: 500, power: 0.4, flaps: 1 }
          },
          {
              id: 2, action: 'Final', description: 'Maintain Flaps +1. Speed 65-70 kts.', imageHint: 'Final',
              simState: { pitch: -3, bank: 0, heading: 360, altitude: 300, power: 0.3, flaps: 1 }
          },
          {
              id: 3, action: 'Flare', description: 'Flat attitude. Do not float. Positive touchdown.', imageHint: 'Touchdown',
              simState: { pitch: 2, bank: 0, heading: 360, altitude: 0, power: 0.0, flaps: 1 }
          }
      ]
  },
  {
      id: 'normal-landing',
      title: 'Normal Approach & Landing',
      objective: 'Safe landing on main wheels.',
      steps: [
          {
              id: 1, action: 'Final Approach', description: 'Aligned. Flaps Full. 60 KIAS. Aim point selected.', imageHint: 'Final',
              simState: { pitch: -3, bank: 0, heading: 0, altitude: 200, power: 0.3, flaps: 2 }
          },
          {
              id: 2, action: 'Round Out', description: 'Level off at 5-10ft. Look at end of runway.', imageHint: 'Level',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 10, power: 0.0, flaps: 2 }
          },
          {
              id: 3, action: 'Flare', description: 'Raise nose. Hold off. Main wheels touch first.', imageHint: 'Hold Off',
              simState: { pitch: 5, bank: 0, heading: 0, altitude: 2, power: 0.0, flaps: 2 }
          },
          {
              id: 4, action: 'Rollout', description: 'Nose wheel down gently. Braking as required.', imageHint: 'Rollout',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 2 }
          }
      ]
  },
  {
      id: 'xwind-landing',
      title: 'Crosswind Landing',
      objective: 'Land safely with crosswind.',
      steps: [
          {
              id: 1, action: 'Crab', description: 'Crab into wind on Final to track centerline.', imageHint: 'Crab',
              simState: { pitch: -3, bank: 0, heading: -10, altitude: 200, power: 0.3, flaps: 2 }
          },
          {
              id: 2, action: 'Wing Low', description: 'Short Final: Transition to slip. Bank into wind. Opposite Rudder.', imageHint: 'Slip',
              simState: { pitch: -2, bank: -5, heading: 0, yaw: 5, altitude: 50, power: 0.3, flaps: 2 }
          },
          {
              id: 3, action: 'Touchdown', description: 'One wheel landing (Upwind wheel first). Aileron into wind.', imageHint: 'One Wheel',
              simState: { pitch: 3, bank: -5, heading: 0, yaw: 0, altitude: 0, power: 0.0, flaps: 2 }
          },
          {
              id: 4, action: 'Rollout', description: 'Maintain aileron into wind as speed decreases.', imageHint: 'Rollout',
              simState: { pitch: 0, bank: -10, heading: 0, altitude: 0, power: 0.0, flaps: 2 }
          }
      ]
  },
  {
      id: 'soft-field-landing',
      title: 'Soft-Field Landing',
      objective: 'Land lightly to prevent sinking into soft surface.',
      steps: [
          {
              id: 1, action: 'Approach', description: 'Stabilized. Flaps Full. Carry small amount of power.', imageHint: 'Power On',
              simState: { pitch: -2, bank: 0, heading: 0, altitude: 100, power: 0.4, flaps: 2 }
          },
          {
              id: 2, action: 'Touchdown', description: 'Touchdown as slow as possible with power.', imageHint: 'Soft',
              simState: { pitch: 7, bank: 0, heading: 0, altitude: 0, power: 0.2, flaps: 2 }
          },
          {
              id: 3, action: 'Rollout', description: 'Keep stick full back. Keep nose wheel off ground.', imageHint: 'Wheelie',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 2 }
          }
      ]
  },
  {
      id: 'short-field-landing',
      title: 'Short-Field Landing',
      objective: 'Land and stop in minimum distance.',
      steps: [
          {
              id: 1, action: 'Approach', description: 'Precise speed control (60 KIAS). Steep approach if obs present.', imageHint: 'Precise',
              simState: { pitch: -4, bank: 0, heading: 0, altitude: 200, power: 0.2, flaps: 2 }
          },
          {
              id: 2, action: 'Touchdown', description: 'Chop power. Aim for specific point. Minimize float.', imageHint: 'Firm',
              simState: { pitch: 3, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 2 }
          },
          {
              id: 3, action: 'Braking', description: 'Flaps UP (weight on wheels). Max braking without skidding.', imageHint: 'Braking',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0.0, flaps: 0 }
          }
      ]
  },
  {
    id: 'power-off-180',
    title: 'Power-Off 180° Accuracy',
    objective: 'Land on a specific point after closing throttle abeam the touchdown point.',
    steps: [
      {
        id: 1, action: 'Abeam Touchdown', description: 'Throttle IDLE. Pitch for Best Glide (70 kts). Start turn to Base.', imageHint: 'Power Idle',
        simState: { pitch: 2, bank: 20, heading: 180, altitude: 1000, power: 0.0, flaps: 0 }
      },
      {
        id: 2, action: 'Base Leg', description: 'Judge winds. Flaps +1 if needed. Maintain 70 kts.', imageHint: 'Base',
        simState: { pitch: -2, bank: 20, heading: 270, altitude: 600, power: 0.0, flaps: 1 }
      },
      {
        id: 3, action: 'Final Approach', description: 'Turn Final. Flaps Full (LDG). Airspeed 60 kts. Aim at point.', imageHint: 'Final',
        simState: { pitch: -4, bank: 0, heading: 360, altitude: 300, power: 0.0, flaps: 2 }
      },
      {
        id: 4, action: 'Short Final', description: 'Assess energy. Slip if high. Do not extend if low (add power = fail).', imageHint: 'Touchdown',
        simState: { pitch: -2, bank: 0, heading: 360, altitude: 50, power: 0.0, flaps: 2 }
      }
    ]
  },
  {
      id: 'go-around',
      title: 'Go-Around',
      objective: 'Discontinue landing approach for safety.',
      steps: [
          {
              id: 1, action: 'Decision', description: 'Runway occupied or unstable approach. "Going Around!"', imageHint: 'Approach',
              simState: { pitch: -3, bank: 0, heading: 0, altitude: 100, power: 0.3, flaps: 2 }
          },
          {
              id: 2, action: 'Full Power', description: 'Apply Full Power immediately. Stop descent.', imageHint: 'Power',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 100, power: 1.0, flaps: 2 }
          },
          {
              id: 3, action: 'Flaps Takeoff', description: 'Retract flaps to +1 (Takeoff). Pitch for climb.', imageHint: 'Flaps 1',
              simState: { pitch: 8, bank: 0, heading: 0, altitude: 150, power: 1.0, flaps: 1 }
          },
          {
              id: 4, action: 'Positive Climb', description: 'Verify positive rate. Retract remaining flaps > safe height.', imageHint: 'Clean',
              simState: { pitch: 10, bank: 0, heading: 0, altitude: 300, power: 1.0, flaps: 0 }
          }
      ]
  },

  // --- EMERGENCIES ---
  {
    id: 'golden-rules',
    title: 'The Golden Rules',
    objective: 'Prioritize tasks in an emergency: Aviate, Navigate, Communicate.',
    steps: [
        {
            id: 1, action: 'AVIATE', description: 'Fly the airplane. Maintain speed and attitude. Do not get distracted.', imageHint: 'Fly',
            simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.8, flaps: 0 }
        },
        {
            id: 2, action: 'NAVIGATE', description: 'Know where you are. Pick a landing site. Turn towards safety.', imageHint: 'Plan',
            simState: { pitch: 0, bank: 20, heading: 45, altitude: 2000, power: 0.8, flaps: 0 }
        },
        {
            id: 3, action: 'COMMUNICATE', description: 'Mayday/Pan-Pan. Transponder 7700. Talk to ATC/Traffic.', imageHint: 'Talk',
            simState: { pitch: 0, bank: 0, heading: 45, altitude: 2000, power: 0.8, flaps: 0 }
        }
    ]
  },
  {
      id: 'emergency-engine-downwind',
      title: 'Engine Failure (Downwind)',
      objective: 'Land safely on the runway after engine failure in the circuit.',
      steps: [
          {
              id: 1, action: 'The Failure', description: 'Engine quits on downwind leg. Best Glide 70kts.', imageHint: 'Prop Stop',
              simState: { pitch: 2, bank: 0, heading: 180, altitude: 500, power: 0.0, flaps: 0, failProp: true }
          },
          {
              id: 2, action: 'Immediate Turn', description: 'Turn towards runway (Base leg). Don\'t extend downwind.', imageHint: 'Turn Base',
              simState: { pitch: -2, bank: 30, heading: 270, altitude: 450, power: 0.0, flaps: 0, failProp: true }
          },
          {
              id: 3, action: 'Judgement', description: 'Assess height/distance. Use flaps if high. Slip if needed.', imageHint: 'Short Final',
              simState: { pitch: -4, bank: 0, heading: 360, altitude: 300, power: 0.0, flaps: 1, failProp: true }
          },
          {
              id: 4, action: 'Landing', description: 'Commit to landing. Master OFF, Fuel OFF.', imageHint: 'Runway',
              simState: { pitch: 5, bank: 0, heading: 360, altitude: 50, power: 0.0, flaps: 2, failProp: true }
          }
      ]
  },
  {
    id: 'engine-fire',
    title: 'Engine Fire',
    objective: 'Safely handle an engine fire in flight.',
    steps: [
      {
        id: 1, action: 'Identification', description: 'Smoke/Flames. Cabin Heat OFF.', imageHint: 'Fire',
        simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.8, flaps: 0 }
      },
      {
        id: 2, action: 'Fuel Cutoff', description: 'Fuel Selector OFF. Throttle FULL (burn lines). Fuel Pump OFF.', imageHint: 'Fuel Off',
        simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 1.0, flaps: 0 }
      },
      {
        id: 3, action: 'Electrical', description: 'Ignition OFF. Master Switch OFF.', imageHint: 'All Off',
        simState: { pitch: 0, bank: 0, heading: 0, altitude: 1900, power: 0.0, flaps: 0, failProp: true }
      },
      {
        id: 4, action: 'Descent', description: 'Exec Emergency Descent (High speed) to extinguish, or slip to keep smoke out.', imageHint: 'Dive',
        simState: { pitch: -15, bank: 30, heading: 30, altitude: 1500, power: 0.0, flaps: 0, failProp: true }
      }
    ]
  },
  {
    id: 'cabin-fire',
    title: 'Cabin Fire',
    objective: 'Extinguish fire within the cockpit.',
    steps: [
      {
        id: 1, action: 'Electrics', description: 'Master Switch OFF. Cabin Heat OFF.', imageHint: 'Master Off',
        simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.8, flaps: 0 }
      },
      {
        id: 2, action: 'Ventilation', description: 'Open Vents to clear smoke (unless fanning flames). Use Extinguisher.', imageHint: 'Vents',
        simState: { pitch: 0, bank: 0, heading: 0, altitude: 2000, power: 0.8, flaps: 0 }
      },
      {
        id: 3, action: 'Land ASAP', description: 'Execute Emergency Descent to nearest suitable area.', imageHint: 'Land Now',
        simState: { pitch: -10, bank: 20, heading: 45, altitude: 1000, power: 0.5, flaps: 0 }
      }
    ]
  },
  {
    id: 'efato',
    title: 'Engine Failure at Takeoff',
    objective: 'Survive engine failure at low altitude (<500ft).',
    steps: [
      {
        id: 1, action: 'Climb Out', description: 'Normal climb. Engine fails suddenly.', imageHint: 'Failure',
        simState: { pitch: 10, bank: 0, heading: 0, altitude: 300, power: 0.0, flaps: 0, failProp: true }
      },
      {
        id: 2, action: 'Nose Down!', description: 'IMMEDIATELY push nose down to maintain Glide Speed (70kts).', imageHint: 'Push',
        simState: { pitch: -5, bank: 0, heading: 0, altitude: 300, power: 0.0, flaps: 0, failProp: true }
      },
      {
        id: 3, action: 'Land Ahead', description: 'Pick landing site within 30° of nose. NO STEEP TURNS.', imageHint: 'Straight',
        simState: { pitch: -3, bank: 5, heading: 10, altitude: 150, power: 0.0, flaps: 1, failProp: true }
      },
      {
        id: 4, action: 'Secure', description: 'Flaps Full. Master/Fuel OFF. Unlatch doors.', imageHint: 'Brace',
        simState: { pitch: 5, bank: 0, heading: 10, altitude: 0, power: 0.0, flaps: 2, failProp: true }
      }
    ]
  },
  {
      id: 'restart-in-flight',
      title: 'Engine Restart in Flight',
      objective: 'Attempt to restart engine after failure at altitude.',
      steps: [
          {
              id: 1, action: 'Glide', description: 'Establish Best Glide (70 kts). Trim.', imageHint: 'Glide',
              simState: { pitch: 2, bank: 0, heading: 0, altitude: 3000, power: 0.0, flaps: 0, failProp: true }
          },
          {
              id: 2, action: 'Check Fuel', description: 'Fuel Selector ON (Switch tanks). Fuel Pump ON.', imageHint: 'Fuel',
              simState: { pitch: 2, bank: 0, heading: 0, altitude: 2800, power: 0.0, flaps: 0, failProp: true }
          },
          {
              id: 3, action: 'Check Ignition', description: 'Magnetos BOTH. Throttle set 1/4 open.', imageHint: 'Mags',
              simState: { pitch: 2, bank: 0, heading: 0, altitude: 2600, power: 0.0, flaps: 0, failProp: true }
          },
          {
              id: 4, action: 'Start', description: 'Engage Starter if prop stopped. If rotating, check mixture/choke.', imageHint: 'Start',
              simState: { pitch: 2, bank: 0, heading: 0, altitude: 2500, power: 0.6, flaps: 0 }
          }
      ]
  },
  {
      id: 'partial-power',
      title: 'Partial Power Loss',
      objective: 'Maintain flight and diagnose, or land if unable to maintain altitude.',
      steps: [
          {
              id: 1, action: 'Assess', description: 'Engine rough or losing RPM. Pitch for Best Glide if sinking.', imageHint: 'Rough',
              simState: { pitch: 5, bank: 0, heading: 0, altitude: 2000, power: 0.4, flaps: 0 }
          },
          {
              id: 2, action: 'Troubleshoot', description: 'Carb Heat ON (if applicable). Fuel Pump ON. Switch Tanks. Mags L/R.', imageHint: 'Checks',
              simState: { pitch: 5, bank: 0, heading: 0, altitude: 1900, power: 0.5, flaps: 0 }
          },
          {
              id: 3, action: 'Decision', description: 'If altitude cannot be maintained, treat as Forced Landing. Select Field.', imageHint: 'Land?',
              simState: { pitch: 0, bank: 20, heading: 45, altitude: 1800, power: 0.4, flaps: 0 }
          }
      ]
  },
  {
      id: 'emergency-descent',
      title: 'Emergency Descent',
      objective: 'Rapidly lose altitude (e.g. cabin fire, medical).',
      steps: [
          {
              id: 1, action: 'Initiate', description: 'Throttle IDLE. Carb Heat ON.', imageHint: 'Idle',
              simState: { pitch: 0, bank: 0, heading: 0, altitude: 5000, power: 0.0, flaps: 0 }
          },
          {
              id: 2, action: 'Bank & Pitch', description: 'Bank 30-45°. Pitch down to Vno (120 kts) or Vne (163 kts) in smooth air.', imageHint: 'Dive',
              simState: { pitch: -15, bank: 45, heading: 30, altitude: 4500, power: 0.0, flaps: 0 }
          },
          {
              id: 3, action: 'Spiral', description: 'Maintain spiral to stay over clear area. Clear engine every 1000ft.', imageHint: 'Spiral',
              simState: { pitch: -15, bank: 45, heading: 120, altitude: 3000, power: 0.0, flaps: 0 }
          },
          {
              id: 4, action: 'Recovery', description: 'Level wings and pitch up gently 1000ft above target altitude.', imageHint: 'Level',
              simState: { pitch: 0, bank: 0, heading: 180, altitude: 2000, power: 0.7, flaps: 0 }
          }
      ]
  }
];