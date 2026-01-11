'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, BookOpen, StickyNote, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface AIChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    contextVerse?: string; // Versículo seleccionado
    bookName?: string;
    chapter?: number;
    verse?: number;
}

export function AIChatSidebar({ isOpen, onClose, contextVerse, bookName, chapter, verse }: AIChatSidebarProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'La paz sea contigo. Soy tu asistente de estudio. ¿En qué pasaje te gustaría profundizar hoy?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSaveToNotes = async (message: Message) => {
        if (!bookName || !chapter) return;
        setSavingId(message.id);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuario no autenticado');

            const { error } = await (supabase
                .from('user_notes') as any)
                .insert({
                    user_id: user.id,
                    book_name: bookName,
                    chapter: chapter,
                    verse_number: verse || 1,
                    content: `[Asistente Socrático]: ${message.content}`
                });

            if (error) throw error;

            setSavedIds(prev => new Set(prev).add(message.id));
        } catch (error) {
            console.error('Error saving note:', error);
            alert('No se pudo guardar la nota. Por favor intenta de nuevo.');
        } finally {
            setSavingId(null);
        }
    };

    // Si hay un versículo de contexto, el asistente podría reaccionar (feature futura)
    // useEffect(() => {
    //   if (isOpen && contextVerse) { ... }
    // }, [isOpen, contextVerse]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    contextVerse
                }),
            });

            const data = await response.json();

            if (data.error) {
                const err: any = new Error(data.error);
                throw err;
            }

            const botMsg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: data.content
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error: any) {
            console.error('Chat error:', error);

            const errorMsg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `Lo siento, ha ocurrido un error: ${error.message || 'Error desconocido'}. Por favor, intenta de nuevo.`
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <aside className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#0f0f0f]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">

            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold-500/10 rounded-lg text-gold-500">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-gray-200">Asistente Socrático</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gold-500/50">Beta</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Context Banner */}
            {contextVerse && (
                <div className="px-4 py-3 bg-blue-900/10 border-b border-blue-500/20 flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                    <p className="text-xs text-blue-200 line-clamp-2 italic">"{contextVerse}"</p>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-gold-600 text-black'}`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                        </div>
                        <div className={`flex-1 flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-white/5 text-gray-200 rounded-tr-none'
                                : 'bg-black/40 border border-gold-500/20 text-gray-300 rounded-tl-none shadow-lg'
                                }`}>
                                {msg.content}
                            </div>

                            {/* Actions for Assistant Messages */}
                            {msg.role === 'assistant' && msg.id !== 'welcome' && (
                                <button
                                    onClick={() => handleSaveToNotes(msg)}
                                    disabled={savingId === msg.id || savedIds.has(msg.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all
                                        ${savedIds.has(msg.id)
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                        }`}
                                >
                                    {savingId === msg.id ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : savedIds.has(msg.id) ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        <StickyNote className="w-3 h-3" />
                                    )}
                                    {savedIds.has(msg.id) ? 'Guardado' : 'Guardar en Bitácora'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold-600 text-black flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-black/40 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-white/10">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Pregunta o comparte una duda..."
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold-500 hover:text-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-gray-600 mt-2">La IA puede cometer errores. Verifica con las escrituras.</p>
            </div>
        </aside>
    );
}
