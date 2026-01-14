import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Search, Map, Clock, LandPlot, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Fetch verse for preview
  const { data: verse } = await supabase
    .from("scriptures")
    .select("*")
    .eq("book_name", "Juan")
    .eq("chapter", 1)
    .eq("verse_number", 1)
    .maybeSingle() as any;

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden bg-midnight-950">

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Simulate the 'Epic Landscape' via gradients since we don't have the image asset yet */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-midnight-950 to-midnight-950" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-midnight-950 to-transparent" />

        {/* Gold accent simulating the 'Temple' glow */}
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <Image
            src="/logo_mivn.png"
            alt="Logo Ministerio Internacional Vida Nueva"
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-full border border-white/10 shadow-lg"
            priority
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-serif font-bold text-white tracking-widest leading-none">MIVN</span>
            <span className="text-[8px] text-gold-400 uppercase tracking-widest font-sans mt-1">Ministerio Internacional Vida Nueva</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <Link href="/dashboard" className="px-5 py-2 text-sm font-bold bg-white text-black hover:bg-gray-200 rounded-full transition-all shadow-lg flex items-center">
              Mi Panel <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Acceder
              </Link>
              <Link href="/register" className="px-5 py-2 text-sm font-bold bg-gold-600 hover:bg-gold-500 text-black rounded-full transition-all shadow-lg hover:shadow-gold-500/20">
                Comenzar
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">

        {/* Dynamic Background with Parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#051120]" />
          <div
            className="absolute inset-0 bg-[url('/images/home_hero.png')] bg-cover bg-center opacity-40 mix-blend-luminosity scale-110"
            style={{ filter: 'contrast(1.2) brightness(0.7)' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(10,24,41,0),#051120_80%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051120]/20 to-[#051120]" />

          {/* Animated Glows */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        {/* Floating Narrative Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-[10px] font-black uppercase tracking-[0.4em] mb-12 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-3 h-3 text-gold-400 mr-3" />
            Explora la Verdad Eterna
          </div>

          <div className="relative mb-12 group">
            {/* Floating Book Aura */}
            <div className="absolute -inset-10 bg-gold-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter leading-none text-white select-none">
              <span className="block opacity-90 drop-shadow-2xl">MIVN</span>
              <span className="block text-4xl md:text-6xl -mt-4 md:-mt-8 font-sans font-light text-blue-200/40 tracking-[0.3em] uppercase">
                Santuario Digital
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-16 leading-relaxed font-light italic">
            "Donde la tecnología se encuentra con lo sagrado para iluminar tu camino en las Escrituras."
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mb-32">
            <Link
              href="/read/Juan/1"
              className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-3">
                <BookOpen className="w-4 h-4" /> Abrir Escrituras
              </span>
            </Link>

            <Link
              href="/temple"
              className="group px-10 py-5 bg-transparent border border-white/10 hover:border-gold-500/50 text-white font-black uppercase tracking-widest text-xs rounded-full transition-all hover:bg-gold-500/5 backdrop-blur-md"
            >
              <span className="flex items-center justify-center gap-3">
                <Compass className="w-4 h-4 text-gold-500" /> Visitar el Templo
              </span>
            </Link>
          </div>

          {/* Connected Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Timeline Module */}
            <Link href="/timeline" className="group relative h-64 rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 border border-white/5 hover:border-blue-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/bible-covers/salmos.jpg')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-[#051120]/40 to-transparent" />
              <div className="relative h-full w-full p-8 flex flex-col justify-between z-10">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 w-fit backdrop-blur-md">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 shadow-sm">Cronología</h3>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-none font-bold">Historia de la Redención</p>
                </div>
              </div>
            </Link>

            {/* Maps Module */}
            <Link href="/maps" className="group relative h-64 rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 border border-white/5 hover:border-emerald-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/bible-covers/hechos.jpg')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-[#051120]/40 to-transparent" />
              <div className="relative h-full w-full p-8 flex flex-col justify-between z-10">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-fit backdrop-blur-md">
                  <Map className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 shadow-sm">Cartografía</h3>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-none font-bold">Geografía Sagrada</p>
                </div>
              </div>
            </Link>

            {/* AI Module */}
            <Link href="/dashboard" className="group relative h-64 rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 border border-white/5 hover:border-gold-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/bible-covers/1-reyes.jpg')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051120] via-[#051120]/40 to-transparent" />
              <div className="relative h-full w-full p-8 flex flex-col justify-between z-10">
                <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 w-fit backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 shadow-sm">Elocuencia</h3>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-none font-bold">Asistente Homilético AI</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[8px] uppercase tracking-[0.5em] font-black">Scroll</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 bg-midnight-950">
        <p>Soli Deo Gloria • Ministerio Internacional Vida Nueva</p>
      </footer>
    </main>
  );
}
