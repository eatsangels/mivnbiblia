"use client";

import { useState, useMemo } from "react";
import {
    MapPin, Plus, Minus, Crosshair, Users, ChevronDown,
    Map, ChevronRight, Calendar, User, Search, Clock,
    Music, Heart, BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type SmallGroup } from "@/app/(estudio)/admin/groups/actions";

interface GroupsExplorerProps {
    initialGroups: SmallGroup[];
}

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'jóvenes': return User;
        case 'parejas': return Users;
        case 'alabanza': return Music;
        case 'oración': return Heart;
        case 'estudio': return BookOpen;
        case 'niños': return User;
        default: return Users;
    }
};

export function GroupsExplorer({ initialGroups }: GroupsExplorerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Todos");

    const categories = ["Todos", "Jóvenes", "Parejas", "Alabanza", "Oración", "Estudio", "Niños"];

    const filteredGroups = useMemo(() => {
        return initialGroups.filter(group => {
            const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (group.location?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (group.leader.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = categoryFilter === "Todos" ||
                group.category.toLowerCase() === categoryFilter.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [initialGroups, searchQuery, categoryFilter]);

    const scrollToGroups = () => {
        const element = document.getElementById('results-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col md:row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Pane: Interactive Map */}
            <section className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full bg-slate-200">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Mapa de la ciudad"
                        fill
                        className="object-cover opacity-80"
                    />

                    {/* Dynamic Pins - Conceptual positioning based on ID parity/count */}
                    {filteredGroups.slice(0, 5).map((group, i) => (
                        <div
                            key={group.id}
                            style={{
                                top: `${20 + (i * 15) % 60}%`,
                                left: `${20 + (i * 20) % 60}%`
                            }}
                            className="absolute text-mivn-gold drop-shadow-xl cursor-pointer hover:scale-125 transition-transform group"
                            onClick={() => {
                                const el = document.getElementById(`group-${group.id}`);
                                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                        >
                            <MapPin className="w-10 h-10 fill-current" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100 dark:border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest">{group.name}</p>
                            </div>
                        </div>
                    ))}
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
                <button
                    onClick={scrollToGroups}
                    className="absolute bottom-8 right-8 bg-mivn-gold text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all z-10 group border-2 border-white/20 backdrop-blur-sm"
                >
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border ${categoryFilter === cat
                                    ? 'bg-mivn-blue text-white border-mivn-blue shadow-lg shadow-mivn-blue/20'
                                    : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat === "Todos" ? <Users className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4" id="results-list">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 pl-1">
                        {filteredGroups.length} Grupos encontrados
                    </p>

                    {filteredGroups.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                            <Users className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                            <p className="text-slate-400 font-medium italic">No hay grupos que coincidan con tu búsqueda.</p>
                        </div>
                    ) : (
                        filteredGroups.map((group) => {
                            const CategoryIcon = getCategoryIcon(group.category);

                            return (
                                <div
                                    key={group.id}
                                    id={`group-${group.id}`}
                                    className="bg-white dark:bg-white/5 p-5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-mivn-blue/50 dark:hover:border-mivn-blue/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-mivn-blue/5"
                                >
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
                                        <Link
                                            href={`/contacto?interest=group&group_id=${group.id}`}
                                            className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-mivn-blue group-hover:text-white transition-all duration-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Link>
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
