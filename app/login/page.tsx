'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, Heart, Cross } from 'lucide-react'
import Link from 'next/link'
import { AuthLayout, Testimonial } from '@/components/ui/auth-layout'


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            setError("Por favor completa todos los campos.")
            return
        }

        setIsLoading(true)
        setError(null)

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error(error)
            if (error.message.includes("Invalid login credentials")) {
                setError("Correo o contraseña incorrectos.")
            } else {
                setError(error.message)
            }
            setIsLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
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
            mode="login"
            heroImageSrc="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2670&auto=format&fit=crop"
            onGoogleSignIn={handleGoogleSignIn}
            footerContent={
                <div className="animate-element animate-delay-900 flex flex-col items-center gap-6 pt-4">
                    <p className="text-center text-sm text-gray-500">
                        ¿Nuevo en la plataforma? <Link href="/register" className="text-gold-500 hover:underline transition-colors font-bold">Crea una cuenta</Link>
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
            <form onSubmit={handleLogin} className="space-y-5">
                <div className="animate-element animate-delay-300">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Correo Electrónico</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@ejemplo.com"
                            className="w-full bg-transparent text-sm p-3.5 rounded-xl focus:outline-none text-white placeholder-gray-600"
                            required
                        />
                    </div>
                </div>

                <div className="animate-element animate-delay-400">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Contraseña</label>
                        <button type="button" className="text-[10px] text-gold-500/60 hover:text-gold-400 transition-colors font-bold uppercase tracking-tight">¿La olvidaste?</button>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-transparent text-sm p-3.5 pr-12 rounded-xl focus:outline-none text-white placeholder-gray-600"
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

                {error && (
                    <div className="animate-element animate-delay-500 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="animate-element animate-delay-600">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-gold-600 py-3.5 font-bold text-black hover:bg-gold-500 transition-all shadow-lg shadow-gold-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar al Santuario'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    )
}
