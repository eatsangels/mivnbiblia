"use client";

import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Rocket } from "lucide-react";

interface CourseCardProps {
    title: string;
    instructor: string;
    progress: number;
    category: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
}

export const CourseCard = ({ title, instructor, progress, category, imageSrc, imageAlt, href }: CourseCardProps) => {
    return (
        <div className="bg-white dark:bg-[#0A0F1D] rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative h-48">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-mivn-blue text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {title}
                    </h3>
                    <span className={`text-xs font-bold ${progress > 0 ? "text-mivn-gold" : "text-slate-400"}`}>
                        {progress}%
                    </span>
                </div>
                <p className="text-slate-500 text-sm mb-4">Instructor: {instructor}</p>
                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-1.5 mb-6">
                    <div
                        className={`${progress > 0 ? "bg-mivn-blue" : "bg-slate-300 dark:bg-slate-700"} h-1.5 rounded-full`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <Link href={href} className="block w-full">
                    <button
                        className={`w-full font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${progress > 0
                            ? "bg-mivn-gold text-white hover:bg-mivn-gold/90"
                            : "border-2 border-mivn-blue text-mivn-blue hover:bg-mivn-blue hover:text-white"
                            }`}
                    >
                        {progress > 0 ? (
                            <>
                                <PlayCircle className="w-5 h-5" /> Continuar
                            </>
                        ) : (
                            <>
                                <Rocket className="w-5 h-5" /> Empezar
                            </>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
};
