"use client";

import { Star, Play, ArrowRight, Quote, Heart, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Testimonials = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = ["Todos", "Sanidad", "Familia", "Provisión", "Restauración", "Paz Interior"];

    const stories = [
        {
            name: "María González",
            category: "Sanidad",
            text: "Después de meses de oración, vimos el milagro de sanidad que tanto esperábamos. Los médicos no encontraban explicación, pero nosotros sabíamos que la mano de Dios estaba sobre nuestra hija...",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ2ykgpVOMXEnxaxZCyYixloKWjlqo0Z78Fsb1QFQxJ_3xtoO89v1pIdpynWG2yqdSXA6zt_rac88nPi_wLlPdAhJbA7Sk9dzOhDuLFI5tN6kVFRcVMWwWUMDhQSrEe379MZUKvegg3q4ilL6qSGCQAFkfTkHSUaFnWczTI_wWAuP1kX55Wj08g0FcqdKomGzgiKHbAv0p-dTD7T5SV5o5b8RVIDPAtFwIYX_fPEcoaWoXbDdM0EUjc1OaNp6y0Zg7pNvzCH7Wn4",
            type: "text"
        },
        {
            name: "Juan Rivera",
            category: "Restauración",
            text: "Encontré paz y un nuevo propósito en medio de la tormenta...",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBcIJ2_EjXwO88ghPf-5AxFv7HIiPLtmkxsuh7WfNmtNIt_-s5LTYY8MYCpzvTZh32b6UgQuBdYifxg1bysqEf0rBldTb_CpxhjJIXR0t3f4rIHOcquuJx4VvfncCwB37caNvISRgceYAlLFtBvVBZNEoG5nhgWkKkkyyk9S8DjoAUnz8X-DyODjBs8iFpg4P6DfxA9RGuZpBexpQehTdP1IaQxADyAdcS8JBfUAWFd_N_ejUj7ystKhc6HsayzgRzwwziU0Fr3E0",
            type: "video"
        },
        {
            name: "Familia Sánchez",
            category: "Restauración",
            text: "Dios restauró nuestro hogar de una manera sobrenatural. Estábamos a punto de rendirnos, pero el ministerio Vida Nueva nos brindó las herramientas espirituales para luchar por nuestro matrimonio.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVzuqVjg15o1qPjgQhapYXq1VQoSyKJZBMEpd7RtS4ZaqfPd__djFm4cu4OPAlXxcl2IvQRhPKFgH7nMeRXsJp3n63LwN6Ee1tFuqbpKu9FfV9NHk_51VyDshGpYHd0bSP4lXjM1wHvOHqfGLN6mydIkujrSyD0TJjxz6iwPs9QC55cswVG2qNRisqjgtPvNvBRqHqOl_hY_H6RPV4UcoUAk0R-JpWs4-BkOnD9bug9l_62LE5z_CJSngttUEZ2GAKJNfLZVI80co",
            type: "text"
        },
        {
            name: "Elena Martínez",
            category: "Provisión",
            text: "Una historia de provisión divina en el momento justo. Me quedé sin empleo y las deudas se acumulaban, pero en la congregación aprendí a sembrar con fe...",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6g_fS_s3L5rriNID-rdk5aQ-hK2tuc9nXeM36berZlZq1nsTFPasypjCFH3S5qItlqfrNebsbxsHArJAC3TOKatZ5BLY4BR3gd6M72MdvBZqAG_ybmiBYnd5mJaTfFZeMMIafi-mN31G2YwlOhfkSajrpbt-sB0AH4uQR_20xNtbDcu4ow-aX1WAJPe9hNyEP2Hp3Mtghv8466U61zu_ZBtaxczXFbmZn8Jxi3sVXsDO961aAjXOOrnp5yld4wqVrlaBAZreGs0",
            type: "accent"
        },
        {
            name: "Ricardo D.",
            category: "Fe",
            text: "Video: Mi encuentro personal con la fe en un momento de oscuridad total.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXM7NYP0ME8gnFH_2_-CN_Ox-7yOSgMArPDFieJbUZ3rpCQZpYM3_SZPhVwMrug6_EvS4taed11CAEh64K0IHVYoqxgPmmUxY9zt_yQPliKX_SMvzIj6J2e4QoU-0chnqgyyvGxvQYo99dyukhWHvl1ZtLYKf_YVSmlWK66WIr04n6zUscE-Ht2dk32KjN0c72aqSAUYzhwOsAxv-MeMlT_Mj8ovYQlsm0UXYpeX9_bY-Va4FToiRMgRA8ErXe9MBFsOnobUVuXSM",
            type: "video"
        },
        {
            name: "Lucía Torres",
            category: "Paz Interior",
            text: "El poder de la oración transformó mi salud mental. Pasé años lidiando con ansiedad severa hasta que decidí entregarle mis cargas al Señor...",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7-OMDgiOWIfECdG4faAePYe4qulsI_-avvfJ_eghED5-VextWSNZEIuiA_J3MwITKzIqq-FOle2u3FHTSyWGhYNA7i50-Mp894xFDV2_OP2lVk9R40PSTi6GRBtHz6IRzjdAXdPN5ScAg3384Jpyz_pCpBABUWcm9b7oKLmXgd93UcaVFGqEhEl9YVPo2587cneZteFLzZIzWHNQ6ZmtZH0Lcu0nXb74_a9j86SL5mjZUZ06lm396N9IA0VYN2T9-hlRp0ucVAgo",
            type: "text"
        }
    ];

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
                                        <Image src={story.image} alt={story.name} fill className="object-cover" />
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
                                        <Image src={story.image} alt="Thumbnail" fill className="object-cover" />
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
