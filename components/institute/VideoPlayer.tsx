"use client";

import { Play, Volume2, Settings, Maximize } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
    videoUrl?: string;
    thumbnailUrl?: string;
    onEnded?: () => void;
}

export const VideoPlayer = ({ videoUrl, thumbnailUrl, onEnded }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        // Simple regex for YouTube ID extraction
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1&enablejsapi=1`;
        }
        // Fallback for direct YouTube embed links or other simple URLs
        if (url.includes('embed')) return url;

        return url; // Return original if no match (could be custom URL)
    };

    const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl relative group">
            {videoUrl && embedUrl ? (
                isPlaying ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title="Video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                ) : (
                    <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
                        <Image
                            src={thumbnailUrl || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=2000"}
                            alt="Video Thumbnail"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="w-20 h-20 bg-mivn-blue/90 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-mivn-blue transition-all shadow-lg backdrop-blur-sm group-hover:shadow-[0_0_40px_rgba(74,163,223,0.5)]">
                                <Play className="w-8 h-8 ml-1 fill-current" />
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40">
                    <p>No hay video disponible para esta lección</p>
                </div>
            )}
        </div>
    );
};
