import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

const WorkstationModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (state.mouse.x * Math.PI) / 20,
        0.015
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (state.mouse.y * Math.PI) / 20,
        0.015
      );
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <spotLight
        position={[5, 5, 5]}
        angle={0.25}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[-5, 5, -5]}
        angle={0.25}
        penumbra={1}
        intensity={0.8}
        castShadow
        color="#e1e5eb"
      />

      {/* Improved Desk with Modern Legs and Supports */}
      <group position={[0, 0, 0]}>
        {/* Main Desk Surface - unchanged */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.05, 1.8]} />
          <meshPhysicalMaterial
            color="#2a1f1d"
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Desk Edge Trim - unchanged */}
        <mesh position={[0, -0.025, 0]} receiveShadow>
          <boxGeometry args={[3.3, 0.02, 1.9]} />
          <meshPhysicalMaterial
            color="#1a1210"
            roughness={0.3}
            metalness={0.2}
            clearcoat={0.4}
          />
        </mesh>

        {/* Modern Desk Legs - Angled Design */}
        {/* Left Front Leg - with segments */}
        <group position={[-1.4, -0.5, 0.7]}>
          {/* Upper segment */}
          <mesh
            position={[0.03, 0.25, 0]}
            rotation={[0, 0, Math.PI * 0.03]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.05, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Lower segment */}
          <mesh
            position={[0.06, -0.25, 0]}
            rotation={[0, 0, Math.PI * 0.06]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Connection joint */}
          <mesh position={[0.045, 0, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.6}
            />
          </mesh>
        </group>

        {/* Right Front Leg - with segments */}
        <group position={[1.4, -0.5, 0.7]}>
          {/* Upper segment */}
          <mesh
            position={[-0.03, 0.25, 0]}
            rotation={[0, 0, -Math.PI * 0.03]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.05, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Lower segment */}
          <mesh
            position={[-0.06, -0.25, 0]}
            rotation={[0, 0, -Math.PI * 0.06]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Connection joint */}
          <mesh position={[-0.045, 0, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.6}
            />
          </mesh>
        </group>

        {/* Left Back Leg - with segments */}
        <group position={[-1.4, -0.5, -0.7]}>
          {/* Upper segment */}
          <mesh
            position={[0.03, 0.25, 0]}
            rotation={[0, 0, Math.PI * 0.03]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.05, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Lower segment */}
          <mesh
            position={[0.06, -0.25, 0]}
            rotation={[0, 0, Math.PI * 0.06]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Connection joint */}
          <mesh position={[0.045, 0, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.6}
            />
          </mesh>
        </group>

        {/* Right Back Leg - with segments */}
        <group position={[1.4, -0.5, -0.7]}>
          {/* Upper segment */}
          <mesh
            position={[-0.03, 0.25, 0]}
            rotation={[0, 0, -Math.PI * 0.03]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.05, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Lower segment */}
          <mesh
            position={[-0.06, -0.25, 0]}
            rotation={[0, 0, -Math.PI * 0.06]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
            <meshPhysicalMaterial
              color="#252525"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          {/* Connection joint */}
          <mesh position={[-0.045, 0, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.6}
            />
          </mesh>
        </group>

        {/* Modern Horizontal Support Bars - Replace Cross Structure */}
        {/* Front Support Bar */}
        <mesh position={[0, -0.7, 0.7]} castShadow>
          <boxGeometry args={[2.8, 0.04, 0.04]} />
          <meshPhysicalMaterial
            color="#2a2a2a"
            roughness={0.2}
            metalness={0.9}
            clearcoat={0.7}
          />
        </mesh>

        {/* Back Support Bar */}
        <mesh position={[0, -0.7, -0.7]} castShadow>
          <boxGeometry args={[2.8, 0.04, 0.04]} />
          <meshPhysicalMaterial
            color="#2a2a2a"
            roughness={0.2}
            metalness={0.9}
            clearcoat={0.7}
          />
        </mesh>

        {/* Premium Adjustable Foot Caps with Detail */}
        {[
          [-1.4, -0.5, 0.7], // Left Front
          [1.4, -0.5, 0.7], // Right Front
          [-1.4, -0.5, -0.7], // Left Back
          [1.4, -0.5, -0.7], // Right Back
        ].map((legPos, i) => {
          const isLeft = legPos[0] < 0;
          const xOffset = isLeft ? 0.06 : -0.06;

          // Calculate the foot position relative to leg end position
          const footPos = [
            legPos[0] + (isLeft ? 0.06 : -0.06) * 2, // Add extra offset for tilt
            legPos[1] - 0.5, // Position at the bottom of lower segment
            legPos[2],
          ];

          return (
            <group key={i} position={footPos}>
              {/* Main Foot Cap */}
              <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.05, 0.03, 16]} />
                <meshPhysicalMaterial
                  color="#101010"
                  roughness={0.1}
                  metalness={0.9}
                  clearcoat={0.9}
                  clearcoatRoughness={0.1}
                />
              </mesh>
              {/* Rubber Pad */}
              <mesh position={[0, -0.017, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.005, 16]} />
                <meshStandardMaterial
                  color="#0a0a0a"
                  roughness={0.9}
                  metalness={0.0}
                />
              </mesh>
              {/* Adjustment Ring */}
              <mesh position={[0, -0.008, 0]}>
                <torusGeometry args={[0.04, 0.008, 16, 32]} />
                <meshPhysicalMaterial
                  color="#3a3a3a"
                  roughness={0.2}
                  metalness={0.8}
                  clearcoat={0.5}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Monitor Stand */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.5, 32]} />
        <meshPhysicalMaterial color="#252525" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Monitor Frame */}
      <group position={[0, 0.8, 0]}>
        {/* Main Display */}
        <mesh castShadow>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.5}
          />
        </mesh>
        {/* Screen - Glowing/On */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.9, 1.1]} />
          <meshPhysicalMaterial
            color="#222a38"
            emissive="#4a90ff"
            emissiveIntensity={0.45}
            metalness={0.5}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Simulated Content */}
        <group position={[0, 0, 0.027]}>
          {/* Toolbar */}
          <mesh position={[0, 0.5, 0]}>
            <planeGeometry args={[1.89, 0.06]} />
            <meshBasicMaterial color="#2a2a30" />
          </mesh>
          {/* Side Panel */}
          <mesh position={[-0.88, 0, 0]}>
            <planeGeometry args={[0.13, 0.94]} />
            <meshBasicMaterial color="#252530" />
          </mesh>
          {/* Main Content Area */}
          <mesh position={[0.065, 0, 0]}>
            <planeGeometry args={[1.74, 0.94]} />
            <meshBasicMaterial color="#1a1a25" />
          </mesh>
          {/* Code Lines */}
          {[...Array(12)].map((_, i) => (
            <mesh
              key={i}
              position={[-0.3 + Math.random() * 0.6, 0.3 - i * 0.06, 0.001]}
            >
              <planeGeometry args={[0.5 + Math.random() * 0.7, 0.012]} />
              <meshBasicMaterial
                color={
                  i % 4 === 0 ? "#5d8aff" : i % 3 === 0 ? "#ffcc5d" : "#aabbcc"
                }
              />
            </mesh>
          ))}
        </group>
        {/* Power LED */}
        <mesh position={[0, -0.58, 0.03]}>
          <circleGeometry args={[0.018, 16]} />
          <meshBasicMaterial color="#00ff66" />
        </mesh>
      </group>

      {/* Ultra-Detail Mechanical Keyboard */}
      <group position={[0, 0.025, 0.5]} rotation={[0.1, 0, 0]}>
        {/* Keyboard Base */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.03, 0.4]} />
          <meshPhysicalMaterial
            color="#181818"
            metalness={0.8}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        {/* Wrist Rest */}
        <mesh position={[0, -0.012, 0.18]} castShadow>
          <boxGeometry args={[1.18, 0.012, 0.06]} />
          <meshPhysicalMaterial
            color="#232323"
            metalness={0.7}
            roughness={0.25}
            clearcoat={0.8}
          />
        </mesh>
        {/* RGB Underglow */}
        <mesh position={[0, -0.018, 0]}>
          <boxGeometry args={[1.22, 0.008, 0.42]} />
          <meshPhysicalMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.7}
            transparent
            opacity={0.25}
          />
        </mesh>
        {/* USB Cable */}
        <mesh position={[0, 0.015, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.18, 16]} />
          <meshPhysicalMaterial color="#222" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Keycaps */}
        {[...Array(6)].map((_, row) =>
          [...Array(15)].map((_, col) => {
            // Special keys
            const isSpacebar = row === 5 && col > 3 && col < 11;
            const isShift =
              (row === 4 && col === 0) || (row === 4 && col === 13);
            const isEnter = row === 3 && col === 13;
            const isEsc = row === 0 && col === 0;
            const isFn = row === 5 && col === 1;
            const isCtrl = row === 5 && col === 2;
            const isAlt = row === 5 && col === 3;
            const isWin = row === 5 && col === 0;
            const isArrow = row === 5 && col > 11;
            // Skip positions for special keys
            if (
              (row === 5 &&
                col !== 7 &&
                !isArrow &&
                !isFn &&
                !isCtrl &&
                !isAlt &&
                !isWin) ||
              (isShift && col > 0)
            )
              return null;
            // Key sizes
            const width = isSpacebar
              ? 0.5
              : isShift || isEnter
              ? 0.15
              : isArrow
              ? 0.09
              : 0.07;
            const height = 0.07;
            const keyHeight = 0.025;
            // Key colors
            const keyColor = isEsc
              ? "#ff3333"
              : isEnter
              ? "#4477ff"
              : isSpacebar
              ? "#222"
              : isShift
              ? "#333"
              : isFn
              ? "#44ffaa"
              : isCtrl
              ? "#ffaa44"
              : isAlt
              ? "#44aaff"
              : isWin
              ? "#aaaaff"
              : isArrow
              ? "#888"
              : "#292929";
            // Key label simulation (just a white rectangle for now)
            const labelWidth = width * 0.5;
            const labelHeight = height * 0.3;
            // Position
            const posX = -0.55 + col * 0.08;
            const posY = 0.037;
            const posZ = -0.15 + row * 0.08;
            return (
              <group key={`${row}-${col}`} position={[posX, posY, posZ]}>
                {/* Keycap Base */}
                <mesh castShadow>
                  <boxGeometry args={[width, keyHeight, height]} />
                  <meshPhysicalMaterial
                    color={keyColor}
                    metalness={0.4}
                    roughness={0.35}
                    clearcoat={0.9}
                  />
                </mesh>
                {/* Keycap Top Surface */}
                <mesh position={[0, keyHeight / 2 + 0.001, 0]}>
                  <boxGeometry args={[width - 0.008, 0.002, height - 0.008]} />
                  <meshPhysicalMaterial
                    color="#ededed"
                    metalness={0.2}
                    roughness={0.2}
                    clearcoat={1}
                  />
                </mesh>
                {/* Keycap Label (simulated) */}
                <mesh position={[0, keyHeight / 2 + 0.003, 0]}>
                  <planeGeometry args={[labelWidth, labelHeight]} />
                  <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.7}
                  />
                </mesh>
                {/* Subtle LED Glow */}
                <mesh position={[0, 0.001, 0]}>
                  <planeGeometry args={[width - 0.01, height - 0.01]} />
                  <meshBasicMaterial
                    color={isEsc ? "#ff3333" : isEnter ? "#4477ff" : "#00ffff"}
                    transparent
                    opacity={0.12}
                  />
                </mesh>
              </group>
            );
          })
        )}
        {/* Media Controls */}
        <group position={[0.5, 0.045, -0.18]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[i * 0.05 - 0.05, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.012, 16]} />
              <meshPhysicalMaterial
                color="#3a3a3a"
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
        {/* Brand Logo */}
        <mesh position={[0.5, 0.03, 0.18]} rotation={[Math.PI * -0.4, 0, 0]}>
          <planeGeometry args={[0.13, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      </group>

      {/* Ultra-Realistic Gaming Mouse */}
      <group position={[0.8, 0.028, 0.4]} rotation={[0, -0.22, 0]}>
        {/* Mouse Main Body - Ergonomic asymmetric shape */}
        <mesh castShadow>
          <sphereGeometry
            args={[0.065, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]}
          />
          <meshPhysicalMaterial
            color="#19191b"
            metalness={0.7}
            roughness={0.13}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        {/* Mouse Palm Rest (slightly raised) */}
        <mesh position={[0, 0.025, -0.01]} castShadow>
          <sphereGeometry
            args={[0.06, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.45]}
          />
          <meshPhysicalMaterial
            color="#23232a"
            metalness={0.8}
            roughness={0.18}
            clearcoat={0.9}
          />
        </mesh>
        {/* Mouse Side Grips (rubberized) */}
        <mesh position={[-0.052, 0.012, 0]} rotation={[0, 0, Math.PI * 0.08]}>
          <boxGeometry args={[0.012, 0.032, 0.08]} />
          <meshPhysicalMaterial
            color="#222"
            metalness={0.2}
            roughness={0.7}
            clearcoat={0.2}
          />
        </mesh>
        <mesh position={[0.052, 0.012, 0]} rotation={[0, 0, -Math.PI * 0.08]}>
          <boxGeometry args={[0.012, 0.032, 0.08]} />
          <meshPhysicalMaterial
            color="#222"
            metalness={0.2}
            roughness={0.7}
            clearcoat={0.2}
          />
        </mesh>
        {/* Mouse Buttons (left & right) */}
        <mesh position={[-0.018, 0.045, 0.018]} castShadow>
          <boxGeometry args={[0.038, 0.008, 0.055]} />
          <meshPhysicalMaterial
            color="#23232a"
            metalness={0.7}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0.018, 0.045, 0.018]} castShadow>
          <boxGeometry args={[0.038, 0.008, 0.055]} />
          <meshPhysicalMaterial
            color="#23232a"
            metalness={0.7}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>
        {/* Mouse Scroll Wheel */}
        <mesh position={[0, 0.052, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.025, 24]} />
          <meshPhysicalMaterial
            color="#444"
            metalness={0.6}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>
        {/* Scroll Wheel Grooves */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              0,
              0.008 * Math.cos((i * Math.PI) / 4),
              0.008 * Math.sin((i * Math.PI) / 4) - 0.01,
            ]}
            rotation={[(i * Math.PI) / 4, 0, 0]}
          >
            <boxGeometry args={[0.018, 0.001, 0.001]} />
            <meshPhysicalMaterial color="#222" metalness={0.7} />
          </mesh>
        ))}
        {/* DPI Button */}
        <mesh position={[0, 0.055, 0.012]}>
          <boxGeometry args={[0.014, 0.004, 0.014]} />
          <meshPhysicalMaterial
            color="#3a3a3a"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.7}
          />
        </mesh>
        {/* RGB Underglow */}
        <mesh position={[0, -0.018, 0]}>
          <ringGeometry args={[0.062, 0.067, 32]} />
          <meshPhysicalMaterial
            color="#00ffea"
            emissive="#00ffea"
            emissiveIntensity={0.6}
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Mouse Logo RGB */}
        <mesh position={[0, 0.045, 0.03]}>
          <planeGeometry args={[0.025, 0.025]} />
          <meshPhysicalMaterial
            color="#00ffea"
            emissive="#00ffea"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Mouse Cable */}
        <mesh position={[0, 0.06, -0.045]} rotation={[Math.PI / 2.2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.18, 16]} />
          <meshPhysicalMaterial color="#222" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Mouse Feet (teflon pads) */}
        <mesh position={[-0.025, -0.032, 0.03]}>
          <boxGeometry args={[0.03, 0.003, 0.012]} />
          <meshPhysicalMaterial
            color="#eaeaea"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0.025, -0.032, 0.03]}>
          <boxGeometry args={[0.03, 0.003, 0.012]} />
          <meshPhysicalMaterial
            color="#eaeaea"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, -0.032, -0.025]}>
          <boxGeometry args={[0.045, 0.003, 0.012]} />
          <meshPhysicalMaterial
            color="#eaeaea"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Enhanced Shadows */}
      <ContactShadows
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={4}
        resolution={512}
        color="#000000"
      />

      <Environment preset="studio" />
    </group>
  );
};

export default WorkstationModel;
