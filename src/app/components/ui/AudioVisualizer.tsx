'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleVisualizer = ({ isActive }: { isActive: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [volume, setVolume] = useState(0);
  const [time, setTime] = useState(0);

  // Increased particle count for better density
  const count = 4000;
  const radius = 1.5;

  const { positions, colors, indices } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const indices: number[] = [];

    // Golden ratio distribution for uniform sphere coverage
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      // Calculate sphere points
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      positions[i * 3] = x * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = z * radius;

      // Grayscale color with slight variation
      const shade = 0.15 + Math.random() * 0.1;
      colors[i * 3] = shade;
      colors[i * 3 + 1] = shade;
      colors[i * 3 + 2] = shade;

      // Create connections between nearby points
      for (let j = 0; j < i; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < radius * 0.25) {
          indices.push(i, j);
        }
      }
    }

    return { positions, colors, indices };
  }, []);

  // Audio processing
  useEffect(() => {
    if (!isActive) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        
        // Enhanced volume calculation
        const weightedSum = dataArray.reduce((acc, val, idx) => {
          const weight = Math.pow(idx / bufferLength, 0.5);
          return acc + val * weight;
        }, 0);
        
        setVolume(weightedSum / (bufferLength * 255) * 2);
        requestAnimationFrame(tick);
      };

      tick();
    });

    return () => {
      audioCtx.close();
    };
  }, [isActive]);

  // Animation frame
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    setTime(t => t + 0.01);

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const originalPositions = positions.slice();

    // Animate points
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const x = originalPositions[ix];
      const y = originalPositions[iy];
      const z = originalPositions[iz];

      // Calculate wave effect
      const distance = Math.sqrt(x * x + y * y + z * z);
      const wave = Math.sin(distance * 2 - time * 3) * volume * 0.2;

      positions[ix] = x * (1 + wave);
      positions[iy] = y * (1 + wave);
      positions[iz] = z * (1 + wave);
    }

    // Rotate based on volume
    pointsRef.current.rotation.y += 0.002 + volume * 0.01;
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(indices)}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="black"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </lineSegments>

      {/* Ambient sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 32, 32]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const AudioVisualizerCanvas = ({ isActive }: { isActive: boolean }) => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      dpr={Math.min(2, window.devicePixelRatio)}
    >
      <color attach="background" args={['white']} />
      <ParticleVisualizer isActive={isActive} />
    </Canvas>
  </div>
);

export default AudioVisualizerCanvas;