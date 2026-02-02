import { InstituteHeader } from "@/components/institute/InstituteHeader";
import { InstituteSidebar } from "@/components/institute/InstituteSidebar";
import { CourseCard } from "@/components/institute/CourseCard";
import { ArrowRight, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUserEnrollments, getUserCertificates, getUserProfile, getAllCategories } from "./actions";
import { CertificateList } from "@/components/institute/CertificateList";

export default async function InstitutePage() {
    const enrollments = await getUserEnrollments();
    const certificates = await getUserCertificates();
    const userProfile = await getUserProfile();
    console.log("InstitutePage userProfile:", userProfile);
    const categories = await getAllCategories();

    // Map enrollments to CourseCard format
    const activeCourses = enrollments.map(enrollment => ({
        title: (enrollment.courses as any).title,
        instructor: (enrollment.courses as any).instructor_name || 'Instructor MIVN',
        progress: enrollment.progress_percentage || 0,
        category: (enrollment.courses as any).course_categories?.name || 'Académico',
        imageSrc: (enrollment.courses as any).thumbnail_url || "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=800",
        imageAlt: (enrollment.courses as any).title,
        href: `/instituto/clase/${enrollment.course_id}`
    }));

    return (
        <div className="min-h-screen bg-[#F6F7F8] dark:bg-[#05070A] text-[#0f161a] dark:text-white font-lexend">
            <InstituteHeader userProfile={userProfile} />

            <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 p-6">
                <InstituteSidebar categories={categories} />

                <div className="flex-1 flex flex-col gap-8">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-2xl bg-mivn-blue min-h-[320px] flex flex-col justify-end p-8 md:p-12 text-white">
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=2000"
                                alt="Biblical study background"
                                fill
                                className="object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
                            <div className="max-w-xl">
                                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
                                    Tu Crecimiento Espiritual Empieza Aquí
                                </h1>
                                <p className="text-white/80 text-base md:text-lg">
                                    Monitorea tu avance y continúa transformando tu vida a través de la Palabra.
                                </p>
                            </div>

                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="flex-1 md:flex-none bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[140px]">
                                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide">En Curso</p>
                                    <p className="text-3xl font-bold mt-1">{activeCourses.length}</p>
                                </div>
                                <div className="flex-1 md:flex-none bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[140px]">
                                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Certificados</p>
                                    <p className="text-3xl font-bold mt-1">{certificates.length}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Course Grid Section */}
                    <section id="progreso">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Mis Cursos en Progreso</h2>
                            <Link href="/instituto/catalogo" className="text-mivn-blue font-bold text-sm flex items-center gap-1 hover:underline">
                                Explorar Catálogo <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {activeCourses.length === 0 ? (
                            <div className="bg-white dark:bg-[#0A0F1D] p-12 rounded-3xl border border-slate-200 dark:border-white/5 text-center flex flex-col items-center gap-4">
                                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-full text-slate-300">
                                    <Rocket className="w-12 h-12" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">No tienes cursos en curso</h3>
                                    <p className="text-slate-500 text-sm mt-1 max-w-sm">Explora nuestro catálogo y comienza tu formación bíblica hoy mismo.</p>
                                </div>
                                <Link href="/instituto/catalogo" className="mt-4 px-8 py-3 bg-mivn-blue text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                                    Ver Catálogo
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {activeCourses.map((course, i) => (
                                    <CourseCard key={i} {...course} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Latest Certificates Row */}
                    <div id="certificados">
                        <CertificateList certificates={certificates} />
                    </div>
                </div>
            </main>

            <footer className="mt-20 border-t border-slate-200 dark:border-white/5 py-12 px-6 bg-white dark:bg-[#0A0F1D]">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 relative">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain opacity-30 grayscale" />
                        </div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© 2026 Ministerio Internacional Vida Nueva - Instituto Bíblico</p>
                    </div>
                    <div className="flex gap-10">
                        <a href="/terminos" className="text-[10px] font-bold text-slate-400 hover:text-mivn-blue uppercase tracking-widest transition-colors">Términos</a>
                        <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-mivn-blue uppercase tracking-widest transition-colors">Soporte</a>
                        <a href="/privacidad" className="text-[10px] font-bold text-slate-400 hover:text-mivn-blue uppercase tracking-widest transition-colors">Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
