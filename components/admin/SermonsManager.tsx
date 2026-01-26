"use client";

import { useState } from "react";
import { Sermon, createSermon, updateSermon, deleteSermon } from "@/app/(estudio)/admin/gestion-web/mensajes-pastor/actions";
import {
    Video, Plus, Search, Calendar, User, MapPin,
    MoreVertical, Edit3, Trash2, X, Check, Loader2, PlayCircle, Clock
} from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";

interface SermonsManagerProps {
    initialSermons: Sermon[];
}

export function SermonsManager({ initialSermons }: SermonsManagerProps) {
    const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Form state
    const [formData, setFormData] = useState<Partial<Sermon>>({
        title: "",
        pastor_name: "",
        date: new Date().toISOString().split('T')[0],
        duration: "",
        video_url: "",
        image_url: "",
        is_active: true
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const filteredSermons = sermons.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.pastor_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (editingId) {
                const res = await updateSermon(editingId, formData);
                if (res.error) throw new Error(res.error);

                toast.success("Mensaje actualizado");
                setSermons(prev => prev.map(s => s.id === editingId ? { ...s, ...formData } : s));
            } else {
                const res = await createSermon(formData as any); // Cast for insert
                if (res.error) throw new Error(res.error);

                toast.success("Mensaje creado");
                if (res.data) setSermons(prev => [res.data, ...prev]);
            }
            setIsEditing(false);
            setEditingId(null);
            resetForm();
        } catch (error: any) {
            toast.error(error.message || "Error al guardar");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este mensaje?")) return;

        setIsLoading(true);
        try {
            const res = await deleteSermon(id);
            if (res.error) throw new Error(res.error);

            toast.success("Mensaje eliminado");
            setSermons(prev => prev.filter(s => s.id !== id));
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (sermon: Sermon) => {
        setFormData({
            title: sermon.title,
            pastor_name: sermon.pastor_name,
            date: sermon.date,
            duration: sermon.duration,
            video_url: sermon.video_url,
            image_url: sermon.image_url,
            is_active: sermon.is_active
        });
        setEditingId(sermon.id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            pastor_name: "",
            date: new Date().toISOString().split('T')[0],
            duration: "",
            video_url: "",
            image_url: "",
            is_active: true
        });
        setEditingId(null);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)] animate-in fade-in zoom-in-95 duration-500">
            {/* Left: List */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-white/[0.01]">
                    <div>
                        <h2 className="text-xl font-playfair font-black text-slate-900 dark:text-white mb-2">Mensajes del Pastor</h2>
                        <p className="text-xs text-slate-500 font-medium">{sermons.length} Mensajes publicados</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsEditing(true); }}
                        className="flex items-center gap-2 bg-mivn-blue text-white py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Mensaje
                    </button>
                </div>

                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar por título o predicador..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {filteredSermons.map(sermon => (
                        <div key={sermon.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-mivn-blue/50 transition-all shadow-sm">
                            <div className="flex gap-4">
                                <div className="w-24 aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden relative shrink-0">
                                    {sermon.image_url ? (
                                        <img src={sermon.image_url} alt={sermon.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Video className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white truncate">{sermon.title}</h3>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(sermon)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 hover:text-mivn-blue transition-colors">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(sermon.id)} className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg text-slate-500 hover:text-rose-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                            <User className="w-3 h-3" /> {sermon.pastor_name}
                                        </span>
                                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                            <Calendar className="w-3 h-3" /> {new Date(sermon.date).toLocaleDateString()}
                                        </span>
                                        {sermon.duration && (
                                            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                                <Clock className="w-3 h-3" /> {sermon.duration}
                                            </span>
                                        )}
                                    </div>

                                    {!sermon.is_active && (
                                        <span className="text-[8px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-black uppercase">Inactivo</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredSermons.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <p>No se encontraron mensajes</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Form (Sidebar) */}
            {isEditing && (
                <div className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.01]">
                        <h3 className="font-playfair font-bold text-lg text-slate-900 dark:text-white">
                            {editingId ? "Editar Mensaje" : "Nuevo Mensaje"}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Título</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                                placeholder='Ej: "Caminando en Fe"'
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Pastor</label>
                            <input
                                required
                                value={formData.pastor_name}
                                onChange={e => setFormData({ ...formData, pastor_name: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                                placeholder='Ej: "Pastor David"'
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fecha</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duración</label>
                                <input
                                    value={formData.duration || ""}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                                    placeholder='Ej: "45 min"'
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Video URL (YouTube)</label>
                            <input
                                value={formData.video_url || ""}
                                onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-mivn-blue transition-colors"
                                placeholder='https://youtube.com/...'
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Imagen (Thumbnail)</label>
                            <ImageUploader
                                currentImage={formData.image_url || undefined}
                                onUploadComplete={(url: string) => setFormData({ ...formData, image_url: url })}
                                folder="sermons"
                            />
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={!!formData.is_active}
                                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5 rounded border-slate-300 text-mivn-blue focus:ring-mivn-blue"
                            />
                            <label htmlFor="is_active" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex-1">
                                Mensaje Activo (Visible en Dashboard)
                            </label>
                        </div>
                    </form>

                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.01]">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            {editingId ? "Guardar Cambios" : "Publicar Mensaje"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
