import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as any;

    if (!profile) {
        return <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-white">Error loading profile.</div>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFB] dark:bg-[#05070a] transition-colors duration-500">

            {/* Top Navigation Bar - Institutional Style */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#05070a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 relative transition-transform group-hover:scale-110">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold font-playfair tracking-tighter text-mivn-blue dark:text-white uppercase">MIVN</h2>
                    </Link>

                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Dashboard</Link>
                            <Link href="/eventos" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Eventos</Link>
                            <Link href="/cultos" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Sermones</Link>
                        </nav>

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block" />

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-mivn-blue transition-all">
                                <Home className="w-5 h-5" />
                            </Link>
                            <div className="w-10 h-10 rounded-full bg-mivn-blue/20 border-2 border-mivn-blue flex items-center justify-center overflow-hidden">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-bold text-mivn-blue">{profile.full_name?.[0] || 'P'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <ProfileSettings profile={profile} />
            </main>
        </div>
    );
}
