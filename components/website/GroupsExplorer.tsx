"use client";

import { useState, useMemo, useEffect } from "react";
import {
    MapPin, Plus, Minus, Crosshair, Users, ChevronDown,
    ChevronRight, Calendar, User, Search, Clock,
    Music, Heart, BookOpen, Map as MapIcon, Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type SmallGroup, joinGroup, getUserGroupStatus } from "@/app/(estudio)/admin/groups/actions";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const memberIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface GroupsExplorerProps {
    initialGroups: SmallGroup[];
    memberLocations?: any[];
}

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

const defaultCenter: [number, number] = [33.7490, -84.3880];

// Component to handle map center changes
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export function GroupsExplorer({ initialGroups, memberLocations = [] }: GroupsExplorerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Todos");
    const [selectedGroup, setSelectedGroup] = useState<SmallGroup | any | null>(null);
    const [showMembers, setShowMembers] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [userMembershipStatus, setUserMembershipStatus] = useState<Record<string, string | null>>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState<string | null>(null);

    // Leaflet needs to be initialized only on the client
    useEffect(() => {
        setIsMounted(true);
        const initUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                // Fetch initial statuses
                const statuses: Record<string, string | null> = {};
                for (const group of initialGroups) {
                    const status = await getUserGroupStatus(group.id);
                    statuses[group.id] = status;
                }
                setUserMembershipStatus(statuses);
            }
        };
        initUser();
    }, [initialGroups]);

    const handleJoinRequest = async (groupId: string, groupName: string) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para unirte");
            return;
        }

        setIsJoining(groupId);
        const result = await joinGroup(groupId);
        setIsJoining(null);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(`Solicitud enviada para ${groupName}`);
            setUserMembershipStatus(prev => ({ ...prev, [groupId]: 'pending' }));
        }
    };

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

    // const scrollToGroups = () => {
    //     const element = document.getElementById('results-list');
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    const mapCenter: [number, number] = selectedGroup && selectedGroup.latitude && selectedGroup.longitude
        ? [selectedGroup.latitude, selectedGroup.longitude]
        : defaultCenter;

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Pane: Interactive Map */}
            <section className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full bg-slate-200">
                <div className="absolute inset-0">
                    {!isMounted ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/50 p-8 text-center space-y-6">
                            <div className="relative">
                                <MapIcon className="w-20 h-20 text-slate-300 dark:text-slate-700 animate-pulse" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Preparando Mapa...</span>
                        </div>
                    ) : (
                        <MapContainer
                            center={defaultCenter}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ width: '100%', height: '100%' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <ChangeView center={mapCenter} zoom={selectedGroup ? 15 : 13} />

                            {filteredGroups.map((group) => {
                                if (!group.latitude || !group.longitude || !group.is_location_public) return null;
                                return (
                                    <Marker
                                        key={group.id}
                                        position={[group.latitude, group.longitude]}
                                        icon={customIcon}
                                        eventHandlers={{
                                            click: () => setSelectedGroup(group),
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-1 min-w-[150px]">
                                                <h3 className="font-bold text-slate-900 m-0">{group.name}</h3>
                                                <p className="text-xs text-slate-500 m-0">{group.location}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                                        <img
                                                            src={group.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80"}
                                                            alt={group.leader}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-700 truncate">{group.leader}</span>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {showMembers && memberLocations?.map((member) => (
                                <Marker
                                    key={member.id}
                                    position={[member.latitude, member.longitude]}
                                    icon={memberIcon}
                                    eventHandlers={{
                                        click: () => setSelectedGroup(member),
                                    }}
                                >
                                    <Popup>
                                        <div className="p-1 min-w-[150px]">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-mivn-blue/20">
                                                    <img
                                                        src={member.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80"}
                                                        alt={member.full_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <h3 className="font-bold text-slate-900 m-0 text-sm">{member.full_name}</h3>
                                            </div>
                                            <p className="text-[10px] text-slate-500 m-0 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                Miembro de la Comunidad
                                            </p>
                                            {member.address && (
                                                <p className="text-[10px] text-slate-400 mt-1 italic">{member.address}</p>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>

                {/* Map Controls (Custom logic for Leaflet) */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-3 z-[1000]">
                    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-900/10 overflow-hidden border border-slate-100 dark:border-white/10">
                        <button
                            className="p-3 border-b border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                            title="Aumentar Zoom"
                        >
                            <Plus className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                        </button>
                        <button
                            className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                            title="Disminuir Zoom"
                        >
                            <Minus className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                        </button>
                    </div>
                    <button
                        onClick={() => setSelectedGroup(null)}
                        className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-2xl shadow-slate-900/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-slate-100 dark:border-white/10"
                        title="Centrar Mapa"
                    >
                        <Crosshair className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    </button>
                </div>

                {/* Floating CTA */}
                <Link
                    href="/contacto?interest=group"
                    className="absolute bottom-8 right-8 bg-mivn-gold text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all z-[1000] group border-2 border-white/20 backdrop-blur-sm"
                >
                    <Users className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Unirme a un grupo</span>
                </Link>
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
                        <button
                            onClick={() => setShowMembers(!showMembers)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border ${showMembers
                                ? 'bg-mivn-blue/10 text-mivn-blue border-mivn-blue/20 shadow-lg'
                                : 'bg-slate-50 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10 opacity-50'
                                }`}
                        >
                            <MapPin className="w-3 h-3" />
                            Miembros
                        </button>
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
                                        <button
                                            onClick={() => {
                                                if (group.latitude && group.longitude && group.is_location_public) {
                                                    setSelectedGroup(group);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                            }}
                                            className="text-mivn-blue text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline decoration-2 underline-offset-4"
                                        >
                                            <MapIcon className="w-4 h-4" />
                                            {group.location || 'Ver ubicación'}
                                        </button>

                                        {userId ? (
                                            <button
                                                onClick={() => handleJoinRequest(group.id, group.name)}
                                                disabled={isJoining === group.id || !!userMembershipStatus[group.id]}
                                                className={`
                                                px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                                ${userMembershipStatus[group.id] === 'pending'
                                                        ? 'bg-amber-100 text-amber-600 cursor-default'
                                                        : userMembershipStatus[group.id] === 'approved'
                                                            ? 'bg-emerald-100 text-emerald-600 cursor-default'
                                                            : 'bg-mivn-blue text-white hover:scale-105 active:scale-95 shadow-lg shadow-mivn-blue/20'
                                                    }
                                                disabled:opacity-50
                                            `}
                                            >
                                                {isJoining === group.id ? 'Enviando...' :
                                                    userMembershipStatus[group.id] === 'pending' ? 'Pendiente' :
                                                        userMembershipStatus[group.id] === 'approved' ? 'Eres Miembro' :
                                                            'Solicitar Unirme'}
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/contacto?interest=group&group_name=${encodeURIComponent(group.name)}`}
                                                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-mivn-blue group-hover:text-white transition-all duration-300"
                                                title="Contactar para más información"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <div className="h-4" />
                </div>
            </aside>
        </div>
    );
}
