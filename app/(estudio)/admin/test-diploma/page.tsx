"use client";

import { CertificateViewer } from "@/components/institute/CertificateViewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TestDiplomaPage() {
    const testCertificate = {
        title: "Diplomado en Liderazgo Eclesiástico",
        issued_at: new Date().toISOString(),
        type: 'Diploma'
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8 flex flex-col items-center justify-center">
            <Link
                href="/admin"
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Regresar al Admin
            </Link>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Generador de Diploma de Prueba</h1>
                <p className="text-slate-500">Vista previa del certificado para Nano Banana</p>
            </div>

            {/* We render the viewer relative here for preview purposes if possible, 
                but CertificateViewer is fixed fullscreen. 
                So we really just want to 'open' it.
                However, simply rendering it will take over the screen, which is what we want for a "preview".
                So i'll just render it directly.
            */}

            <CertificateViewer
                certificate={testCertificate}
                studentName="Nano Banana"
                onClose={() => window.history.back()}
            />
        </div>
    );
}
