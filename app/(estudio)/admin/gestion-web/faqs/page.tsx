import { getFAQs, deleteFAQ } from "./actions";
import Link from "next/link";
import { Plus, Pencil, Trash2, HelpCircle, ArrowLeft } from "lucide-react";

export default async function FAQsAdminPage() {
    const faqs = await getFAQs();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin/gestion-web" className="text-sm text-mivn-blue hover:underline flex items-center gap-2 mb-2">
                        <ArrowLeft className="w-4 h-4" /> Volver a Gestión Web
                    </Link>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <HelpCircle className="w-8 h-8 text-mivn-gold" /> Preguntas Frecuentes
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Administra el centro de ayuda de la iglesia
                    </p>
                </div>
                <Link
                    href="/admin/gestion-web/faqs/nuevo"
                    className="bg-mivn-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-mivn-blue/20"
                >
                    <Plus className="w-5 h-5" /> Nueva FAQ
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Orden</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Pregunta / Respuesta</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {faqs.map((faq) => (
                                <tr key={faq.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-6 font-bold text-mivn-gold">{faq.display_order}</td>
                                    <td className="px-6 py-6 space-y-2">
                                        <p className="font-bold text-slate-900 dark:text-white leading-relaxed">{faq.question}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-light line-clamp-2 italic">{faq.answer}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/gestion-web/faqs/${faq.id}`}
                                                className="p-2 hover:bg-mivn-blue/10 text-slate-400 hover:text-mivn-blue rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </Link>
                                            <form action={async () => {
                                                "use server";
                                                await deleteFAQ(faq.id);
                                            }}>
                                                <button className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {faqs.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                                        No hay preguntas frecuentes registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
