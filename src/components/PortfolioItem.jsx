import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';

const USE_MODEL = false; // Set true after adding public/models/sampleModel.glb

function FallbackShape() {
  return (
    <group>
      <mesh castShadow>
        <torusKnotGeometry args={[1.1, 0.34, 220, 16]} />
        <meshStandardMaterial color="#f4f0ff" metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.1, -1.6]}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial color="#ff8f6b" metalness={0.2} roughness={0.3} />
      </mesh>
      <mesh position={[1.3, -0.3, 0.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#4ef4c9" metalness={0.1} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Model() {
  const { scene } = useGLTF('/models/sampleModel.glb');
  return <primitive object={scene} scale={1} />;
}

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function ModelOrFallback() {
  if (!USE_MODEL) return <FallbackShape />;
  return (
    <ModelErrorBoundary fallback={<FallbackShape />}>
      <Model />
    </ModelErrorBoundary>
  );
}

function PortfolioItem({ scrollProgress = 0 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    const scrollSpin = scrollProgress * Math.PI * 2;
    const scrollLift = scrollProgress * 0.6;
    groupRef.current.rotation.y = t * 0.35 + scrollSpin;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + scrollProgress * 0.4;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.2 + scrollLift;
    groupRef.current.position.z = scrollProgress * -1.2;
    const pulse = 1 + Math.sin(t * 0.8) * 0.02 + scrollProgress * 0.08;
    groupRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <ModelOrFallback />

      <Text
        position={[0, -1.2, 0]}
        fontSize={0.28}
        color="#f6f4ff"
        anchorX="center"
        anchorY="middle"
      >
        Charles Pura
      </Text>
    </group>
  );
}

if (USE_MODEL) {
  useGLTF.preload('/models/sampleModel.glb');
}

export default PortfolioItem;
