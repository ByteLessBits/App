"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, Grid } from "@react-three/drei";
import * as THREE from "three";
import type { FlatType, Room } from "@/lib/flatTypes";
import type { PlacedBlock } from "./AppShell";

interface Props {
  flat: FlatType;
  placedBlocks: PlacedBlock[];
  onMoveBlock: (blockId: string, x: number, z: number) => void;
}

/* ────── Wall component ────── */
function Wall({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#cbd5e1"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ────── Room Floor ────── */
function RoomFloor({ room, wallHeight }: { room: Room; wallHeight: number }) {
  const cx = room.x + room.width / 2;
  const cz = room.y + room.depth / 2;

  return (
    <group>
      {/* Floor tile */}
      <mesh position={[cx, 0.005, cz]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[room.width - 0.02, room.depth - 0.02]} />
        <meshStandardMaterial color={room.color} transparent opacity={0.25} />
      </mesh>

      {/* Room label */}
      <Text
        position={[cx, 0.02, cz]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={Math.min(room.width, room.depth) * 0.12}
        color={room.color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {room.name}
      </Text>
      <Text
        position={[cx, 0.02, cz + Math.min(room.width, room.depth) * 0.15]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={Math.min(room.width, room.depth) * 0.08}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {`${room.width}×${room.depth}m`}
      </Text>

      {/* Room partition walls — thin internal walls */}
      {/* Front wall */}
      <Wall
        position={[cx, wallHeight / 2, room.y]}
        size={[room.width, wallHeight, 0.05]}
      />
      {/* Back wall */}
      <Wall
        position={[cx, wallHeight / 2, room.y + room.depth]}
        size={[room.width, wallHeight, 0.05]}
      />
      {/* Left wall */}
      <Wall
        position={[room.x, wallHeight / 2, cz]}
        size={[0.05, wallHeight, room.depth]}
      />
      {/* Right wall */}
      <Wall
        position={[room.x + room.width, wallHeight / 2, cz]}
        size={[0.05, wallHeight, room.depth]}
      />
    </group>
  );
}

/* ────── Draggable Block ────── */
function DraggableBlock({
  block,
  onMove,
  floorSize,
}: {
  block: PlacedBlock;
  onMove: (id: string, x: number, z: number) => void;
  floorSize: { w: number; d: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const getFloorPos = useCallback(
    (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.current.setFromCamera(mouse.current, camera);
      const target = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane.current, target);
      return target;
    },
    [camera, gl]
  );

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      // Set plane height to block center
      plane.current.constant = -block.height / 2;
    },
    [block.height]
  );

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!dragging) return;
      const pos = getFloorPos(e.nativeEvent);
      if (pos) {
        const clampedX = Math.max(
          block.width / 2,
          Math.min(floorSize.w - block.width / 2, pos.x)
        );
        const clampedZ = Math.max(
          block.depth / 2,
          Math.min(floorSize.d - block.depth / 2, pos.z)
        );
        onMove(block.id, clampedX, clampedZ);
      }
    },
    [dragging, getFloorPos, onMove, block.id, block.width, block.depth, floorSize]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[block.x, block.height / 2, block.z]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        setDragging(false);
      }}
    >
      <boxGeometry args={[block.width, block.height, block.depth]} />
      <meshStandardMaterial
        color={dragging ? "#fbbf24" : hovered ? "#60a5fa" : block.color}
        transparent
        opacity={dragging ? 0.9 : 0.8}
      />
      <Text
        position={[0, block.height / 2 + 0.08, 0]}
        fontSize={0.12}
        color="#fff"
        anchorX="center"
        anchorY="bottom"
        font={undefined}
      >
        {block.name}
      </Text>
    </mesh>
  );
}

/* ────── Scene content ────── */
function SceneContent({ flat, placedBlocks, onMoveBlock }: Props) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} castShadow />
      <pointLight position={[flat.totalWidth / 2, 3, flat.totalDepth / 2]} intensity={0.4} />

      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI / 2.05}
      />

      {/* Ground grid */}
      <Grid
        args={[30, 30]}
        position={[flat.totalWidth / 2, -0.01, flat.totalDepth / 2]}
        cellSize={0.5}
        cellColor="#334155"
        sectionSize={1}
        sectionColor="#475569"
        fadeDistance={20}
        infiniteGrid={false}
      />

      {/* Outer floor */}
      <mesh
        position={[flat.totalWidth / 2, 0, flat.totalDepth / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[flat.totalWidth, flat.totalDepth]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Outer walls (thicker) */}
      {/* Front */}
      <mesh position={[flat.totalWidth / 2, flat.wallHeight / 2, 0]}>
        <boxGeometry args={[flat.totalWidth + 0.2, flat.wallHeight, 0.15]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>
      {/* Back */}
      <mesh position={[flat.totalWidth / 2, flat.wallHeight / 2, flat.totalDepth]}>
        <boxGeometry args={[flat.totalWidth + 0.2, flat.wallHeight, 0.15]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>
      {/* Left */}
      <mesh position={[0, flat.wallHeight / 2, flat.totalDepth / 2]}>
        <boxGeometry args={[0.15, flat.wallHeight, flat.totalDepth + 0.2]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>
      {/* Right */}
      <mesh position={[flat.totalWidth, flat.wallHeight / 2, flat.totalDepth / 2]}>
        <boxGeometry args={[0.15, flat.wallHeight, flat.totalDepth + 0.2]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>

      {/* Rooms */}
      {flat.rooms.map((room) => (
        <RoomFloor key={room.id} room={room} wallHeight={flat.wallHeight} />
      ))}

      {/* Placed Blocks */}
      {placedBlocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          onMove={onMoveBlock}
          floorSize={{ w: flat.totalWidth, d: flat.totalDepth }}
        />
      ))}
    </>
  );
}

/* ────── Main export ────── */
export default function Scene3D({ flat, placedBlocks, onMoveBlock }: Props) {
  const camDist = Math.max(flat.totalWidth, flat.totalDepth) * 1.5;
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [camDist * 0.8, camDist * 0.6, camDist * 0.8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true }}
        onCreated={({ camera }) => {
          camera.lookAt(flat.totalWidth / 2, 0, flat.totalDepth / 2);
        }}
      >
        <SceneContent
          flat={flat}
          placedBlocks={placedBlocks}
          onMoveBlock={onMoveBlock}
        />
      </Canvas>
    </div>
  );
}
