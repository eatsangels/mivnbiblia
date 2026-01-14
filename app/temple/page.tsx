'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls, Environment, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Map, Sparkles, ChevronDown, History, Construction, Scale, Globe, Cross } from 'lucide-react';

function GoldenParticles({ count = 1000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.005 + Math.random() / 500;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            dummy.position.set(xFactor + a, yFactor + b, zFactor + a);
            const scale = (Math.cos(t) + 2) / 2;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
        </instancedMesh>
    );
}

function FloatingArtifact() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group scale={1.2}>
                <mesh>
                    <boxGeometry args={[3, 4, 0.5]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={1} />
                </mesh>
                <mesh position={[0, 0, 0.02]}>
                    <boxGeometry args={[2.8, 3.8, 0.48]} />
                    <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0, 0.3]}>
                    <boxGeometry args={[0.1, 2, 0.05]} />
                    <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
                </mesh>
                <mesh position={[0, 0.5, 0.3]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.1, 1.2, 0.05]} />
                    <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
                </mesh>
            </group>
        </Float>
    );
}

export default function TemplePage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = Math.max(0, 1 - scrollY / 500);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-500/30">

            {/* Background Canvas Layer */}
            <div className="fixed inset-0 z-0 opacity-40">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="night" />
                    <GoldenParticles />
                    <FloatingArtifact />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Content Layer */}
            <div className="relative z-10">

                {/* Hero / Intro Section */}
                <section className="h-screen flex flex-col items-center justify-center p-6 text-center transform-gpu transition-opacity duration-500" style={{ opacity }}>
                    <Link href="/dashboard" className="absolute top-8 left-8 flex items-center gap-2 text-white/30 hover:text-gold-400 transition-all uppercase tracking-[0.3em] text-[10px] font-black group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Volver al Santuario
                    </Link>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.5em] text-gold-500 animate-fade-in">
                            Casa del Santuario • Bet HaMikdash
                        </div>
                        <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">
                            El Templo
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-400 font-serif italic max-w-2xl mx-auto leading-relaxed">
                            "Donde Dios se manifestaba en medio de su pueblo..."
                        </p>
                    </div>

                    <div className="absolute bottom-12 flex flex-col items-center gap-4 text-white/20 animate-bounce">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Descender</span>
                        <ChevronDown className="w-6 h-6" />
                    </div>
                </section>

                {/* Main Content Museum Sections */}
                <div className="max-w-6xl mx-auto px-6 space-y-64 pb-64">

                    {/* Section 1: Historia */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-gold-500">
                                <History className="w-8 h-8" />
                                <span className="text-sm uppercase tracking-[0.4em] font-black">Crónica Sagrada</span>
                            </div>
                            <h2 className="text-5xl font-serif font-bold leading-tight">Historia del Recinto Sagrado</h2>

                            <div className="space-y-12 border-l border-white/10 pl-8">
                                <div className="relative">
                                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-black" />
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-blue-400">Templo de Salomón</h3>
                                        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black uppercase text-blue-400">960 a.C.</span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        Erigido sobre el <span className="text-white font-medium">Monte Moriah</span> (2 Crónicas 3:1). Fue construido con piedras costosas y cedros del Líbano, revestido internamente con <span className="text-gold-500 font-medium italic">oro puro de Parvaim</span>. Salomón empleó a 150,000 obreros y su construcción tomó exactamente 7 años y 6 meses (1 Reyes 6).
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black" />
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-emerald-400">El Segundo Templo</h3>
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black uppercase text-emerald-400">515 a.C. - 70 d.C.</span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        Reconstruido por Zorobabel tras el edicto de Ciro el Grande. Más tarde, Herodes el Grande inició una expansión monumental que tomó <span className="text-white font-medium">46 años</span> (Juan 2:20). Este templo fue testigo de las profecías de Jesucristo sobre su propia destrucción y resurrección.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] border border-white/5 flex items-center justify-center p-12 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-[url('/images/temple_bg.png')] bg-cover bg-center opacity-40 brightness-110 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                    </section>

                    {/* Section 2: Arquitectura */}
                    <section className="space-y-16">
                        <div className="text-center space-y-4">
                            <Construction className="w-12 h-12 text-gold-500 mx-auto" />
                            <h2 className="text-5xl font-serif font-bold">Anatomía del Santuario</h2>
                            <p className="text-gray-400 uppercase tracking-widest text-[10px]">Medidas y Proporciones Divinas</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Pórtico (Ulam)',
                                    ref: '1 Reyes 6:3',
                                    desc: 'La entrada principal. Tenía 20 codos de largo y 10 de ancho. Estaba flanqueado por dos columnas colosales de bronce: Jaquín y Boaz.',
                                    color: 'blue'
                                },
                                {
                                    title: 'Lugar Santo (Hekhal)',
                                    ref: '1 Reyes 7:48-50',
                                    desc: 'Contenía los 10 candelabros de oro puro, la mesa de los panes de la proposición y el altar de incienso, todo de oro macizo.',
                                    color: 'emerald'
                                },
                                {
                                    title: 'Santo de los Santos',
                                    ref: '2 Crónicas 3:8',
                                    desc: 'Un cubo perfecto de 20 codos. Albergaba el Arca del Pacto bajo las alas de dos querubines gigantes de madera de olivo cubiertos de oro.',
                                    color: 'gold',
                                    image: '/images/ark.png'
                                }
                            ].map((part, i) => (
                                <div key={i} className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-gold-500/50 transition-all hover:-translate-y-2 relative overflow-hidden">
                                    {part.image && (
                                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                                            <img src={part.image} alt={part.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>
                                    )}
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-${part.color}-500/20 text-${part.color}-400`}>
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold mb-2">{part.title}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-black uppercase text-gold-500/60">{part.ref}</span>
                                        </div>
                                        <p className="text-gray-400 font-light leading-relaxed">{part.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Geografía */}
                    <section className="bg-gradient-to-r from-blue-900/40 via-blue-900/5 to-transparent border border-white/10 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/images/maps_bg.png')] bg-cover bg-left opacity-30 mix-blend-screen" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-blue-400">
                                    <Globe className="w-8 h-8" />
                                    <span className="text-sm uppercase tracking-[0.4em] font-black">Geografía Profética</span>
                                </div>
                                <h2 className="text-5xl font-serif font-bold">Monte Moriah</h2>
                                <p className="text-xl text-gray-400 leading-relaxed font-serif italic">
                                    "El lugar donde Abraham ofreció a Isaac y donde David compró la era de Ornán el jebuseo (1 Crónicas 21:18-26)."
                                </p>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    Este promontorio calizo no fue elegido al azar. Conecta el sacrificio de Abraham con el lugar donde se detuvo el ángel del Señor en tiempos de David. Es el epicentro donde <span className="text-white font-medium italic">el Sacrificio, la Redención y la Gloria de Dios</span> convergen en la historia.
                                </p>
                            </div>
                            <div className="aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-[url('/images/maps/jerusalem.png')] bg-cover bg-center opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                                <div className="absolute inset-0 border-[16px] border-black/20 rounded-full" />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Significado Espiritual */}
                    <section className="text-center space-y-12">
                        <div className="w-px h-32 bg-gradient-to-b from-white to-transparent mx-auto opacity-20" />
                        <div className="space-y-6">
                            <Scale className="w-12 h-12 text-gold-500 mx-auto" />
                            <h2 className="text-6xl font-serif font-bold tracking-tight">El Templo Verdadero</h2>
                            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
                                El Templo físico era una <span className="text-gold-500/80 italic">figura y sombra de las cosas celestiales</span> (Hebreos 8:5). Jesucristo es el Templo Verdadero: Aquel en quien habita corporalmente toda la plenitud de la Deidad.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-8">
                                <div className="p-6 border-l border-gold-500/30 bg-white/5 transition-all hover:bg-white/10">
                                    <h4 className="text-gold-500 font-black uppercase tracking-widest text-xs mb-2">Cristo como Templo</h4>
                                    <p className="text-gray-400 font-light text-sm italic leading-relaxed">
                                        "Destruid este templo, y en tres días lo levantaré." (Juan 2:19). Él es el lugar definitivo de encuentro entre Dios y el hombre.
                                    </p>
                                </div>
                                <div className="p-6 border-l border-blue-500/30 bg-white/5 transition-all hover:bg-white/10">
                                    <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-2">La Iglesia como Templo</h4>
                                    <p className="text-gray-400 font-light text-sm italic leading-relaxed">
                                        "¿No sabéis que sois templo de Dios...?" (1 Corintios 3:16). Ahora, Dios no habita en edificios de piedra, sino en corazones transformados.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-8">
                            <Link href="/read/Juan/2" className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl">
                                <BookOpen className="w-4 h-4" /> Estudiar Significado
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Footer Message */}
                <footer className="py-32 text-center border-t border-white/5 bg-black">
                    <div className="max-w-xl mx-auto space-y-6 px-6">
                        <Cross className="w-8 h-8 text-gold-500/50 mx-auto" />
                        <p className="text-xs uppercase tracking-[0.5em] text-gray-600 font-bold">
                            Soli Deo Gloria • MIVN
                        </p>
                    </div>
                </footer>
            </div>

            {/* Sticky Navigation for Sections (Museum Guide) */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 z-50">
                {[History, Construction, Globe, Scale].map((Icon, i) => (
                    <div key={i} className="group relative">
                        <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold-500 transition-colors" />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest pointer-events-none whitespace-nowrap">
                            Sección {i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
