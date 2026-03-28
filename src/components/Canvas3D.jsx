import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from '@react-three/drei';
import PortfolioItem from './PortfolioItem.jsx';

function Canvas3D({ scrollProgress = 0 }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 0.5, 6], fov: 45 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 6, 6]}
        intensity={1.2}
        castShadow
      />
      <pointLight position={[-4, 2, -2]} intensity={0.6} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
          <PortfolioItem scrollProgress={scrollProgress} />
        </Float>
        <Environment preset="city" />
      </Suspense>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.45}
        scale={10}
        blur={2.8}
        far={6}
      />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={9}
        autoRotate
        autoRotateSpeed={0.7}
      />
    </Canvas>
  );
}

export default Canvas3D;
