"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const VoiceReactiveParticles = ({ isSpeaking, isRecording }: { isSpeaking: boolean; isRecording: boolean }) => {
  const meshRef = useRef<THREE.Points>(null)
  const originalPositions = useRef<Float32Array>()

  const count = 800
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      // Create particles in a sphere distribution
      const radius = Math.random() * 3 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      arr[i] = radius * Math.sin(phi) * Math.cos(theta) // x
      arr[i + 1] = radius * Math.sin(phi) * Math.sin(theta) // y
      arr[i + 2] = radius * Math.cos(phi) // z
    }
    originalPositions.current = arr.slice()
    return arr
  }, [])

  const scale = useRef(1)
  const time = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current || !originalPositions.current) return

    time.current += delta

    // Scale animation based on voice activity
    const targetScale = isSpeaking ? 1.8 : isRecording ? 1.2 : 1
    scale.current = THREE.MathUtils.lerp(scale.current, targetScale, 0.08)

    // Update particle positions with wave effect
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count * 3; i += 3) {
      const originalX = originalPositions.current[i]
      const originalY = originalPositions.current[i + 1]
      const originalZ = originalPositions.current[i + 2]

      // Add wave motion when speaking
      const waveIntensity = isSpeaking ? 0.3 : isRecording ? 0.1 : 0.05
      const waveSpeed = isSpeaking ? 4 : 2

      positions[i] = originalX + Math.sin(time.current * waveSpeed + originalX) * waveIntensity
      positions[i + 1] = originalY + Math.cos(time.current * waveSpeed + originalY) * waveIntensity
      positions[i + 2] = originalZ + Math.sin(time.current * waveSpeed + originalZ) * waveIntensity
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.scale.setScalar(scale.current)

    // Rotate the entire particle system slowly
    meshRef.current.rotation.y += delta * 0.1
  })

  // Dynamic color based on state
  const particleColor = isSpeaking ? "#8b5cf6" : isRecording ? "#3b82f6" : "#64748b"
  const particleSize = isSpeaking ? 0.08 : isRecording ? 0.06 : 0.04

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color={particleColor}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const ParticleCanvas = ({
  isSpeaking,
  isRecording,
  className = "absolute inset-0 -z-10",
}: {
  isSpeaking: boolean
  isRecording: boolean
  className?: string
}) => (
  <div className={className}>
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      <VoiceReactiveParticles isSpeaking={isSpeaking} isRecording={isRecording} />
    </Canvas>
  </div>
)

export default ParticleCanvas
