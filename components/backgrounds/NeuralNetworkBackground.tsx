"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface NeuralNetworkBackgroundProps {
    speed: number
    intensity: number
    colors: {
        primary: string
        secondary: string
        accent: string
    }
}

interface NodeData {
    basePosition: [number, number, number]
    velocity: [number, number, number]
    color: string
    phase: number
    pulseSpeed: number
}

function Network({ speed, intensity, colors }: NeuralNetworkBackgroundProps) {
    const groupRef = useRef<THREE.Group>(null)

    // Increased to 300 nodes for dense visualization
    const nodes = useMemo<NodeData[]>(() => {
        return Array.from({ length: 300 }, () => ({
            basePosition: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15
            ] as [number, number, number],
            velocity: [
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.3
            ] as [number, number, number],
            color: Math.random() > 0.5 ? colors.primary : colors.secondary,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 1.5
        }))
    }, [colors])

    // Dynamic positions that update each frame
    const nodePositions = useRef(nodes.map(n => [...n.basePosition] as [number, number, number]))

    // Calculate connections dynamically based on current positions
    const getActiveConnections = () => {
        const conns: Array<[number, number, number, number, number, number, number]> = []
        const maxDistance = 6 // Connection threshold

        for (let i = 0; i < nodePositions.current.length; i++) {
            for (let j = i + 1; j < nodePositions.current.length; j++) {
                const pos1 = nodePositions.current[i]
                const pos2 = nodePositions.current[j]

                const dist = Math.sqrt(
                    Math.pow(pos1[0] - pos2[0], 2) +
                    Math.pow(pos1[1] - pos2[1], 2) +
                    Math.pow(pos1[2] - pos2[2], 2)
                )

                if (dist < maxDistance) {
                    // Calculate connection strength (closer = stronger)
                    const strength = 1 - (dist / maxDistance)
                    conns.push([...pos1, ...pos2, strength])
                }
            }
        }
        return conns
    }

    const connections = useRef(getActiveConnections())

    useFrame((state) => {
        if (!groupRef.current) return

        const time = state.clock.getElapsedTime() * speed

        // Gentle rotation of entire network
        groupRef.current.rotation.y = time * 0.05
        groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1

        // Update node positions with smooth floating movement
        nodes.forEach((node, i) => {
            const pos = nodePositions.current[i]

            // Organic floating movement
            pos[0] = node.basePosition[0] + Math.sin(time * 0.3 + node.phase) * node.velocity[0] * 2
            pos[1] = node.basePosition[1] + Math.cos(time * 0.4 + node.phase) * node.velocity[1] * 2
            pos[2] = node.basePosition[2] + Math.sin(time * 0.2 + node.phase * 2) * node.velocity[2] * 2
        })

        // Recalculate connections every few frames for performance
        if (Math.floor(time * 10) % 3 === 0) {
            connections.current = getActiveConnections()
        }
    })

    const primaryColor = colors.primary
    const secondaryColor = colors.secondary

    return (
        <group ref={groupRef}>
            {/* Dynamic connections with opacity based on strength */}
            {connections.current.map((conn, i) => {
                const [x1, y1, z1, x2, y2, z2, strength] = conn
                return (
                    <Line
                        key={`conn-${i}`}
                        points={[[x1, y1, z1], [x2, y2, z2]]}
                        color={i % 2 === 0 ? primaryColor : secondaryColor}
                        lineWidth={0.8}
                        transparent
                        opacity={strength * 0.3 * intensity}
                        blending={THREE.AdditiveBlending}
                    />
                )
            })}

            {/* Animated nodes with individual pulsing */}
            {nodes.map((node, i) => {
                const currentPos = nodePositions.current[i]
                return (
                    <mesh key={`node-${i}`} position={currentPos}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial
                            color={node.color}
                            emissive={node.color}
                            emissiveIntensity={intensity * (0.6 + Math.sin(Date.now() * 0.001 * node.pulseSpeed + node.phase) * 0.4)}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}

export default function NeuralNetworkBackground({ speed, intensity, colors }: NeuralNetworkBackgroundProps) {
    return (
        <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Network speed={speed} intensity={intensity} colors={colors} />
        </Canvas>
    )
}
