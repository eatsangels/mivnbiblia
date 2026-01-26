'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
    Loader2, User, Mail, Lock, Eye, EyeOff, Check, Heart, Cross,
    Church, Sparkles, Users, Music, Globe, BookOpen, ArrowLeft,
    ArrowRight, PartyPopper, UserRoundPen, Calendar, BellRing,
    Share2, Info, GraduationCap, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { AuthLayout, Testimonial } from '@/components/ui/auth-layout'
import { Modal } from '@/components/ui/modal'
import { TermsContent } from '@/components/legal/TermsContent'
import { PrivacyContent } from '@/components/legal/PrivacyContent'
import Image from 'next/image'

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Account
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        // Step 2: Spiritual Life
        baptized: 'sí',
        ministry: 'no',
        referral: '',
        interests: [] as string[]
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showTermsModal, setShowTermsModal] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
                setError("Por favor completa todos los campos.")
                return
            }

            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!usernameRegex.test(formData.username)) {
                setError("El usuario debe tener entre 3 y 20 caracteres alfanuméricos.");
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setError("Las contraseñas no coinciden.")
                return
            }

            if (!formData.termsAccepted) {
                setError("Debes aceptar los Términos y Condiciones.")
                return
            }

            setIsLoading(true)
            setError(null)

            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        full_name: `${formData.firstName} ${formData.lastName}`,
                        username: formData.username,
                        first_name: formData.firstName,
                        last_name: formData.lastName
                    }
                }
            })

            if (error) {
                setError(error.message)
                setIsLoading(false)
            } else {
                // If sign up works, we move to step 2
                // Note: Even if they need to verify email, we can let them finish the UI steps
                // or redirect if they are already logged in (session existed)
                setStep(2)
                setIsLoading(false)
            }
        } else if (step === 2) {
            setIsLoading(true)

            // Here we would ideally update the profile or user metadata
            // Since we might not have the columns in profiles yet, we'll try to update metadata
            const { error: updateError } = await supabase.auth.updateUser({
                data: {
                    baptized: formData.baptized,
                    ministry: formData.ministry,
                    referral_source: formData.referral,
                    interests: formData.interests
                }
            })

            if (updateError) {
                console.error("Error updating onboarding data:", updateError)
                // We proceed anyway for the sake of the flow
            }

            setStep(3)
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle checkbox
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            const { checked } = e.target;
            if (name === 'termsAccepted') {
                setFormData(prev => ({ ...prev, [name]: checked }));
            } else if (name === 'interest') {
                const interestValue = (e.target as HTMLInputElement).value;
                setFormData(prev => ({
                    ...prev,
                    interests: checked
                        ? [...prev.interests, interestValue]
                        : prev.interests.filter(i => i !== interestValue)
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    // Step 1 Content
    const renderStep1 = () => (
        <AuthLayout
            mode="register"
            title={
                <div className="flex items-center gap-3">
                    <img src="/logo_mivn.png" alt="MIVN" className="w-10 h-auto opacity-90" />
                    <span>Únete a MIVN</span>
                </div>
            }
            heroImageSrc="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop"
            onGoogleSignIn={handleGoogleSignIn}
            footerContent={
                <div className="animate-element animate-delay-900 flex flex-col items-center gap-4 pt-2">
                    <p className="text-center text-xs text-gray-500">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-gold-500 hover:underline transition-colors font-bold">Inicia Sesión</Link>
                    </p>
                    <div className="w-full h-px bg-white/5" />
                    <div className="text-center">
                        <p className="text-[9px] text-gray-700 font-medium">
                            Desarrollado por <Link href="https://etrinidad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gold-400 transition-colors underline decoration-white/5 underline-offset-4">Edward Trinidad</Link>
                        </p>
                        <div className="flex items-center justify-center gap-1.5 mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-800 font-black">
                            Hecho con <Heart className="w-2 h-2 text-red-500/20 fill-red-500/20 animate-pulse" /> Soli Deo Gloria
                        </div>
                    </div>
                </div>
            }
        >
            <form onSubmit={handleSignUp} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="animate-element animate-delay-200">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Nombre</label>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                            <input
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Juan"
                                className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="animate-element animate-delay-200">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Apellido</label>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                            <input
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Pérez"
                                className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="animate-element animate-delay-250">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Usuario (Alias)</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Usuario123"
                            className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                    </div>
                </div>

                <div className="animate-element animate-delay-300">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Correo Electrónico</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@ejemplo.com"
                            className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                    </div>
                </div>

                <div className="animate-element animate-delay-400">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Contraseña</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Crea una contraseña"
                            className="w-full bg-transparent text-sm p-2.5 pr-12 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="animate-element animate-delay-500">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Confirmar Contraseña</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group relative">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirma tu contraseña"
                            className="w-full bg-transparent text-sm p-2.5 pr-12 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="animate-element animate-delay-600 flex items-start gap-2 py-0.5">
                    <div className="relative flex items-center pt-0.5">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 checked:border-gold-500 checked:bg-gold-500 transition-all"
                        />
                        <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100" />
                    </div>
                    <label className="text-[10px] text-gray-500 leading-normal">
                        Acepto los <button type="button" onClick={() => setShowTermsModal(true)} className="text-gold-500 cursor-pointer hover:underline font-bold">Términos y Condiciones</button> y la <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-gold-500 cursor-pointer hover:underline font-bold">Política de Privacidad</button>.
                    </label>
                </div>

                <Modal
                    isOpen={showTermsModal}
                    onClose={() => setShowTermsModal(false)}
                    title="Términos y Condiciones"
                >
                    <TermsContent />
                </Modal>

                <Modal
                    isOpen={showPrivacyModal}
                    onClose={() => setShowPrivacyModal(false)}
                    title="Política de Privacidad"
                >
                    <PrivacyContent />
                </Modal>

                {error && (
                    <div className={`animate-element animate-delay-700 p-2.5 rounded-xl text-xs font-medium ${error.includes('¡Cuenta creada!') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                        {error}
                    </div>
                )}

                <div className="animate-element animate-delay-800 pt-1">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-mivn-blue hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Siguiente'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    );

    // Step 2 Content: Spiritual Life
    const renderStep2 = () => (
        <div className="min-h-screen bg-slate-50 dark:bg-[#05070a] flex flex-col items-center justify-center p-6 md:p-12 font-lexend">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header Navigation */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-mivn-blue/10 rounded-xl flex items-center justify-center text-mivn-blue">
                            <Church className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white uppercase tracking-tighter">MIVN</h2>
                    </div>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Progreso del Registro</p>
                        <p className="text-sm font-bold text-mivn-blue">66%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-mivn-blue rounded-full transition-all duration-1000" style={{ width: '66%' }} />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Paso 2 de 3: Vida Espiritual</p>
                </div>

                {/* Step Heading */}
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 dark:text-white uppercase">Vida Espiritual</h1>
                    <div className="flex items-center gap-2 text-mivn-blue">
                        <Sparkles className="w-4 h-4" />
                        <p className="text-sm font-medium italic">"Deseamos conocerte mejor para servirte mejor."</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleStep2Submit} className="space-y-10">
                    <div className="space-y-6">
                        {/* Baptism */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-tight">¿Te has bautizado?</label>
                            <div className="flex gap-4">
                                {['Sí', 'No'].map(opt => (
                                    <label key={opt} className={`flex-1 flex items-center justify-center py-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.baptized === opt.toLowerCase() ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue ring-4 ring-mivn-blue/10' : 'border-slate-100 dark:border-white/5 text-slate-500 hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                                        <input
                                            type="radio"
                                            name="baptized"
                                            value={opt.toLowerCase()}
                                            checked={formData.baptized === opt.toLowerCase()}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="text-sm font-bold uppercase tracking-widest">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ministry */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-tight">¿Perteneces a algún ministerio?</label>
                            <div className="flex gap-4">
                                {['Sí', 'No'].map(opt => (
                                    <label key={opt} className={`flex-1 flex items-center justify-center py-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.ministry === opt.toLowerCase() ? 'border-mivn-blue bg-mivn-blue/5 text-mivn-blue ring-4 ring-mivn-blue/10' : 'border-slate-100 dark:border-white/5 text-slate-500 hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                                        <input
                                            type="radio"
                                            name="ministry"
                                            value={opt.toLowerCase()}
                                            checked={formData.ministry === opt.toLowerCase()}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="text-sm font-bold uppercase tracking-widest">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Referral */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-tight">¿Cómo llegaste a MIVN?</label>
                            <div className="relative">
                                <select
                                    name="referral"
                                    value={formData.referral}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-800 dark:text-white outline-none focus:border-mivn-blue transition-all appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option value="friend">Por un amigo/familiar</option>
                                    <option value="social">Redes Sociales</option>
                                    <option value="event">Evento Especial</option>
                                    <option value="location">Cercanía geográfica</option>
                                    <option value="other">Otro</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight className="w-5 h-5 rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-tight">Áreas de Interés</label>
                                <p className="text-[10px] text-slate-400 font-medium italic mt-1 uppercase tracking-widest">Selecciona los ministerios que te gustaría conocer.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'youth', label: 'Jóvenes', icon: Users },
                                    { id: 'music', label: 'Música', icon: Music },
                                    { id: 'missions', label: 'Misiones', icon: Globe },
                                    { id: 'teaching', label: 'Enseñanza', icon: BookOpen }
                                ].map(item => (
                                    <label key={item.id} className={`group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer transition-all ${formData.interests.includes(item.id) ? 'bg-mivn-blue/10 border-mivn-blue text-mivn-blue' : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500'}`}>
                                        <input
                                            type="checkbox"
                                            name="interest"
                                            value={item.id}
                                            checked={formData.interests.includes(item.id)}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-10 border-t border-slate-50 dark:border-white/5">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-mivn-blue transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-mivn-blue text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Siguiente'} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div >
            <footer className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-fade-in">
                © 2026 Ministerio Internacional Vida Nueva. Todos los derechos reservados.
            </footer>
        </div >
    );

    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                baptized: formData.baptized,
                ministry: formData.ministry,
                referral_source: formData.referral,
                interests: formData.interests
            }
        })

        if (!updateError) {
            setStep(3);
        } else {
            setError(updateError.message);
        }
        setIsLoading(false);
    }

    // Step 3 Content: Welcome
    const renderStep3 = () => (
        <div className="min-h-screen bg-[#F8F8F5] dark:bg-[#05070a] flex flex-col items-center justify-center p-6 md:p-12 font-lexend">
            <div className="w-full max-w-4xl space-y-12 animate-in zoom-in-95 fade-in duration-1000">

                {/* Celebration Header */}
                <div className="text-center space-y-8 flex flex-col items-center">
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto">
                        <div className="h-full bg-mivn-gold rounded-full" style={{ width: '100%' }} />
                    </div>

                    <div className="relative">
                        <div className="w-20 h-20 bg-mivn-gold rounded-[2rem] flex items-center justify-center text-white shadow-2xl animate-bounce">
                            <PartyPopper className="w-10 h-10" />
                        </div>
                        <div className="absolute inset-0 bg-mivn-gold/20 rounded-[2.5rem] blur-2xl animate-pulse" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white uppercase leading-tight tracking-tighter">
                            ¡Registro <span className="text-mivn-gold italic">Completado!</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-light italic">"Bienvenido a la Gran Familia MIVN"</p>
                    </div>
                </div>

                {/* Hero Image & Message */}
                <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
                    <div className="aspect-[21/9] relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1500"
                            alt="MIVN Congregation"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-lg">Tu viaje espiritual comienza hoy</span>
                        </div>
                    </div>

                    <div className="p-12 md:p-16 text-center space-y-10 relative">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex -space-x-4 border-8 border-white dark:border-slate-900 rounded-full bg-white dark:bg-slate-900">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Pastor" />
                            </div>
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Pastora" />
                            </div>
                        </div>

                        <div className="space-y-6 pt-10">
                            <h3 className="text-mivn-blue text-xs font-black uppercase tracking-[0.4em]">Un mensaje para ti</h3>
                            <p className="text-xl md:text-2xl text-slate-800 dark:text-gray-200 font-light italic leading-relaxed max-w-3xl mx-auto">
                                "Nos alegra inmensamente que hayas dado este paso de fe. MIVN no es solo una iglesia, es tu casa y tu familia. ¡Estamos emocionados de verte crecer y servir juntos!"
                            </p>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">— Pastores Juan & Elena</p>
                        </div>

                        {/* Next Steps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                            {[
                                { title: "Personaliza", desc: "Añade tu foto y completa tu información.", icon: UserRoundPen },
                                { title: "Busca un Grupo", desc: "Encuentra comunidad cerca de ti.", icon: Users },
                                { title: "Próximo Culto", desc: "Acompáñanos este Domingo 10 AM.", icon: Calendar }
                            ].map((step, i) => (
                                <div key={i} className="space-y-4 group/step p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <div className="w-14 h-14 bg-mivn-blue/10 rounded-2xl flex items-center justify-center text-mivn-blue mx-auto group-hover/step:scale-110 group-hover/step:bg-mivn-blue group-hover/step:text-white transition-all">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{step.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium italic">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full max-w-md bg-mivn-blue text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                    >
                        Ir a mi Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-mivn-blue transition-colors">Omitir por ahora</button>
                </div>

                <footer className="text-center py-10 space-y-6">
                    <div className="flex justify-center gap-8">
                        <Share2 className="w-5 h-5 text-slate-300 hover:text-mivn-blue cursor-pointer" />
                        <BellRing className="w-5 h-5 text-slate-300 hover:text-mivn-gold cursor-pointer" />
                        <Mail className="w-5 h-5 text-slate-300 hover:text-mivn-blue cursor-pointer" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-fade-in">
                        © 2026 Ministerio Internacional Vida Nueva. Todos los derechos reservados.
                    </p>
                </footer>
            </div>
        </div>
    );

    return (
        <div className="transition-all duration-700">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
}
