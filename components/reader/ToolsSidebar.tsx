'use client';

import { useState, useEffect } from "react";
import { ArrowUpRight, MessageSquare, StickyNote, Bookmark, MoreHorizontal, CheckSquare, Square, Loader2, Plus } from "lucide-react";
import { getBookMetadata } from "@/lib/bibleMetadata";
import { createClient } from "@/lib/supabase/client";

interface ToolsSidebarProps {
    bookName: string;
    chapter: number;
    selectedVerse: number | null;
}

export function ToolsSidebar({ bookName, chapter, selectedVerse }: ToolsSidebarProps) {
    const meta = getBookMetadata(bookName);
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [saving, setSaving] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [chapterVerses, setChapterVerses] = useState<any[]>([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [historyContent, setHistoryContent] = useState<string | null>(null);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const supabase = createClient();

    const fetchNotes = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('user_notes')
            .select('*')
            .eq('user_id', user.id)
            .eq('book_name', bookName)
            .eq('chapter', chapter)
            .order('created_at', { ascending: false });

        if (data) setNotes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, [bookName, chapter]);

    const handleSaveNote = async () => {
        if (!newNote.trim()) return;
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await (supabase
            .from('user_notes')
            .insert({
                user_id: user.id,
                book_name: bookName,
                chapter: chapter,
                verse_number: selectedVerse || 1,
                content: newNote
            } as any));

        if (!error) {
            setNewNote("");
            setIsAdding(false);
            fetchNotes();
        }
        setSaving(false);
    };

    const handleOpenCards = async () => {
        setShowCards(true);
        setActiveCardIndex(0);
        setIsFlipped(false);
        const { data } = await supabase
            .from('scriptures')
            .select('*')
            .eq('book_name', bookName)
            .eq('chapter', chapter)
            .order('verse_number', { ascending: true })
            .limit(15);
        if (data) setChapterVerses(data);
    };

    const handleOpenHistory = async () => {
        setShowHistory(true);
        setLoadingHistory(true);
        const { data } = await supabase
            .from('commentaries')
            .select('content')
            .eq('book_name', bookName)
            .eq('chapter', chapter)
            .eq('type', 'history')
            .maybeSingle();

        if (data) setHistoryContent((data as any).content);
        else setHistoryContent(null);
        setLoadingHistory(false);
    };

    return (
        <aside className="w-full h-full flex flex-col gap-6 overflow-y-auto pl-2">

            {/* Flashcards Modal */}
            {showCards && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0f141f] border border-gold-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-gold-950/20 to-transparent">
                            <h2 className="text-gold-400 font-bold flex items-center gap-2 tracking-wide uppercase text-xs">
                                <CheckSquare className="w-4 h-4" /> Academia de Memorización
                            </h2>
                            <button onClick={() => setShowCards(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
                        </div>

                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            {chapterVerses.length > 0 ? (
                                <div className="w-full">
                                    {/* The Card with Flip Effect */}
                                    <div
                                        onClick={() => setIsFlipped(!isFlipped)}
                                        className={`relative w-full h-64 cursor-pointer transition-all duration-500 [transition-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                                    >
                                        {/* Front Side */}
                                        <div className="absolute inset-0 bg-[#161d2b] p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center [backface-visibility:hidden] shadow-inner">
                                            <p className="text-gold-500/60 text-[10px] uppercase tracking-[0.3em] mb-6">Referencia</p>
                                            <p className="text-2xl font-serif font-bold text-white mb-2">
                                                {bookName} {chapter}:{chapterVerses[activeCardIndex].verse_number}
                                            </p>
                                            <p className="text-gray-500 text-[10px]">Toca para ver el versículo</p>
                                        </div>

                                        {/* Back Side */}
                                        <div className="absolute inset-0 bg-gold-950/10 p-8 rounded-3xl border border-gold-500/20 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-inner">
                                            <p className="text-gold-500/60 text-[10px] uppercase tracking-[0.3em] mb-4">Versículo</p>
                                            <p className="text-lg italic font-serif leading-relaxed text-white">
                                                "{chapterVerses[activeCardIndex].content}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-center mt-12 w-full">
                                        <button
                                            disabled={activeCardIndex === 0}
                                            onClick={() => { setActiveCardIndex(prev => prev - 1); setIsFlipped(false); }}
                                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-2xl text-[10px] font-black tracking-widest transition-all uppercase"
                                        >
                                            ANTERIOR
                                        </button>
                                        <button
                                            disabled={activeCardIndex === chapterVerses.length - 1}
                                            onClick={() => { setActiveCardIndex(prev => prev + 1); setIsFlipped(false); }}
                                            className="flex-1 py-3 bg-gold-600 text-black hover:bg-gold-500 disabled:opacity-30 rounded-2xl text-[10px] font-black tracking-widest shadow-lg shadow-gold-500/10 transition-all uppercase"
                                        >
                                            SIGUIENTE
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-600 mt-6 font-bold tracking-tighter">
                                        TARJETA {activeCardIndex + 1} DE {chapterVerses.length}
                                    </p>
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center gap-4">
                                    <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                                    <p className="text-gray-500 text-xs animate-pulse">Preparando academia...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Relatos del Evangelio Modal */}
            {showHistory && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0f141f] border border-blue-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-blue-950/20">
                            <h2 className="text-blue-400 font-bold flex items-center gap-2 tracking-wide uppercase text-xs">
                                <Bookmark className="w-4 h-4" /> Relatos del Evangelio & Contexto
                            </h2>
                            <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-white">✕</button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {loadingHistory ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                </div>
                            ) : historyContent ? (
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 leading-relaxed font-serif text-lg">
                                        {historyContent}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 italic">
                                    No hay relatos históricos disponibles para este capítulo aún.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Related Verses */}
            <div className="shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">⚡</span> Relacionados
                    </h3>
                    <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </div>

                <div className="space-y-3">
                    {meta.relatedVerses.map((item) => (
                        <div key={item.ref} className="bg-[#151b2b] hover:bg-[#1c2438] border border-white/5 hover:border-blue-500/30 rounded-lg p-3 transition-all cursor-pointer group">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-blue-300 group-hover:text-blue-200 text-xs font-bold transition-colors">{item.ref}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-sans">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Notes (Bitácora) */}
            <div className="shrink-0">
                <div className="flex items-center justify-between mb-2 mt-2">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">«</span> Bitácora ({notes.length})
                    </h3>
                    <Plus
                        className={`w-4 h-4 text-gray-600 cursor-pointer hover:text-white transition-transform ${isAdding ? 'rotate-45' : ''}`}
                        onClick={() => setIsAdding(!isAdding)}
                    />
                </div>

                {isAdding && (
                    <div className="mb-3 animate-in fade-in slide-in-from-top-2">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder={selectedVerse ? `Nota para v.${selectedVerse}...` : "Escribe tu reflexión..."}
                            className="w-full bg-[#1c2438] border border-blue-500/30 rounded-lg p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 h-20 resize-none"
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleSaveNote}
                                disabled={saving}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <StickyNote className="w-3 h-3" />}
                                GUARDAR
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-[#111623] rounded-xl overflow-hidden border border-white/5 max-h-48 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 flex justify-center">
                            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        </div>
                    ) : notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note.id} className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer flex gap-2">
                                <span className="text-[10px] text-blue-500 mt-0.5">v.{note.verse_number}</span>
                                <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">{note.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-[10px] text-gray-600 italic">
                            No hay notas en este capítulo.
                        </div>
                    )}
                </div>
            </div>

            {/* "Boca" / Other Tools Section */}
            <div className="mt-auto shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">«</span> Estudio Profundo
                    </h3>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={handleOpenHistory}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                        <span className="text-gold-500">★</span>
                        <span className="text-xs font-bold text-gray-300 group-hover:text-white">Relatos del Evangelio</span>
                    </button>

                    <button
                        onClick={handleOpenCards}
                        className="w-full flex items-center gap-3 p-3 bg-[#1c2438] rounded-lg border border-blue-500/20 text-left group shadow-lg active:scale-95 transition-all"
                    >
                        <CheckSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-gray-200 group-hover:text-white">Tarjetas Bíblicas</span>
                        <span className="ml-auto text-[10px] text-gray-600 bg-black/20 px-1 rounded">⌘+T</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group opacity-60 cursor-not-allowed">
                        <Square className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white">Tradiciones</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
