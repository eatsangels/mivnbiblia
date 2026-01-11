'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Book, Save, X, Bold, Italic, List, ListOrdered, Loader2, Plus, Trash2, Edit3, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils'; // Assuming this exists, otherwise I'll use template literals

interface SermonWorkshopProps {
    isOpen: boolean;
    onClose: () => void;
    bookName: string;
    chapter: number;
}

export function SermonWorkshop({ isOpen, onClose, bookName, chapter }: SermonWorkshopProps) {
    const [title, setTitle] = useState('');
    const [activeTab, setActiveTab] = useState<'notes' | 'history' | 'traditions' | 'sermons'>('notes');
    const [saving, setSaving] = useState(false);

    // Reference Data State
    const [notes, setNotes] = useState<any[]>([]);
    const [history, setHistory] = useState<string | null>(null);
    const [traditions, setTraditions] = useState<string | null>(null);
    const [sermonsList, setSermonsList] = useState<any[]>([]);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');
    const [currentSermonId, setCurrentSermonId] = useState<string | null>(null);
    const [loadingRefs, setLoadingRefs] = useState(false);

    const supabase = createClient();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Comienza a escribir tu prédica aquí...',
            }),
        ],
        immediatelyRender: false,
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] text-gray-300',
            },
        },
    });

    // Fetch Reference Data
    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            setLoadingRefs(true);
            const { data: { user } } = await supabase.auth.getUser();

            // Fetch Notes
            if (user) {
                const { data: notesData } = await supabase
                    .from('user_notes')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                setNotes(notesData || []);
            }

            // Fetch History
            const { data: historyData } = await supabase
                .from('commentaries')
                .select('content')
                .eq('book_name', bookName)
                .eq('chapter', chapter)
                .eq('type', 'history')
                .maybeSingle();
            setHistory((historyData as any)?.content || null);

            // Fetch Traditions
            const { data: traditionsData } = await supabase
                .from('commentaries')
                .select('content')
                .eq('book_name', bookName)
                .eq('chapter', chapter)
                .eq('type', 'tradition')
                .maybeSingle();
            setTraditions((traditionsData as any)?.content || null);

            setLoadingRefs(false);

            // Fetch All Sermons for this context
            if (user) {
                const { data: sermonsData } = await supabase
                    .from('sermons')
                    .select('id, title, updated_at, reference_book, reference_chapter')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false });
                setSermonsList(sermonsData || []);
            }

            // Fetch Existing Sermon Draft
            if (user) {
                const { data: sermonData } = await supabase
                    .from('sermons')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('reference_book', bookName)
                    .eq('reference_chapter', chapter)
                    .order('updated_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (sermonData) {
                    const s = sermonData as any;
                    setCurrentSermonId(s.id);
                    setTitle(s.title);
                    if (editor && !editor.isDestroyed) {
                        editor.commands.setContent(s.content);
                    }
                }
            }
        };

        fetchData();
    }, [isOpen, bookName, chapter, supabase, editor]);

    const handleSave = async () => {
        if (!editor || !title.trim()) return;
        setSaving(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        if (currentSermonId) {
            // Update existing
            const { error } = await (supabase
                .from('sermons') as any)
                .update({
                    title,
                    content: editor.getHTML(),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', currentSermonId);

            if (!error) {
                // Update local list
                setSermonsList(prev => prev.map(s => s.id === currentSermonId ? { ...s, title, updated_at: new Date().toISOString() } : s));
            }
        } else {
            // Create new
            const { data, error } = await (supabase
                .from('sermons') as any)
                .insert({
                    user_id: user.id,
                    title,
                    content: editor.getHTML(),
                    reference_book: bookName,
                    reference_chapter: chapter,
                })
                .select()
                .single();

            if (!error && data) {
                const s = data as any;
                setCurrentSermonId(s.id);
                setSermonsList(prev => [{ id: s.id, title: s.title, updated_at: s.updated_at }, ...prev]);
            }
        }

        setSaving(false);
    };

    const handleNewSermon = () => {
        setCurrentSermonId(null);
        setTitle('');
        editor?.commands.setContent('');
        setActiveTab('notes'); // Switch context back to notes usually
    };

    const loadSermon = async (id: string) => {
        const { data } = await supabase.from('sermons').select('*').eq('id', id).single();
        if (data) {
            const s = data as any;
            setCurrentSermonId(s.id);
            setTitle(s.title);
            editor?.commands.setContent(s.content);
        }
    };

    const handleDeleteSermon = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('¿Estás seguro de que quieres eliminar esta prédica?')) return;

        const { error } = await supabase.from('sermons').delete().eq('id', id);
        if (!error) {
            setSermonsList(prev => prev.filter(s => s.id !== id));
            if (currentSermonId === id) {
                handleNewSermon();
            }
        }
    };

    const handleDeleteNote = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta nota?')) return;

        const { error } = await supabase.from('user_notes').delete().eq('id', id);
        if (!error) {
            setNotes(prev => prev.filter(n => n.id !== id));
        }
    };

    const handleSaveNoteEdit = async (id: string) => {
        const { error } = await (supabase.from('user_notes') as any)
            .update({ content: editingNoteContent })
            .eq('id', id);

        if (!error) {
            setNotes(prev => prev.map(n => n.id === id ? { ...n, content: editingNoteContent } : n));
            setEditingNoteId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="w-full h-full max-w-7xl bg-[#0f141f] border border-gold-500/20 rounded-3xl flex overflow-hidden shadow-2xl">

                {/* Left Panel - References */}
                <div className="w-1/3 border-r border-white/5 flex flex-col bg-[#0a0e14]">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-gold-400 font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
                            <Book className="w-4 h-4" /> Referencias: {bookName} {chapter}
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-2 gap-2 border-b border-white/5">
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors ${activeTab === 'notes' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Bitácora
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors ${activeTab === 'history' ? 'bg-purple-900/30 text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Historia
                        </button>
                        <button
                            onClick={() => setActiveTab('traditions')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors ${activeTab === 'traditions' ? 'bg-gold-900/30 text-gold-400' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Tradición
                        </button>
                        <button
                            onClick={() => setActiveTab('sermons')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors ${activeTab === 'sermons' ? 'bg-green-900/30 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Prédicas
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {loadingRefs ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                            </div>
                        ) : (
                            <>
                                {activeTab === 'notes' && (
                                    <div className="space-y-3">
                                        {notes.length > 0 ? notes.map(note => (
                                            <div key={note.id} className="p-3 bg-white/5 border border-white/5 rounded-lg group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                                        {note.book_name} {note.chapter}:{note.verse_number}
                                                    </span>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => {
                                                                setEditingNoteId(note.id);
                                                                setEditingNoteContent(note.content);
                                                            }}
                                                            className="text-gray-500 hover:text-blue-400 transition-colors"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="text-gray-500 hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {editingNoteId === note.id ? (
                                                    <div className="space-y-2">
                                                        <textarea 
                                                            value={editingNoteContent}
                                                            onChange={(e) => setEditingNoteContent(e.target.value)}
                                                            className="w-full bg-black/40 border border-blue-500/30 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
                                                        />
                                                        <div className="flex justify-end gap-2">
                                                            <button 
                                                                onClick={() => setEditingNoteId(null)}
                                                                className="p-1 px-2 hover:bg-white/5 rounded text-[10px] font-bold text-gray-400 uppercase"
                                                            >
                                                                Cancelar
                                                            </button>
                                                            <button 
                                                                onClick={() => handleSaveNoteEdit(note.id)}
                                                                className="p-1 px-2 bg-blue-600 hover:bg-blue-500 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1"
                                                            >
                                                                <Check className="w-3 h-3" /> Guardar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-300 text-sm leading-relaxed">{note.content}</p>
                                                )}
                                            </div>
                                        )) : (
                                            <p className="text-gray-500 text-center text-xs italic py-10">No hay notas personales.</p>
                                        )}
                                    </div>
                                )}
                                {activeTab === 'history' && (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <p className="text-gray-300 leading-relaxed font-serif whitespace-pre-wrap">
                                            {history || "No hay información histórica disponible."}
                                        </p>
                                    </div>
                                )}
                                {activeTab === 'traditions' && (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <p className="text-gray-300 leading-relaxed font-serif whitespace-pre-wrap">
                                            {traditions || "No hay tradiciones registradas."}
                                        </p>
                                    </div>
                                )}
                                {activeTab === 'sermons' && (
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleNewSermon}
                                            className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-center gap-2 mb-4"
                                        >
                                            <Plus className="w-4 h-4" /> Nueva Prédica
                                        </button>

                                        {sermonsList.length > 0 ? sermonsList.map((sermon: any) => (
                                            <div
                                                key={sermon.id}
                                                onClick={() => loadSermon(sermon.id)}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors group relative ${currentSermonId === sermon.id ? 'bg-green-900/20 border-green-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                                            >
                                                <button 
                                                    onClick={(e) => handleDeleteSermon(e, sermon.id)}
                                                    className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all bg-black/40 rounded-lg hover:scale-110"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>

                                                <div className="flex justify-between items-start mb-1 pr-8">
                                                    <h4 className={`text-sm font-bold flex-1 ${currentSermonId === sermon.id ? 'text-green-400' : 'text-gray-200'}`}>{sermon.title || 'Sin Título'}</h4>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[9px] text-gray-500 uppercase font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                        {sermon.reference_book} {sermon.reference_chapter}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {new Date(sermon.updated_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-gray-500 text-center text-xs italic py-10">No hay prédicas guardadas.</p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Right Panel - Editor */}
                <div className="w-2/3 flex flex-col bg-[#0f141f]">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#151b2b]">
                        <div className="flex-1 mr-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título de la Prédica..."
                                className="w-full bg-transparent text-xl font-serif font-bold text-white placeholder-gray-600 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black text-xs font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                GUARDAR
                            </button>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="px-4 py-2 border-b border-white/5 flex gap-2 overflow-x-auto">
                        <button
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            className={`p-2 rounded hover:bg-white/5 transition-colors ${editor?.isActive('bold') ? 'text-gold-400 bg-white/10' : 'text-gray-400'}`}
                        >
                            <Bold className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            className={`p-2 rounded hover:bg-white/5 transition-colors ${editor?.isActive('italic') ? 'text-gold-400 bg-white/10' : 'text-gray-400'}`}
                        >
                            <Italic className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                        <button
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            className={`p-2 rounded hover:bg-white/5 transition-colors ${editor?.isActive('bulletList') ? 'text-gold-400 bg-white/10' : 'text-gray-400'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            className={`p-2 rounded hover:bg-white/5 transition-colors ${editor?.isActive('orderedList') ? 'text-gold-400 bg-white/10' : 'text-gray-400'}`}
                        >
                            <ListOrdered className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 overflow-y-auto p-8 bg-[#0f141f]">
                        <EditorContent editor={editor} className="min-h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
