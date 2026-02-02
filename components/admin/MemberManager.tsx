"use client";

import {
    Users, UserPlus, Search, Filter, Mail, Phone, MoreHorizontal,
    CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Edit, MessageSquare
} from "lucide-react";
import { useState } from "react";
import { MemberEditDialog } from "./MemberEditDialog";

export interface MemberManagerProps {
    initialMembers: any[];
    stats: {
        total: number;
        leaders: number;
        newConverted: number;
    };
}

export function MemberManager({ initialMembers, stats }: MemberManagerProps) {
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeMinistry, setActiveMinistry] = useState("Todos los Ministerios");

    const handleEditClick = (member: any) => {
        setSelectedMember(member);
        setIsEditOpen(true);
    };

    const filteredMembers = initialMembers.filter(member => {
        const matchesSearch =
            member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesMinistry =
            activeMinistry === "Todos los Ministerios" ||
            member.ministry === activeMinistry;

        return matchesSearch && matchesMinistry;
    });

    return (
        <>
            <MemberEditDialog
                key={selectedMember?.id || 'new'}
                member={selectedMember}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
            <div className="space-y-8 animate-in fade-in duration-700">
                {/* Page Heading */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                            Gestión de <span className="text-mivn-blue italic">Miembros</span>
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                            Base de datos centralizada de la congregación MIVN.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                                className="w-full pl-10 bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3 text-sm font-medium focus:ring-2 focus:ring-mivn-blue/20 transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                                placeholder="Buscar por nombre, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-mivn-gold text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-mivn-gold/20 hover:scale-105 transition-all">
                            <UserPlus className="w-4 h-4" /> Nuevo
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Miembros</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.total.toLocaleString()}</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">+5.2%</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-mivn-blue/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-mivn-blue" />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Líderes Activos</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.leaders.toLocaleString()}</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">+2.1%</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-mivn-gold/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-mivn-gold" />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nuevos Convertidos</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.newConverted.toLocaleString()}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Este mes</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {['Todos los Ministerios', 'Ministerio Juvenil', 'Alabanza', 'Niños', 'Intercesión', 'Diaconado', 'Evangelismo'].map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveMinistry(filter)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeMinistry === filter ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-mivn-blue hover:text-mivn-blue'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Members Table */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Miembro</th>
                                    <th className="px-8 py-6">Contacto</th>
                                    <th className="px-8 py-6">Ministerio</th>
                                    <th className="px-8 py-6">Estado</th>
                                    <th className="px-8 py-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member, i) => (
                                        <tr key={member.id || i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold text-slate-500 text-sm uppercase">
                                                        {member.full_name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{member.full_name}</p>
                                                        <p className="text-xs text-slate-400">{member.role || 'Miembro'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                        <Mail className="w-3 h-3" /> {member.email || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${member.ministry ? 'bg-mivn-blue/10 text-mivn-blue' : 'bg-slate-100 text-slate-400'}`}>
                                                    {member.ministry || 'Sin Asignar'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full bg-emerald-500`}></div>
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Activo</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/5 rounded-xl transition-all">
                                                        <MessageSquare className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClick(member)}
                                                        className="p-2 text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/5 rounded-xl transition-all"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">No se encontraron miembros</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Mostrando <span className="text-slate-900 dark:text-white">1-{filteredMembers.length}</span> de <span className="text-slate-900 dark:text-white">{stats.total}</span>
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors disabled:opacity-50" disabled>
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                    MIVN Database v2.4.0
                </p>
            </div>
        </>
    );
}
