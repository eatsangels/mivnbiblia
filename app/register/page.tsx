'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, User, Mail, Lock, Eye, EyeOff, Check, Heart, Cross } from 'lucide-react'
import Link from 'next/link'
import { AuthLayout, Testimonial } from '@/components/ui/auth-layout'


export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Por favor completa todos los campos.")
            return
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

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    full_name: `${formData.firstName} ${formData.lastName}`,
                    first_name: formData.firstName,
                    last_name: formData.lastName
                }
            }
        })

        if (error) {
            setError(error.message)
        } else if (data.session) {
            router.push('/dashboard')
            router.refresh()
        } else {
            setError('¡Cuenta creada! Revisa tu correo para confirmar.')
        }
        setIsLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleGoogleSignIn = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <AuthLayout
            mode="register"
            heroImageSrc="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop"
            onGoogleSignIn={handleGoogleSignIn}
            footerContent={
                <div className="animate-element animate-delay-900 flex flex-col items-center gap-6 pt-4">
                    <p className="text-center text-sm text-gray-500">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-gold-500 hover:underline transition-colors font-bold">Inicia Sesión</Link>
                    </p>
                    <div className="w-full h-px bg-white/5" />
                    <div className="text-center">
                        <p className="text-[10px] text-gray-700 font-medium">
                            Desarrollado por <Link href="https://etrinidad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gold-400 transition-colors underline decoration-white/5 underline-offset-4">Edward Trinidad</Link>
                        </p>
                        <div className="flex items-center justify-center gap-1.5 mt-2 text-[8px] uppercase tracking-[0.2em] text-gray-800 font-black">
                            Hecho con <Heart className="w-2.5 h-2.5 text-red-500/20 fill-red-500/20 animate-pulse" /> Soli Deo Gloria
                        </div>
                    </div>
                </div>
            }
        >
            <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="animate-element animate-delay-200">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Nombre</label>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                            <input
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Juan"
                                className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="animate-element animate-delay-200">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Apellido</label>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                            <input
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Pérez"
                                className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="animate-element animate-delay-300">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Correo Electrónico</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@ejemplo.com"
                            className="w-full bg-transparent text-sm p-3 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                    </div>
                </div>

                <div className="animate-element animate-delay-400">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Contraseña</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Crea una contraseña"
                            className="w-full bg-transparent text-sm p-3 pr-12 rounded-xl focus:outline-none text-white placeholder-gray-600"
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
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Confirmar Contraseña</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group relative">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirma tu contraseña"
                            className="w-full bg-transparent text-sm p-3 pr-12 rounded-xl focus:outline-none text-white placeholder-gray-600"
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

                <div className="animate-element animate-delay-600 flex items-start gap-3 py-1">
                    <div className="relative flex items-center pt-0.5">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 checked:border-gold-500 checked:bg-gold-500 transition-all"
                        />
                        <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-black opacity-0 peer-checked:opacity-100" />
                    </div>
                    <label className="text-[10px] text-gray-500 leading-normal">
                        Acepto los <span className="text-gold-500 cursor-pointer hover:underline font-bold">Términos y Condiciones</span> y la <span className="text-gold-500 cursor-pointer hover:underline font-bold">Política de Privacidad</span>.
                    </label>
                </div>

                {error && (
                    <div className={`animate-element animate-delay-700 p-3 rounded-xl text-xs font-medium ${error.includes('¡Cuenta creada!') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                        {error}
                    </div>
                )}

                <div className="animate-element animate-delay-800 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold-600 hover:bg-gold-500 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-gold-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear Cuenta'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    )
}
