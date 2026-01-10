'use client';

import { useState, useEffect } from 'react';
import { Play, MessageCircle, PenTool, Highlighter, Sparkles, MessageSquarePlus, ChevronRight, BookOpen, Layers, Volume2, Type, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AIChatSidebar } from './AIChatSidebar';
import { CommentsSection } from './CommentsSection';
import { ToolsSidebar } from './ToolsSidebar';

interface Verse {
    book_name: string;
    chapter: number;
    verse_number: number;
    content: string;
}

export function ScriptureReader({ verses }: { verses: Verse[] }) {
    const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
    const [showAI, setShowAI] = useState(false);
    const [activeTab, setActiveTab] = useState<'exegesis' | 'theology' | 'history' | 'community'>('exegesis');

    if (!verses || verses.length === 0) return null;

    const currentChapter = verses[0];

    // Helper to get the next verse for the "context" view in the card
    const getNextVerse = (currentNum: number) => {
        return verses.find(v => v.verse_number === currentNum + 1);
    };

    return (
        <div className="w-full h-full flex flex-col relative font-sans">

            {/* Top Bar inside Reader Area (Title) */}
            <div className="flex items-center justify-between mb-6 px-2 shrink-0">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    {currentChapter.book_name} {currentChapter.chapter}
                    {selectedVerse && (
                        <span className="text-sm font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            + 1 versículo
                        </span>
                    )}
                </h2>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Scrollable List container */}
                <div className="flex-1 w-full overflow-y-auto pr-2 space-y-2 pb-32">
                    {verses.map((verse) => {
                        const isSelected = selectedVerse === verse.verse_number;

                        // If selected, we render the LARGE CARD instead of the simple list item
                        if (isSelected) {
                            const nextVerse = getNextVerse(verse.verse_number);

                            return (
                                <div key={verse.verse_number} className="my-6 animate-in fade-in zoom-in-95 duration-300">
                                    {/* THE STUDY CARD (Matches the Image Center) */}
                                    <div className="bg-[#fcfaf7] text-gray-900 rounded-xl shadow-2xl overflow-hidden relative">

                                        {/* Main Content Padding */}
                                        <div className="p-6 md:p-8">

                                            {/* Verse Label */}
                                            <div className="text-sm font-bold text-[#6b7c93] mb-4 flex items-center gap-2">
                                                {verse.book_name} {verse.chapter}:{verse.verse_number}
                                            </div>

                                            {/* Main Verse Text */}
                                            <p className="font-libre text-[1.35rem] leading-[1.8] text-[#1a2b4b] mb-6">
                                                <span className="text-gold-600 font-bold mr-1">"</span>
                                                {/* We can simulate bolding some words for visual accuracy if desired, but raw text is fine */}
                                                {verse.content}
                                            </p>

                                            {/* Next Verse (Context) - Slightly faded */}
                                            {nextVerse && (
                                                <p className="font-libre text-[1.1rem] leading-relaxed text-gray-500 mb-6">
                                                    "{nextVerse.content}"
                                                </p>
                                            )}

                                            {/* Divider */}
                                            <div className="w-full h-px bg-gray-200/50 my-6" />

                                            {/* Commentary Section Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b4b] flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                                    Comentario <ChevronRight className="w-3 h-3" />
                                                </h4>
                                            </div>

                                            {/* Commentary Tabs */}
                                            <div className="bg-[#f2f4f8] rounded-xl p-5 border border-gray-200/50">
                                                <div className="flex gap-1 mb-4 border-b border-gray-200/50 pb-0">
                                                    <button onClick={() => setActiveTab('exegesis')} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors rounded-t-lg ${activeTab === 'exegesis' ? 'text-[#1a2b4b] bg-white shadow-sm' : 'text-gray-400 bg-transparent'}`}>Exegético</button>
                                                    <button onClick={() => setActiveTab('theology')} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${activeTab === 'theology' ? 'text-[#1a2b4b] bg-white shadow-sm rounded-t-lg' : 'text-gray-400'}`}>ESINP LCNT</button>
                                                    <button onClick={() => setActiveTab('community')} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${activeTab === 'community' ? 'text-[#1a2b4b] bg-white shadow-sm rounded-t-lg' : 'text-gray-400'}`}>Comunidad</button>
                                                </div>

                                                {activeTab === 'community' ? (
                                                    <CommentsSection
                                                        book={currentChapter.book_name}
                                                        chapter={currentChapter.chapter}
                                                        verse={verse.verse_number}
                                                    />
                                                ) : (
                                                    <StudyCommentaryContent
                                                        book={currentChapter.book_name}
                                                        chapter={currentChapter.chapter}
                                                        verse={verse.verse_number}
                                                        type={activeTab}
                                                    />
                                                )}
                                            </div>

                                        </div>

                                        {/* Bottom Toolbar (Dark, attached to card bottom like image) */}
                                        <div className="bg-[#0f141f] py-4 px-6 flex items-center gap-6 text-gray-400 text-xs font-bold border-t border-gray-800">
                                            <button className="flex items-center gap-2 text-gold-400 bg-gold-500/10 px-3 py-1.5 rounded hover:bg-gold-500/20 transition-all">
                                                <Highlighter className="w-3.5 h-3.5" /> Subrayado
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                                <MessageSquarePlus className="w-3.5 h-3.5" /> Notas
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                                <Volume2 className="w-3.5 h-3.5" /> Audio Biblia
                                            </button>
                                            <button
                                                className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors ml-auto font-bold"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowAI(true);
                                                }}
                                            >
                                                <Sparkles className="w-3.5 h-3.5" /> Preguntar a IA
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        // Standard Rendering for unselected verses
                        return (
                            <div
                                key={verse.verse_number}
                                onClick={() => setSelectedVerse(verse.verse_number)}
                                className="group relative pl-4 pr-4 py-2 cursor-pointer hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 rounded-lg opacity-60 hover:opacity-100"
                            >
                                <div className="flex gap-4">
                                    <span className="text-sm font-bold text-gray-500 group-hover:text-gold-500 transition-colors mt-1 w-6 text-right">
                                        {verse.verse_number}
                                    </span>
                                    <p className="font-libre text-lg text-gray-300 leading-relaxed font-light">
                                        {verse.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Sidebar on the Right */}
                <div className="hidden lg:block w-96 h-full border-l border-white/5 pl-6 overflow-y-auto">
                    <ToolsSidebar
                        bookName={currentChapter.book_name}
                        chapter={currentChapter.chapter}
                        selectedVerse={selectedVerse}
                    />
                </div>
            </div>

            <AIChatSidebar
                isOpen={showAI}
                onClose={() => setShowAI(false)}
                contextVerse={selectedVerse ? verses.find(v => v.verse_number === selectedVerse)?.content : undefined}
            />
        </div>
    );
}

function StudyCommentaryContent({ book, chapter, verse, type }: { book: string; chapter: number; verse: number; type: 'exegesis' | 'theology' | 'history' }) {
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchStudy = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('commentaries')
                .select('content')
                .eq('book_name', book)
                .eq('chapter', chapter)
                .eq('verse_number', verse)
                .eq('type', type)
                .maybeSingle();

            if (data) setContent((data as any).content);
            else setContent(null);
            setLoading(false);
        };
        fetchStudy();
    }, [book, chapter, verse, type]);

    if (loading) return (
        <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        </div>
    );

    if (!content) return (
        <div className="text-gray-400 text-xs italic py-4 text-center">
            No hay análisis {type === 'exegesis' ? 'exegético' : 'teológico'} disponible para este versículo aún.
        </div>
    );

    return (
        <div className="text-sm text-gray-700 leading-relaxed font-sans mt-2 animate-in fade-in duration-500">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="mb-2">
                        <span className="font-bold text-[#1a2b4b]">• {book} {chapter}:{verse}</span>
                    </p>
                    <div className="text-[#334155] bg-white/50 p-3 rounded-lg border border-white/80 shadow-sm">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
