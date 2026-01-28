"use client";

import {
    Calendar as CalendarIcon, Edit3, MapPin, User, ChevronLeft, ChevronRight,
    Download, TrendingUp, Users, CheckCircle2, AlertCircle, PlusCircle, Trash2
} from "lucide-react";

import Link from "next/link";
import { useState, useTransition, useRef, useEffect } from "react";
import { createEvent, updateEvent, deleteEvent } from "@/app/(estudio)/admin/events/actions";
import { FormCloudinaryUpload } from "@/components/ui/FormCloudinaryUpload";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export interface EventManagerProps {
    initialEvents: any[];
}

import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function EventManager({ initialEvents }: EventManagerProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [events, setEvents] = useState<any[]>(initialEvents);
    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Sync state with props when router.refresh() happens
    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);
    const formSectionRef = useRef<HTMLDivElement>(null);

    const handleScrollToForm = () => {
        formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleEditClick = (event: any) => {
        setEditingEvent(event);
        handleScrollToForm();
        setTimeout(() => { }, 100);
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
        formRef.current?.reset();
    };

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteEvent(id);
            if (result.success) {
                toast.success("Evento eliminado exitosamente");
                router.refresh();
                if (editingEvent?.id === id) {
                    setEditingEvent(null);
                    formRef.current?.reset();
                }
            } else {
                toast.error("Error: " + result.errorMsg);
            }
        });
    };

    const handleSubmit = (formData: FormData) => {
        const imageRaw = formData.get("image_url");

        const datePart = formData.get("date_part") as string;
        const timePart = formData.get("time_part") as string;

        if (datePart && timePart) {
            const combined = new Date(`${datePart}T${timePart}`);
            formData.set("date", combined.toISOString());
        }

        const action = editingEvent ? updateEvent : createEvent;

        if (editingEvent) {
            formData.append("id", editingEvent.id);
        }

        const promise = new Promise(async (resolve, reject) => {
            const result = await action(formData);
            if (result.success) {
                router.refresh();
                if (editingEvent) {
                    setEditingEvent(null);
                    formRef.current?.reset();
                } else {
                    formRef.current?.reset();
                }
                resolve(true);
            } else {
                reject(result.errorMsg);
            }
        });

        toast.promise(promise, {
            loading: editingEvent ? 'Actualizando evento...' : 'Creando evento...',
            success: editingEvent ? 'Evento actualizado exitosamente' : 'Evento creado exitosamente',
            error: (err: any) => `Error: ${err}`
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Eventos</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Administra y calendariza los eventos del Ministerio Internacional Vida Nueva.
                    </p>
                </div>
                <button
                    onClick={handleScrollToForm}
                    className="flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                    <PlusCircle className="w-5 h-5" /> Nuevo Evento
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-4 space-y-6" ref={formSectionRef}>
                    {/* Create/Edit Event Form */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-xl font-bold font-playfair text-slate-900 dark:text-white flex items-center gap-3">
                                {editingEvent ? <Edit3 className="w-5 h-5 text-mivn-gold" /> : <PlusCircle className="w-5 h-5 text-mivn-blue" />}
                                {editingEvent ? "Editar Evento" : "Crear Nuevo Evento"}
                            </h2>
                            {editingEvent && (
                                <button onClick={handleCancelEdit} className="text-xs text-rose-500 font-bold hover:underline">
                                    Cancelar
                                </button>
                            )}
                        </div>

                        <form
                            ref={formRef}
                            key={editingEvent ? editingEvent.id : 'new'}
                            action={handleSubmit}
                            className="space-y-6"
                        >
                            {editingEvent && <input type="hidden" name="id" value={editingEvent.id} />}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Título del Evento</label>
                                <input
                                    name="title"
                                    required
                                    defaultValue={editingEvent?.title || ""}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-400 placeholder:font-normal"
                                    placeholder="Ej: Gran Congreso de Alabanza"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Descripción del Evento</label>
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={editingEvent?.description || ""}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-400 placeholder:font-normal h-32 resize-none"
                                    placeholder="Describe los detalles del evento..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Imagen del Evento</label>
                                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
                                    <FormCloudinaryUpload
                                        name="image_url"
                                        label="Arrastra o selecciona una imagen"
                                        defaultValue={editingEvent?.image_url || editingEvent?.image || ""}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-2">
                                    <Sparkles className={`w-5 h-5 ${editingEvent?.is_featured ? 'text-mivn-gold' : 'text-slate-400'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Mostrar en Inicio</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer ml-auto">
                                    <input type="checkbox" name="is_featured" className="sr-only peer" defaultChecked={editingEvent?.is_featured} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-mivn-gold"></div>
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Fecha</label>
                                    <input
                                        type="date"
                                        name="date_part"
                                        required
                                        defaultValue={(() => {
                                            const dateVal = editingEvent?.start_time || editingEvent?.event_date;
                                            if (!dateVal) return "";
                                            try {
                                                const date = new Date(dateVal);
                                                return date.toISOString().slice(0, 10);
                                            } catch (e) { return ""; }
                                        })()}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Hora</label>
                                    <input
                                        type="time"
                                        name="time_part"
                                        required
                                        defaultValue={(() => {
                                            const dateVal = editingEvent?.start_time || editingEvent?.event_date;
                                            if (!dateVal) return "19:30";
                                            try {
                                                const date = new Date(dateVal);
                                                // Adjust to local time string for input type=time
                                                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                                                return localDate.toISOString().slice(11, 16);
                                            } catch (e) { return "19:30"; }
                                        })()}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold appearance-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Categoría</label>
                                    <select
                                        name="category"
                                        defaultValue={editingEvent?.category || "Culto"}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold text-sm appearance-none cursor-pointer"
                                    >
                                        <option>Culto</option>
                                        <option>Taller</option>
                                        <option>Congreso</option>
                                        <option>Especial</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Capacidad</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        defaultValue={editingEvent?.capacity || ""}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ubicación</label>
                                <div className="relative">
                                    <MapPin className="absolute left-5 top-4 w-5 h-5 text-slate-400" />
                                    <input
                                        name="location"
                                        defaultValue={editingEvent?.location || ""}
                                        className="w-full pl-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pr-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="Templo Principal"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Orador Invitado</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-4 w-5 h-5 text-slate-400" />
                                    <input
                                        name="speaker"
                                        defaultValue={editingEvent?.speaker || ""}
                                        className="w-full pl-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pr-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="Nombre del Invitado"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className={`w-full text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[1.5rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed ${editingEvent ? 'bg-mivn-gold shadow-mivn-gold/20' : 'bg-mivn-blue shadow-mivn-blue/20'}`}>
                                {isPending ? (editingEvent ? "Guardando..." : "Programando...") : (editingEvent ? "Guardar Cambios" : "Programar Evento")}
                            </button>
                        </form>
                    </div>

                    {/* Mini Stats */}
                    <div className="bg-mivn-blue/5 border border-mivn-blue/10 rounded-[2.5rem] p-8 space-y-6">
                        <h3 className="text-mivn-blue font-black uppercase tracking-widest text-xs">Resumen Mensual</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Total Eventos</span>
                                <span className="text-slate-900 dark:text-white font-bold text-xl">{initialEvents.length}</span>
                            </div>
                            <div className="w-full h-px bg-mivn-blue/10" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Próximos</span>
                                <span className="text-mivn-gold font-bold text-xl">
                                    {initialEvents.filter(e => new Date(e.event_date) >= new Date()).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content: Calendar & List */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Calendar Component */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                                </button>
                                <h3 className="text-2xl font-playfair font-black text-slate-900 dark:text-white">
                                    {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                                    <ChevronRight className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                            <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-1.5 flex gap-1">
                                {['Mes', 'Semana', 'Día'].map((view, i) => (
                                    <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white dark:bg-slate-800 text-mivn-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                        {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="p-12 text-center text-slate-400 italic">
                            El calendario interactivo se cargará con los {initialEvents.length} eventos registrados.
                        </div>
                    </div>

                    {/* Upcoming List */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-black text-slate-900 dark:text-white">Próximos Eventos</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-6">Evento</th>
                                        <th className="px-8 py-6">Categoría</th>
                                        <th className="px-8 py-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {initialEvents.length > 0 ? (
                                        initialEvents.map((event, i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{event.title}</span>
                                                        <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">
                                                            {new Date(event.event_date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                            <span className="mx-2">•</span>
                                                            {event.start_time ? new Date(event.start_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Hora por definir'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border text-mivn-blue bg-mivn-blue/10 border-mivn-blue/20`}>
                                                        {event.category || 'Evento'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditClick(event)}
                                                            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-mivn-blue hover:text-white transition-all">
                                                            <Edit3 className="w-3 h-3" /> Editar
                                                        </button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <button
                                                                    className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="font-playfair font-black text-xl">¿Estás seguro absoluta?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el evento <strong>{event.title}</strong> de la base de datos.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="rounded-xl font-bold">Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(event.id)}
                                                                        className="bg-red-500 text-white rounded-xl font-black uppercase tracking-widest hover:bg-red-600">
                                                                        Sí, Eliminar
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-12 text-center text-slate-400 italic">No hay eventos programados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
