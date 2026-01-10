import { createClient } from "@/lib/supabase/server";
import { ContextSidebar } from "@/components/reader/ContextSidebar";
import { ToolsSidebar } from "@/components/reader/ToolsSidebar";
import { ScriptureReader } from "@/components/reader/ScriptureReader";
import { BibleSelector } from "@/components/reader/BibleSelector";
import Link from "next/link";
import { ArrowLeft, Settings, Menu } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
    const { book, chapter } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Basic fetch, in production we would filter by book content more robustly
    // Decoding URL params if needed (e.g. "1 Juan")
    const decodedBook = decodeURIComponent(book);

    const { data: verses } = await supabase
        .from("scriptures")
        .select("*")
        .eq("book_name", decodedBook)
        .eq("chapter", parseInt(chapter))
        .order("verse_number", { ascending: true });

    return (
        <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Top Navigation Bar - Minimal */}
            <nav className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-xl shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gold-500">MIVN</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-sm text-gray-300 font-medium">Estudio</span>
                    </div>
                </div>

                <BibleSelector currentBook={decodedBook} currentChapter={chapter} />

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors md:hidden">
                        <Menu className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </nav>

            {/* 3-Column Layout */}
            <main className="flex-1 overflow-hidden">
                <div className="h-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 md:p-6">

                    {/* Left: Context (Hidden on mobile by default) */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 h-full overflow-hidden">
                        <ContextSidebar bookName={decodedBook} />
                    </div>

                    {/* Center: Reader (Now includes ToolsSidebar internally) */}
                    <div className="col-span-1 md:col-span-9 lg:col-span-9 xl:col-span-10 h-full overflow-hidden relative">
                        {verses ? <ScriptureReader verses={verses as any} /> : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Cargando escrituras...
                            </div>
                        )}
                    </div>


                </div>
            </main>
        </div>
    );
}
