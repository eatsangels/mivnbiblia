import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeaderActions } from "@/components/admin/AdminHeaderActions";
import { Bell, Settings, Search, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // En un sistema real, aquí verificarías el rol 'admin' en la base de datos
    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as any;

    const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

    if (!isAdmin) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen bg-[#F8FAFB] dark:bg-[#05070a] transition-colors duration-500 font-lexend">

            {/* Admin Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#05070a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-20">
                <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="flex items-center gap-4 group">
                            <div className="w-10 h-10 relative transition-transform group-hover:scale-110">
                                <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold font-playfair tracking-tighter text-mivn-blue dark:text-white uppercase leading-none">MIVN <span className="text-slate-400">Admin</span></h1>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center bg-slate-100 dark:bg-white/5 rounded-2xl px-4 py-2 border border-transparent focus-within:border-mivn-blue/30 transition-all shadow-sm">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                className="bg-transparent !border-none !outline-none !shadow-none !ring-0 text-sm w-64 placeholder:text-slate-400 text-slate-800 dark:text-white ml-2 appearance-none"
                                placeholder="Buscar configuración..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <AdminHeaderActions />

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                                    {profile?.full_name?.split(' ')[0] || 'Admin'}
                                </p>
                                <p className="text-[9px] text-mivn-gold mt-1 uppercase font-black tracking-widest">Súper Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-mivn-blue/20 border-2 border-mivn-blue flex items-center justify-center overflow-hidden">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-bold text-mivn-blue">{profile?.full_name?.[0] || 'A'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1600px] mx-auto flex">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
