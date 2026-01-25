'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Book, X, ChevronRight, Search, ScrollText, History, Flame, MessageSquare, BookOpen, Compass, ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// Categorías de la Biblia
const BIBLE_GROUPS = [
    {
        id: 'pentateuco',
        name: 'Pentateuco',
        subtitle: 'LA CREACIÓN Y EL PACTO',
        icon: ScrollText,
        books: ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio']
    },
    {
        id: 'historia',
        name: 'Historia',
        subtitle: 'CONQUISTA Y REINOS',
        icon: History,
        books: ['Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester']
    },
    {
        id: 'poesia',
        name: 'Poesía',
        subtitle: 'SABIDURÍA Y ALABANZA',
        icon: Flame,
        books: ['Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares']
    },
    {
        id: 'profetas',
        name: 'Profetas',
        subtitle: 'LLAMADO AL ARREPENTIMIENTO',
        icon: MessageSquare,
        books: ['Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías']
    },
    {
        id: 'evangelios',
        name: 'Evangelios',
        subtitle: 'LA VIDA DE CRISTO',
        icon: BookOpen,
        books: ['Mateo', 'Marcos', 'Lucas', 'Juan']
    },
    {
        id: 'apostoles',
        name: 'Apóstoles',
        subtitle: 'LA IGLESIA PRIMITIVA',
        icon: Compass,
        books: ['Hechos', 'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis']
    }
];

interface BookData {
    name: string;
    chapters: number;
    testament: string | null;
}

interface BibleSelectorProps {
    currentBook: string;
    currentChapter: string;
}

