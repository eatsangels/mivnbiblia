'use client';

import { useState, useEffect } from "react";
import { ArrowUpRight, MessageSquare, StickyNote, Bookmark, MoreHorizontal, CheckSquare, Square, Loader2, Plus, Sparkles, PenTool, Trash2, Edit3, X, Check } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { getBookMetadata } from "@/lib/bibleMetadata";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";


interface ToolsSidebarProps {
    bookName: string;
    chapter: number;
    selectedVerse: number | null;
    onOpenWorkshop: () => void;
}

export function ToolsSidebar({ bookName, chapter, selectedVerse, onOpenWorkshop }: ToolsSidebarProps) {
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
    const [showTraditions, setShowTraditions] = useState(false);
    const [historyContent, setHistoryContent] = useState<string | null>(null);
    const [traditionContent, setTraditionContent] = useState<string | null>(null);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [loadingTradition, setLoadingTradition] = useState(false);

    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editingNoteContent, setEditingNoteContent] = useState("");
    const searchParams = useSearchParams();
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
            .order('created_at', { ascending: false });

        if (data) setNotes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, [bookName, chapter]);

    useEffect(() => {
        const handleExternalOpen = () => {
            setIsAdding(true);
            setTimeout(() => {
                const input = document.querySelector('textarea[placeholder*="reflexión"], textarea[placeholder*="v."]') as HTMLTextAreaElement;
                if (input) {
                    input.focus();
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        };

        window.addEventListener('mivn-open-note-editor', handleExternalOpen);
        return () => window.removeEventListener('mivn-open-note-editor', handleExternalOpen);
    }, []);

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

    const handleDeleteNote = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('¿Eliminar nota?')) return;
        const { error } = await supabase.from('user_notes').delete().eq('id', id);
        if (!error) fetchNotes();
    };

    const handleSaveEdit = async (id: string) => {
        const { error } = await (supabase.from('user_notes') as any)
            .update({ content: editingNoteContent })
            .eq('id', id);
        if (!error) {
            setEditingNoteId(null);
            fetchNotes();
        }
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

    const handleOpenTraditions = async () => {
        setShowTraditions(true);
        setLoadingTradition(true);
        const { data } = await supabase
            .from('commentaries')
            .select('content')
            .eq('book_name', bookName)
            .eq('chapter', chapter)
            .eq('type', 'tradition')
            .maybeSingle();

        if (data) setTraditionContent((data as any).content);
        else setTraditionContent(null);
        setLoadingTradition(false);
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

            {/* Tradiciones Modal */}
            {showTraditions && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0f141f] border border-gold-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gold-950/20">
                            <h2 className="text-gold-400 font-bold flex items-center gap-2 tracking-wide uppercase text-xs">
                                <Sparkles className="w-4 h-4" /> Tradiciones Sacras & Cultura
                            </h2>
                            <button onClick={() => setShowTraditions(false)} className="text-gray-500 hover:text-white">✕</button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {loadingTradition ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                                </div>
                            ) : traditionContent ? (
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 leading-relaxed font-serif text-lg whitespace-pre-wrap">
                                        {traditionContent}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 italic">
                                    No hay tradiciones registradas para este capítulo aún.
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
                    {meta.relatedVerses.map((item) => {
                        // Helper to parse "Libro Cap:Versos" -> /read/Libro/Cap
                        const getLinkFromRef = (ref: string) => {
                            try {
                                // Handle "1 Corintios 10:1-4" or "Hebreos 11:23"
                                // Split by last space to separate Book from Chapter:Verse
                                const lastSpaceIndex = ref.lastIndexOf(' ');
                                if (lastSpaceIndex === -1) return '#';

                                const book = ref.substring(0, lastSpaceIndex).trim();
                                const rest = ref.substring(lastSpaceIndex + 1);
                                const chapter = rest.split(':')[0];

                                return `/read/${book}/${chapter}`;
                            } catch (e) {
                                return '#';
                            }
                        };

                        return (
                            <Link href={getLinkFromRef(item.ref)} key={item.ref} className="block group">
                                <div className="bg-[#151b2b] hover:bg-[#1c2438] border border-white/5 hover:border-blue-500/30 rounded-lg p-3 transition-all cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-blue-300 group-hover:text-blue-200 text-xs font-bold transition-colors">{item.ref}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-sans">
                                        {item.text}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
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

                <div className="bg-[#111623] rounded-xl overflow-hidden border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="p-4 flex justify-center">
                            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        </div>
                    ) : notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] text-blue-500 font-bold">
                                        {note.book_name} {note.chapter}:{note.verse_number}
                                    </span>
                                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                setEditingNoteId(note.id);
                                                setEditingNoteContent(note.content);
                                            }}
                                            className="text-gray-500 hover:text-blue-400"
                                        >
                                            <Edit3 className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteNote(e, note.id)}
                                            className="text-gray-500 hover:text-red-400"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                {editingNoteId === note.id ? (
                                    <div className="space-y-2 mt-2">
                                        <textarea
                                            value={editingNoteContent}
                                            onChange={(e) => setEditingNoteContent(e.target.value)}
                                            className="w-full bg-[#1c2438] border border-blue-500/30 rounded p-1.5 text-[11px] text-white focus:outline-none min-h-[60px]"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingNoteId(null)} className="text-[9px] text-gray-500 hover:text-white uppercase font-bold">Cancelar</button>
                                            <button onClick={() => handleSaveEdit(note.id)} className="text-[9px] text-blue-400 hover:text-blue-300 uppercase font-bold">Guardar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[11px] text-gray-400 leading-snug">{note.content}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-[10px] text-gray-600 italic">
                            No hay notas guardadas aún.
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

                    <button
                        onClick={handleOpenTraditions}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                        <Square className="w-4 h-4 text-gold-500/50 group-hover:text-gold-500" />
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">Tradiciones</span>
                    </button>

                    <button
                        onClick={onOpenWorkshop}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group border border-dashed border-white/10 hover:border-gold-500/50"
                    >
                        <PenTool className="w-4 h-4 text-gray-500 group-hover:text-gold-400" />
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">Taller de Elocuencia</span>
                    </button>
                </div>
            </div>


        </aside>
    );
}
