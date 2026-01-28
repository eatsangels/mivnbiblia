"use client";

import {
    Heart, Lock, Receipt, Repeat, CreditCard, Wallet, Sparkles,
    Download, Star, HandHeart, CheckCircle2, Landmark, ShieldCheck,
    RefreshCcw as Sync, Edit3, PlusCircle, ArrowUpRight, History,
    LayoutDashboard, Calendar, Users, User, Bell, ChevronRight,
    Search, Filter, ReceiptText, Banknote, CreditCard as CardIcon
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const DonationsManagement = ({ profile }: { profile: any }) => {
    const [selectedAmount, setSelectedAmount] = useState("$100");
    const [frequency, setFrequency] = useState("Mensual");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const amounts = ["$50", "$100", "$200"];
    const activeDonations = [
        {
            id: 1,
            title: "Diezmo Mensual",
            amount: "$300.00",
            freq: "Mensual",
            next: "01 Oct",
            status: "Activo",
            img: "https://images.unsplash.com/photo-1544427928-c49cddee6eaa?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 2,
            title: "Fondo Pro-Templo",
            amount: "$150.00",
            freq: "Quincenal",
            next: "15 Sep",
            status: "Activo",
            img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=400"
        }
    ];

    const history = [
        { date: "01 Sep 2023", desc: "Diezmo Mensual", amt: "$300.00", status: "Completado" },
        { date: "15 Ago 2023", desc: "Fondo Pro-Templo", amt: "$150.00", status: "Completado" },
        { date: "01 Ago 2023", desc: "Diezmo Mensual", amt: "$300.00", status: "Completado" }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                        Ofrendas <span className="text-mivn-blue italic">Recurrentes</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 font-light italic">
                        "Administra tu generosidad y fidelidad para la obra del Señor."
                    </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-8 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-all shadow-sm">
                        <History className="w-4 h-4" /> Exportar Anual
                    </button>
                    <button className="flex-1 md:flex-none px-8 py-4 bg-mivn-blue text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all">
                        <PlusCircle className="w-4 h-4" /> Nuevo Compromiso
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-4 group hover:border-mivn-blue/30 transition-all">
                    <div className="w-12 h-12 bg-mivn-blue/10 rounded-xl flex items-center justify-center text-mivn-blue group-hover:scale-110 transition-transform">
                        <Repeat className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Compromiso Mensual</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white">$450.00</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-4 group hover:border-mivn-gold/30 transition-all">
                    <div className="w-12 h-12 bg-mivn-gold/10 rounded-xl flex items-center justify-center text-mivn-gold group-hover:scale-110 transition-transform">
                        <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Aportado 2026</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white">$3,200.00</p>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-gradient-to-br from-mivn-blue to-[#1e2d4d] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Impacto Espiritual</p>
                                <h3 className="text-xl font-bold font-playfair leading-tight italic">"Tu fidelidad extiende el Reino de Dios."</h3>
                            </div>
                            <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <HandHeart className="w-8 h-8 text-mivn-gold" />
                            </div>
                        </div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-6 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Miembro desde Enero 2024
                        </p>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-mivn-gold/10 rounded-full blur-3xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Activities Column */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Active Donations */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                <Sync className="w-6 h-6 text-mivn-blue" /> Ofrendas Activas
                            </h3>
                            <button className="text-[10px] font-black text-mivn-blue uppercase tracking-widest hover:underline">Gestionar Todo</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {activeDonations.map((don) => (
                                <div key={don.id} className="group bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl hover:border-mivn-blue/30 transition-all">
                                    <div className="aspect-[21/9] relative">
                                        <img src={don.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={don.title} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-6">
                                            <span className="bg-emerald-500 text-white text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">{don.status}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{don.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 italic">{don.amount} • {don.freq} • Próximo: {don.next}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-mivn-blue transition-colors">
                                                <Edit3 className="w-4 h-4" /> Editar
                                            </button>
                                            <button className="text-[10px] font-black text-rose-500/50 uppercase tracking-widest hover:text-rose-500 transition-colors">Pausar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Transaction History */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                <ReceiptText className="w-6 h-6 text-mivn-gold" /> Historial Reciente
                            </h3>
                            <button className="text-[10px] font-black text-mivn-blue uppercase tracking-widest hover:underline">Ver Historial Completo</button>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descripción</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monto</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Recibo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                        {history.map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                                <td className="px-10 py-8 text-sm text-slate-500 font-medium">{item.date}</td>
                                                <td className="px-10 py-8 text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">{item.desc}</td>
                                                <td className="px-10 py-8 text-sm font-black text-slate-900 dark:text-white">{item.amt}</td>
                                                <td className="px-10 py-8">
                                                    <span className="inline-flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                                        <CheckCircle2 className="w-3 h-3" /> {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/5 transition-all">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Setup Column */}
                <aside className="lg:col-span-4 space-y-12">

                    {/* Setup Form */}
                    <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-2xl space-y-10 sticky top-32">
                        <div className="space-y-3">
                            <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white uppercase tracking-tighter">Nueva Ofrenda</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Configura tu próximo aporte recurrente</p>
                        </div>

                        <form className="space-y-8">
                            {/* Amount Grid */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selecciona el Monto</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {amounts.map(amt => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => setSelectedAmount(amt)}
                                            className={`py-4 rounded-xl border-2 font-black text-xs transition-all ${selectedAmount === amt ? 'bg-mivn-blue border-mivn-blue text-white shadow-xl scale-105' : 'border-slate-50 dark:border-white/5 text-slate-500 hover:border-mivn-blue/30'}`}
                                        >
                                            {amt}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">$</span>
                                    <input
                                        type="number"
                                        placeholder="Otro monto"
                                        className="w-full pl-10 pr-6 py-5 bg-slate-50 dark:bg-white/5 rounded-2xl border-none outline-none focus:ring-4 focus:ring-mivn-blue/10 text-slate-900 dark:text-white font-black text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Frequency Selector */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frecuencia</label>
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-full h-14 bg-slate-50 dark:bg-white/5 rounded-2xl px-6 border-none outline-none focus:ring-4 focus:ring-mivn-blue/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest appearance-none cursor-pointer"
                                >
                                    <option>Mensual</option>
                                    <option>Quincenal</option>
                                    <option>Semanal</option>
                                </select>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Método de Pago</label>
                                <div className="space-y-3">
                                    <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue' : 'border-slate-50 dark:border-white/5 text-slate-500'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="hidden"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                        />
                                        <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-mivn-blue' : 'border-slate-300'}`}>
                                            {paymentMethod === 'card' && <div className="size-2.5 bg-mivn-blue rounded-full" />}
                                        </div>
                                        <CardIcon className="w-5 h-5" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase tracking-tight">Tarjeta de Crédito / Débito</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'zelle' ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue' : 'border-slate-50 dark:border-white/5 text-slate-500'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="hidden"
                                            checked={paymentMethod === 'zelle'}
                                            onChange={() => setPaymentMethod('zelle')}
                                        />
                                        <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'zelle' ? 'border-mivn-blue' : 'border-slate-300'}`}>
                                            {paymentMethod === 'zelle' && <div className="size-2.5 bg-mivn-blue rounded-full" />}
                                        </div>
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /><path d="M15.5 8.5h-5c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1zm-1 5h-3v-3h3v3z" /></svg>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase tracking-tight">Zelle</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue' : 'border-slate-50 dark:border-white/5 text-slate-500'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="hidden"
                                            checked={paymentMethod === 'bank'}
                                            onChange={() => setPaymentMethod('bank')}
                                        />
                                        <div className={`size-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank' ? 'border-mivn-blue' : 'border-slate-300'}`}>
                                            {paymentMethod === 'bank' && <div className="size-2.5 bg-mivn-blue rounded-full" />}
                                        </div>
                                        <Landmark className="w-5 h-5" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase tracking-tight">Cuenta Bancaria</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === 'zelle' ? (
                                <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-inner">
                                        <div className="flex flex-col items-center gap-4 text-center">
                                            <div className="bg-white p-4 rounded-xl shadow-lg">
                                                <Image
                                                    src="/zelle-qr.jpg"
                                                    alt="Scan to Pay with Zelle"
                                                    width={150}
                                                    height={150}
                                                    className="rounded-lg"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enviar ofrenda a:</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">MINISTERIO INTERNACIONAL VIDA NUEVA, IN</p>
                                            </div>
                                            <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-lg">
                                                Escanea el código o busca nuestra cuenta en tu app bancaria.
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button" // Prevent form submission for now, as it's manual
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-4 group"
                                        onClick={() => {
                                            alert("¡Gracias! Por favor confirma una vez realizada la transferencia.");
                                            // Here you could trigger a modal or redirect
                                        }}
                                    >
                                        <CheckCircle2 className="w-4 h-4" /> Ya realicé la transferencia
                                    </button>
                                </div>
                            ) : (
                                <button className="w-full bg-mivn-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-4 group">
                                    <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> Confirmar Compromiso
                                </button>
                            )}

                            <div className="pt-4 space-y-4">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Pago 100% Seguro</span>
                                </div>
                                <p className="text-[9px] text-slate-400 font-medium italic leading-relaxed">
                                    Toda tu información está cifrada con tecnología SSL de grado bancario. No almacenamos los números completos de tus tarjetas.
                                </p>
                            </div>
                        </form>
                    </section>

                </aside>

            </div>

        </div>
    );
};
