'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PresentationControls, ContactShadows, Environment } from '@react-three/drei'
import { Vector3, Mesh, MathUtils } from 'three'

// Types pour les propriétés des composants
interface ShapeProps {
  position: [number, number, number]
  color: string
  size: number
  speed: number
  maxMove?: number
}

interface RotatingShapeProps extends ShapeProps {
  rotation: [number, number, number]
}

// Composant pour un tore coloré
function ColoredTorus({ position, color, size, rotation, speed }: RotatingShapeProps) {
  const torusRef = useRef<Mesh>(null!)
  const initialPosition = useRef(new Vector3(...position))
  
  useFrame((state) => {
    if (!torusRef.current) return
    
    // Rotation simple
    torusRef.current.rotation.x += 0.001 * speed * 0.1
    torusRef.current.rotation.y += 0.001 * speed * 0.15
    
    // Mouvement de flottement
    const time = state.clock.elapsedTime
    torusRef.current.position.x = initialPosition.current.x + Math.sin(time * 0.2) * 0.1
    torusRef.current.position.y = initialPosition.current.y + Math.cos(time * 0.3) * 0.1
    torusRef.current.position.z = initialPosition.current.z + Math.sin(time * 0.4) * 0.1
    
    // Effet de pulsation léger
    const pulse = Math.sin(time * speed * 0.5) * 0.05
    torusRef.current.scale.x = torusRef.current.scale.y = torusRef.current.scale.z = 1 + pulse
  })
  
  return (
    <mesh 
      ref={torusRef} 
      position={position} 
      rotation={rotation}
    >
      <torusGeometry args={[size * 0.7, size * 0.3, 12, 24]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.3} 
        emissive={color} 
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

// Composant pour une sphère colorée
function ColoredSphere({ position, color, size, speed }: ShapeProps) {
  const sphereRef = useRef<Mesh>(null!)
  const initialPosition = useRef(new Vector3(...position))
  
  useFrame((state) => {
    if (!sphereRef.current) return
    
    // Mouvement de flottement
    const time = state.clock.elapsedTime
    sphereRef.current.position.x = initialPosition.current.x + Math.sin(time * 0.3) * 0.15
    sphereRef.current.position.y = initialPosition.current.y + Math.cos(time * 0.4) * 0.15
    sphereRef.current.position.z = initialPosition.current.z + Math.sin(time * 0.2) * 0.15
    
    // Rotation simple
    sphereRef.current.rotation.x += 0.001 * speed * 0.1
    sphereRef.current.rotation.y += 0.001 * speed * 0.1
    
    // Effet de pulsation léger
    const pulse = Math.sin(time * speed * 0.5) * 0.05
    sphereRef.current.scale.x = sphereRef.current.scale.y = sphereRef.current.scale.z = 1 + pulse
  })
  
  return (
    <mesh 
      ref={sphereRef} 
      position={position}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.3} 
        emissive={color} 
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

// Composant pour un cylindre coloré
function ColoredCylinder({ position, color, size, rotation, speed }: RotatingShapeProps) {
  const cylinderRef = useRef<Mesh>(null!)
  const initialPosition = useRef(new Vector3(...position))
  
  useFrame((state) => {
    if (!cylinderRef.current) return
    
    // Rotation simple
    cylinderRef.current.rotation.x += 0.001 * speed * 0.1
    cylinderRef.current.rotation.z += 0.001 * speed * 0.15
    
    // Mouvement de flottement
    const time = state.clock.elapsedTime
    cylinderRef.current.position.x = initialPosition.current.x + Math.sin(time * 0.4) * 0.12
    cylinderRef.current.position.y = initialPosition.current.y + Math.cos(time * 0.2) * 0.12
    cylinderRef.current.position.z = initialPosition.current.z + Math.sin(time * 0.3) * 0.12
    
    // Effet de pulsation léger
    const pulse = Math.sin(time * speed * 0.5) * 0.05
    cylinderRef.current.scale.x = cylinderRef.current.scale.y = cylinderRef.current.scale.z = 1 + pulse
  })
  
  return (
    <mesh 
      ref={cylinderRef} 
      position={position} 
      rotation={rotation}
    >
      <cylinderGeometry args={[size * 0.5, size * 0.5, size * 1.2, 16]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.3} 
        emissive={color} 
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

// Composant principal pour la scène
function Scene() {
  const { camera } = useThree()
  
  // Couleurs du thème
  const colors = [
    '#1E3A8A', // Bleu principal
    '#6366F1', // Indigo
    '#4F46E5', // Violet
    '#8B5CF6', // Violet clair
    '#EC4899', // Rose
    '#06B6D4', // Cyan
  ]
  
  // Configuration des formes - moins d'objets
  const torusConfigs = [
    { position: [-0.8, 0.6, -0.5] as [number, number, number], color: colors[0], size: 0.35, rotation: [Math.PI / 4, 0, 0] as [number, number, number], speed: 0.3 },
    { position: [0.8, -0.3, 0] as [number, number, number], color: colors[1], size: 0.3, rotation: [0, Math.PI / 3, Math.PI / 5] as [number, number, number], speed: 0.4 },
    { position: [0, 0.8, -0.2] as [number, number, number], color: colors[2], size: 0.25, rotation: [Math.PI / 6, Math.PI / 4, 0] as [number, number, number], speed: 0.35 },
  ]
  
  const sphereConfigs = [
    { position: [0.6, 0.2, 0] as [number, number, number], color: colors[4], size: 0.2, speed: 0.3 },
    { position: [-0.5, -0.4, 0.1] as [number, number, number], color: colors[5], size: 0.25, speed: 0.25 },
  ]
  
  const cylinderConfigs = [
    { position: [-0.6, 0.5, 0.1] as [number, number, number], color: colors[2], size: 0.28, rotation: [Math.PI / 3, 0, Math.PI / 4] as [number, number, number], speed: 0.2 },
    { position: [0.7, -0.6, -0.2] as [number, number, number], color: colors[5], size: 0.2, rotation: [Math.PI / 5, Math.PI / 4, 0] as [number, number, number], speed: 0.15 },
  ]
  
  // Positionner la caméra une seule fois au montage
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 0, 5)
      camera.lookAt(0, 0, 0)
    }
  }, [camera])
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
      
      {/* Rendu des formes */}
      {torusConfigs.map((config, index) => (
        <ColoredTorus key={`torus-${index}`} {...config} />
      ))}
      
      {sphereConfigs.map((config, index) => (
        <ColoredSphere key={`sphere-${index}`} {...config} />
      ))}
      
      {cylinderConfigs.map((config, index) => (
        <ColoredCylinder key={`cylinder-${index}`} {...config} />
      ))}
      
      {/* Ombre portée plus légère */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.2} 
        scale={4} 
        blur={2} 
      />
    </>
  )
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
      console.log('WebGL context lost, attempting to recover...');
    };

    const handleContextRestored = () => {
      setContextLost(false);
      console.log('WebGL context restored');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return (
    <div style={{ 
      width: '70vh', 
      height: '70vh', 
      borderRadius: '20px',
      overflow: 'hidden',
      cursor: 'grab',
      position: 'relative',
      touchAction: 'none',
    }}>
      {contextLost && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1000,
        }}>
          <p style={{ color: '#1E3A8A', fontSize: '1.2rem' }}>
            Récupération du contexte WebGL...
          </p>
        </div>
      )}
      <Canvas 
        ref={canvasRef}
        frameloop="demand" 
        dpr={[1, 1.5]}
        gl={{ 
          powerPreference: 'high-performance',
          antialias: false,
          depth: true,
          alpha: true,
          stencil: false,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
          premultipliedAlpha: false,
        }}
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onPointerMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 12, Math.PI / 12]}
          azimuth={[-Math.PI / 12, Math.PI / 12]}
          speed={0.5}
          zoom={0.9}
        >
          <Scene />
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
} 