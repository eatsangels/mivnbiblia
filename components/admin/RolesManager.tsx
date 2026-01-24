"use client";

import { useState } from "react";
import {
    ShieldCheck, Users, Lock, ChevronRight, Plus,
    Search, Filter, MoreHorizontal, Check, X,
    AlertCircle, FileText, Download, Trash2, Edit3, Settings
} from "lucide-react";

type Permission = "view" | "create" | "edit" | "delete" | "export";

interface ModulePermissions {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    enabled: Permission[];
}

interface Role {
    id: string;
    name: string;
    description: string;
    usersCount: number;
    color: string;
    isSystem?: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    roleId: string;
    avatar?: string;
    status: "active" | "inactive";
}

export function RolesManager() {
    const [activeRole, setActiveRole] = useState<string>("admin");
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Data
    const roles: Role[] = [
        { id: "super_admin", name: "Súper Admin", description: "Acceso total al sistema", usersCount: 2, color: "bg-purple-500", isSystem: true },
        { id: "admin", name: "Administrador", description: "Gestión general y configuración", usersCount: 5, color: "bg-blue-500" },
        { id: "editor", name: "Editor de Contenido", description: "Publicación de eventos y noticias", usersCount: 8, color: "bg-emerald-500" },
        { id: "treasurer", name: "Tesorero", description: "Gestión de finanzas y donaciones", usersCount: 3, color: "bg-amber-500" },
        { id: "pastor", name: "Pastor", description: "Acceso a datos de miembros y reportes", usersCount: 4, color: "bg-slate-500" },
    ];

    const modules: ModulePermissions[] = [
        { id: "dashboard", name: "Dashboard", description: "Vista general y estadísticas", permissions: ["view", "export"], enabled: ["view"] },
        { id: "users", name: "Miembros", description: "Gestión de usuarios y perfiles", permissions: ["view", "create", "edit", "delete", "export"], enabled: ["view", "create", "edit"] },
        { id: "finance", name: "Finanzas", description: "Control de diezmos y ofrendas", permissions: ["view", "create", "edit", "delete", "export"], enabled: ["view", "create"] },
        { id: "events", name: "Eventos", description: "Calendario y registro de actividades", permissions: ["view", "create", "edit", "delete"], enabled: ["view", "create", "edit", "delete"] },
        { id: "content", name: "Contenido Web", description: "Gestión del sitio web público", permissions: ["view", "create", "edit", "delete"], enabled: ["view", "edit"] },
        { id: "settings", name: "Configuración", description: "Ajustes globales del sistema", permissions: ["view", "edit"], enabled: ["view"] },
    ];

    const users: User[] = [
        { id: "1", name: "Juan Pérez", email: "juan@mivn.org", roleId: "admin", status: "active" },
        { id: "2", name: "María Gómez", email: "maria@mivn.org", roleId: "admin", status: "active" },
        { id: "3", name: "Carlos López", email: "carlos@mivn.org", roleId: "editor", status: "inactive" },
    ];

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 animate-in fade-in zoom-in-95 duration-500">

            {/* Left Sidebar: Roles List */}
            <div className="w-80 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-playfair font-black text-slate-900 dark:text-white mb-2">Roles y Accesos</h2>
                    <p className="text-xs text-slate-500 font-medium">Gestiona los niveles de autoridad en la plataforma.</p>
                    <button className="mt-6 w-full flex items-center justify-center gap-2 bg-mivn-blue text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4" /> Crear Nuevo Rol
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setActiveRole(role.id)}
                            className={`w-full text-left p-4 rounded-2xl transition-all group relative border ${activeRole === role.id
                                    ? "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm"
                                    : "border-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${activeRole === role.id ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500"
                                    }`}>
                                    {role.usersCount} Usuarios
                                </span>
                                {role.isSystem && <Lock className="w-3 h-3 text-slate-300" />}
                            </div>
                            <h3 className={`font-bold mb-1 ${activeRole === role.id ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-gray-400"}`}>
                                {role.name}
                            </h3>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium line-clamp-2">
                                {role.description}
                            </p>
                            {activeRole === role.id && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-mivn-blue rounded-r-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Center: Permissions Matrix */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl p-8 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${roles.find(r => r.id === activeRole)?.color}`}>
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-playfair font-black text-slate-900 dark:text-white mb-1">
                                {roles.find(r => r.id === activeRole)?.name}
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg">
                                    ID: {roles.find(r => r.id === activeRole)?.id}
                                </span>
                                {roles.find(r => r.id === activeRole)?.isSystem && (
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Sistema
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-mivn-blue hover:border-mivn-blue transition-all">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] shadow-xl hover:scale-105 transition-all">
                            <SaveIcon className="w-4 h-4" /> Guardar Cambios
                        </button>
                    </div>
                </div>

                {/* Matrix */}
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-white/[0.01]">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Matriz de Permisos</h3>
                            <p className="text-xs text-slate-500 mt-1">Define qué acciones puede realizar este rol en cada módulo.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">
                                Seleccionar Todo
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Módulo</th>
                                    <th className="text-center py-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">Ver</th>
                                    <th className="text-center py-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">Crear</th>
                                    <th className="text-center py-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">Editar</th>
                                    <th className="text-center py-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">Eliminar</th>
                                    <th className="text-center py-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">Exportar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {modules.map((module) => (
                                    <tr key={module.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold text-slate-800 dark:text-gray-200 text-sm">{module.name}</div>
                                                <AlertCircle className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{module.description}</p>
                                        </td>
                                        {["view", "create", "edit", "delete", "export"].map((perm) => (
                                            <td key={perm} className="text-center py-4 px-2">
                                                {module.permissions.includes(perm as Permission) ? (
                                                    <div className="flex justify-center">
                                                        <label className="relative cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="peer sr-only"
                                                                defaultChecked={module.enabled.includes(perm as Permission)}
                                                            />
                                                            <div className="w-6 h-6 border-2 border-slate-200 dark:border-slate-600 rounded-lg peer-checked:bg-mivn-blue peer-checked:border-mivn-blue transition-all flex items-center justify-center">
                                                                <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all duration-300" strokeWidth={3} />
                                                            </div>
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center opacity-20">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Quick Users & Logs */}
            <div className="w-80 flex flex-col gap-6">

                {/* Users In Role */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex-1 flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-playfair font-black text-slate-900 dark:text-white">Usuarios Asignados</h3>
                        <div className="relative mt-4">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs font-bold outline-none focus:border-mivn-blue transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {users.map(user => (
                            <div key={user.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-500">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</h4>
                                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                </div>
                                <button className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-mivn-blue hover:text-mivn-blue transition-all">
                            Asignar Usuario
                        </button>
                    </div>
                </div>

                {/* Audit Log Mini */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl p-6 h-1/3 flex flex-col">
                    <h3 className="font-playfair font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" /> Logs Recientes
                    </h3>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                <div>
                                    <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium leading-snug">
                                        <span className="text-slate-900 dark:text-white font-bold">Juan P.</span> modificó permisos de <span className="text-mivn-blue">Finanzas</span>.
                                    </p>
                                    <span className="text-[9px] text-slate-400">Hace 2 horas</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

function SaveIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    )
}
