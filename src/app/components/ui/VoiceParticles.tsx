"use client"

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  alpha: number
}

interface VoiceParticlesProps {
  audioData?: Uint8Array | null
  isActive?: boolean
}

const VoiceParticles: React.FC<VoiceParticlesProps> = ({ audioData, isActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>()
  const radiusRef = useRef(200) // Base radius of the globe

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles in a sphere formation
    const initParticles = () => {
      const particles: Particle[] = []
      const particleCount = 200 // Increased particle count for more density

      for (let i = 0; i < particleCount; i++) {
        // Generate points on a sphere using spherical coordinates
        const theta = Math.random() * Math.PI * 2 // Azimuthal angle
        const phi = Math.acos((Math.random() * 2) - 1) // Polar angle
        const radius = radiusRef.current

        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        particles.push({
          x,
          y,
          z,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 0.5,
          radius: 2,
          alpha: 0.6
        })
      }
      particlesRef.current = particles
    }

    initParticles()

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Center point
      const centerX = canvas.offsetWidth / 2
      const centerY = canvas.offsetHeight / 2

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Add some wave motion
        const time = Date.now() * 0.001
        const wave = Math.sin(time + i * 0.1) * 2

        if (isActive && audioData) {
          // Use audio data to affect particle movement
          const audioIndex = i % audioData.length
          const audioValue = audioData[audioIndex] / 255
          particle.vx += (Math.random() - 0.5) * audioValue * 0.2
          particle.vy += (Math.random() - 0.5) * audioValue * 0.2
          particle.vz += (Math.random() - 0.5) * audioValue * 0.2
          particle.radius = 1 + audioValue * 2
        }

        // Update position with velocity
        particle.x += particle.vx + wave * 0.1
        particle.y += particle.vy + wave * 0.1
        particle.z += particle.vz + wave * 0.1

        // Keep particles within sphere bounds
        const distance = Math.sqrt(
          particle.x * particle.x +
          particle.y * particle.y +
          particle.z * particle.z
        )

        if (distance > radiusRef.current) {
          const scale = radiusRef.current / distance
          particle.x *= scale
          particle.y *= scale
          particle.z *= scale
        }

        // Calculate perspective
        const perspective = 1000
        const depth = perspective / (perspective - particle.z)
        const projectedX = particle.x * depth + centerX
        const projectedY = particle.y * depth + centerY

        // Draw particle
        ctx.beginPath()
        ctx.arc(
          projectedX,
          projectedY,
          particle.radius * depth,
          0,
          Math.PI * 2
        )
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          projectedX,
          projectedY,
          0,
          projectedX,
          projectedY,
          particle.radius * depth * 2
        )
        
        const alpha = (1 - Math.abs(particle.z) / radiusRef.current) * particle.alpha
        gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections between nearby particles
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = (p1.x - p2.x)
          const dy = (p1.y - p2.y)
          const dz = (p1.z - p2.z)
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 50) {
            const perspective = 1000
            const depth1 = perspective / (perspective - p1.z)
            const depth2 = perspective / (perspective - p2.z)
            
            const x1 = p1.x * depth1 + centerX
            const y1 = p1.y * depth1 + centerY
            const x2 = p2.x * depth2 + centerX
            const y2 = p2.y * depth2 + centerY

            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
          }
        })
      })
      ctx.stroke()

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [audioData, isActive])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default VoiceParticles