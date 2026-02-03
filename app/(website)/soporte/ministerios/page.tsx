import { Users, Baby, Music, Rocket, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MinisteriosPage() {
    const ministerios = [
        {
            title: "Vida Nueva Kids",
            desc: "Sábados 10:00 AM. Ministerio infantil dedicado a enseñar la palabra de Dios de forma dinámica.",
            icon: Baby,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Ministerio de Jóvenes",
            desc: "Viernes 8:00 PM. Un espacio para que los jóvenes crezcan en su fe y desarrollen sus talentos.",
            icon: Rocket,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10"
        },
        {
            title: "Alabanza y Adoración",
            desc: "Guiando a la congregación en adoración a través de la música y el canto cada servicio.",
            icon: Music,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10"
        },
        {
            title: "Círculo de Oración",
            desc: "Martes 7:00 PM. Tiempo de intercesión y comunión profunda con el Señor.",
            icon: Users,
            color: "text-rose-500",
            bg: "bg-rose-500/10"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-4 text-mivn-blue">
                <Link href="/soporte" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-blue transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl md:text-2xl font-playfair font-bold">Ministerios y Comunidad</h1>
            </div>

            <main className="max-w-6xl mx-auto px-6 pb-24 space-y-20">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-800 dark:text-white">Hay un lugar para ti</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic">
                        La iglesia no es un lugar al que se asiste, es una familia de la cual formamos parte. Descubre dónde puedes conectar y servir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ministerios.map((m, i) => (
                        <div key={i} className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex gap-8 items-start">
                            <div className={`w-16 h-16 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                                <m.icon className="w-8 h-8" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold dark:text-white">{m.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed italic">{m.desc}</p>
                                <button className="text-mivn-blue font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-4 transition-all">
                                    Quiero Unirme <Rocket className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-mivn-blue rounded-[4rem] p-12 md:p-20 text-center space-y-10 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-mivn-blue to-[#1e2d4d] z-0" />
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-3xl md:text-5xl font-playfair font-bold">¿Tienes dudas sobre los Grupos?</h3>
                        <p className="text-xl text-white/70 font-light italic max-w-2xl mx-auto">
                            Nuestro equipo de comunidad está listo para ayudarte a encontrar el grupo que mejor se adapte a tu ubicación y horario.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <button className="bg-white text-mivn-blue px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4 mx-auto">
                            <MessageCircle className="w-5 h-5" /> Chat de Comunidad
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
