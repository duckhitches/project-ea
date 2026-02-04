import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Iridescence.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor; // The accent color (Pink-500)
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

// Simple pseudo-random
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Cubic Hermite Interpolation
    f = f * f * (3.0 - 2.0 * f);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Mouse interaction: subtle distortion
  float distToMouse = length(uv - (uMouse * 2.0 - 1.0));
  vec2 interaction = (uMouse * 2.0 - 1.0) * uAmplitude * smoothstep(0.5, 0.0, distToMouse);
  
  uv += interaction;

  float t = uTime * uSpeed * 0.2;
  
  // Create a "Kinetic Field" pattern
  // Using multiple noise layers to create organic but structural forms
  float n = noise(uv * 3.0 + t);
  n += 0.5 * noise(uv * 6.0 - t * 0.5);
  n += 0.25 * noise(uv * 12.0 + t * 0.2);
  n = n * 0.6; // Normalize roughly to 0-1 range

  // Quantization / Thresholding for Brutalist look
  // We want strict bands: Black -> Pink (Thin Line) -> White
  
  vec3 color = vec3(0.0); // Black base (or White base in dark mode, handled by mix)
  
  // Thresholds
  float edgeWidth = 0.02;     // Width of the pink accent line
  float threshold = 0.5;      // Center point of the transition

  // Hard Step for Black/White
  float mask = step(threshold, n);
  
  // Accent Line detection (Band around the threshold)
  float accentMask = smoothstep(threshold - edgeWidth, threshold, n) - smoothstep(threshold, threshold + edgeWidth, n);
  
  // Mix colors
  // Base: mostly black/white contrast
  vec3 baseColor = vec3(mask); 
  
  // Apply Accent (Pink)
  // If accentMask is high, use uColor. Otherwise use baseColor.
  color = mix(baseColor, uColor, step(0.1, accentMask));
  
  // Optional: Invert for dark/light mode compatibility if passed? 
  // For now, let's assume a technical dark aesthetic: Black bg, White shapes, Pink edges.
  // Actually, the previous code was uColor based. Let's make it customizable.
  
  gl_FragColor = vec4(color, 1.0);
}
`;

interface IridescenceProps {
  color?: [number, number, number]; // [R, G, B] 0-1
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string; // Add className support
}

export default function Iridescence({
  color = [0.925, 0.282, 0.6], // Default to Pink-500 (#ec4899 -> 236, 72, 153)
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  className,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const programRef = useRef<Program>();

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    
    // Safety check for existing canvas
    if (ctn.querySelector('canvas')) {
        return; 
    }

    const renderer = new Renderer({ alpha: true }); // Enable transparency if needed
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); // Transparent clear

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed }
      }
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;
    let startTime = performance.now();

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      const time = (performance.now() - startTime) * 0.001;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      
      // Update uniform directly
      if(programRef.current) {
         programRef.current.uniforms.uMouse.value[0] = x;
         programRef.current.uniforms.uMouse.value[1] = y;
      }
    }
    
    if (mouseReact) {
      ctn.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (mouseReact) {
        ctn.removeEventListener('mousemove', handleMouseMove);
      }
      if (ctn.contains(gl.canvas)) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, speed, amplitude, mouseReact]);

  return <div ref={ctnDom} className={`iridescence-container ${className || ''}`} {...rest} />;
}
