import { createClient } from "@/lib/supabase/server";
import { ContextSidebar } from "@/components/reader/ContextSidebar";
import { ScriptureReader } from "@/components/reader/ScriptureReader";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderProvider } from "@/components/reader/ReaderContext";
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
        <ReaderProvider>
            <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
                {/* Client Header with Settings and Nav */}
                <ReaderHeader book={decodedBook} chapter={chapter} />

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
        </ReaderProvider>
    );
}
