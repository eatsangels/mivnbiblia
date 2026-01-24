"use client";

import { Heart, Star, Users, HandHelping, History, Sparkles, Sprout, ArrowRight, ShieldCheck, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AboutUs = () => {
    const values = [
        { icon: Heart, label: "Amor", desc: "Reflejamos el amor incondicional de Cristo en cada acción y relación.", color: "text-rose-500", bg: "bg-rose-500/10" },
        { icon: Star, label: "Excelencia", desc: "Damos lo mejor para el Reino, buscando la gloria de Dios en todo.", color: "text-mivn-blue", bg: "bg-mivn-blue/10" },
        { icon: Users, label: "Comunidad", desc: "Creemos en el poder de la unidad y el crecimiento en familia.", color: "text-mivn-gold", bg: "bg-mivn-gold/10" },
        { icon: HandHelping, label: "Servicio", desc: "Existimos para servir y restaurar vidas a través del evangelio.", color: "text-emerald-500", bg: "bg-emerald-500/10" }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mivn-blue to-[#1e2d4d] z-0" />
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                    <Image
                        src="https://images.unsplash.com/photo-1544427928-c49cddee64bb?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Misterio Internacional Vida Nueva</span>
                    <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                        ¿Quiénes <span className="italic text-mivn-gold">somos</span>?
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-3xl mx-auto leading-relaxed border-l-2 border-white/20 pl-8 md:pl-0 md:border-none">
                        "Transformando vidas y restaurando familias a través del amor de Jesucristo desde hace más de 25 años."
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-mivn-gold/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-mivn-blue/20 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Our History */}
            <section className="max-w-7xl mx-auto py-32 px-6 grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                    <div className="absolute -inset-4 bg-slate-100 dark:bg-slate-800 rounded-[3.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd1kW2kz77HZ2Hya_Bljy3uFmP_BN4PDzWQVIilvHafJW_TbSTvkq1f38dSNwjf6VcrtqOK_eEBn3lE5HS4UZpZSGwed-HboC_GxPrbT6CJv7HTOZzgsZ_mt4puuUR7KYeatiU30gC8uSXDFILRlU-A8SVlk_sNk9WLWNj2wsKjo6s3pNGSqdWf8MKt6PPKO9ICgMVZI9k8o-NaOWvt_pVP5C3ZgT7AbyIwSGjy74yWfJEp59ZicmYFWHxgmLVQFdIkc4IC1vJXf8"
                            alt="Historia MIVN"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mivn-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-mivn-blue font-black uppercase tracking-widest text-xs">
                            <History className="w-5 h-5 text-mivn-gold" /> Desde 1998
                        </div>
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">Un Legado Impulsado <br /> por la <span className="text-mivn-blue italic tracking-tighter">Fe</span></h2>
                        <div className="w-24 h-1.5 bg-mivn-gold rounded-full" />
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed italic space-y-8">
                        <p>
                            Ministerio Internacional Vida Nueva nació de un llamado profundo al servicio y la evangelización en el corazón de nuestra ciudad. Nuestros pastores fundadores iniciaron este camino con una pequeña reunión en casa, movidos por la convicción de crear un refugio espiritual para la comunidad.
                        </p>
                        <p>
                            A lo largo de los años, hemos visto cómo la mano de Dios ha guiado cada paso, transformando un sueño humilde en una familia vibrante que hoy impacta a miles de personas a través de programas sociales, educación bíblica y una adoración genuina.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-slate-50 dark:bg-slate-900/30 py-32 px-6 border-y border-slate-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Mission */}
                    <div className="group bg-white dark:bg-slate-900 shadow-2xl p-16 rounded-[4rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                            <Sparkles className="w-32 h-32 text-mivn-gold" />
                        </div>
                        <div className="w-20 h-20 bg-mivn-gold/10 text-mivn-gold rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white mb-8">Nuestra Misión</h3>
                        <p className="text-xl text-slate-500 dark:text-slate-400 italic font-light leading-relaxed border-l-4 border-mivn-gold/30 pl-8">
                            "Alcanzar a las naciones con el evangelio restaurador de Jesucristo, discipulando a cada creyente para que viva una vida plena, con propósito y servicio."
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="group bg-mivn-blue text-white shadow-2xl p-16 rounded-[4rem] relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:-rotate-12 transition-transform">
                            <Star className="w-32 h-32" />
                        </div>
                        <div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                            <Star className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-playfair font-bold mb-8">Nuestra Visión</h3>
                        <p className="text-xl text-white/80 italic font-light leading-relaxed border-l-4 border-white/20 pl-8">
                            "Ser un faro de esperanza y transformación espiritual, reconocida por la integridad de nuestra comunidad y el impacto tangible del amor de Dios en la sociedad."
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto py-32 px-6 space-y-24">
                <div className="text-center space-y-6">
                    <span className="text-mivn-blue font-black uppercase tracking-[0.4em] text-xs">Cimientos de nuestra fe</span>
                    <h2 className="text-4xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">Nuestros Valores <br /> Fundamentales</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {values.map((v, i) => (
                        <div key={i} className="group text-center space-y-8 p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] shadow-xl hover:shadow-2xl hover:border-mivn-blue/20 transition-all duration-500">
                            <div className={`w-24 h-24 ${v.bg} rounded-[2rem] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                                <v.icon className={`w-12 h-12 ${v.color}`} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{v.label}</h3>
                                <p className="text-base text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">"{v.desc}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Join Us */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="bg-gradient-to-br from-mivn-blue to-[#1e2d4d] rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden group">
                    <div className="absolute inset-0 z-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>

                    <div className="space-y-6 relative z-10 transition-all">
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight">¿Listo para ser parte de <br /> <span className="text-mivn-gold italic">algo más grande</span>?</h2>
                        <p className="text-xl text-white/70 font-light italic max-w-2xl mx-auto">
                            No importa dónde estés en tu camino, hay un lugar para ti en nuestra familia. Ven tal como eres.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <Link href="/contacto" className="bg-mivn-gold text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group">
                            Visítanos <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link href="/register" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center justify-center group">
                            Unirse a la Comunidad
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 pt-12 relative z-10 border-t border-white/10 opacity-60">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-mivn-gold" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-relaxed">Seguridad y Confianza</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Landmark className="w-5 h-5 text-mivn-gold" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-relaxed">Entidad Ministerial Oficial</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
