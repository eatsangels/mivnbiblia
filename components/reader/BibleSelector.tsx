'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Book, X, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// Data simulada (fallback)
const BIBLE_BOOKS_FALLBACK = [
    { name: "Génesis", chapters: 50, testament: "old" },
    { name: "Éxodo", chapters: 40, testament: "old" },
    { name: "Levítico", chapters: 27, testament: "old" },
    { name: "Números", chapters: 36, testament: "old" },
    { name: "Deuteronomio", chapters: 34, testament: "old" },
    { name: "Juan", chapters: 21, testament: "new" },
    { name: "Mateo", chapters: 28, testament: "new" },
    { name: "Apocalipsis", chapters: 22, testament: "new" },
];

interface BibleSelectorProps {
    currentBook: string;
    currentChapter: string;
}

export function BibleSelector({ currentBook, currentChapter }: BibleSelectorProps) {
    const [books, setBooks] = useState<any[]>(BIBLE_BOOKS_FALLBACK);
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'books' | 'chapters'>('books');
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('display_order', { ascending: true });

            if (data && data.length > 0) {
                setBooks(data);
            }
        };
        fetchBooks();
    }, []);

    const currentBookData = books.find(b => b.name === (selectedBook || currentBook));

    const handleBookSelect = (bookName: string) => {
        setSelectedBook(bookName);
        setView('chapters');
    };

    const handleChapterSelect = (chapter: number) => {
        if (selectedBook) {
            router.push(`/read/${selectedBook}/${chapter}`);
            setIsOpen(false);
            // Reset state slightly after to allow transition
            setTimeout(() => {
                setView('books');
                setSelectedBook(null);
            }, 300);
        }
    };

    const toggleOpen = () => {
        if (isOpen) {
            setIsOpen(false);
            setTimeout(() => {
                setView('books');
                setSelectedBook(null);
            }, 300);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className="relative z-50">
            {/* Trigger Button */}
            <div
                onClick={toggleOpen}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer transition-all active:scale-95"
            >
                <Book className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-bold text-gray-200">{currentBook} {currentChapter}</span>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown / Modal */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={toggleOpen} />

                    {/* Menu Content */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-2xl bg-[#0f141f] border border-white/10 rounded-2xl shadow-2xl z-[70] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#151b2b]">
                            <div className="flex items-center gap-2">
                                {view === 'chapters' && (
                                    <button onClick={() => setView('books')} className="p-1 hover:bg-white/5 rounded-full mr-1 transition-colors">
                                        <ChevronDown className="w-5 h-5 text-gray-400 rotate-90" />
                                    </button>
                                )}
                                <h3 className="text-white font-bold text-lg">
                                    {view === 'books' ? 'Selecciona un Libro' : `Capítulos de ${selectedBook}`}
                                </h3>
                            </div>
                            <button onClick={toggleOpen} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-2 max-h-[60vh] overflow-y-auto">
                            {view === 'books' ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
                                    {/* Simple separation could be added if needed */}
                                    {books.map((book) => (
                                        <button
                                            key={book.name}
                                            onClick={() => handleBookSelect(book.name)}
                                            className="px-4 py-3 rounded-lg text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                        >
                                            {book.name}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-2">
                                    {currentBookData && Array.from({ length: currentBookData.chapters }, (_, i) => i + 1).map((chapter) => (
                                        <button
                                            key={chapter}
                                            onClick={() => handleChapterSelect(chapter)}
                                            className="px-2 py-3 rounded-lg text-center text-sm font-bold bg-[#1e2738] hover:bg-gold-500 hover:text-black border border-white/5 hover:border-gold-400 transition-all text-gray-300"
                                        >
                                            {chapter}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
