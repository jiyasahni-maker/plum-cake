"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Html,
  Lightformer,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";

export type Portal = { id: string; label: string; hash: string };
export type PointerState = { x: number; y: number };

// Small seeded PRNG so the sky is stable between renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Soft radial gradient used for every glow/halo (additive sprites = cheap bloom).
function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.45)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Glow({
  texture,
  color,
  size,
  opacity = 1,
}: {
  texture: THREE.Texture;
  color: string;
  size: number;
  opacity?: number;
}) {
  return (
    <sprite scale={[size, size, 1]}>
      <spriteMaterial
        map={texture}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

type Orbit = {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  phase: number;
};

const ORBITS: Orbit[] = [
  { radius: 1.55, tilt: [0.35, 0, 0.2], speed: 0.35, phase: 0 },
  { radius: 1.25, tilt: [1.2, 0.4, 0], speed: -0.45, phase: 1.6 },
  { radius: 1.55, tilt: [-0.6, 0, 0.9], speed: 0.3, phase: 3.2 },
  { radius: 1.25, tilt: [0.9, 0, -0.7], speed: -0.38, phase: 4.7 },
];

const RINGS: { radius: number; tube: number; rot: [number, number, number] }[] = [
  { radius: 1.55, tube: 0.022, rot: [Math.PI / 2, 0, 0] },
  { radius: 1.55, tube: 0.022, rot: [0, 0, 0] },
  { radius: 1.55, tube: 0.022, rot: [0, Math.PI / 3, 0] },
  { radius: 1.25, tube: 0.03, rot: [Math.PI / 2 + 0.41, 0, 0] },
  { radius: 0.95, tube: 0.016, rot: [0.8, 0.6, 0] },
];

function Pearl({
  portal,
  orbit,
  glow,
  hovered,
  onHover,
  onSelect,
}: {
  portal: Portal;
  orbit: Orbit;
  glow: THREE.Texture;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = orbit.phase + clock.elapsedTime * orbit.speed;
    }
    if (bodyRef.current) {
      const t = hovered ? 1.7 : 1;
      bodyRef.current.scale.setScalar(
        THREE.MathUtils.lerp(bodyRef.current.scale.x, t, 0.15)
      );
    }
  });

  return (
    <group rotation={orbit.tilt}>
      <group ref={orbitRef}>
        <group position={[orbit.radius, 0, 0]}>
          <mesh ref={bodyRef}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#f5ecff"
              emissive="#c9a3ff"
              emissiveIntensity={hovered ? 2.6 : 1.3}
              roughness={0.15}
            />
          </mesh>
          <Glow
            texture={glow}
            color={hovered ? "#ffd9a0" : "#c9a3ff"}
            size={hovered ? 1 : 0.6}
            opacity={hovered ? 1 : 0.8}
          />

          {/* Generous invisible hit area so pearls are easy to hit */}
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(portal.id);
            }}
            onPointerOut={() => onHover(null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(portal.id);
            }}
          >
            <sphereGeometry args={[0.32, 12, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <Html
            center
            position={[0, 0.3, 0]}
            distanceFactor={7}
            style={{ pointerEvents: "none" }}
            zIndexRange={[20, 0]}
          >
            <div
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.3em] transition-all duration-300"
              style={{
                color: "#ffd9a0",
                opacity: hovered ? 1 : 0.5,
                textShadow: "0 0 12px rgba(255,190,100,0.8)",
                transform: hovered ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {portal.label}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function Dust({ count, texture }: { count: number; texture: THREE.Texture }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 14;
      arr[i * 3 + 1] = (rand() - 0.5) * 8;
      arr[i * 3 + 2] = rand() * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * (0.05 + (i % 7) * 0.012);
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.8 + i) * delta * 0.03;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#ffd9a0"
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function StarShell({ count = 160 }: { count?: number }) {
  const positions = useMemo(() => {
    const rand = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rand() * 1.1;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(rand() * 2 - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f8f4ff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({
  pointer,
  portals,
  hovered,
  entering,
  onHover,
  onSelect,
}: {
  pointer: RefObject<PointerState>;
  portals: readonly Portal[];
  hovered: string | null;
  entering: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const glow = useMemo(() => makeGlowTexture(), []);
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e0b25a",
        metalness: 1,
        roughness: 0.28,
        emissive: "#4a2f00",
        emissiveIntensity: 0.4,
      }),
    []
  );

  const rig = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const base = THREE.MathUtils.clamp(viewport.width / 6.5, 0.5, 0.85);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0 };

    if (spin.current) {
      spin.current.rotation.y += delta * 0.12;
      spin.current.rotation.x = THREE.MathUtils.lerp(spin.current.rotation.x, p.y * 0.25, 0.05);
      spin.current.rotation.z = THREE.MathUtils.lerp(spin.current.rotation.z, -p.x * 0.18, 0.05);
    }
    if (rig.current) {
      rig.current.position.y = -0.15 + Math.sin(t * 0.6) * 0.07;
      const target = entering ? base * 2.6 : base;
      rig.current.scale.setScalar(
        THREE.MathUtils.lerp(rig.current.scale.x, target, entering ? 0.06 : 0.05)
      );
    }
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06 + (entering ? 0.5 : 0));
    }
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, p.x * 0.25, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, p.y * 0.15, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#b9a4ff" />
      <pointLight position={[0, 0, 0]} intensity={14} color="#d6b8ff" distance={8} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#ffbf6b" />

      {/* Studio-style lights so the brass actually reflects something (no HDR download) */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffc27a" position={[4, 2, 3]} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#9b7bff" position={[-4, -1, 2]} scale={[4, 4, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 4, -2]} scale={3} />
      </Environment>

      <Dust count={260} texture={glow} />

      <group ref={rig} scale={0.01}>
        <group ref={spin}>
          {RINGS.map((r, i) => (
            <mesh key={i} rotation={r.rot} material={gold}>
              <torusGeometry args={[r.radius, r.tube, 16, 160]} />
            </mesh>
          ))}

          {/* Axis rod */}
          <mesh material={gold}>
            <cylinderGeometry args={[0.012, 0.012, 3.7, 12]} />
          </mesh>

          <StarShell />

          {/* Glass shell + glowing heart */}
          <mesh>
            <sphereGeometry args={[0.8, 48, 48]} />
            <meshPhysicalMaterial
              color="#b79bff"
              transparent
              opacity={0.14}
              roughness={0}
              clearcoat={1}
              depthWrite={false}
            />
          </mesh>

          <group ref={core}>
            <mesh>
              <icosahedronGeometry args={[0.42, 3]} />
              <meshStandardMaterial color="#e8d5ff" emissive="#a78bfa" emissiveIntensity={2.2} />
            </mesh>
            <Glow texture={glow} color="#a78bfa" size={3} opacity={0.75} />
            <Glow texture={glow} color="#ffd9a0" size={1.3} opacity={0.65} />
          </group>

          {portals.map((p, i) => (
            <Pearl
              key={p.id}
              portal={p}
              orbit={ORBITS[i % ORBITS.length]}
              glow={glow}
              hovered={hovered === p.id}
              onHover={onHover}
              onSelect={onSelect}
            />
          ))}
        </group>

        {/* Click the heart to simply enter */}
        <mesh
          onPointerOver={() => onHover("core")}
          onPointerOut={() => onHover(null)}
          onClick={() => onSelect("core")}
        >
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

export default function ArmillaryCanvas({
  pointer,
  portals,
  hovered,
  entering,
  onHover,
  onSelect,
  onDowngrade,
}: {
  pointer: RefObject<PointerState>;
  portals: readonly Portal[];
  hovered: string | null;
  entering: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onDowngrade: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* If the device can't keep up, drop to the lite scene automatically */}
      <PerformanceMonitor bounds={() => [28, 60]} onDecline={onDowngrade} />
      <Scene
        pointer={pointer}
        portals={portals}
        hovered={hovered}
        entering={entering}
        onHover={onHover}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
