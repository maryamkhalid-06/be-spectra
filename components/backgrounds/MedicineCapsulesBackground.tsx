"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Capsule({ colorTop, colorBottom, speed, intensity }: any) {
    const mesh = useRef<THREE.Group>(null);
    const pos = useMemo(() => [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10
    ] as [number, number, number], []);

    const rotationSpeed = (0.5 + Math.random()) * speed;

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.x += rotationSpeed * 0.01;
        mesh.current.rotation.y += rotationSpeed * 0.02;

        // Mouse interaction tilt
        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;
        mesh.current.rotation.x += mouseY * 0.05;
        mesh.current.rotation.y += mouseX * 0.05;
    });

    return (
        <group ref={mesh} position={pos}>
            <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[0, 0.4, 0]}>
                    <capsuleGeometry args={[0.3, 0.6, 4, 16]} />
                    <meshStandardMaterial
                        color={colorTop}
                        emissive={colorTop}
                        emissiveIntensity={intensity}
                    />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <capsuleGeometry args={[0.3, 0.6, 4, 16]} />
                    <meshStandardMaterial
                        color={colorBottom}
                        emissive={colorBottom}
                        emissiveIntensity={intensity * 0.5}
                    />
                </mesh>
            </Float>
        </group>
    );
}

interface MedicineCapsulesBackgroundProps {
    colors: {
        primary: string
        secondary: string
        accent: string
    }
    speed?: number;
    intensity?: number;
}

export default function MedicineCapsulesBackground({ colors, speed = 1, intensity = 1 }: MedicineCapsulesBackgroundProps) {
    const colorTop = colors.primary;
    const colorBottom = "#ffffff";

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5 * intensity} />
            {Array.from({ length: 25 }).map((_, i) => (
                <Capsule
                    key={i}
                    colorTop={colorTop}
                    colorBottom={colorBottom}
                    speed={speed}
                    intensity={intensity}
                />
            ))}
        </Canvas>
    );
}
