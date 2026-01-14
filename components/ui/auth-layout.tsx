'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- TYPE DEFINITIONS ---

export interface Testimonial {
    avatarSrc: string;
    name: string;
    handle: string;
    text: string;
}

interface AuthLayoutProps {
    children: React.ReactNode;
    mode: 'login' | 'register';
    title?: React.ReactNode;
    description?: React.ReactNode;
    heroImageSrc?: string;
    testimonials?: Testimonial[];
    onGoogleSignIn?: () => void;
    footerContent?: React.ReactNode;
}

// --- SUB-COMPONENTS ---

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
    <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 w-64 shadow-2xl`}>
        <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-xl" alt="avatar" />
        <div className="text-xs leading-normal">
            <p className="flex items-center gap-1 font-bold text-white">{testimonial.name}</p>
            <p className="text-gray-500 font-medium">{testimonial.handle}</p>
            <p className="mt-1 text-gray-300 line-clamp-2">{testimonial.text}</p>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    mode,
    title,
    description,
    heroImageSrc = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2670&auto=format&fit=crop", // Bible-themed default
    testimonials: initialTestimonials = [],
    onGoogleSignIn,
    footerContent,
}) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

    useEffect(() => {
        // Only fetch if no testimonials were provided
        if (initialTestimonials.length === 0) {
            const fetchTestimonials = async () => {
                const supabase = createBrowserClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // Fetch more than 3 to allow for randomness
                const { data } = await supabase
                    .from('testimonials')
                    .select('name, handle, text, avatar_url')
                    .eq('is_active', true)
                    .limit(10);

                if (data && data.length > 0) {
                    // Shuffle array using Fisher-Yates algorithm
                    const shuffled = [...data];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }

                    // Take the first 3
                    setTestimonials(shuffled.slice(0, 3).map(t => ({
                        name: t.name,
                        handle: t.handle,
                        text: t.text,
                        avatarSrc: t.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg"
                    })));
                }
            };
            fetchTestimonials();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] overflow-x-hidden w-full font-sans">
            {/* Left column: form */}
            <section className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                {title || (mode === 'login' ? 'Bienvenido a MIVN' : 'Únete a MIVN')}
                            </h1>
                            <p className="animate-element animate-delay-200 text-gray-400 text-sm md:text-base">
                                {description || (mode === 'login' ? 'Accede a tu cuenta y continúa tu viaje espiritual.' : 'Comienza tu estudio bíblico profundo hoy mismo.')}
                            </p>
                        </div>

                        {children}

                        <div className="animate-element animate-delay-700 relative flex items-center justify-center py-2">
                            <span className="w-full border-t border-white/10"></span>
                            <span className="px-4 text-[10px] text-gray-500 uppercase tracking-widest bg-[#0a0a0a] absolute">O continúa con</span>
                        </div>

                        <button
                            onClick={onGoogleSignIn}
                            className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-white/10 rounded-xl py-3.5 hover:bg-white/5 transition-all text-white text-sm font-medium active:scale-[0.98]"
                        >
                            <GoogleIcon />
                            Continuar con Google
                        </button>

                        {footerContent}
                    </div>
                </div>
            </section>

            {/* Right column: hero image + testimonials */}
            <section className="hidden md:block flex-1 relative p-4 bg-[#050505]">
                <div
                    className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${heroImageSrc})` }}
                >
                    {/* Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {testimonials.length > 0 && (
                        <div className="absolute bottom-12 left-0 right-0 flex flex-wrap gap-4 px-8 justify-center items-end">
                            {testimonials.map((t, i) => (
                                <TestimonialCard
                                    key={i}
                                    testimonial={t}
                                    delay={i === 0 ? "animate-delay-1000" : i === 1 ? "animate-delay-1200" : "animate-delay-1400"}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
