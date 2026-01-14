'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, User, Mail, Lock, Eye, EyeOff, Check, Heart, Cross } from 'lucide-react'
import Link from 'next/link'

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

        // Validations
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
            // Auto-login active (email confirmation disabled)
            router.push('/dashboard')
            router.refresh()
        } else {
            // Fallback: This only runs if email confirmation IS enabled
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden px-4 py-8">
            {/* Ambient background */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-600/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Crear Cuenta</h1>
                    <p className="text-gray-400 text-sm">Ingresa tu información para comenzar</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-5">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Nombre</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                                    placeholder="Juan"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Apellido</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                                    placeholder="Pérez"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                                placeholder="juan@ejemplo.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                                placeholder="Crear contraseña segura"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Confirmar Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type={showConfirmPassword ? "text" : "password"} // Fixed typohere
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                                placeholder="Confirma tu contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-[#1a1a1a] checked:border-gold-500 checked:bg-gold-500 transition-all"
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-black opacity-0 peer-checked:opacity-100" />
                        </div>
                        <label className="text-xs text-gray-400 leading-tight">
                            Acepto los <span className="text-gold-500 cursor-pointer hover:underline">Términos y Condiciones</span> y la <span className="text-gold-500 cursor-pointer hover:underline">Política de Privacidad</span>.
                        </label>
                    </div>

                    {error && (
                        <div className={`p-3 rounded-lg text-sm ${error.includes('¡Cuenta creada!') ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading} // Removed custom disabled style to keep it simple with opacity
                        className="w-full bg-gold-600 hover:bg-gold-500 text-black font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(212,159,56,0.2)] hover:shadow-[0_0_30px_rgba(212,159,56,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-white hover:text-gold-400 font-semibold transition-colors">Inicia Sesión</Link>
                    </p>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 font-medium italic">
                    Plataforma desarrollada por <Link href="https://etrinidad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-400 transition-colors underline decoration-white/10 underline-offset-4 font-bold">Edward Trinidad</Link>
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-[8px] uppercase tracking-[0.3em] text-gray-700 font-black">
                    Hecho con <Heart className="w-2.5 h-2.5 text-red-500/30 fill-red-500/30 animate-pulse" /> Soli Deo Gloria
                </div>
            </div>
        </div>
    )
}
