'use client';

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, Heart, Cross } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { AuthLayout, Testimonial } from '@/components/ui/auth-layout'
import { getEmailByUsername } from './actions'


export default function LoginPage() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!identifier.trim() || !password.trim()) {
            const msg = "Por favor completa todos los campos.";
            setError(msg)
            toast.warning("Campos vacíos", { description: msg })
            return
        }

        setIsLoading(true)
        setError(null)

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        let loginEmail = identifier.trim()

        // Check if input is a username (no @ symbol)
        if (!loginEmail.includes('@')) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('id') // We just need to check if user exists, but we can't get email from profiles usually. 
            // Wait, profiles usually doesn't store email. 
            // Actually, I can't query auth.users from client code.
            // Assuming profiles table has 'username' which connects to auth.users.
            // BUT, to satisfy "login with username", I need the email to pass to signInWithPassword.
            // If I can't get the email from the username via public query, I can't implement this strictly client-side 
            // UNLESS the profiles table explicitly stores the email (which is common in some setups but possibly redundant/insecure).
            // Let me check if 'profiles' has email. 
            // Checking previous context... `20260124_create_cms_tables.sql` references profiles(id).
            // Let's assume for a moment that I need to find the email.
            // If profiles relies on `auth.users`, the email is in `auth.users`.
            // A common pattern is to store email in profiles for easy access, OR use an edge function / server action to resolve it.
            // Since I am in "client" component, I should probably check if `profiles` has `username` and `email` or if I need a server action.
            // Re-reading `register/page.tsx`... formData has `email` and `username`.
            // The trigger I just wrote:
            // INSERT INTO public.profiles (id, full_name, username, avatar_url, role) ...
            // It does NOT insert email into profiles. 
            // So I cannot find the email by querying 'profiles' with 'username'.

            // Correction: I need to perform this check on the server side? 
            // Or I can update the trigger to also store email in profiles? 
            // Or I can use a server action that has admin rights to lookup email by username.

            // Let's verify if `profiles` table has email column. 
            // I'll take a quick look at `database.types.ts` or recent migrations if possible. 
            // The user just sent me `20260124_create_cms_tables.sql` which references `profiles`.
            // But the `profiles` table definition itself isn't in that file (it's referenced).
            // I'll assume it DOESN'T have it based on my `handle_new_user` trigger code which didn't include it.

            // Use a Server Action?
            // `app/(estudio)/login/page.tsx` is "use client".
            // I can create a server action in a new file `app/(estudio)/login/actions.ts` that takes a username and returns an email.
            // Yes, that seems safest and most correct.

            const resolvedEmail = await getEmailByUsername(loginEmail)
            if (!resolvedEmail) {
                // Determine if we want to reveal that user doesn't exist
                // For security, generic message is better, but for UX on 'username' specific,
                // it might be helpful to say "Username not found" or just fail generically.
                // We'll let it proceed to signIn with the username as email, which will fail elegantly below,
                // OR we can short-circuit here.
                // If we short circuit, we save a Supabase call.
                // Let's short circuit with generic error to mimic Supabase behavior?
                // Actually, if we pass a username to signInWithPassword (email field), it returns "Invalid login credentials" usually.
                // So let's fall through, but loginEmail is still username, so it will fail.
                // OR better, we explicitly handle "User found?"
                // Let's rely on standard error handling below.
            } else {
                loginEmail = resolvedEmail
            }
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password,
        })

        if (error) {
            if (error.message.includes("Invalid login credentials")) {
                setError("Usuario/Correo o contraseña incorrectos.")
                toast.error("Error de acceso", {
                    description: "Las credenciales no coinciden con nuestros registros."
                })
            } else {
                setError(error.message)
                toast.error("Error de inicio de sesión", {
                    description: error.message
                })
            }
            setIsLoading(false)
        } else {
            toast.success("¡Bienvenido al Santuario!", {
                description: "Sesión iniciada correctamente. Preparando tu espacio de crecimiento espiritual...",
                duration: 4000,
            })
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
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Correo Electrónico o Usuario</label>
                    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all focus-within:border-gold-500/50 focus-within:bg-gold-500/5 group">
                        <input
                            name="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Usuario o tu@email.com"
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
