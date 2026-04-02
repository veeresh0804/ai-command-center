import React, { useMemo, useRef, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RotatingPoints = forwardRef<THREE.Points, {
  positions: Float32Array; color: string; size: number; speedY: number; speedX?: number; speedZ?: number;
}>(({ positions, color, size, speedY, speedX = 0, speedZ = 0 }, forwardedRef) => {
  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speedY;
      ref.current.rotation.x += delta * speedX;
      ref.current.rotation.z += delta * speedZ;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={0.8} />
    </points>
  );
});

RotatingPoints.displayName = "RotatingPoints";

const NeuralParticles = forwardRef<THREE.Group>((_, ref) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <RotatingPoints positions={positions} color="#00F5FF" size={0.02} speedY={0.1} speedX={0.05} />
  );
});

NeuralParticles.displayName = "NeuralParticles";

const InnerCore = forwardRef<THREE.Group>((_, ref) => {
  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 1;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <RotatingPoints positions={positions} color="#7C3AED" size={0.03} speedY={-0.2} speedX={0} speedZ={0.1} />
  );
});

InnerCore.displayName = "InnerCore";

const NeuralNetwork3D = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <NeuralParticles />
        <InnerCore />
      </Canvas>
    </div>
  );
};

export default NeuralNetwork3D;
