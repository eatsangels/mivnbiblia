"use client"

import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Check, CheckCheck } from "lucide-react"

// Definimos la interfaz localmente o importamos de database.types si tuviéramos un helper generador
export interface Message {
    id: string
    subject: string | null
    body: string
    created_at: string
    is_read: boolean
    sender?: { full_name: string | null, avatar_url: string | null } | null
    recipient?: { full_name: string | null, avatar_url: string | null } | null
}

interface MessageListProps {
    messages: Message[]
    selectedId?: string | null
    onSelect: (message: Message) => void
    type: 'inbox' | 'sent'
}

export function MessageList({ messages, selectedId, onSelect, type }: MessageListProps) {
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
                const otherUser = type === 'inbox' ? message.sender : message.recipient
                const isSelected = selectedId === message.id

                return (
                    <button
                        key={message.id}
                        onClick={() => onSelect(message)}
                        className={cn(
                            "flex flex-col gap-1 p-4 rounded-xl text-left transition-all border",
                            isSelected
                                ? "bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700 z-10"
                                : "hover:bg-slate-50 dark:hover:bg-white/5 border-transparent"
                        )}
                    >
                        <div className="flex justify-between items-start w-full">
                            <div className="flex items-center gap-2 min-w-0">
                                {type === 'inbox' && !message.is_read && (
                                    <div className="w-2 h-2 rounded-full bg-mivn-blue shrink-0 animate-pulse" />
                                )}
                                <span className={cn("text-sm font-bold truncate", !message.is_read && type === 'inbox' ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                    {otherUser?.full_name || 'Desconocido'}
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 capitalize whitespace-nowrap ml-2">
                                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: es }).replace('alrededor de ', '')}
                            </span>
                        </div>
                        <h4 className={cn("text-sm truncate w-full pr-4 text-left", !message.is_read && type === 'inbox' ? "font-bold text-slate-800 dark:text-gray-200" : "font-normal text-slate-500")}>
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
