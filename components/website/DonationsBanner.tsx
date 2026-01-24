"use client";

import { Heart, Lock, Receipt, Repeat, CreditCard, Wallet, Sparkles, Download, Star, HandHeart, History, CheckCircle2, User, Landmark, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const DonationsBanner = () => {
    const [selectedAmount, setSelectedAmount] = useState("$50");
    const [customAmount, setCustomAmount] = useState("");
    const [frequency, setFrequency] = useState("Única vez");

    const amounts = ["$25", "$50", "$100", "$250", "$500", "Otro"];
    const frequencies = ["Única vez", "Semanal", "Mensual"];

    return (
        <section className="bg-background-light dark:bg-background-dark py-24 px-4 font-lexend">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <header className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-mivn-blue dark:text-white">Portal de Donaciones & Diezmos</h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 italic font-light">
                        "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." <br />
                        <span className="text-mivn-gold font-black uppercase tracking-widest text-xs not-italic">— 2 Corintios 9:7</span>
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Donation Form */}
                    <section className="lg:col-span-7 bg-white dark:bg-slate-900/50 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-10 md:p-14 space-y-12">

                        <div className="space-y-10">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                <div className="p-3 bg-mivn-gold/10 text-mivn-gold rounded-2xl">
                                    <Heart className="w-6 h-6 fill-current" />
                                </div>
                                Detalles de tu Aporte
                            </h2>

                            {/* Amount Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amounts.map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setSelectedAmount(amt)}
                                        className={`py-6 rounded-2xl border-2 font-black text-sm transition-all
                                            ${selectedAmount === amt
                                                ? "bg-mivn-gold border-mivn-gold text-white shadow-xl scale-105"
                                                : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-mivn-gold/30"
                                            }`}
                                    >
                                        {amt}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount */}
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300 group-focus-within:text-mivn-blue">$</span>
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setSelectedAmount("Otro");
                                    }}
                                    className="w-full pl-12 pr-6 py-6 bg-slate-50 dark:bg-white/5 border-none rounded-[2rem] focus:ring-4 focus:ring-mivn-blue/10 text-2xl font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                                    placeholder="Monto personalizado"
                                />
                            </div>

                            {/* Frequency Selector */}
                            <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <Repeat className="w-4 h-4" /> Tipo de Contribución
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {frequencies.map((freq) => (
                                        <button
                                            key={freq}
                                            onClick={() => setFrequency(freq)}
                                            className={`px-8 py-3 rounded-xl border-2 font-bold text-sm transition-all
                                                ${frequency === freq
                                                    ? "bg-white dark:bg-slate-800 border-mivn-gold text-mivn-gold shadow-lg"
                                                    : "bg-white/50 dark:bg-slate-800/50 border-transparent text-slate-500 hover:text-mivn-blue"
                                                }`}
                                        >
                                            {freq}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Método de Pago</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-4 p-6 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-mivn-blue transition-all group">
                                        <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-mivn-blue" />
                                        <span className="font-bold text-sm text-slate-700 dark:text-white uppercase tracking-widest">Tarjeta</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-4 p-6 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-blue-500 transition-all group">
                                        <Wallet className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                                        <span className="font-bold text-sm text-slate-700 dark:text-white uppercase tracking-widest">PayPal</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <button className="w-full bg-mivn-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-5 group">
                                Realizar Donación <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </button>
                            <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Transacción Segura Encriptada SSL
                            </div>
                        </div>
                    </section>

                    {/* Right Column: User Info & History */}
                    <aside className="lg:col-span-5 space-y-10">

                        {/* Member Stats Card */}
                        <div className="bg-gradient-to-br from-mivn-blue to-[#1e2d4d] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                                <User className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <div className="flex items-center gap-5">
                                    <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl overflow-hidden p-1">
                                        <Image src="/logo_mivn.png" alt="MIVN" width={48} height={48} className="object-contain brightness-0 invert" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">¡Bendiciones, Miembro!</h3>
                                        <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Mayordomo Fiel</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Total Aportado 2024</p>
                                        <p className="text-3xl font-black">$1,450.00</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Próximo</p>
                                        <p className="text-3xl font-black">Diezmo</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-mivn-gold/20 rounded-full blur-3xl opacity-50" />
                        </div>

                        {/* Recent History */}
                        <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 shadow-xl space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Historial Reciente</h3>
                                <button className="text-[10px] font-black text-mivn-blue hover:text-mivn-gold uppercase tracking-widest underline decoration-mivn-blue/20">Ver Todo</button>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: Receipt, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Ofrenda General", date: "12 Oct, 2024", amt: "$50.00" },
                                    { icon: Star, color: "text-mivn-blue", bg: "bg-mivn-blue/10", label: "Diezmo Mensual", date: "01 Oct, 2024", amt: "$200.00" },
                                    { icon: HandHeart, color: "text-mivn-gold", bg: "bg-mivn-gold/10", label: "Misiones MIVN", date: "15 Sep, 2024", amt: "$100.00" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-5 group cursor-default">
                                        <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`w-6 h-6 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800 dark:text-white">{item.label}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.date}</p>
                                        </div>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">{item.amt}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center gap-4 hover:border-mivn-blue hover:text-mivn-blue transition-all text-slate-400 font-bold text-xs uppercase tracking-widest group">
                                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                                Descargar Recibo Fiscal (PDF)
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                                <Lock className="w-5 h-5 text-mivn-gold" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Seguridad Grado Bancario</span>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                                <Landmark className="w-5 h-5 text-mivn-gold" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Entidad sin Fines de Lucro</span>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </section>
    );
};
