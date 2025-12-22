"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Trail } from '@react-three/drei'
import * as THREE from 'three'

interface GenesBackgroundProps {
    speed: number
    intensity: number
    colors: {
        primary: string
        secondary: string
        accent: string
    }
}

function DNAHelix({ colors, speed, intensity }: any) {
    const group = useRef<THREE.Group>(null)
    const points = useMemo(() => {
        const pts = []
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 4
            const x = Math.cos(angle) * 2
            const y = (i / 50) * 10 - 5
            const z = Math.sin(angle) * 2
            pts.push(new THREE.Vector3(x, y, z))
        }
        return pts
    }, [])

    useFrame((state) => {
        if (!group.current) return
        group.current.rotation.y = state.clock.getElapsedTime() * speed * 0.1
    })

    return (
        <group ref={group}>
            {points.map((point, i) => (
                <mesh key={i} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? colors.primary : colors.secondary}
                        emissive={i % 2 === 0 ? colors.primary : colors.secondary}
                        emissiveIntensity={intensity * 0.5}
                    />
                </mesh>
            ))}
        </group>
    )
}

function ProteinCluster({ colors, speed, intensity, position }: any) {
    const group = useRef<THREE.Group>(null)
    const clusterParticles = useMemo(() => {
        const p = []
        const count = 5 + Math.floor(Math.random() * 8)
        for (let i = 0; i < count; i++) {
            p.push({
                pos: [
                    (Math.random() - 0.5) * 0.8,
                    (Math.random() - 0.5) * 0.8,
                    (Math.random() - 0.5) * 0.8
                ],
                scale: 0.1 + Math.random() * 0.3
            })
        }
        return p
    }, [])

    useFrame((state) => {
        if (!group.current) return
        const t = state.clock.getElapsedTime() * speed
        group.current.rotation.x = Math.sin(t * 0.2) * 0.5
        group.current.rotation.y = Math.cos(t * 0.3) * 0.5
        group.current.position.y += Math.sin(t * 0.5 + position[0]) * 0.002
    })

    return (
        <group ref={group} position={position}>
            {clusterParticles.map((cp, i) => (
                <mesh key={i} position={cp.pos as any}>
                    <sphereGeometry args={[cp.scale, 16, 16]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? colors.primary : colors.secondary}
                        emissive={i % 2 === 0 ? colors.primary : colors.secondary}
                        emissiveIntensity={intensity * 0.5}
                        roughness={0.3}
                        metalness={0.2}
                    />
                </mesh>
            ))}
        </group>
    )
}

function Particle({ data, colors, speed, intensity }: any) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime() * speed
        meshRef.current.position.x = data.x + Math.sin(t + data.offset) * data.amplitude
        meshRef.current.position.y = data.y + Math.cos(t * 0.7 + data.offset) * data.amplitude
    })

    return (
        <Float speed={speed} rotationIntensity={intensity} floatIntensity={intensity}>
            <mesh ref={meshRef} position={[data.x, data.y, data.z]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={colors.accent || colors.primary}
                    emissive={colors.accent || colors.primary}
                    emissiveIntensity={intensity * 0.7}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    )
}

function GeneStructure({ speed, intensity, colors }: GenesBackgroundProps) {
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, () => ({
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 10,
            offset: Math.random() * Math.PI * 2,
            amplitude: 0.5 + Math.random() * 0.5
        }))
    }, [])

    return (
        <group>
            {/* DNA Helices */}
            {Array.from({ length: 3 }).map((_, i) => (
                <group key={i} position={[(i - 1) * 8, 0, 0]}>
                    <DNAHelix colors={colors} speed={speed} intensity={intensity} />
                </group>
            ))}

            {/* Protein Clusters - irregular biological clumps */}
            {Array.from({ length: 8 }).map((_, i) => (
                <ProteinCluster
                    key={`protein-${i}`}
                    colors={colors}
                    speed={speed}
                    intensity={intensity}
                    position={[
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 10
                    ]}
                />
            ))}

            {/* Floating particles - fluid movement */}
            {particles.map((p, i) => (
                <Particle
                    key={i}
                    data={p}
                    colors={colors}
                    speed={speed}
                    intensity={intensity}
                />
            ))}
        </group>
    )
}

export default function GenesBackground({ speed, intensity, colors }: GenesBackgroundProps) {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <GeneStructure speed={speed} intensity={intensity} colors={colors} />
        </Canvas>
    )
}
