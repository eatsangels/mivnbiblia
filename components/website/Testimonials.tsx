"use client";

import { Star, Play, ArrowRight, Quote, Heart, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Testimonial } from "@/lib/queries/testimonials";

interface TestimonialsProps {
    initialTestimonials: Testimonial[];
}

export const Testimonials = ({ initialTestimonials }: TestimonialsProps) => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [stories, setStories] = useState<Testimonial[]>(initialTestimonials);

    const categories = ["Todos", ...Array.from(new Set(initialTestimonials.map(s => s.category).filter(Boolean)))];

    const filteredStories = activeCategory === "Todos"
        ? stories
        : stories.filter(s => s.category === activeCategory);

    return (
        <section className="bg-background-light dark:bg-background-dark min-h-screen py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Heading */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="max-w-2xl space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Testimonios MIVN</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">
                            Historias de <span className="text-mivn-gold">Fe</span> y <br /> <span className="text-mivn-blue italic">Victoria</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed border-l-2 border-mivn-blue/30 pl-8">
                            Sé testigo de cómo Dios está transformando vidas en nuestra comunidad. Cada historia es un monumento a Su fidelidad.
                        </p>
                    </div>
                    <button className="bg-mivn-gold text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">
                        Comparte tu Testimonio
                    </button>
                </div>

                {/* Category Filter */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-sm
                                ${activeCategory === cat
                                    ? "bg-mivn-blue text-white shadow-mivn-blue/20"
                                    : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-mivn-blue/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredStories.map((story, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-[3rem] p-10 transition-all duration-700 shadow-2xl border flex flex-col justify-between
                                ${story.type === 'accent'
                                    ? "bg-mivn-blue text-white border-transparent"
                                    : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 hover:border-mivn-blue/20"
                                }`}
                        >
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl">
                                        <Image src={story.avatar_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200'} alt={story.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className={`text-xl font-bold ${story.type === 'accent' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{story.name}</h4>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${story.type === 'accent' ? 'text-white/70' : 'text-mivn-gold'}`}>
                                            {story.category}
                                        </span>
                                    </div>
                                </div>

                                {story.type === 'video' ? (
                                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group/video">
                                        <Image src={story.avatar_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200'} alt="Thumbnail" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/60 transition-all flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-mivn-blue shadow-2xl scale-125 group-hover/video:scale-[1.35] transition-transform">
                                                <Play className="w-8 h-8 fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <Quote className={`absolute -top-6 -left-6 w-12 h-12 opacity-5 ${story.type === 'accent' ? 'text-white' : 'text-mivn-blue'}`} />
                                        <p className={`text-lg italic font-light leading-relaxed leading-relaxed ${story.type === 'accent' ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                                            "{story.text}"
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button className={`mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all
                                ${story.type === 'accent' ? 'text-white group-hover:gap-5' : 'text-mivn-blue group-hover:text-mivn-gold group-hover:gap-5'}`}>
                                {story.type === 'video' ? 'Ver Video' : 'Leer más'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center pt-10">
                    <button className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-mivn-blue hover:text-white transition-all shadow-xl group">
                        Cargar más historias
                        <ArrowRight className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
};
