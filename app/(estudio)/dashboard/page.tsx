import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Calendar,
    Heart,
    User,
    LogOut,
    Bell,
    CheckCircle,
    Play,
    MessageSquare,
    ExternalLink,
    ChevronRight,
    Megaphone,
    Book,
    Star,
    Award,
    Clock,
    Share2,
    Search,
    ChevronLeft,
    HandHeart,
    PlayCircle,
    TrendingUp,
    Shield,
    Home,
    School,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import { ResetProgressButton } from '@/components/dashboard/ResetProgressButton';
import { getPrayerRequests } from '@/lib/queries/prayer-requests';
import { DashboardPrayerSection } from '@/components/dashboard/DashboardPrayerSection';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch real profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as any;

    const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single() as any;

    // Deterministic Verse of the Day logic
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const { count } = await supabase.from('scriptures').select('*', { count: 'exact', head: true });
    const verseOffset = count ? (dayOfYear * 12345) % count : 0;
    const { data: verses } = await supabase.from('scriptures').select('*').range(verseOffset, verseOffset) as any;
    const verseOfTheDay = verses?.[0];

    // Fetch prayer requests
    const { data: prayerRequests } = await getPrayerRequests(1, 10);

    // Fetch dynamic pastor messages
    const { data: messages } = await supabase
        .from('pastor_messages')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: false })
        .limit(2);

    const sidebarLinks: any[] = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
        { name: "En Vivo (Chat)", icon: MessageSquare, href: "/en-vivo" },
        { name: "Comunidad", icon: Users, href: "/grupos" },
        { name: "Instituto", icon: School, href: "/instituto" },
        { name: "Mi Crecimiento", icon: TrendingUp, href: "/dashboard/growth" },
        { name: "Devocionales", icon: BookOpen, href: "/devocionales" },
        { name: "Ministerios", icon: HandHeart, href: "/ministerios" },
        { name: "Donaciones", icon: Heart, href: "/dashboard/donations" },
        { name: "Perfil", icon: User, href: "/dashboard/profile" },
    ];

    const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
    if (isAdmin) {
        sidebarLinks.push({ name: "Admin Panel", icon: Shield, href: "/admin", featured: true });
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070a] flex flex-col font-lexend transition-colors duration-500">

            {/* Header / Navbar */}
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
                        {sidebarLinks.slice(0, 5).map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${link.href === '/dashboard' ? "text-mivn-blue border-b-2 border-mivn-blue pb-1" : "text-slate-500 hover:text-mivn-blue"}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/"
                            className="text-sm font-bold text-slate-500 hover:text-mivn-blue flex items-center gap-2 transition-colors border-l pl-6 border-slate-200 dark:border-white/10"
                        >
                            <Home className="w-4 h-4" /> Inicio
                        </Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/profile" className="p-2 text-slate-400 hover:text-mivn-blue transition-colors group relative">
                            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700" />
                        </Link>

                        <Link href="/dashboard/profile" className="relative p-2 text-slate-400 hover:text-mivn-blue transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </Link>

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                    {profile?.full_name?.split(' ')[0] || 'Ricardo'}
                                </p>
                                <p className="text-[10px] text-mivn-gold mt-1 uppercase font-black tracking-widest">
                                    {(profile?.role === 'admin' && 'Administrador') ||
                                        (profile?.role === 'super_admin' && 'Súper Admin') ||
                                        (profile?.role === 'member' && 'Miembro') ||
                                        (profile?.role === 'pastor' && 'Pastor') ||
                                        (profile?.role === 'leader' && 'Líder') ||
                                        (profile?.role === 'treasurer' && 'Tesorero') ||
                                        (profile?.role === 'content_editor' && 'Editor') ||
                                        profile?.role || "Miembro"}
                                </p>
                            </div>
                            <Link href="/dashboard/profile" className="w-11 h-11 rounded-2xl bg-mivn-blue/20 border-2 border-mivn-blue/20 p-0.5 group overflow-hidden shadow-lg transition-all hover:scale-105">
                                <div className="w-full h-full rounded-xl bg-mivn-blue flex items-center justify-center text-white font-bold text-lg overflow-hidden relative">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile?.full_name?.[0] || 'R'
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Main Dashboard */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* 1. Welcome Hero Section */}
                        <section className="relative overflow-hidden rounded-[3.5rem] bg-mivn-blue p-10 md:p-16 text-white shadow-2xl shadow-mivn-blue/20 group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <BookOpen className="w-64 h-64 text-white" />
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight">¡Hola, {profile?.full_name?.split(' ')[0] || 'Hermano'}!</h2>
                                    <p className="text-xl md:text-2xl text-white/80 font-light italic leading-relaxed">
                                        "{verseOfTheDay?.text || 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'}"
                                    </p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-white/60">
                                        — {verseOfTheDay ? `${verseOfTheDay.book} ${verseOfTheDay.chapter}:${verseOfTheDay.verse}` : 'Salmos 119:105'}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link href="/read" className="bg-white text-mivn-blue px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                                        Continuar Lectura <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* 2. Spiritual Progress Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                    <Award className="w-6 h-6 text-mivn-gold" /> Mi Progreso Espiritual
                                </h3>
                                <Link href="/read" className="text-[10px] font-black text-mivn-blue hover:underline uppercase tracking-widest">Ver Detalles</Link>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                                    <div className="space-y-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lectura este mes</p>
                                        <div className="flex items-end gap-3">
                                            <span className="text-5xl font-bold font-playfair text-slate-900 dark:text-white">{progress?.total_chapters_read || 0}</span>
                                            <span className="text-slate-400 font-medium mb-1.5 uppercase tracking-widest text-[10px]">/ 1189 caps</span>
                                        </div>
                                        <div className="w-full bg-slate-50 dark:bg-white/5 h-3 rounded-full overflow-hidden border border-slate-100 dark:border-white/5">
                                            <div
                                                className="bg-mivn-blue h-full rounded-full shadow-[0_0_15px_rgba(74,163,223,0.3)] transition-all duration-1000"
                                                style={{ width: `${Math.min(((progress?.total_chapters_read || 0) / 1189) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center gap-6 group hover:border-mivn-gold/30 transition-all">
                                        <div className="w-16 h-16 rounded-2xl bg-mivn-gold/10 flex items-center justify-center text-mivn-gold group-hover:scale-110 transition-transform">
                                            <Star className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Racha Actual</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{progress?.current_streak || 0} Días</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center gap-6 group hover:border-mivn-blue/30 transition-all">
                                        <div className="w-16 h-16 rounded-2xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue group-hover:scale-110 transition-transform">
                                            <Users className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grupos Activos</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">2 Grupos</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* 3. My Groups Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                    <Users className="w-6 h-6 text-mivn-blue" /> Mis Grupos de Vida
                                </h3>
                                <button className="text-[10px] font-black text-mivn-blue hover:underline uppercase tracking-widest">+ Unirse a otro</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Jóvenes Adultos", time: "Lunes • 19:30 PM", mode: "Híbrida", status: "Próxima: Mañana", icon: Users, color: "mivn-blue" },
                                    { title: "Estudio Bíblico: Romanos", time: "Jueves • 20:00 PM", mode: "Zoom", status: "Jueves", icon: Book, color: "mivn-gold" }
                                ].map((group, i) => (
                                    <div key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-mivn-blue/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-mivn-blue/10 group-hover:text-mivn-blue transition-all">
                                                <group.icon className="w-7 h-7" />
                                            </div>
                                            <span className={`px-4 py-1.5 ${group.status.includes('Mañana') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'} text-[8px] font-black rounded-lg uppercase tracking-widest`}>
                                                {group.status}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-2">{group.title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-light italic mb-8">{group.time} • {group.mode}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3].map(user => (
                                                    <div key={user} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/150?u=${user + i}`} className="w-full h-full object-cover" alt="Member" />
                                                    </div>
                                                ))}
                                                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-mivn-blue flex items-center justify-center text-[8px] text-white font-black">+12</div>
                                            </div>
                                            <button className="text-[10px] font-black text-mivn-blue uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">Entrar al Grupo</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Prayer Requests Section */}
                        <DashboardPrayerSection
                            initialRequests={prayerRequests}
                            userName={profile?.full_name || 'Ricardo'}
                        />

                    </div>

                    {/* Right Side: Sidebar Widgets */}
                    <aside className="lg:col-span-4 space-y-12">

                        {/* A. Messages from Pastor (Dynamic) */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white flex items-center gap-4">
                                <Megaphone className="w-6 h-6 text-mivn-gold" /> Mensajes del Pastor
                            </h3>
                            <div className="space-y-6">
                                {messages && messages.length > 0 ? (
                                    messages.map((msg: any) => (
                                        <div key={msg.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden cursor-pointer">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src={msg.image_url || "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600"}
                                                    alt="Thumbnail"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                                                    <PlayCircle className="w-16 h-16 text-white" />
                                                </div>
                                                {msg.duration && (
                                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 shadow-xl text-white text-[10px] font-bold rounded-lg backdrop-blur-md">
                                                        {msg.duration}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-8 space-y-3">
                                                <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-tight leading-tight group-hover:text-mivn-blue transition-colors line-clamp-2">
                                                    {msg.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                                                    {msg.pastor_name} • {new Date(msg.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-slate-400 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                                        <p>No hay mensajes nuevos por ahora.</p>
                                    </div>
                                )}
                            </div>
                            <Link href="/cultos" className="block w-full text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] text-mivn-blue hover:bg-mivn-blue hover:text-white transition-all">
                                Ver todos los mensajes
                            </Link>
                        </section>

                        {/* B. Upcoming Events */}
                        <section className="bg-slate-900 rounded-[3.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                                <Calendar className="w-64 h-64 text-white" />
                            </div>
                            <h3 className="text-2xl font-playfair font-bold mb-10 flex items-center gap-4 relative z-10">
                                <Star className="w-6 h-6 text-mivn-gold animate-pulse" /> Próximos Eventos
                            </h3>
                            <div className="space-y-8 relative z-10">
                                {[
                                    { date: "Dom 26", title: "Servicio de Celebración", time: "10:00 AM • Templo", active: true },
                                    { date: "Mar 28", title: "Noche de Adoración", time: "19:00 PM • Sala A", active: false }
                                ].map((ev, i) => (
                                    <div key={i} className={`flex gap-6 border-l-4 ${ev.active ? 'border-mivn-blue' : 'border-slate-700'} pl-8 group/ev cursor-pointer`}>
                                        <div className="space-y-2">
                                            <p className={`${ev.active ? 'text-mivn-gold' : 'text-slate-500'} text-[10px] font-black uppercase tracking-[0.2em]`}>{ev.date}</p>
                                            <p className="font-bold text-lg uppercase tracking-tight group-hover/ev:text-mivn-blue transition-colors">{ev.title}</p>
                                            <p className="text-xs text-white/40 italic font-light">{ev.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-12 bg-mivn-blue text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all">
                                Calendario Completo
                            </button>
                        </section>

                        {/* C. Quick Links */}
                        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-2xl">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Enlaces Rápidos</h3>
                            <ul className="space-y-6">
                                {[
                                    { label: "Donaciones y Diezmos", icon: Heart, href: "/dashboard/donations" },
                                    { label: "Soporte Pastoral", icon: Users, href: "/soporte" },
                                    { label: "Recursos Digitales", icon: BookOpen, href: "/recursos" },
                                    ...(isAdmin ? [{ label: "Panel Administrativo", icon: Shield, href: "/admin" }] : [])
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="flex items-center gap-5 text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-mivn-blue transition-all group">
                                            <div className="w-10 h-10 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-mivn-blue group-hover:scale-110 transition-transform">
                                                <link.icon className="w-4 h-4" />
                                            </div>
                                            <span className="uppercase tracking-tight">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </aside>

                </div>

                {/* Footer Section */}
                <footer className="mt-32 pt-16 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] gap-10">
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <ResetProgressButton />
                        <p>© 2026 Ministerio Internacional Vida Nueva</p>
                    </div>
                    <div className="flex gap-10">
                        <Link href="/terminos" className="hover:text-mivn-blue transition-colors">Términos</Link>
                        <Link href="/privacidad" className="hover:text-mivn-blue transition-colors">Privacidad</Link>
                        <Link href="/dashboard/profile" className="hover:text-mivn-gold transition-colors">Configuración</Link>
                    </div>
                </footer>

            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-8 py-5 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl">
                <Link href="/dashboard" className="text-mivn-blue"><LayoutDashboard className="w-6 h-6" /></Link>
                <Link href="/read" className="text-slate-400"><BookOpen className="w-6 h-6" /></Link>
                <Link href="/en-vivo" className="text-slate-400"><MessageSquare className="w-6 h-6" /></Link>
                <Link href="/grupos" className="text-slate-400"><Users className="w-6 h-6" /></Link>
                <Link href="/dashboard/profile" className="text-slate-400"><User className="w-6 h-6" /></Link>
                {isAdmin && <Link href="/admin" className="text-mivn-gold animate-pulse"><Shield className="w-6 h-6" /></Link>}
            </div>

        </div>
    );
}

function PersonalHeart(props: any) {
    return <Heart {...props} />;
}
