'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';
import { Send, UserCircle2 } from 'lucide-react';

interface Comment {
    id: string;
    comment: string;
    author_name?: string;
    created_at: string;
    user_id: string;
}

interface CommentsSectionProps {
    book: string;
    chapter: number;
    verse: number;
}

export function CommentsSection({ book, chapter, verse }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const { data, error } = await (supabase as any)
                .from('comments')
                .select('*')
                .eq('content_id', `${book}-${chapter}-${verse}`)
                .eq('content_type', 'bible_verse')
                .order('created_at', { ascending: false });

            if (data) setComments(data as any);
            setLoading(false);
        };

        fetchComments();

        // Optional: Realtime subscription here
        const channel = supabase
            .channel('comments')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'comments',
                filter: `content_id=eq.${book}-${chapter}-${verse}`
            }, (payload) => {
                setComments((prev) => [payload.new as Comment, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [book, chapter, verse]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }

        const { error } = await (supabase as any).from('comments').insert({
            content_id: `${book}-${chapter}-${verse}`,
            content_type: 'bible_verse',
            comment: newComment,
            user_id: user.id,
            author_name: user.email?.split('@')[0] || 'Usuario'
        });

        if (!error) {
            setNewComment('');
        }
    };

    return (
        <div className="flex flex-col h-[300px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                {loading ? (
                    <div className="text-gray-500 text-xs text-center py-4">Cargando comentarios...</div>
                ) : comments.length === 0 ? (
                    <div className="text-gray-400 text-xs text-center py-8 italic">Sé el primero en comentar sobre este versículo.</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                                <span className="text-blue-400 text-xs font-bold">{(comment.author_name?.[0] || 'U').toUpperCase()}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-800">{comment.author_name || 'Usuario'}</span>
                                    <span className="text-[10px] text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-100 shadow-sm leading-relaxed">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 items-end pt-2 border-t border-gray-100">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario público..."
                    className="flex-1 bg-gray-50 text-sm text-gray-800 p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" disabled={!newComment.trim()} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:opacity-50 transition-colors">
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
