import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { DonationsManagement } from "@/components/dashboard/DonationsManagement";
import { Home, Bell, LayoutDashboard, Heart, Users, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DonationsDashboardPage() {
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
        <div className="min-h-screen bg-[#F8FAFB] dark:bg-[#05070a] transition-colors duration-500 font-lexend">

            {/* Top Navigation Bar - Institutional Style */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#05070a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 relative transition-transform group-hover:scale-110">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-playfair tracking-tighter text-mivn-blue dark:text-white uppercase leading-none">MIVN</h1>
                            <p className="text-[8px] uppercase tracking-[0.3em] text-mivn-gold font-black mt-1">Vida Nueva</p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Dashboard</Link>
                        <Link href="/dashboard/ofrendas" className="text-[10px] font-black uppercase tracking-widest text-mivn-blue border-b-2 border-mivn-blue pb-1">Ofrendas</Link>
                        <Link href="/eventos" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Eventos</Link>
                        <Link href="/ministerios" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Ministerios</Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-mivn-blue transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-mivn-blue transition-all">
                                <LayoutDashboard className="w-5 h-5" />
                            </Link>
                            <Link href="/dashboard/profile" className="w-10 h-10 rounded-full bg-mivn-blue/20 border-2 border-mivn-blue flex items-center justify-center overflow-hidden transition-transform hover:scale-105">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-bold text-mivn-blue">{profile.full_name?.[0] || 'P'}</span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 w-full">
                <DonationsManagement profile={profile} />
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-8 py-5 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl">
                <Link href="/dashboard" className="text-slate-400"><LayoutDashboard className="w-6 h-6" /></Link>
                <Link href="/dashboard/ofrendas" className="text-mivn-blue"><Heart className="w-6 h-6" /></Link>
                <Link href="/ministerios" className="text-slate-400"><Users className="w-6 h-6" /></Link>
                <Link href="/dashboard/profile" className="text-slate-400"><User className="w-6 h-6" /></Link>
            </div>
        </div>
    );
}
