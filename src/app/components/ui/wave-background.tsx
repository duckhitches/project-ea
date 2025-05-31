// 'use client'

// import { useRef, useMemo } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { useTexture } from '@react-three/drei'
// import * as THREE from 'three'

// function Wave() {
//   const mesh = useRef<THREE.Mesh>(null)
//   const time = useRef(0)

//   const uniforms = useMemo(
//     () => ({
//       u_time: { value: 0 },
//       u_colorA: { value: new THREE.Color('#e0f2fe') }, // light blue
//       u_colorB: { value: new THREE.Color('#f0f9ff') }, // lighter blue
//     }),
//     []
//   )

//   useFrame((state) => {
//     if (!mesh.current) return
//     time.current += 0.01
//     ;(mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value = time.current
//   })

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[2, 2, 32, 32]} />
//       <shaderMaterial
//         uniforms={uniforms}
//         vertexShader={`
//           varying vec2 vUv;
//           varying float vElevation;
//           uniform float u_time;
          
//           void main() {
//             vUv = uv;
//             vec3 pos = position;
//             float elevation = sin(pos.x * 2.0 + u_time) * 0.1;
//             elevation += sin(pos.y * 2.0 + u_time * 0.5) * 0.1;
//             pos.z += elevation;
//             vElevation = elevation;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//           }
//         `}
//         fragmentShader={`
//           varying vec2 vUv;
//           varying float vElevation;
//           uniform vec3 u_colorA;
//           uniform vec3 u_colorB;
          
//           void main() {
//             float mixStrength = (vElevation + 0.1) * 5.0;
//             vec3 color = mix(u_colorA, u_colorB, mixStrength);
//             gl_FragColor = vec4(color, 1.0);
//           }
//         `}
//       />
//     </mesh>
//   )
// }

// export function WaveBackground({
//   children,
//   className = '',
// }: {
//   children?: React.ReactNode
//   className?: string
// }) {
//   return (
//     <div className={`relative w-full h-screen ${className}`}>
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [0, 0, 1.5] }}>
//           <Wave />
//         </Canvas>
//       </div>
//       <div className="relative z-10 h-full">
//         {children}
//       </div>
//     </div>
//   )
// } 