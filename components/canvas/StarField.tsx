"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A field of drifting stars, some of which are close enough together
 * to be connected by faint constellation lines. Lives behind everything
 * in "dreamer" mode. Kept deliberately slow and quiet — this is
 * atmosphere, not a hero animation.
 */
// Small seeded PRNG so the sky is stable between renders (and pure).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Stars({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(1729);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + rand() * 18;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi) - 10;
    }
    return arr;
  }, [count]);

  // Precompute a handful of constellation edges: connect stars that
  // happen to land near each other so the field reads as "mapped sky"
  // rather than random noise.
  const linePositions = useMemo(() => {
    const pts: number[] = [];
    const maxDist = 2.6;
    const maxLines = 140;
    let lines = 0;

    for (let i = 0; i < count && lines < maxLines; i += 3) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];

      for (let j = i + 3; j < Math.min(i + 40, count); j += 3) {
        const bx = positions[j * 3];
        const by = positions[j * 3 + 1];
        const bz = positions[j * 3 + 2];
        const d = Math.hypot(ax - bx, ay - by, az - bz);

        if (d < maxDist) {
          pts.push(ax, ay, az, bx, by, bz);
          lines++;
          break;
        }
      }
    }

    return new Float32Array(pts);
  }, [positions, count]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.012;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#F8FAFC"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#C084FC"
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </group>
  );
}

export default function StarField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!fixed !inset-0"
    >
      <Stars />
    </Canvas>
  );
}
