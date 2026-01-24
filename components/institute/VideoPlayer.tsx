"use client";

import { Play, Volume2, Settings, Maximize } from "lucide-react";
import Image from "next/image";

export const VideoPlayer = () => {
    return (
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl relative group">
            <Image
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=2000"
                alt="Main teaching video player showing spiritual content"
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-mivn-blue/90 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-mivn-blue transition-all shadow-lg backdrop-blur-sm group-hover:shadow-[0_0_40px_rgba(74,163,223,0.5)]">
                    <Play className="w-8 h-8 ml-1 fill-current" />
                </button>
            </div>

            {/* Fake Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
                    <div className="h-full bg-mivn-blue w-1/3 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-6">
                        <button className="hover:text-mivn-blue transition-colors"><Play className="w-5 h-5 fill-current" /></button>
                        <div className="flex items-center gap-2 group/vol">
                            <button className="hover:text-mivn-blue transition-colors"><Volume2 className="w-5 h-5" /></button>
                            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                <div className="h-1 bg-white/30 rounded-full w-16 ml-2">
                                    <div className="h-full bg-white w-2/3"></div>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-mono font-medium tracking-wider">12:45 / 45:00</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hover:text-mivn-blue transition-colors"><Settings className="w-5 h-5" /></button>
                        <button className="hover:text-mivn-blue transition-colors"><Maximize className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
