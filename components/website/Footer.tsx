"use client";

import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ChevronRight, Church } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full font-lexend">
            {/* Top Section: Multi-column layout on Celeste Blue background */}
            <div className="bg-mivn-blue dark:bg-mivn-blue/90 text-white px-6 md:px-20 lg:px-40 py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

                    {/* Column 1: Brand Identity & Mission */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden p-1">
                                <Image src="/logo_mivn.png" alt="MIVN" width={48} height={48} className="object-contain" />
                            </div>
                            <h2 className="text-3xl font-black leading-none tracking-tighter italic">MIVN</h2>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-light">
                            Transformando vidas a través del amor de Cristo. Somos una comunidad dedicada a la fe, la esperanza y el servicio al prójimo.
                        </p>
                        {/* Social Media Icons in Gold */}
                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" },
                                { icon: MessageCircle, href: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-mivn-gold hover:text-white border border-mivn-gold/30 transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5 text-mivn-gold group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Enlaces Rápidos</h3>
                        <ul className="flex flex-col gap-4 text-sm">
                            {[
                                { name: "Inicio", href: "/" },
                                { name: "Devocionales", href: "/devocionales" },
                                { name: "Ministerios", href: "/ministerios" },
                                { name: "Donaciones", href: "/donaciones" },
                                { name: "Sobre Nosotros", href: "/sobre-nosotros" },
                                { name: "Política de Cookies", href: "/politica-de-cookies" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-mivn-gold transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="w-4 h-4 text-mivn-gold/50 group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Contacto</h3>
                        <div className="flex flex-col gap-6 text-sm">
                            <div className="flex gap-4 items-start group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <MapPin className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a className="hover:text-mivn-gold transition-colors leading-relaxed" href="#">
                                    Calle Principal #123, <br />Ciudad de Fe, CP 54321
                                </a>
                            </div>
                            <div className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Phone className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a className="hover:text-mivn-gold transition-colors font-bold" href="tel:+1234567890">+1 234 567 890</a>
                            </div>
                            <div className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Mail className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a className="hover:text-mivn-gold transition-colors font-bold" href="mailto:contacto@mivn.org">contacto@mivn.org</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Service Times */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Horarios de Culto</h3>
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-l-4 border-mivn-gold border border-white/5 space-y-6">
                            <div className="space-y-2">
                                <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Domingos</p>
                                <p className="text-sm font-bold">Servicio Principal: 10:00 AM</p>
                                <p className="text-sm text-white/70">Estudio Bíblico: 06:00 PM</p>
                            </div>
                            <div className="h-[1px] bg-white/10 w-full"></div>
                            <div className="space-y-2">
                                <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Miércoles</p>
                                <p className="text-sm font-bold">Noche de Oración: 07:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Strip: Darker blue background */}
            <div className="bg-[#0a1218] text-white py-12 px-6 md:px-20 lg:px-40 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">

                    {/* Copyright & Legal */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                                <Church className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-black tracking-widest uppercase">MIVN</h2>
                        </div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                            © {currentYear} Ministerio Internacional Vida Nueva. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/60 justify-center lg:justify-start">
                            <Link href="/terminos" className="hover:text-mivn-gold transition-colors underline decoration-mivn-gold/20 underline-offset-4">Términos y Condiciones</Link>
                            <Link href="/privacidad" className="hover:text-mivn-gold transition-colors underline decoration-mivn-gold/20 underline-offset-4">Política de Privacidad</Link>
                        </div>
                    </div>

                    {/* Google Maps Preview Snippet */}
                    <div className="order-1 lg:order-2">
                        <div className="relative p-1.5 bg-mivn-gold/20 rounded-3xl shadow-3xl hover:bg-mivn-gold/40 transition-all duration-700">
                            <div className="w-72 h-40 rounded-2xl overflow-hidden relative border-2 border-[#0a1218]/50">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATUEoqtLcpMM9u483YtXB920bKVo1AH8RUdLvR9pZVfdVO4MKT6HAnv1RPeKNx5NqIqDGVfcYefWeUE-FActqw4r68uvzTNb9-exA3FR_-aNB3dOimM6FTGN7OlIdYM_9i1PELHVyTyhOF3YOV5_D-yn8wZ8l1NYy4Yq3FmGm7ybipxqJf7zq2kcLT5womJT6oTn1-ESmPhbD5eBytz29KNy6QZkLeLsa5HEXI2xWOVQ7kXKC3wXoi1sFPnvFRp-gfM5XawMiy3IQ"
                                    alt="Ubicación MIVN"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/10 transition-all cursor-pointer group">
                                    <span className="bg-mivn-gold text-[#0a1218] px-6 py-2 rounded-full text-[10px] font-black shadow-2xl group-hover:scale-110 transition-transform tracking-widest uppercase">
                                        VER EN MAPA
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
