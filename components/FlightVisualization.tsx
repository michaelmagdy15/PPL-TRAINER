
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Grid, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SimState } from '../types';

// Fix for missing JSX types for R3F elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      capsuleGeometry: any;
      boxGeometry: any;
      coneGeometry: any;
      cylinderGeometry: any;
      planeGeometry: any;
      sphereGeometry: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      color: any;
      fog: any;
    }
  }
}

// Camera Rig to keep aircraft centered
const CameraRig = () => {
    useFrame((state) => {
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

// Improved Pipistrel Virus SW 121 Model
const Aircraft = ({ simState }: { simState: SimState }) => {
  const meshRef = useRef<THREE.Group>(null);
  const propRef = useRef<THREE.Group>(null);
  const leftAileronRef = useRef<THREE.Mesh>(null);
  const rightAileronRef = useRef<THREE.Mesh>(null);
  const elevatorRef = useRef<THREE.Mesh>(null);
  const rudderRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Attitude control (Smooth interpolation)
    const speed = 4.0 * delta;
    
    const targetPitch = THREE.MathUtils.degToRad(simState.pitch);
    const targetBank = THREE.MathUtils.degToRad(-simState.bank); 
    const targetHeading = THREE.MathUtils.degToRad(simState.heading || 0);
    const targetYaw = THREE.MathUtils.degToRad(simState.yaw || 0);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetPitch, speed);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetBank, speed);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetHeading + targetYaw, speed);
    
    // Propeller Animation
    if (propRef.current && !simState.failProp) {
        const rpm = (simState.power || 0) * 40; 
        propRef.current.rotation.z += rpm * delta;
    }

    // Control Surface Animation
    if(leftAileronRef.current && rightAileronRef.current) {
        const rollRate = (targetBank - meshRef.current.rotation.z);
        leftAileronRef.current.rotation.x = -rollRate * 8; 
        rightAileronRef.current.rotation.x = rollRate * 8;
    }
    if(elevatorRef.current) {
        const pitchRate = (targetPitch - meshRef.current.rotation.x);
        elevatorRef.current.rotation.x = -pitchRate * 8;
    }
    if(rudderRef.current) {
        rudderRef.current.rotation.y = -targetYaw * 5;
    }
  });

  const fuselageMat = <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />;
  const glassMat = <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} opacity={0.6} transparent />;
  const propMat = <meshStandardMaterial color="#333333" />;
  const stripeMat = <meshStandardMaterial color="#ef4444" />;

  return (
    <group ref={meshRef} scale={0.5}>
        <Float speed={simState.altitude > 10 ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.1}>
            
            {/* --- FUSELAGE --- */}
            <group>
                {/* Main Pod */}
                <mesh position={[0, -0.1, 0.5]} scale={[0.85, 1.0, 1.6]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    {fuselageMat}
                </mesh>
                {/* Tail Boom */}
                <mesh position={[0, 0.3, -1.8]} rotation={[-Math.PI/2, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.4, 4.2, 16]} />
                    {fuselageMat}
                </mesh>
                {/* Cockpit Canopy */}
                <mesh position={[0, 0.35, 0.6]} scale={[0.78, 0.7, 0.9]} rotation={[-0.2, 0, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    {glassMat}
                </mesh>
            </group>

            {/* --- HIGH WING --- */}
            <group position={[0, 0.85, 0.5]}>
                {/* Center Wing Section */}
                <mesh>
                    <boxGeometry args={[1.2, 0.15, 1.2]} />
                    {fuselageMat}
                </mesh>
                {/* Left Wing */}
                <mesh position={[-3.6, 0.05, 0.1]}>
                    <boxGeometry args={[6.0, 0.1, 0.9]} />
                    {fuselageMat}
                </mesh>
                {/* Right Wing */}
                <mesh position={[3.6, 0.05, 0.1]}>
                    <boxGeometry args={[6.0, 0.1, 0.9]} />
                    {fuselageMat}
                </mesh>
                
                {/* Wing Struts */}
                <mesh position={[-1.5, -0.6, 0.1]} rotation={[0, 0, 0.4]}>
                    <cylinderGeometry args={[0.03, 0.03, 1.8]} />
                    {fuselageMat}
                </mesh>
                <mesh position={[1.5, -0.6, 0.1]} rotation={[0, 0, -0.4]}>
                    <cylinderGeometry args={[0.03, 0.03, 1.8]} />
                    {fuselageMat}
                </mesh>

                {/* Winglets */}
                <mesh position={[-6.6, 0.2, 0.1]} rotation={[0, 0, 0.5]}>
                    <boxGeometry args={[0.1, 0.08, 0.9]} />
                    {stripeMat}
                </mesh>
                <mesh position={[6.6, 0.2, 0.1]} rotation={[0, 0, -0.5]}>
                    <boxGeometry args={[0.1, 0.08, 0.9]} />
                    {stripeMat}
                </mesh>

                {/* Flaperons */}
                <group position={[-3.6, -0.05, 0.5]}>
                    <mesh ref={leftAileronRef}>
                        <boxGeometry args={[5.8, 0.02, 0.2]} />
                        {stripeMat}
                    </mesh>
                </group>
                <group position={[3.6, -0.05, 0.5]}>
                    <mesh ref={rightAileronRef}>
                        <boxGeometry args={[5.8, 0.02, 0.2]} />
                        {stripeMat}
                    </mesh>
                </group>
            </group>

            {/* --- T-TAIL EMPENNAGE --- */}
            <group position={[0, 0.5, -3.8]}>
                {/* Vertical Stabilizer (Swept) */}
                <mesh position={[0, 0.8, 0]} rotation={[0.3, 0, 0]}>
                    <boxGeometry args={[0.12, 1.8, 0.7]} />
                    {fuselageMat}
                </mesh>
                {/* Rudder */}
                <group position={[0, 0.6, 0.4]}>
                    <mesh ref={rudderRef} rotation={[0.1, 0, 0]}>
                        <boxGeometry args={[0.1, 1.5, 0.4]} />
                        {fuselageMat}
                    </mesh>
                </group>
                {/* Horizontal Stabilizer (Top of T) */}
                <group position={[0, 1.6, -0.3]}>
                    <mesh>
                        <boxGeometry args={[2.6, 0.08, 0.6]} />
                        {fuselageMat}
                    </mesh>
                    {/* Elevator */}
                    <group position={[0, 0, 0.35]}>
                        <mesh ref={elevatorRef}>
                            <boxGeometry args={[2.6, 0.02, 0.25]} />
                            {stripeMat}
                        </mesh>
                    </group>
                </group>
            </group>

            {/* --- PROPELLER --- */}
            <group ref={propRef} position={[0, -0.1, 1.9]}>
                <mesh rotation={[Math.PI/2, 0, 0]}>
                    <coneGeometry args={[0.18, 0.5, 32]} />
                    {fuselageMat}
                </mesh>
                {/* 2 Blades */}
                <mesh>
                    <boxGeometry args={[1.8, 0.12, 0.02]} />
                    {propMat}
                </mesh>
            </group>

            {/* --- LANDING GEAR (Tricycle) --- */}
            <group>
                {/* Main Gear Legs */}
                <mesh position={[0.8, -0.8, 0.5]} rotation={[0, 0, -0.4]}>
                    <cylinderGeometry args={[0.06, 0.05, 1.2]} />
                    {fuselageMat}
                </mesh>
                <mesh position={[-0.8, -0.8, 0.5]} rotation={[0, 0, 0.4]}>
                    <cylinderGeometry args={[0.06, 0.05, 1.2]} />
                    {fuselageMat}
                </mesh>

                {/* Main Wheel Pants */}
                <mesh position={[-1.1, -1.3, 0.5]}>
                    <mesh scale={[0.7, 0.7, 2.0]}>
                       <sphereGeometry args={[0.25, 16, 16]} />
                       {fuselageMat}
                    </mesh>
                </mesh>
                <mesh position={[1.1, -1.3, 0.5]}>
                    <mesh scale={[0.7, 0.7, 2.0]}>
                       <sphereGeometry args={[0.25, 16, 16]} />
                       {fuselageMat}
                    </mesh>
                </mesh>

                {/* Nose Gear */}
                <mesh position={[0, -0.7, 1.4]} rotation={[0.2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.05, 0.9]} />
                    {fuselageMat}
                </mesh>
                <mesh position={[0, -1.1, 1.5]}>
                     <mesh scale={[0.7, 0.7, 1.8]}>
                       <sphereGeometry args={[0.2, 16, 16]} />
                       {fuselageMat}
                    </mesh>
                </mesh>
            </group>

        </Float>
    </group>
  );
};

// Dynamic World to simulate altitude changes
const DynamicWorld = ({ altitude }: { altitude: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state, delta) => {
        if(groupRef.current) {
            // Ground moves down as altitude increases.
            // Aircraft wheels are approx at Y = -0.65 (scaled 0.5 of -1.3)
            // So ground starts at -0.65
            const targetY = -0.65 - (altitude / 20); // Scaled for visual effect
            
            // Smoothly interpolate ground position
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 2 * delta);
        }
    });

    return (
        <group ref={groupRef}>
            <Grid 
                position={[0, 0, 0]} 
                args={[200, 200]} 
                cellSize={2} 
                cellThickness={0.5} 
                cellColor="#1e293b" 
                sectionSize={20} 
                sectionThickness={1.5} 
                sectionColor="#334155" 
                fadeDistance={80} 
            />
            <mesh rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[400, 400]} />
                <meshBasicMaterial color="#020617" />
            </mesh>
        </group>
    )
}

