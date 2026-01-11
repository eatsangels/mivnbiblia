import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Search, Map, Clock, LandPlot } from "lucide-react";
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

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-bold mb-8 backdrop-blur-sm">
          <span className="text-gold-400 mr-2">✦</span> Explora la Biblia como nunca antes
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 text-white drop-shadow-2xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">Santuario</span>
          <span className="block text-4xl md:text-6xl mt-2 font-sans font-light text-blue-200/80">Digital</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light">
          Sumérgete en el contexto histórico, geográfico y teológico de las escrituras.
          Una experiencia diseñada para la contemplación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-24">
          <Link href="/read/Juan/1" className="group flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <BookOpen className="w-4 h-4 mr-2" />
            Abrir Escrituras
          </Link>
          <Link href="/temple" className="group flex items-center justify-center px-8 py-4 bg-midnight-800 border border-white/10 hover:border-gold-500/50 text-white font-bold rounded-full transition-all hover:bg-midnight-750">
            <Compass className="w-4 h-4 mr-2 text-gold-500" />
            Visitar el Templo
          </Link>
        </div>

        {/* Feature Grid (Timeline, Maps, Temple) - Reference Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Timeline Card */}
          <Link href="/timeline" className="relative overflow-hidden rounded-2xl bg-midnight-800/50 border border-white/5 hover:border-blue-500/30 transition-all group h-[240px] p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('/bible-covers/salmos.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />

            <div className="relative z-20">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 backdrop-blur-md">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Línea del Tiempo</h3>
              <p className="text-xs text-gray-400">Navega la historia de la redención cronológicamente.</p>
            </div>
          </Link>

          {/* Maps Card */}
          <Link href="/maps" className="relative overflow-hidden rounded-2xl bg-midnight-800/50 border border-white/5 hover:border-emerald-500/30 transition-all group h-[240px] p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('/bible-covers/hechos.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />

            <div className="relative z-20">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3 backdrop-blur-md">
                <Map className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Mapas Bíblicos</h3>
              <p className="text-xs text-gray-400">Geografía interactiva de los viajes patriarcales y apostólicos.</p>
            </div>
          </Link>

          {/* Temple Card */}
          <Link href="/temple" className="relative overflow-hidden rounded-2xl bg-midnight-800/50 border border-white/5 hover:border-gold-500/30 transition-all group h-[240px] p-6 flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            {/* Abstract Gold texture */}
            <div className="absolute inset-0 bg-[url('/bible-covers/1-reyes.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-0 right-[-20%] w-[150%] h-[150%] bg-gold-600/10 rounded-full blur-3xl group-hover:opacity-75 transition-opacity" />

            <div className="relative z-20">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center mb-3 backdrop-blur-md">
                <LandPlot className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">El Templo 3D</h3>
              <p className="text-xs text-gray-400">Reconstrucción inmersiva para el estudio espacial.</p>
            </div>
          </Link>
        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 bg-midnight-950">
        <p>Soli Deo Gloria • Ministerio Internacional Vida Nueva</p>
      </footer>
    </main>
  );
}