export function BibleSelector({ currentBook, currentChapter }: BibleSelectorProps) {
    const [allBooksData, setAllBooksData] = useState<BookData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Navigation State for "Explorar" side
    const [view, setView] = useState<'groups' | 'books' | 'chapters'>('groups');
    const [selectedGroup, setSelectedGroup] = useState<typeof BIBLE_GROUPS[0] | null>(null);
    const [selectedBook, setSelectedBook] = useState<string | null>(null); // For header display

    // Mobile Tab State
    const [mobileTab, setMobileTab] = useState<'explore' | 'list'>('explore');

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Cargar datos reales de capítulos desde Supabase
    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await supabase
                .from('books')
                .select('*')
                .order('display_order', { ascending: true });

            if (data && data.length > 0) {
                setAllBooksData(data);
            }
        };
        fetchBooks();
    }, []);

    // Helper to get total chapters for a book
    const getBookChapters = (bookName: string) => {
        const book = allBooksData.find(b => b.name === bookName);
        return book ? book.chapters : 0;
    };

    const handleGroupSelect = (group: typeof BIBLE_GROUPS[0]) => {
        setSelectedGroup(group);
        setView('books');
        setSearchTerm('');
    };

    const handleBookSelect = (bookName: string) => {
        setSelectedBook(bookName);
        setView('chapters');
        setSearchTerm('');
        setMobileTab('explore'); // Ensure explore tab is active if a book is selected from list
    };

    const handleChapterSelect = (chapter: number, bookName?: string) => {
        const targetBook = bookName || selectedBook;
        if (targetBook) {
            router.push(`/read/${targetBook}/${chapter}`);
            setIsOpen(false);
            // Reset layout after transition
            setTimeout(() => {
                resetState();
            }, 300);
        }
    };

    const resetState = () => {
        setView('groups');
        setSelectedGroup(null);
        setSelectedBook(null);
        setSearchTerm('');
        setMobileTab('explore');
    };

    const toggleOpen = () => {
        if (isOpen) {
            setIsOpen(false);
            setTimeout(resetState, 300);
        } else {
            setIsOpen(true);
        }
    };

    // Filter Logic
    const isSearching = searchTerm.length > 0;
    const filteredAllBooks = isSearching
        ? allBooksData.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : allBooksData;

    return (
        <>
            <div className="relative z-50 font-sans">
                {/* Trigger Button */}
                <div
                    onClick={toggleOpen}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer transition-all active:scale-95"
                >
                    <Book className="w-4 h-4 text-gold-500" />
                    <span className="text-sm font-bold text-gray-200">{currentBook} {currentChapter}</span>
                    <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Modal Portal */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] font-sans">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={toggleOpen} />

                    <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                        <div className="w-full max-w-5xl max-h-[80vh] h-auto bg-[#0f141f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col pointer-events-auto">

                            {/* Header */}
                            <div className="p-4 border-b border-white/5 bg-[#151b2b] shrink-0">
                                <div className="flex items-center gap-3">
                                    {/* Back Button Logic (Only for Explore View) */}
                                    {mobileTab === 'explore' && view !== 'groups' && !isSearching && (
                                        <button
                                            onClick={() => {
                                                if (view === 'chapters') setView('books');
                                                else if (view === 'books') setView('groups');
                                            }}
                                            className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                    )}

                                    <h3 className="text-white font-bold text-lg flex-1 truncate">
                                        {isSearching ? 'Búsqueda' :
                                            (mobileTab === 'explore' && view === 'books') ? selectedGroup?.name :
                                                (mobileTab === 'explore' && view === 'chapters') ? selectedBook :
                                                    'Explorar Biblia'}
                                    </h3>

                                    <div className="relative group w-full max-w-[180px] md:max-w-[250px]">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Buscar libro..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-[#0a0f18] border border-white/10 rounded-full py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold-500/50 transition-all"
                                        />
                                    </div>
                                    <button onClick={toggleOpen} className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Mobile Tabs */}
                                <div className="flex md:hidden mt-4 bg-[#0a0f18] p-1 rounded-lg border border-white/5">
                                    <button
                                        onClick={() => setMobileTab('explore')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${mobileTab === 'explore' ? 'bg-[#1e2738] text-gold-500 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        <LayoutGrid className="w-3.5 h-3.5" /> Explorar
                                    </button>
                                    <button
                                        onClick={() => setMobileTab('list')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${mobileTab === 'list' ? 'bg-[#1e2738] text-gold-500 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        <List className="w-3.5 h-3.5" /> Lista A-Z
                                    </button>
                                </div>
                            </div>

                            {/* Main Body */}
                            <div className="flex-1 overflow-hidden flex flex-row">

                                {/* LEFT PANEL: EXPLORE (Categorized) - Hidden on mobile if tab is 'list' */}
                                <div className={`flex-1 bg-[#0f141f] border-r border-white/5 flex flex-col overflow-hidden transition-all ${mobileTab === 'list' ? 'hidden md:flex' : 'flex'}`}>
                                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                        {isSearching ? (
                                            <div className="text-center py-10 text-gray-500 text-sm italic">
                                                La búsqueda filtra la lista lateral/rápida. <br />
                                                Usa la lista para ver resultados.
                                            </div>
                                        ) : (
                                            <>
                                                {/* Groups View */}
                                                {view === 'groups' && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {BIBLE_GROUPS.map((group) => (
                                                            <button
                                                                key={group.id}
                                                                onClick={() => handleGroupSelect(group)}
                                                                className="flex items-center gap-4 p-4 rounded-xl bg-[#1e2738] hover:bg-[#252f42] border border-white/5 hover:border-gold-500/30 transition-all group text-left"
                                                            >
                                                                <div className="p-3 rounded-lg bg-[#0f141f] text-gray-400 group-hover:text-gold-500 transition-colors">
                                                                    <group.icon className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-base font-bold text-gray-200 group-hover:text-white mb-0.5">{group.name}</h4>
                                                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{group.subtitle}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Books in Group View */}
                                                {view === 'books' && selectedGroup && (
                                                    <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-right-4 duration-200">
                                                        {selectedGroup.books.map((bookName) => (
                                                            <button
                                                                key={bookName}
                                                                onClick={() => handleBookSelect(bookName)}
                                                                className="p-4 rounded-xl bg-[#1e2738] hover:bg-[#252f42] border border-white/5 hover:border-gold-500/30 text-left transition-all"
                                                            >
                                                                <span className="text-sm font-bold text-gray-200">{bookName}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Chapters View */}
                                                {view === 'chapters' && selectedBook && (
                                                    <div className="animate-in slide-in-from-right-4 duration-200">
                                                        <h4 className="text-center text-gold-500 font-bold mb-4 uppercase text-sm tracking-widest">{selectedBook}</h4>
                                                        <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
                                                            {Array.from({ length: getBookChapters(selectedBook) }, (_, i) => i + 1).map((chapter) => (
                                                                <button
                                                                    key={chapter}
                                                                    onClick={() => handleChapterSelect(chapter)}
                                                                    className="aspect-square flex items-center justify-center rounded-lg bg-[#1e2738] hover:bg-gold-500 hover:text-black font-bold text-sm text-gray-300 border border-white/5 transition-all"
                                                                >
                                                                    {chapter}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT PANEL: LIST (Quick Access) - Hidden on mobile if tab is 'explore' */}
                                <div className={`w-full md:w-[280px] bg-[#0a0f18] flex flex-col overflow-hidden border-l border-white/5 transition-all ${mobileTab === 'explore' ? 'hidden md:flex' : 'flex'}`}>
                                    <div className="p-3 border-b border-white/5 bg-[#0f141f]">
                                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            {isSearching ? 'Resultados' : 'Lista Rápida'}
                                        </h5>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                                        {filteredAllBooks.length > 0 ? (
                                            filteredAllBooks.map((book) => (
                                                <div key={book.name} className="mb-1">
                                                    <button
                                                        onClick={() => handleBookSelect(book.name)}
                                                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex justify-between items-center group"
                                                    >
                                                        <span>{book.name}</span>
                                                        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-600 group-hover:bg-gold-500/20 group-hover:text-gold-500 transition-colors">
                                                            {book.chapters} cap
                                                        </span>
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 text-xs text-balance">
                                                No se encontraron libros.
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
