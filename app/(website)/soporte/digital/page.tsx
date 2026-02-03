import { Smartphone, MonitorPlay, Wifi, HelpCircle, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function DigitalPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-4 text-mivn-gold">
                <Link href="/soporte" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-gold transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl md:text-2xl font-playfair font-bold">Plataforma Digital</h1>
            </div>

            <main className="max-w-5xl mx-auto px-6 pb-24 space-y-20">
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white space-y-10 shadow-2xl relative overflow-hidden group border border-white/5">
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-mivn-blue/20 rounded-full blur-[100px]" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-playfair font-bold leading-tight">Tu Iglesia en todas partes</h2>
                            <p className="text-lg text-white/70 font-light italic leading-relaxed">
                                Nuestra App y plataforma web están diseñadas para acompañarte en tu crecimiento diario, sin importar dónde estés.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/profile.php?id=61586324631409" target="_blank" className="bg-white/10 text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Facebook</a>
                                <a href="https://www.instagram.com/mivn2604" target="_blank" className="bg-white/10 text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Instagram</a>
                                <a href="https://www.youtube.com/@mivn2604" target="_blank" className="bg-white/10 text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">YouTube</a>
                            </div>
                        </div>
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="w-48 h-96 bg-slate-800 rounded-[3rem] border-[8px] border-slate-700 shadow-2xl relative overflow-hidden animate-bounce-slow">
                                <div className="absolute inset-0 bg-mivn-blue/20 flex items-center justify-center">
                                    <Smartphone className="w-20 h-20 text-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6 text-center">
                        <div className="w-16 h-16 bg-mivn-blue/10 text-mivn-blue rounded-2xl flex items-center justify-center mx-auto">
                            <MonitorPlay className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Transmisiones</h3>
                        <p className="text-sm text-slate-500 font-light italic">Problemas con el audio o video en vivo? Revisa tu conexión y refresca el sitio.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6 text-center">
                        <div className="w-16 h-16 bg-mivn-gold/10 text-mivn-gold rounded-2xl flex items-center justify-center mx-auto">
                            <Wifi className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Conectividad</h3>
                        <p className="text-sm text-slate-500 font-light italic">Recomendamos una conexión de al menos 5Mbps para disfrutar de los servicios en Full HD.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6 text-center">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Reportar Fallo</h3>
                        <p className="text-sm text-slate-500 font-light italic">Si algo no funciona como debería, nuestro equipo técnico está a un mensaje de distancia.</p>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto bg-slate-50 dark:bg-white/5 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 space-y-8">
                    <h3 className="text-2xl font-playfair font-bold text-center dark:text-white text-slate-800">Soporte Técnico Directo</h3>
                    <div className="space-y-4">
                        <input type="text" placeholder="Asunto del reporte" className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl p-5 text-sm italic font-light focus:ring-2 focus:ring-mivn-blue shadow-sm" />
                        <textarea placeholder="Describe el inconveniente..." rows={4} className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl p-5 text-sm italic font-light focus:ring-2 focus:ring-mivn-blue shadow-sm"></textarea>
                        <button className="w-full bg-mivn-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl">
                            Enviar Reporte <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
