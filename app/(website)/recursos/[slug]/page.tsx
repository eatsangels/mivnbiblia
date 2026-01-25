import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, ArrowLeft, FileText, Calendar, Tag } from "lucide-react";
import Image from "next/image";

interface ResourcePageProps {
    params: {
        slug: string;
    };
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
    const supabase = await createClient();

    const { data: resource } = await supabase
        .from("resources")
        .select(`
            *,
            resource_categories (
                id,
                name,
                slug
            )
        `)
        .eq("slug", params.slug)
        .eq("is_published", true)
        .single();

    if (!resource) {
        notFound();
    }

    // Fetch related resources from the same category
    const { data: relatedResources } = await supabase
        .from("resources")
        .select("*")
        .eq("category_id", resource.category_id)
        .neq("id", resource.id)
        .eq("is_published", true)
        .limit(3);

    return (
        <main className="min-h-screen bg-white dark:bg-[#0A0F1D]">
            {/* Back Button */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link
                        href="/recursos"
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-mivn-blue transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a recursos
                    </Link>
                </div>
            </div>

            {/* Resource Detail */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    {resource.resource_categories && (
                                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-mivn-blue/10 text-mivn-blue">
                                            {resource.resource_categories.name}
                                        </span>
                                    )}
                                    {resource.is_featured && (
                                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-mivn-gold/10 text-mivn-gold flex items-center gap-1">
                                            ⭐ Destacado
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
                                    {resource.title}
                                </h1>

                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {resource.description}
                                </p>
                            </div>

                            {/* Thumbnail */}
                            {resource.thumbnail && (
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={resource.thumbnail}
                                        alt={resource.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            {resource.content && (
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Download Card */}
                            <div className="bg-gradient-to-br from-mivn-blue to-mivn-blue/80 rounded-2xl p-8 text-white shadow-2xl">
                                <FileText className="w-12 h-12 mb-4 opacity-80" />
                                <h3 className="text-2xl font-bold mb-2">Descargar Recurso</h3>
                                <p className="text-white/80 mb-6">
                                    Formato: {resource.file_type?.toUpperCase() || 'PDF'}
                                </p>
                                {resource.file_url ? (
                                    <a
                                        href={resource.file_url}
                                        download
                                        className="block w-full bg-white text-mivn-blue px-6 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Descargar Ahora
                                    </a>
                                ) : (
                                    <p className="text-white/60 text-sm">
                                        Archivo no disponible
                                    </p>
                                )}
                            </div>

                            {/* Info Card */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                                    Información
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Publicado: {new Date(resource.created_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {resource.resource_categories && (
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <Tag className="w-4 h-4" />
                                            <span>Categoría: {resource.resource_categories.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Related Resources */}
                            {relatedResources && relatedResources.length > 0 && (
                                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                                        Recursos Relacionados
                                    </h3>
                                    <div className="space-y-3">
                                        {relatedResources.map((related) => (
                                            <Link
                                                key={related.id}
                                                href={`/recursos/${related.slug}`}
                                                className="block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 hover:text-mivn-blue transition-colors">
                                                    {related.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
