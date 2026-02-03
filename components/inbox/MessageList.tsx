"use client"

import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Check, CheckCheck, Star } from "lucide-react"

// Definimos la interfaz localmente o importamos de database.types si tuviéramos un helper generador
export interface Message {
    id: string
    subject: string | null
    body: string
    created_at: string
    is_read: boolean
    sender_id: string
    recipient_id: string
    sender_starred: boolean
    recipient_starred: boolean
    sender_deleted: boolean
    recipient_deleted: boolean
    sender_purged: boolean
    recipient_purged: boolean
    sender?: { first_name: string | null, last_name: string | null, avatar_url: string | null } | null
    recipient?: { first_name: string | null, last_name: string | null, avatar_url: string | null } | null
}

interface MessageListProps {
    messages: Message[]
    selectedId?: string | null
    onSelect: (message: Message) => void
    type: 'inbox' | 'sent' | 'starred' | 'trash'
    userId: string
}

export function MessageList({ messages, selectedId, onSelect, type, userId }: MessageListProps) {
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400">
                <p>No hay mensajes en esta bandeja.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 p-2">
            {messages.map((message) => {
                const isSender = message.sender_id === userId
                const otherUser = isSender ? message.recipient : message.sender
                const isSelected = selectedId === message.id
                // Determine if this specific message view is starred/read
                const isRead = message.is_read
                const isStarred = isSender ? message.sender_starred : message.recipient_starred

                // Note: Filtering should ideally happen before passing to this list or in parent
                // But if we receive mixed messages (e.g. in search), we differentiate here.

                return (
                    <button
                        key={message.id}
                        onClick={() => onSelect(message)}
                        className={cn(
                            "flex flex-col gap-1 p-4 rounded-xl text-left transition-all border group relative",
                            isSelected
                                ? "bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700 z-10"
                                : "hover:bg-slate-50 dark:hover:bg-white/5 border-transparent"
                        )}
                    >
                        <div className="flex justify-between items-start w-full">
                            <div className="flex items-center gap-2 min-w-0">
                                {type === 'inbox' && !isRead && (
                                    <div className="w-2 h-2 rounded-full bg-mivn-blue shrink-0 animate-pulse" />
                                )}
                                <span className={cn("text-sm font-bold truncate", !isRead && type === 'inbox' ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                    {otherUser?.first_name || otherUser?.last_name
                                        ? `${otherUser.first_name || ''} ${otherUser.last_name || ''}`.trim()
                                        : 'Desconocido'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                                {isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                                <span className="text-[10px] text-slate-400 capitalize whitespace-nowrap">
                                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: es }).replace('alrededor de ', '')}
                                </span>
                            </div>
                        </div>
                        <h4 className={cn("text-sm truncate w-full pr-4 text-left", !isRead && type === 'inbox' ? "font-bold text-slate-800 dark:text-gray-200" : "font-normal text-slate-500")}>
                            {message.subject || '(Sin título)'}
                        </h4>
                        <div
                            className="text-xs text-slate-400 line-clamp-1 w-full text-left opacity-80"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {message.body.replace(/<[^>]+>/g, ' ')}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
