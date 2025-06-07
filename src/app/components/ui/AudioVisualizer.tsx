'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleVisualizer = ({ isActive }: { isActive: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [volume, setVolume] = useState(0);

  const count = 2000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1 + Math.random() * 0.5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      // Gradient from purple to cyan
      color.setHSL((i / count) * 0.6 + 0.3, 1.0, 0.6);
      colors.set([color.r, color.g, color.b], i * 3);
    }

    return { positions, colors };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / bufferLength;
        setVolume(avg / 255);
        requestAnimationFrame(tick);
      };

      tick();
    });

    return () => {
      audioCtx.close();
    };
  }, [isActive]);

  useFrame(() => {
    if (pointsRef.current) {
      const scale = 1 + volume * 2;
      pointsRef.current.scale.set(scale, scale, scale);
      pointsRef.current.rotation.y += 0.002 + volume * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06} // increase for bigger particles
        vertexColors
        transparent
        opacity={2}
        sizeAttenuation
      />
    </points>
  );
};

const AudioVisualizerCanvas = ({ isActive }: { isActive: boolean }) => (
  <div className="absolute inset-0 pointer-events-none -z-10">
    <Canvas camera={{ position: [0, 0, 3.5] }}>
      <ambientLight />
      <ParticleVisualizer isActive={isActive} />
    </Canvas>
  </div>
);

export default AudioVisualizerCanvas;
