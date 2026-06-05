/**
 * DEEPFENSE.ONLINE — CyberField 3D Background
 * Interactive particle network thay thế Matrix Rain.
 * Particles di chuyển, kết nối đường line, phản ứng mouse.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useRef, useMemo, useEffect, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// === CONFIG ===
const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_REPULSION_RADIUS = 3;
const MOUSE_REPULSION_STRENGTH = 0.08;
const FIELD_SIZE = 12;

// === Particles Component ===
const Particles: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  // Khởi tạo vị trí và vận tốc
  const { positions, velocities, dummy, linePositions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    const maxConnections = PARTICLE_COUNT * 6;
    const linePositions = new Float32Array(maxConnections * 6);
    const colors = new Float32Array(maxConnections * 6);

    return {
      positions,
      velocities,
      dummy: new THREE.Object3D(),
      linePositions,
      colors,
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    // Chuyển mouse từ normalized (-1,1) sang world coords
    const mouseX = (mouse.current.x * viewport.width) / 2;
    const mouseY = (mouse.current.y * viewport.height) / 2;

    let lineIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Di chuyển brownian
      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];

      // Giới hạn trong field
      if (Math.abs(positions[ix]) > FIELD_SIZE / 2) velocities[ix] *= -1;
      if (Math.abs(positions[iy]) > FIELD_SIZE / 2) velocities[iy] *= -1;
      if (Math.abs(positions[iz]) > 2) velocities[iz] *= -1;

      // Mouse repulsion
      const dx = positions[ix] - mouseX;
      const dy = positions[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPULSION_RADIUS && dist > 0.01) {
        const force = (MOUSE_REPULSION_RADIUS - dist) * MOUSE_REPULSION_STRENGTH;
        positions[ix] += (dx / dist) * force;
        positions[iy] += (dy / dist) * force;
      }

      // Update instance matrix
      dummy.position.set(positions[ix], positions[iy], positions[iz]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Tính connections (chỉ với ~50 particle gần nhất để giảm O(n²))
      for (let j = i + 1; j < Math.min(i + 50, PARTICLE_COUNT); j++) {
        const jx = j * 3;
        const ddx = positions[ix] - positions[jx];
        const ddy = positions[iy] - positions[jx + 1];
        const ddz = positions[iz] - positions[jx + 2];
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

        if (d < CONNECTION_DISTANCE && lineIndex < linePositions.length / 6 - 1) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          const li = lineIndex * 6;

          linePositions[li] = positions[ix];
          linePositions[li + 1] = positions[iy];
          linePositions[li + 2] = positions[iz];
          linePositions[li + 3] = positions[jx];
          linePositions[li + 4] = positions[jx + 1];
          linePositions[li + 5] = positions[jx + 2];

          // Gradient color: Blue → Purple
          colors[li] = alpha*0.11; colors[li+1] = alpha*0.44; colors[li+2] = alpha*0.91; // blue
          colors[li+3] = alpha*0.66; colors[li+4] = alpha*0.33; colors[li+5] = alpha*0.97; // cool accent

          lineIndex++;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update lines geometry
    const lineGeo = linesRef.current.geometry;
    const posAttr = lineGeo.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = lineGeo.getAttribute('color') as THREE.BufferAttribute;
    posAttr.set(linePositions);
    colAttr.set(colors);
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIndex * 2);
  });

  const maxLines = PARTICLE_COUNT * 6;

  return (
    <>
      {/* Particles (InstancedMesh for performance) */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshBasicMaterial color="#1D6FE8" transparent opacity={0.6} />
      </instancedMesh>

      {/* Connection Lines */}
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(maxLines * 6), 3]}
            count={maxLines * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[new Float32Array(maxLines * 6), 3]}
            count={maxLines * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.15} />
      </lineSegments>
    </>
  );
};

// === Camera Parallax — Smooth mouse-driven depth effect ===
// Lấy cảm hứng từ Apple.com, Linear.app: camera trôi nhẹ theo chuột
// tạo hiệu ứng "nhìn qua cửa sổ" 3D premium
const CameraParallax: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Lerp camera về phía chuột — hệ số 0.04 = mượt như Apple
    camera.position.x += (mouse.current.x * 1.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// === Main CyberField Component ===
const CyberField: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setIsVisible(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  if (!isVisible) {
    // Fallback gradient tĩnh cho reduced motion
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D6FE8]/5 via-transparent to-[#A855F7]/5" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-auto"
      onMouseMove={handleMouseMove}
      style={{ cursor: 'default' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <CameraParallax mouse={mouse} />
          <Particles mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CyberField;
