import { FAQForm } from "../FAQForm";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NuevaFAQPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <Link href="/admin/gestion-web/faqs" className="text-sm text-mivn-blue hover:underline flex items-center gap-2 mb-2">
                    <ArrowLeft className="w-4 h-4" /> Volver a la lista
                </Link>
                <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-mivn-gold" /> Nueva Pregunta Frecuente
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Crea una nueva pregunta para el centro de ayuda
                </p>
            </div>

            <FAQForm />
        </div>
    );
}
