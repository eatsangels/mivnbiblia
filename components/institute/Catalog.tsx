"use client";

import { useState } from "react";
import { CourseCard } from "./CourseCard";
import { Search, Filter, Rocket, BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { enrollInCourse } from "@/app/instituto/actions";
import { useRouter } from "next/navigation";

interface CatalogProps {
    initialCourses: any[];
    categories: any[];
}

export const Catalog = ({ initialCourses, categories }: CatalogProps) => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState(initialCourses);
    const [isEnrolling, setIsEnrolling] = useState<string | null>(null);
    const router = useRouter();

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === "all" || course.category_id === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor_name?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleEnroll = async (courseId: string) => {
        setIsEnrolling(courseId);
        try {
            const result = await enrollInCourse(courseId);
            if (result.success) {
                // Success - redirect to the class or show success
                router.push(`/instituto/clase/${courseId}`);
            }
        } catch (error) {
            console.error("Error enrolling in course:", error);
            alert("Error al matricularse en el curso");
        } finally {
            setIsEnrolling(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-8">
            {/* Catalog Hero */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 min-h-[280px] flex flex-col justify-center p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-mivn-blue/40 to-mivn-gold/20 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-mivn-blue/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                        <GraduationCap className="w-4 h-4 text-mivn-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Catálogo Académico</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
                        Expande tu <span className="text-mivn-gold">Conocimiento</span>
                    </h1>
                    <p className="text-white/60 text-lg font-medium leading-relaxed">
                        Explora nuestra oferta de cursos diseñados para tu crecimiento ministerial y espiritual.
                    </p>
                </div>
            </section>

            {/* Filters & Search */}
            <section className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === "all"
                                ? "bg-mivn-blue text-white shadow-lg shadow-mivn-blue/20"
                                : "bg-white dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id
                                    ? "bg-mivn-blue text-white shadow-lg shadow-mivn-blue/20"
                                    : "bg-white dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-mivn-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar cursos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-mivn-blue focus:border-mivn-blue transition-all outline-none text-sm font-medium"
                    />
                </div>
            </section>

            {/* Courses Grid */}
            <section>
                {filteredCourses.length === 0 ? (
                    <div className="bg-white dark:bg-white/5 p-20 rounded-[3rem] text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">No se encontraron cursos</h3>
                        <p className="text-slate-500 text-sm max-w-xs">Intenta ajustar tus filtros o buscar algo diferente.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="group flex flex-col bg-white dark:bg-[#0A0F1D] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={course.thumbnail_url || "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=800"}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md text-mivn-blue text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">
                                            {course.course_categories?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-mivn-blue transition-colors uppercase tracking-tight">
                                            {course.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium line-clamp-2 italic">
                                            {course.description || "Sin descripción disponible."}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Instructor</span>
                                            <span className="text-xs font-black text-slate-700 dark:text-slate-300">{course.instructor_name || "MIVN"}</span>
                                        </div>

                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            disabled={isEnrolling === course.id}
                                            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-mivn-blue hover:text-white hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isEnrolling === course.id ? (
                                                <div className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Rocket className="w-4 h-4" />
                                            )}
                                            Matricularse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};
