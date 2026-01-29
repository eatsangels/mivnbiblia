"use client";

import { Heart, Lock, Receipt, Repeat, CreditCard, Wallet, Sparkles, Download, Star, HandHeart, History, CheckCircle2, User, Landmark, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { createDonation } from "@/app/actions/donations";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DonationsBannerProps {
    userProfile?: {
        full_name: string | null;
        avatar_url: string | null;
        email: string | null;
    } | null;
    stats?: {
        totalGiven: number;
        lastDonationDate: string | null;
        lastDonationAmount: number | null;
    };
    recentDonations?: any[];
}

export const DonationsBanner = ({ userProfile, stats, recentDonations = [] }: DonationsBannerProps) => {
    const [selectedAmount, setSelectedAmount] = useState("$50");
    const [customAmount, setCustomAmount] = useState("");
    const [frequency, setFrequency] = useState("Única vez");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const amounts = ["$25", "$50", "$100", "$250", "$500", "Otro"];
    const frequencies = ["Única vez", "Semanal", "Mensual"];

    const handleDonation = async () => {
        if (!userProfile) {
            toast.error("Debes iniciar sesión para ofrendar.");
            return;
        }

        const amountValue = selectedAmount === "Otro" ? parseFloat(customAmount) : parseFloat(selectedAmount.replace("$", ""));

        if (!amountValue || amountValue <= 0) {
            toast.error("Por favor selecciona un monto válido.");
            return;
        }

        setIsSubmitting(true);
        try {
            await createDonation({
                amount: amountValue,
                type: "ofrenda", // Could be dynamic based on selection
                method: paymentMethod as any,
            });
            toast.success("Ofrenda registrada correctamente. ¡Gracias por tu generosidad!");
            // Reset form if needed
        } catch (error) {
            toast.error("Hubo un error al procesar tu ofrenda.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-background-light dark:bg-background-dark py-24 px-4 font-lexend">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <header className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-mivn-blue dark:text-white">Portal de Ofrendas & Diezmos</h1>
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-3xl transition-all group ${paymentMethod === 'card' ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue' : 'border-slate-100 dark:border-slate-800 hover:border-mivn-blue'}`}
                                    >
                                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-mivn-blue' : 'text-slate-400 group-hover:text-mivn-blue'}`} />
                                        <span className="font-bold text-xs uppercase tracking-widest">Tarjeta</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('zelle')}
                                        className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-3xl transition-all group ${paymentMethod === 'zelle' ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue' : 'border-slate-100 dark:border-slate-800 hover:border-mivn-blue'}`}
                                    >
                                        <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-current ${paymentMethod === 'zelle' ? 'text-mivn-blue' : 'text-slate-400 group-hover:text-mivn-blue'}`} xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /><path d="M15.5 8.5h-5c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1zm-1 5h-3v-3h3v3z" /></svg>
                                        <span className="font-bold text-xs uppercase tracking-widest">Zelle</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-3xl transition-all group ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/5 text-blue-500' : 'border-slate-100 dark:border-slate-800 hover:border-blue-500'}`}
                                    >
                                        <Wallet className={`w-6 h-6 ${paymentMethod === 'paypal' ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
                                        <span className="font-bold text-xs uppercase tracking-widest">PayPal</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {paymentMethod === 'zelle' ? (
                            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                                    <div className="flex flex-col items-center gap-6 text-center">
                                        <div className="bg-white p-4 rounded-xl shadow-lg">
                                            <Image
                                                src="/zelle-qr.jpg"
                                                alt="Scan to Pay with Zelle"
                                                width={180}
                                                height={180}
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Enviar ofrenda a:</p>
                                            <p className="text-base font-bold text-slate-900 dark:text-white">MINISTERIO INTERNACIONAL VIDA NUEVA, IN</p>
                                        </div>
                                        <div className="text-xs text-slate-500 bg-slate-200/50 dark:bg-slate-700/30 px-6 py-3 rounded-xl max-w-sm">
                                            Escanea el código QR desde tu aplicación bancaria compatible con Zelle o usa la información de la cuenta.
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDonation}
                                    disabled={isSubmitting}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-5 group disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? "Procesando..." : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" /> Confirmar Transferencia Zelle
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <button
                                    onClick={handleDonation}
                                    disabled={isSubmitting}
                                    className="w-full bg-mivn-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-5 group disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? "Procesando..." : (
                                        <>
                                            Realizar Ofrenda <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        </>
                                    )}
                                </button>
                                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    Transacción Segura Encriptada SSL
                                </div>
                            </div>
                        )}
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
                                        {userProfile?.avatar_url ? (
                                            <Image src={userProfile.avatar_url} alt={userProfile.full_name || "Profile"} width={48} height={48} className="object-cover w-full h-full rounded-xl" />
                                        ) : (
                                            <User className="w-8 h-8 text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold truncate max-w-[200px]">{userProfile?.full_name || "¡Hola!"}</h3>
                                        <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Colaborador del Reino</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Total Aportado</p>
                                        <p className="text-2xl font-black">${stats?.totalGiven?.toFixed(2) || "0.00"}</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Última</p>
                                        <p className="text-2xl font-black">{stats?.lastDonationAmount ? `$${stats.lastDonationAmount}` : "-"}</p>
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
                                {recentDonations && recentDonations.length > 0 ? (
                                    recentDonations.slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-5 group cursor-default">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                                                <Receipt className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-800 dark:text-white capitalize">{item.type} ({item.status})</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{format(new Date(item.created_at), 'dd MMM, yyyy', { locale: es })}</p>
                                            </div>
                                            <p className="text-xl font-black text-slate-900 dark:text-white">${item.amount}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-slate-400 text-sm py-8 italic">
                                        No hay ofrendas recientes.
                                    </div>
                                )}
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

