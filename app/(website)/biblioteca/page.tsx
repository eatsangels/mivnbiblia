import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Download, FileText, Star, ArrowRight, Book } from "lucide-react";
import Image from "next/image";
import { Database } from "@/lib/database.types";

export default async function BibliotecaPage() {
    type ResourceWithCategory = Database['public']['Tables']['resources']['Row'] & {
        resource_categories: {
            id: string;
            name: string;
            slug: string;
        } | null;
    };

    const supabase = await createClient();

    // Fetch resources from database
    const { data: resourcesRaw } = await supabase
        .from("resources")
        .select(`
            *,
            resource_categories (
                id,
                name,
                slug
            )
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    const resources = (resourcesRaw || []) as unknown as ResourceWithCategory[];

    const featuredResource = resources?.find(r => r.is_featured);
    const otherResources = resources?.filter(r => !r.is_featured) || [];

    return (
        <main className="min-h-screen bg-white dark:bg-[#0A0F1D]">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="/images/resources_hero.png" // We can change this image later
                        alt="Library Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0A0F1D] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Edificación y Estudio</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Biblioteca <span className="italic text-mivn-blue">Digital</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Explora nuestra colección de libros, guías de estudio y material didáctico para profundizar en la Palabra."
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#0A0F1D] to-transparent" />
            </section>

            {/* Featured Resource */}
            {featuredResource && (
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white mb-8">
                            Lectura Recomendada
                        </h2>

                        <div className="bg-gradient-to-br from-mivn-blue/5 to-mivn-gold/5 dark:from-mivn-blue/10 dark:to-mivn-gold/10 rounded-3xl p-8 md:p-12 border border-mivn-blue/20 dark:border-mivn-blue/30">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Image/Icon */}
                                <div className="relative">
                                    {featuredResource.thumbnail ? (
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                            <Image
                                                src={featuredResource.thumbnail}
                                                alt={featuredResource.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-mivn-blue to-mivn-blue/80 flex items-center justify-center shadow-2xl">
                                            <Book className="w-32 h-32 text-white/30" />
                                        </div>
                                    )}
                                    <div className="absolute -top-4 -right-4 bg-mivn-gold text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                                        <Star className="w-4 h-4 fill-current" />
                                        Destacado
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 dark:text-white mb-4">
                                            {featuredResource.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {featuredResource.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {featuredResource.file_url && (
                                            <a
                                                href={featuredResource.file_url}
                                                download
                                                className="inline-flex items-center gap-2 bg-mivn-blue text-white px-8 py-4 rounded-full font-bold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/30"
                                            >
                                                <Download className="w-5 h-5" />
                                                Descargar PDF
                                            </a>
                                        )}
                                        <Link
                                            href={`/recursos/${featuredResource.slug}`}
                                            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                                        >
                                            Leer más
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Complete Library */}
            <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white mb-12">
                        Todos los Libros y Materiales
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherResources.map((resource) => (
                            <div
                                key={resource.id}
                                className="group bg-white dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Thumbnail */}
                                {resource.thumbnail ? (
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={resource.thumbnail}
                                            alt={resource.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                                        <Book className="w-16 h-16 text-slate-400 dark:text-slate-600" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors line-clamp-2">
                                            {resource.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-3">
                                            {resource.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                                        {resource.file_url && (
                                            <a
                                                href={resource.file_url}
                                                download
                                                className="inline-flex items-center gap-2 text-mivn-blue font-semibold hover:gap-3 transition-all"
                                            >
                                                <Download className="w-4 h-4" />
                                                Descargar
                                            </a>
                                        )}
                                        <Link
                                            href={`/recursos/${resource.slug}`}
                                            className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-mivn-blue hover:gap-2 transition-all"
                                        >
                                            Detalles
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!otherResources || otherResources.length === 0) && !featuredResource && (
                        <div className="text-center py-24">
                            <Book className="w-24 h-24 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                La biblioteca está vacía por el momento
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                Pronto añadiremos libros, manuales y materiales de estudio.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
