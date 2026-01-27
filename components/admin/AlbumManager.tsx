"use client";

import {
    ArrowLeft,
    Upload,
    Trash2,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signCloudinaryParameters, deleteImage } from "@/app/actions/cloudinary";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

export function AlbumManager({ albumId }: { albumId: string }) {
    const supabase = createClient();
    const router = useRouter();
    const [album, setAlbum] = useState<any>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Edit mode for album details
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: "", description: "" });

    // Delete states
    const [photoToDelete, setPhotoToDelete] = useState<{ id: string, publicId: string | null } | null>(null);
    const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);

    useEffect(() => {
        fetchAlbumDetails();
    }, [albumId]);

    const fetchAlbumDetails = async () => {
        setLoading(true);
        // Fetch Album
        const { data: albumData, error: albumError } = await supabase
            .from('gallery_albums')
            .select('*')
            .eq('id', albumId)
            .single();

        if (albumError) {
            console.error("Error fetching album", albumError);
            router.push('/admin/gallery');
            return;
        }

        setAlbum(albumData);
        setEditForm({ title: albumData.title, description: albumData.description || "" });

        // Fetch Photos
        const { data: photosData } = await supabase
            .from('gallery_photos')
            .select('*')
            .eq('album_id', albumId)
            .order('created_at', { ascending: false });

        if (photosData) {
            setPhotos(photosData);
        }
        setLoading(false);
    };

    const handlePhotoUpload = async (url: string, publicId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from('gallery_photos')
                .insert({
                    album_id: albumId,
                    url: url,
                    public_id: publicId,
                    uploaded_by: user.id
                });

            if (dbError) throw dbError;

            // 2. Update Album Cover if needed
            if (photos.length === 0 && !album.cover_image_url) {
                await supabase
                    .from('gallery_albums')
                    .update({
                        cover_image_url: url,
                        cover_image_public_id: publicId
                    })
                    .eq('id', albumId);
            }

            fetchAlbumDetails(); // Refresh
            toast.success("Foto añadida correctamente");
        } catch (error) {
            console.error("Upload process error", error);
            toast.error("Error al guardar en la base de datos");
        }
    };

    const confirmDeletePhoto = async () => {
        if (!photoToDelete) return;

        const { id, publicId } = photoToDelete;

        // 1. Delete from Cloudinary if public_id exists
        if (publicId) {
            const { success, error } = await deleteImage(publicId);
            if (!success) {
                console.error("Failed to delete from Cloudinary", error);
                // We might still want to delete from DB or warn user
            }
        }

        // 2. Delete from DB
        await supabase.from('gallery_photos').delete().eq('id', id);

        // 3. Update local state
        setPhotos(photos.filter(p => p.id !== id));
        setPhotoToDelete(null);
    };

    const confirmDeleteAlbum = async () => {
        setLoading(true);

        // 1. Delete all images from Cloudinary
        // Ideally we'd loop through all photos and delete from Cloudinary
        for (const photo of photos) {
            if (photo.public_id) {
                await deleteImage(photo.public_id);
            }
        }

        // 2. Delete from DB
        // Cascade delete on `gallery_albums` would be better, but doing manual cleanup for now
        await supabase.from('gallery_photos').delete().eq('album_id', albumId);
        await supabase.from('gallery_albums').delete().eq('id', albumId);

        router.push('/admin/gallery');
    };

    const handleUpdateAlbum = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('gallery_albums').update({
            title: editForm.title,
            description: editForm.description
        }).eq('id', albumId);

        if (!error) {
            setAlbum({ ...album, title: editForm.title, description: editForm.description });
            setIsEditing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 text-mivn-blue animate-spin" />
            </div>
        );
    }

    if (!album) return <div>Álbum no encontrado</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* Nav */}
            <div className="flex items-center gap-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors w-fit">
                <Link href="/admin/gallery" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Volver a Galería
                </Link>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
                <div className="space-y-4 w-full max-w-2xl">
                    {isEditing ? (
                        <form onSubmit={handleUpdateAlbum} className="space-y-4 bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                            <input
                                type="text"
                                value={editForm.title}
                                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                className="w-full text-3xl font-playfair font-black bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-mivn-blue outline-none py-2"
                                placeholder="Título del álbum"
                            />
                            <textarea
                                value={editForm.description}
                                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-black/20 rounded-xl p-4 text-sm resize-none outline-none focus:ring-2 ring-mivn-blue/50"
                                placeholder="Descripción..."
                                rows={2}
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100">Cancelar</button>
                                <button type="submit" className="px-6 py-2 rounded-lg bg-mivn-blue text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-mivn-blue/20">Guardar Cambios</button>
                            </div>
                        </form>
                    ) : (
                        <div className="group relative">
                            <h2 className="text-4xl md:text-5xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                                {album.title}
                            </h2>
                            <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg mt-2">
                                {album.description || "Sin descripción"}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-mivn-blue transition-all"
                            >
                                Ediar
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsDeletingAlbum(true)}
                        className="flex items-center gap-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-4 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4" /> Eliminar Álbum
                    </button>
                    <div className="w-56">
                        <ImageUploader
                            onUploadComplete={handlePhotoUpload}
                            folder="gallery"
                            aspectRatio={1} // Square for gallery by default or variable? Keeping it square for consistency
                        />
                    </div>
                </div>
            </div>

            {/* Photos Grid */}
            {photos.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">Este álbum está vacío.</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src={photo.url}
                                alt="Gallery photo"
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => window.open(photo.url, '_blank')}
                                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPhotoToDelete({ id: photo.id, publicId: photo.public_id })}
                                    className="p-2 bg-rose-500/80 backdrop-blur-md rounded-full text-white hover:bg-rose-600 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Photo Dialog */}
            <AlertDialog open={!!photoToDelete} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar esta foto?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. La imagen se eliminará de la galería y de Cloudinary.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeletePhoto} className="bg-rose-500 hover:bg-rose-600">Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Album Dialog */}
            <AlertDialog open={isDeletingAlbum} onOpenChange={setIsDeletingAlbum}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar álbum completo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará el álbum y TODAS sus fotos permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteAlbum} className="bg-rose-500 hover:bg-rose-600">Eliminar todo</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}
