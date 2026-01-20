import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio
                </Link>
                <h1 className="text-4xl font-bold mb-6 font-serif">Política de Privacidad</h1>

                <PrivacyContent />
            </div>
        </div>
    );
}
