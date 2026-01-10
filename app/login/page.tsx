'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            if (error.message.includes("Anonymous sign-ins are disabled")) {
                setError("Error: Verifica que el proveedor de Email esté habilitado en Supabase, o que no estés enviando campos vacíos.")
            } else if (error.message.includes("Invalid login credentials")) {
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

    const handleSignUp = async () => {
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

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    full_name: email.split('@')[0]
                }
            }
        })

        if (error) {
            setError(error.message)
        } else {
            setError('¡Revisa tu correo para confirmar tu cuenta!')
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden px-4">
            {/* Ambient background */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Bienvenido a <span className="text-gold-500">MIVN</span></h1>
                    <p className="text-gray-400">Tu espacio para el estudio bíblico profundo</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                            placeholder="juan@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold-600 hover:bg-gold-500 text-black font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(212,159,56,0.2)] hover:shadow-[0_0_30px_rgba(212,159,56,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        ¿No tienes cuenta? <Link href="/register" className="text-white hover:text-gold-400 font-semibold transition-colors">Regístrate aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
