import { UserPlus, Clock, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VisitantesPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            {/* Header / Nav */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-4">
                <Link href="/soporte" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-blue transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl md:text-2xl font-playfair font-bold text-slate-800 dark:text-white">Nuevos Visitantes</h1>
            </div>

            <main className="max-w-4xl mx-auto px-6 pb-24 space-y-16">
                <div className="bg-mivn-blue rounded-[3rem] p-10 md:p-16 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <UserPlus className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold">¡Bienvenido a Casa!</h2>
                        <p className="text-xl text-white/80 font-light italic leading-relaxed max-w-2xl">
                            "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos." - Mateo 18:20
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Horarios de Culto</h3>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-light">
                            <li className="flex justify-between border-b border-slate-50 dark:border-white/5 pb-2">
                                <span>Domingos (Culto Principal)</span>
                                <span className="font-bold text-mivn-blue">11:00 AM</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 dark:border-white/5 pb-2">
                                <span>Martes (Círculo de Oración)</span>
                                <span className="font-bold text-mivn-blue">7:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 dark:border-white/5 pb-2">
                                <span>Miércoles (Servicio Semanal)</span>
                                <span className="font-bold text-mivn-blue">7:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 dark:border-white/5 pb-2">
                                <span>Jueves (Estudio Bíblico)</span>
                                <span className="font-bold text-mivn-blue">7:30 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 dark:border-white/5 pb-2">
                                <span>Viernes (Noche de Jóvenes)</span>
                                <span className="font-bold text-mivn-blue">8:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sábados (Vida Nueva Kids)</span>
                                <span className="font-bold text-mivn-gold">10:00 AM</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="w-16 h-16 bg-mivn-gold/10 text-mivn-gold rounded-2xl flex items-center justify-center">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Ubicación</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            100 Hurricane shoals Rd NW Suite F, <br />
                            Lawrenceville, GA 30043.
                        </p>
                        <p className="text-sm font-bold text-mivn-blue">+1 (770) 524-8414</p>
                        <button className="w-full py-4 bg-slate-50 dark:bg-white/5 rounded-2xl font-bold text-mivn-blue hover:bg-mivn-blue hover:text-white transition-all">
                            Ver en Google Maps
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-playfair font-bold text-slate-800 dark:text-white text-center">¿Qué esperar en tu primera visita?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-mivn-blue text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">1</div>
                            <h4 className="font-bold dark:text-white">Bienvenida</h4>
                            <p className="text-sm text-slate-500 font-light">Nuestro equipo de hospitalidad te guiará desde la entrada.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-mivn-blue text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">2</div>
                            <h4 className="font-bold dark:text-white">Adoración</h4>
                            <p className="text-sm text-slate-500 font-light">Un tiempo de alabanza y cánticos contemporáneos.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-mivn-blue text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">3</div>
                            <h4 className="font-bold dark:text-white">Mensaje</h4>
                            <p className="text-sm text-slate-500 font-light">Una palabra inspiradora basada directamente en las escrituras.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
