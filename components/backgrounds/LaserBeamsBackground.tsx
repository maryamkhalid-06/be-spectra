"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Beam({ color, speed, intensity }: { color: string, speed: number, intensity: number }) {
    const mesh = useRef<THREE.Mesh>(null);
    const pos = useMemo(() => [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 10
    ], []);

    const beamSpeed = (0.5 + Math.random()) * speed;

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.position.x += beamSpeed * 0.2;
        if (mesh.current.position.x > 25) mesh.current.position.x = -25;
    });

    return (
        <mesh ref={mesh} position={pos as any} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02 * intensity, 0.02 * intensity, 10, 8]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={4 * intensity}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

interface LaserBeamsBackgroundProps {
    color: string;
    speed?: number;
    intensity?: number;
}

export default function LaserBeamsBackground({ color, speed = 1, intensity = 1 }: LaserBeamsBackgroundProps) {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.2} />
            {Array.from({ length: 40 }).map((_, i) => (
                <Beam key={i} color={color} speed={speed} intensity={intensity} />
            ))}
        </Canvas>
    );
}
