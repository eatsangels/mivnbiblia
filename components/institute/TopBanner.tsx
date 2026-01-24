"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

export const TopBanner = () => {
    return (
        <div className="bg-[#111111] text-white py-2 px-6 text-xs font-lexend border-b border-white/5 relative z-[60]">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-4">
                    <span className="text-slate-300">Services @ 9:00am, 10:45am, 5:00pm</span>
                    <button className="border border-mivn-gold text-mivn-gold px-3 py-0.5 rounded-full hover:bg-mivn-gold hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider">
                        Join Us
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="#" className="text-mivn-gold hover:text-white transition-colors font-medium">
                        How Can We Help?
                    </Link>
                    <Link href="/eventos" className="flex items-center gap-2 text-white hover:text-mivn-gold transition-colors font-medium">
                        <span>Calendar</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
