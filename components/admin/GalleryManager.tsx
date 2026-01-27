"use client";

import {
    Camera,
    Upload,
    ImageIcon,
    MoreHorizontal,
    Plus,
    Loader2,
    Calendar,
    Image as PhotoIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner"; // Assuming sonner is used, or basic alert

// Define basic types locally if not importing specific ones yet, or use any for speed then refine
type Album = {
    id: string;
    title: string;
    description: string | null;
    cover_image_url: string | null;
    created_at: string;
    photos_count?: number;
};

export function GalleryManager() {
    const supabase = createClient();
    const router = useRouter();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlbumTitle, setNewAlbumTitle] = useState("");
    const [newAlbumDesc, setNewAlbumDesc] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        setLoading(true);
        // We might want to join with photos to get count, but for now just fetch albums
        // A simple way to get count is a subquery or separate query, but let's just fetch albums first.
        const { data, error } = await supabase
            .from('gallery_albums')
            .select(`
                *,
                photos:gallery_photos(count)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            // toast.error("Error cargando álbumes");
        } else {
            // Transform to include count directly
            const formatted = data.map((a: any) => ({
                ...a,
                photos_count: a.photos?.[0]?.count || 0
            }));
            setAlbums(formatted);
        }
        setLoading(false);
    };

    const handleCreateAlbum = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('gallery_albums')
            .insert({
                title: newAlbumTitle,
                description: newAlbumDesc,
                created_by: user.id
            })
            .select()
            .single();

        if (error) {
            alert("Error al crear álbum: " + error.message);
        } else {
            setNewAlbumTitle("");
            setNewAlbumDesc("");
            setShowCreateModal(false);
            fetchAlbums(); // Refresh list
            // Optionally redirect to the new album immediately
            // router.push(`/admin/gallery/${data.id}`); 
        }
        setCreating(false);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Galería</span>
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-2xl">
                        Administre las fotos y álbumes visibles en la galería pública.
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4" /> Nuevo Álbum
                </button>
            </div>

            {/* Content */}
            <div className="min-h-[50vh]">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 text-mivn-blue animate-spin" />
                    </div>
                ) : albums.length === 0 ? (
                    <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 border-dashed">
                        <ImageIcon className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2">No hay álbumes creados</h4>
                        <p className="text-slate-400 italic max-w-md mx-auto mb-8">
                            Comienza creando tu primer álbum para subir fotos.
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                        >
                            Crear Álbum
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map((album) => (
                            <Link
                                href={`/admin/gallery/${album.id}`}
                                key={album.id}
                                className="group block bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-mivn-blue/30 transition-all duration-300"
                            >
                                {/* Cover Image area */}
                                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                    {album.cover_image_url ? (
                                        <Image
                                            src={album.cover_image_url}
                                            alt={album.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
                                            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Sin Portada</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-white font-playfair font-bold text-xl mb-1 truncate">{album.title}</h3>
                                        <div className="flex items-center gap-4 text-white/70 text-[10px] font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><PhotoIcon className="w-3 h-3" /> {album.photos_count || 0} Fotos</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(album.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-playfair font-black text-slate-900 dark:text-white mb-2">Nuevo Álbum</h3>
                        <p className="text-slate-500 mb-8">Crea una colección para organizar tus fotos.</p>

                        <form onSubmit={handleCreateAlbum} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Título</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={newAlbumTitle}
                                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                                    placeholder="Ej. Bautizos 2024"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Descripción (Opcional)</label>
                                <textarea
                                    value={newAlbumDesc}
                                    onChange={(e) => setNewAlbumDesc(e.target.value)}
                                    placeholder="Breve descripción del evento..."
                                    rows={3}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none font-medium resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex-1 bg-mivn-blue text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-mivn-blue/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {creating ? "Creando..." : "Crear Álbum"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
