import { HeartHandshake, Smartphone, Receipt, ShieldCheck, ArrowLeft, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";

export default function OfrendasPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-4 text-mivn-gold">
                <Link href="/soporte" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-gold transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl md:text-2xl font-playfair font-bold">Diezmos y Ofrendas</h1>
            </div>

            <main className="max-w-4xl mx-auto px-6 pb-24 space-y-16">
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a] border border-mivn-gold/20 rounded-[3rem] p-10 md:p-16 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <HeartHandshake className="w-64 h-64 text-mivn-gold" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-premium-gold">Honramos a Dios</h2>
                        <p className="text-xl text-white/80 font-light italic leading-relaxed max-w-2xl">
                            "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." - 2 Corintios 9:7
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-mivn-gold/10 text-mivn-gold rounded-2xl flex items-center justify-center">
                            <QrCode className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Zelle</h3>

                        <div className="relative group/qr">
                            <div className="absolute -inset-4 bg-mivn-gold/20 rounded-[2rem] blur-xl opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                            <img
                                src="/zelle-qr.jpg"
                                alt="Código QR de Zelle"
                                className="relative w-48 h-48 object-contain rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg"
                            />
                        </div>

                        <div className="space-y-2 w-full">
                            <p className="text-xs text-slate-400 font-light italic">
                                Escanee el código o use el correo:
                            </p>
                            <p className="font-bold text-mivn-blue text-lg">Mivn202604@gmail.com</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="w-16 h-16 bg-mivn-blue/10 text-mivn-blue rounded-2xl flex items-center justify-center">
                            <Receipt className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Recibos Fiscales</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            Para solicitar su recibo deducible de impuestos, envíe una foto del comprobante junto con sus datos fiscales:
                        </p>
                        <a href="mailto:Mivn202604@gmail.com" className="flex items-center gap-3 text-mivn-blue font-bold hover:underline">
                            Mivn202604@gmail.com <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-bold dark:text-white">Seguridad y Transparencia</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-light text-sm italic">
                            Toda transacción está protegida por protocolos de seguridad de grado bancario. Sus datos se mantienen estrictamente confidenciales.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