const FlightOverlay = ({ simState, title }: { simState: SimState, title: string }) => {
    return (
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur text-white p-3 rounded-lg border border-slate-700 shadow-lg">
                <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Telemetry</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-sm">
                    <div>PITCH: <span className={Math.abs(simState.pitch) > 10 ? 'text-yellow-400' : 'text-blue-400'}>{simState.pitch.toFixed(1)}°</span></div>
                    <div>BANK: <span className={Math.abs(simState.bank) > 30 ? 'text-yellow-400' : 'text-blue-400'}>{simState.bank.toFixed(1)}°</span></div>
                    <div>ALT: <span className="text-white">{simState.altitude.toFixed(0)} ft</span></div>
                    <div>PWR: <span className={simState.power > 0.8 ? 'text-green-400' : 'text-slate-300'}>{(simState.power * 100).toFixed(0)}%</span></div>
                    <div>FLAPS: <span className="text-white">{simState.flaps === 0 ? 'UP' : simState.flaps === 1 ? 'T/O (+1)' : 'LDG (+2)'}</span></div>
                </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur text-white p-2 px-4 rounded-lg border border-slate-700 font-bold text-sm flex items-center shadow-lg">
               {title}
            </div>
        </div>
    )
}

const LoadingFallback = () => (
    <Html center>
        <div className="text-blue-500 font-mono text-xs animate-pulse">Initializing Sim...</div>
    </Html>
);

export const FlightVisualization: React.FC<{ simState: SimState, title: string }> = ({ simState, title }) => {
  return (
    <div className="w-full h-full relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950/80 pointer-events-none z-0" />
      
      <Canvas shadows camera={{ position: [4, 1, 6], fov: 40 }}>
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 10, 50]} />
        
        <Suspense fallback={<LoadingFallback />}>
            {/* Camera Rig to force center */}
            <CameraRig />

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#cbd5e1" />
            <pointLight position={[0, -5, 0]} intensity={0.3} color="#3b82f6" />

            <Aircraft simState={simState} />
            <DynamicWorld altitude={simState.altitude} />

            <Environment preset="city" />
        </Suspense>
      </Canvas>

      <FlightOverlay simState={simState} title={title} />
    </div>
  );
};
