"use client";

import { ZoomIn, Share2, Play, Expand, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type GalleryPhoto = Database['public']['Tables']['gallery_photos']['Row'] & {
    album: Database['public']['Tables']['gallery_albums']['Row'] | null
};

export const Gallery = () => {
    const supabase = createClient();
    const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('gallery_photos')
            .select(`
                *,
                album:gallery_albums(*)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching gallery photos:", error);
        } else {
            // Safe cast as Supabase types can be tricky with joins
            setPhotos(data as any);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <section className="bg-mivn-bg-dark py-32 px-4 min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-mivn-gold animate-spin" />
            </section>
        );
    }

    return (
        <section className="bg-mivn-bg-dark py-32 px-4">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Momentos Eternos</span>
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white">Nuestra Vida en Comunidad</h2>
                    <p className="text-xl text-gray-400 font-light leading-relaxed italic">
                        Un registro visual de la fe, el amor y los momentos que definen nuestra familia espiritual.
                    </p>
                </div>

                {/* Masonry-style Grid */}
                {photos.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 italic">
                        No hay fotos disponibles en este momento.
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {photos.map((photo) => (
                            <div key={photo.id} className="relative group rounded-[3rem] overflow-hidden border border-white/10 break-inside-avoid shadow-2xl bg-black">
                                <Image
                                    src={photo.url}
                                    alt={photo.caption || photo.album?.title || "Foto de galería"}
                                    width={800}
                                    height={800}
                                    className="w-full h-auto object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                />

                                {/* Hover Text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-mivn-bg-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-playfair font-bold text-white uppercase tracking-wider leading-tight">
                                            {photo.caption || photo.album?.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-mivn-gold font-black uppercase tracking-widest truncate max-w-[70%]">
                                                {photo.album?.title}
                                            </span>
                                            <div className="flex gap-4">
                                                <button onClick={() => window.open(photo.url, '_blank')}>
                                                    <ZoomIn className="w-4 h-4 text-white hover:text-mivn-blue cursor-pointer" />
                                                </button>
                                                {/* <Share2 className="w-4 h-4 text-white hover:text-mivn-blue cursor-pointer" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* More Button */}
                <div className="text-center pt-8">
                    <button className="text-gray-600 hover:text-mivn-gold font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 mx-auto py-6 group transition-colors">
                        Ver Todos los Álbumes <Expand className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>
                    {/* Note: This button is currently decorative or could link to a more detailed archive page later */}
                </div>

            </div>
        </section>
    );
};
