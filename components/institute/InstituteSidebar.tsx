import Link from "next/link";
import { School, UserPlus, Users, BookOpen, Construction, Award, LucideIcon } from "lucide-react";

interface Category {
    id: string;
    name: string;
    icon_name?: string | null;
}

interface InstituteSidebarProps {
    categories: Category[];
}

const iconMap: Record<string, LucideIcon> = {
    'School': School,
    'UserPlus': UserPlus,
    'Users': Users,
    'BookOpen': BookOpen,
    'Construction': Construction,
};

export const InstituteSidebar = ({ categories }: InstituteSidebarProps) => {
    return (
        <aside className="w-full lg:w-64 flex flex-col gap-8 font-lexend">
            <div className="bg-white dark:bg-[#0A0F1D] p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Categorías</h3>
                <nav className="flex flex-col gap-1">
                    <Link
                        href="/instituto/catalogo"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all bg-mivn-blue/10 text-mivn-blue font-semibold"
                    >
                        <School className="w-5 h-5" />
                        <span>Todos los Cursos</span>
                    </Link>
                    {(categories || []).map((cat) => {
                        const Icon = (cat.icon_name && iconMap[cat.icon_name]) || BookOpen;
                        return (
                            <Link
                                key={cat.id}
                                href={`/instituto/catalogo?category=${cat.id}`}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                            >
                                <Icon className="w-5 h-5" />
                                <span>{cat.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="bg-white dark:bg-[#0A0F1D] p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Logros Recientes</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-mivn-gold/20 p-2 rounded-full">
                            <Award className="w-5 h-5 text-mivn-gold" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-gray-200">Primer Paso</p>
                            <p className="text-[10px] text-slate-500">Curso Iniciación completado</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-mivn-blue/20 p-2 rounded-full">
                            <Award className="w-5 h-5 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-gray-200">Siervo Fiel</p>
                            <p className="text-[10px] text-slate-500">30 días de estudio constante</p>
                        </div>
                    </div>
                    <button className="text-mivn-blue text-xs font-bold mt-2 hover:underline text-left">
                        Ver todas mis insignias
                    </button>
                </div>
            </div>
        </aside>
    );
};
