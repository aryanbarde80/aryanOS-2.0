"use client";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnotModel() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.35, 80, 12, 2, 3]} />
        <meshBasicMaterial color="#818cf8" wireframe opacity={0.35} transparent />
      </mesh>
    </Float>
  );
}

function IcosahedronModel() {
  const ref = useRef();
  const edgesGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.3, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.z += delta * 0.18;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#818cf8" wireframe opacity={0.12} transparent />
        </mesh>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#a5b4fc" opacity={0.4} transparent />
        </lineSegments>
      </group>
    </Float>
  );
}

function OctahedronModel() {
  const ref = useRef();
  const edgesGeo = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1.2, 0);
    return new THREE.EdgesGeometry(geo);
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.rotation.x += delta * 0.08;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
      <group ref={ref}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#f472b6" wireframe opacity={0.15} transparent />
        </mesh>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#f472b6" opacity={0.5} transparent />
        </lineSegments>
      </group>
    </Float>
  );
}

function seededRandom(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleSphere() {
  const ref = useRef();
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i * 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 2 + 1) - 1);
      const r = 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#63dcc8" size={0.04} sizeAttenuation transparent opacity={0.6} />
      </points>
    </Float>
  );
}

function DodecahedronModel() {
  const ref = useRef();
  const edgesGeo = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(1.1, 0);
    return new THREE.EdgesGeometry(geo);
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.z += delta * 0.1;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh>
          <dodecahedronGeometry args={[1.1, 0]} />
          <meshBasicMaterial color="#fb923c" wireframe opacity={0.12} transparent />
        </mesh>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#fb923c" opacity={0.45} transparent />
        </lineSegments>
      </group>
    </Float>
  );
}

const MODELS = {
  torusKnot: TorusKnotModel,
  icosahedron: IcosahedronModel,
  octahedron: OctahedronModel,
  sphere: ParticleSphere,
  dodecahedron: DodecahedronModel,
};

export default function Filler3D({ variant = 'torusKnot' }) {
  const ModelComponent = MODELS[variant] || TorusKnotModel;
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <ModelComponent />
      </Canvas>
    </div>
  );
}
