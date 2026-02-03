"use client";

import { useState } from "react";
import { createFAQ, updateFAQ } from "./actions";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";

interface FAQFormProps {
    initialData?: {
        id: string;
        question: string;
        answer: string;
        display_order: number | null;
        category: string | null;
    };
}

export function FAQForm({ initialData }: FAQFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        question: initialData?.question || "",
        answer: initialData?.answer || "",
        display_order: initialData?.display_order || 0,
        category: initialData?.category || "General",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (initialData) {
                await updateFAQ(initialData.id, formData);
            } else {
                await createFAQ(formData);
            }
            router.push("/admin/gestion-web/faqs");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error al guardar la FAQ");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Pregunta</label>
                    <input
                        required
                        type="text"
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-mivn-blue/10 text-slate-900 dark:text-white placeholder:text-slate-300 transition-all"
                        placeholder="Ej: ¿A qué hora son los cultos?"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Respuesta</label>
                    <textarea
                        required
                        rows={6}
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-mivn-blue/10 text-slate-900 dark:text-white placeholder:text-slate-300 transition-all resize-none"
                        placeholder="Escribe la respuesta detallada aquí..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Categoría</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-mivn-blue/10 text-slate-900 dark:text-white transition-all appearance-none"
                        >
                            <option>General</option>
                            <option>Visitantes</option>
                            <option>Ofrendas</option>
                            <option>Ministerios</option>
                            <option>Digital</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Orden de visualización</label>
                        <input
                            type="number"
                            value={formData.display_order}
                            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                            className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-mivn-blue/10 text-slate-900 dark:text-white transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center gap-2"
                >
                    <X className="w-5 h-5" /> Cancelar
                </button>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="px-10 py-4 bg-mivn-blue text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-mivn-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {initialData ? "Actualizar FAQ" : "Crear FAQ"}
                </button>
            </div>
        </form>
    );
}
