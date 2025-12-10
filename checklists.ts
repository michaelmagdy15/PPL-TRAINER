
import { Checklist } from './types';

export const checklists: Checklist[] = [
  // --- PREFLIGHT ---
  {
    id: 'preflight-cabin',
    title: '(1) Cabin Inspection',
    category: 'preflight',
    items: [
      { id: '1', task: 'Required Documents', action: 'On board' },
      { id: '2', task: 'BPRS Handle', action: 'Check safety PIN inserted' },
      { id: '3', task: 'Ignition Switch', action: 'Check OFF' },
      { id: '4', task: 'Lights Switches', action: 'All OFF' },
      { id: '5', task: 'Circuit Breakers', action: 'Check ENGAGED' },
      { id: '6', task: 'Flight Controls', action: 'Free, unobstructed motion' },
      { id: '7', task: 'Flaps, Airbrakes', action: 'Symmetrical, smooth' },
      { id: '8', task: 'BAT Master', action: 'ON' },
      { id: '9', task: 'Haptic Stall Warning Self-Test', action: 'Check' },
      { id: '10', task: 'PFD / MFD, Avionics', action: 'Verify ON (fans audible)' },
      { id: '11', task: 'GEN / ALT Master', action: 'ON' },
      { id: '12', task: 'GEN FAIL and ALT FAIL lights', action: 'Verify ON' },
      { id: '13', task: 'Voltmeter', action: '12 - 14 Volts' },
      { id: '14', task: 'Lights', action: 'Check operation' },
      { id: '15', task: 'Fuel Quantity', action: 'Check' },
      { id: '16', task: 'Circuit Breakers', action: 'Check ENGAGED' },
      { id: '17', task: 'GEN / ALT Master', action: 'OFF' },
      { id: '18', task: 'BAT Master', action: 'OFF' },
      { id: '19', task: 'ELT', action: 'ARM/OFF (armed)' },
      { id: '20', task: 'Fuel Selector', action: 'Select fullest tank' },
    ]
  },
  {
    id: 'preflight-exterior',
    title: 'Exterior Inspection (Walkaround)',
    category: 'preflight',
    items: [
      { id: 'l1', task: 'COM1 / ELT Antenna', action: 'Condition' },
      { id: 'l2', task: 'Wing / Fuselage Seal', action: 'Taped firmly' },
      { id: 'l3', task: 'XPDR Antenna', action: 'Condition' },
      { id: 'l6', task: 'Static Pressure Port (Left)', action: 'Unblocked' },
      { id: 'l7', task: 'Fuel System Water Drain', action: 'Perform' },
      { id: 'e1', task: 'Tiedown Rope', action: 'Remove' },
      { id: 'e2', task: 'Empennage / Surfaces', action: 'Check condition' },
      { id: 'e3', task: 'Elevator & Rudder', action: 'Freedom of movement' },
      { id: 'r1', task: 'Static Pressure Port (Right)', action: 'Unblocked' },
      { id: 'r2', task: 'Fuel System Water Drain', action: 'Perform' },
      { id: 'w1', task: 'Flaperons & Hinges', action: 'Check security' },
      { id: 'w2', task: 'Fuel Caps', action: 'Secure / Vent open' },
      { id: 'w3', task: 'Pitot Tube', action: 'Cover removed, unblocked' },
      { id: 'g1', task: 'Tires & Brakes', action: 'Condition / No leaks' },
      { id: 'p1', task: 'Propeller & Spinner', action: 'Check condition' },
      { id: 'p2', task: 'Oil Level', action: 'Check quantity' },
      { id: 'p3', task: 'Air Inlets', action: 'Unobstructed' },
    ]
  },

  // --- NORMAL PROCEDURES ---
  {
    id: 'before-start',
    title: 'Before Starting Engine',
    category: 'normal',
    items: [
      { id: '1', task: 'Preflight Inspection', action: 'Completed' },
      { id: '2', task: 'Fuel Quantity', action: 'Sufficient' },
      { id: '3', task: 'Emergency Equipment', action: 'On board' },
      { id: '4', task: 'Passenger', action: 'Briefed' },
      { id: '5', task: 'Seats, Belts, Pedals', action: 'Fasten and adjust' },
      { id: '6', task: 'Doors', action: 'Closed and latched' },
      { id: '7', task: 'BPRS Safety Pin', action: 'Remove' },
      { id: '8', task: 'BAT Master', action: 'ON' },
      { id: '9', task: 'Haptic Stall Warning', action: 'Check' },
      { id: '10', task: 'Parking Brake', action: 'Engage' },
    ]
  },
  {
    id: 'engine-start',
    title: 'Starting Engine',
    category: 'normal',
    items: [
      { id: '1', task: 'Fuel Selector', action: 'Fullest tank' },
      { id: '2', task: 'NAV / AC Lights', action: 'ON' },
      { id: '3', task: 'Choke', action: 'As required' },
      { id: '4', task: 'Propeller Lever', action: 'Full forward' },
      { id: '5', task: 'Throttle Lever', action: 'Idle' },
      { id: '6', task: 'Oil Pressure Indication', action: 'Available' },
      { id: '7', task: 'Brakes', action: 'Hold' },
      { id: '8', task: 'Propeller Area', action: 'Clear' },
      { id: '9', task: 'Ignition Switch', action: 'Start' },
      { id: '10', task: 'Oil Pressure', action: 'CHECK' },
      { id: '11', task: 'Throttle Lever', action: '2000 RPM (warm up)' },
      { id: '12', task: 'Choke', action: 'Gradually close' },
      { id: '13', task: 'GEN/ALT Master', action: 'ON' },
      { id: '14', task: 'Voltage/Ammeter', action: 'CHECK' },
    ]
  },
  {
    id: 'before-taxi',
    title: 'Before Taxiing',
    category: 'normal',
    items: [
      { id: '1', task: 'Flaps', action: '(-) or (0)' },
      { id: '2', task: 'COM / Avionics / XPDR', action: 'As required' },
      { id: '3', task: 'Cabin Heat', action: 'As required' },
      { id: '4', task: 'Fuel Selector', action: 'SWITCH TANK (check flow)' },
      { id: '5', task: 'Fuel Selector', action: 'Select fullest tank' },
    ]
  },
  {
    id: 'taxiing',
    title: 'Taxiing',
    category: 'normal',
    items: [
      { id: '1', task: 'Parking Brake', action: 'Disengage' },
      { id: '2', task: 'Brakes', action: 'CHECK' },
    ]
  },
  {
    id: 'engine-test',
    title: 'Engine Test (Run-up)',
    category: 'normal',
    items: [
      { id: '1', task: 'Parking Brake', action: 'Engage' },
      { id: '2', task: 'Doors', action: 'Latched' },
      { id: '3', task: 'Propeller Lever', action: 'Verify Full Forward' },
      { id: '4', task: 'Throttle Lever', action: '4000 RPM' },
      { id: '5', task: 'Ignition Switch', action: 'L / R / BOTH' },
      { id: '6', task: 'Propeller Lever', action: 'Cycle 3 times' },
      { id: '7', task: 'Propeller Lever', action: 'Full Forward' },
      { id: '8', task: 'Throttle Lever', action: 'Idle' },
    ]
  },
  {
    id: 'before-takeoff',
    title: 'Before Takeoff',
    category: 'normal',
    items: [
      { id: '1', task: 'Seat Belts', action: 'Fastened' },
      { id: '2', task: 'BPRS Handle', action: 'Pin Removed' },
      { id: '3', task: 'Airbrakes', action: 'Closed & Locked' },
      { id: '4', task: 'Flaps', action: 'Set (+1)' },
      { id: '5', task: 'Trim', action: 'Set Neutral' },
      { id: '6', task: 'Fuel Selector', action: 'Fullest Tank' },
      { id: '7', task: 'Lights / Transponder', action: 'Set' },
      { id: '8', task: 'Engine Parameters', action: 'CHECK' },
      { id: '9', task: 'Controls', action: 'Free & Correct' },
    ]
  },
  {
    id: 'after-landing',
    title: 'After Landing',
    category: 'normal',
    items: [
      { id: '1', task: 'Throttle Lever', action: 'Idle' },
      { id: '2', task: 'Flaps', action: '(-) or (0)' },
      { id: '3', task: 'Transponder', action: 'STBY' },
      { id: '4', task: 'Lights', action: 'As required' },
      { id: '5', task: 'Airbrakes', action: 'Close at taxi speed' },
      { id: '6', task: 'ELT', action: 'CHECK not transmitting' },
    ]
  },
  {
    id: 'shutdown',
    title: 'Shut Down',
    category: 'normal',
    items: [
      { id: '1', task: 'Lights', action: 'All OFF' },
      { id: '2', task: 'Throttle', action: 'Idle' },
      { id: '3', task: 'Ignition Switch', action: 'OFF' },
      { id: '4', task: 'GEN / ALT Master', action: 'OFF' },
      { id: '5', task: 'BAT Master', action: 'OFF' },
      { id: '6', task: 'BPRS Safety Pin', action: 'Insert' },
    ]
  },

  // --- EMERGENCIES ---
  {
      id: 'eng-fail-to',
      title: 'Engine Failure at Takeoff (Low Alt)',
      category: 'emergency',
      items: [
          { id: '1', task: 'Airspeed', action: 'Maintain above stall' },
          { id: '2', task: 'Fuel Selector', action: 'OFF' },
          { id: '3', task: 'Ignition Switch', action: 'OFF' },
          { id: '4', task: 'Flaps', action: 'As required' },
          { id: '5', task: 'BAT Master', action: 'OFF' },
          { id: '6', task: 'Seat Belts', action: 'Tightened' },
      ]
  },
  {
      id: 'eng-fire-ground',
      title: 'Engine Fire on Ground',
      category: 'emergency',
      items: [
          { id: '1', task: 'Starter', action: 'Keep Cranking' },
          { id: '2', task: 'Fuel Selector', action: 'OFF' },
          { id: '3', task: 'Throttle', action: 'Full Forward' },
          { id: '4', task: 'Ignition', action: 'OFF' },
          { id: '5', task: 'Masters', action: 'OFF' },
          { id: '6', task: 'Aircraft', action: 'Evacuate' },
      ]
  },
  {
      id: 'eng-restart',
      title: 'Engine Restart in Flight',
      category: 'emergency',
      items: [
          { id: '1', task: 'BAT Master', action: 'Check ON' },
          { id: '2', task: 'GEN/ALT Master', action: 'Check ON' },
          { id: '3', task: 'Propeller Lever', action: 'Full Forward' },
          { id: '4', task: 'Throttle', action: '10mm Open' },
          { id: '5', task: 'Starter', action: 'Engage' },
          { id: '6', task: 'Throttle', action: 'Gradually Increase' },
      ]
  }
];
