'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function GoldenParticles({ count = 2000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions and speeds for particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;

            // Lissajous curve movement for organic flowing feel
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update position
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // Scale based on "breathing" rhythm
            const scale = (Math.cos(t) + 2) / 2; // Scale between 0.5 and 1.5
            dummy.scale.set(scale, scale, scale);

            // Rotate constantly
            dummy.rotation.set(s * 5, s * 5, s * 5);

            dummy.updateMatrix();

            // Update the instance
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;

        // Rotate the whole system slowly
        mesh.current.rotation.y += 0.001;
    });

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="#D4AF37" />
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#D4AF37" emissive="#5e4914" specular="#ffffff" shininess={100} />
            </instancedMesh>
        </>
    );
}

function FloatingBible() {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                {/* Bible Cover */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 4, 0.5]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Gold Pages Edges */}
                <mesh position={[0.1, 0, 0]}>
                    <boxGeometry args={[2.9, 3.9, 0.48]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
                </mesh>
                {/* Cross */}
                <mesh position={[0, 0, 0.3]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.2, 2, 0.05]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} emissive="#D4AF37" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0, 0.5, 0.3]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.2, 1.2, 0.05]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} emissive="#D4AF37" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </Float>
    )
}

export default function TemplePage() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">

            {/* Overlay UI */}
            <div className="absolute top-0 left-0 w-full p-8 z-10 flex justify-between items-start pointer-events-none">
                <Link href="/dashboard" className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-gold-400 transition-colors uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft className="w-4 h-4" /> Volver
                </Link>
                <div className="text-right">
                    <h1 className="text-4xl md:text-6xl font-serif text-white/10 font-bold select-none">MIVN</h1>
                    <p className="text-xs text-gold-500/50 uppercase tracking-[0.5em] mt-2">Santuario Digital</p>
                </div>
            </div>

            <div className="absolute bottom-12 left-0 w-full text-center z-10 pointer-events-none px-4">
                <p className="text-gray-400 font-serif italic text-lg opacity-60 animate-pulse">
                    "Estad quietos, y conoced que yo soy Dios..."
                </p>
                <p className="text-gold-500/40 text-xs uppercase tracking-widest mt-2">Salmos 46:10</p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 10, 50]} />

                <Environment preset="city" />

                <group rotation={[0, 0, Math.PI / 4]}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <GoldenParticles count={300} />
                </group>

                <FloatingBible />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
