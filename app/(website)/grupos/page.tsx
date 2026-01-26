import { MapPin, Plus, Minus, Crosshair, Users, ChevronDown, Map, ChevronRight, Calendar, User, Search, Clock, Music, Heart, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getSmallGroups } from "@/app/(estudio)/admin/groups/actions";

export const metadata: Metadata = {
    title: "Mapa de Grupos Pequeños | Ministerio Internacional Vida Nueva",
    description: "Encuentra un grupo de crecimiento cerca de ti y conéctate con la comunidad.",
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'jóvenes': return User;
        case 'parejas': return Users;
        case 'alabanza': return Music;
        case 'oración': return Heart;
        case 'estudio': return BookOpen;
        case 'niños': return User; // Or a Kid icon if available
        default: return Users;
    }
};

export default async function GruposPage() {
    // Fetch groups from database
    const groups = await getSmallGroups();

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Pane: Interactive Map */}
            <section className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full bg-slate-200">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Mapa de la ciudad"
                        fill
                        className="object-cover opacity-80"
                    />
                    {/* Simulated Pins */}
                    <div className="absolute top-1/4 left-1/3 text-mivn-gold drop-shadow-xl cursor-pointer hover:scale-110 transition-transform">
                        <MapPin className="w-10 h-10 fill-current" />
                    </div>
                    <div className="absolute top-1/2 left-1/4 text-mivn-gold drop-shadow-xl cursor-pointer hover:scale-110 transition-transform scale-125">
                        <MapPin className="w-10 h-10 fill-current" />
                    </div>
                    <div className="absolute top-2/3 left-1/2 text-mivn-gold drop-shadow-xl cursor-pointer hover:scale-110 transition-transform">
                        <MapPin className="w-10 h-10 fill-current" />
                    </div>
                    <div className="absolute top-1/3 left-3/4 text-mivn-gold drop-shadow-xl cursor-pointer hover:scale-110 transition-transform">
                        <MapPin className="w-10 h-10 fill-current" />
                    </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-3">
                    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-900/10 overflow-hidden border border-slate-100 dark:border-white/10">
                        <button className="p-3 border-b border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <Plus className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                        </button>
                        <button className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <Minus className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                        </button>
                    </div>
                    <button className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-2xl shadow-slate-900/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-slate-100 dark:border-white/10">
                        <Crosshair className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    </button>
                </div>

                {/* Floating CTA */}
                <button className="absolute bottom-8 right-8 bg-mivn-gold text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all z-10 group border-2 border-white/20 backdrop-blur-sm">
                    <Users className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Unirme a un grupo</span>
                </button>
            </section>

            {/* Right Pane: Sidebar */}
            <aside className="w-full md:w-[480px] bg-white dark:bg-slate-900 flex flex-col order-1 md:order-2 h-1/2 md:h-full border-l border-slate-200 dark:border-white/5 z-20 shadow-2xl relative">
                {/* Filter Header */}
                <div className="p-6 space-y-6 border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">Encuentra tu Comunidad</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Hay un grupo esperando por ti</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-mivn-blue transition-colors">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-mivn-blue/20 text-slate-900 dark:text-white placeholder:text-slate-400 font-medium transition-all"
                            placeholder="Buscar por zona o nombre..."
                            type="text"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-mivn-blue/10 text-mivn-blue border border-mivn-blue/20 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors hover:bg-mivn-blue/20">
                            <Calendar className="w-3 h-3" />
                            Día
                            <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
                            <User className="w-3 h-3" />
                            Edad
                            <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
                            <Users className="w-3 h-3" />
                            Ministerio
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 pl-1">
                        {groups.length} Grupos encontrados
                    </p>

                    {groups.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No hay grupos disponibles por el momento.</p>
                        </div>
                    ) : (
                        groups.map((group) => {
                            const CategoryIcon = getCategoryIcon(group.category);

                            return (
                                <div key={group.id} className="bg-white dark:bg-white/5 p-5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-mivn-blue/50 dark:hover:border-mivn-blue/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-mivn-blue/5">
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-md relative">
                                            {group.image_url ? (
                                                <Image
                                                    src={group.image_url}
                                                    alt={group.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                                    <Users className="w-6 h-6 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-900 dark:text-white truncate text-lg group-hover:text-mivn-blue transition-colors">
                                                {group.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                                                Líder: {group.leader}
                                            </p>
                                            <div className="flex items-center gap-4 mt-4">
                                                {group.schedule && (
                                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                                                        <Clock className="w-3 h-3 text-mivn-blue" />
                                                        {group.schedule}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                                                    <CategoryIcon className="w-3 h-3 text-mivn-gold" />
                                                    {group.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                                        <button className="text-mivn-blue text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                                            <Map className="w-4 h-4" />
                                            {group.location || 'Ver ubicación'}
                                        </button>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-mivn-blue group-hover:text-white transition-all duration-300">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Padding for bottom scroll */}
                    <div className="h-4" />
                </div>
            </aside>
        </div>
    );
}
