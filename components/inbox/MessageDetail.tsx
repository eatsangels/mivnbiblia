"use client"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Reply, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Message } from "./MessageList"

interface MessageWithIds extends Message {
    sender_id: string
    recipient_id: string
}

interface MessageDetailProps {
    message: MessageWithIds
    onReply: () => void
}

export function MessageDetail({ message, onReply }: MessageDetailProps) {
    return (
        <div className="h-full flex flex-col overflow-y-auto p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            {/* Header */}
            <div className="space-y-6 border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
                <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white capitalize leading-tight">{message.subject || '(Sin Asunto)'}</h1>
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-mivn-blue/10 overflow-hidden flex items-center justify-center text-mivn-blue shrink-0">
                            {message.sender?.avatar_url ? (
                                <img src={message.sender.avatar_url} className="w-full h-full object-cover" alt="" />
                            ) : (
                                <span className="font-bold text-lg uppercase">{message.sender?.full_name?.[0] || '?'}</span>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-lg">{message.sender?.full_name || 'Desconocido'}</p>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                {format(new Date(message.created_at), "PPP 'a las' p", { locale: es })}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={onReply}
                        className="rounded-xl flex items-center gap-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 font-bold uppercase tracking-widest text-[10px] h-10 px-6 border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                        <Reply className="w-4 h-4" /> Responder
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div
                className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-lexend message-body"
                dangerouslySetInnerHTML={{ __html: message.body }}
            />

            {/* Global style for youtube iframes responsiveness within prose */}
            <style jsx global>{`
                .message-body iframe {
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 1rem;
                    margin: 1.5rem 0;
                }
                .message-body img {
                    border-radius: 1rem;
                }
            `}</style>
        </div>
    )
}
