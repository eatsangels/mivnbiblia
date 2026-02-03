import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Reply, User as UserIcon, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Message } from "./MessageList"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface MessageWithIds extends Message {
    sender_id: string
    recipient_id: string
    sender_starred: boolean
    recipient_starred: boolean
    sender_deleted: boolean
    recipient_deleted: boolean
}

interface MessageDetailProps {
    message: MessageWithIds
    onReply: () => void
    userId: string
    onUpdate?: () => void
}

export function MessageDetail({ message, onReply, userId, onUpdate }: MessageDetailProps) {
    const supabase = createClient()
    const router = useRouter()
    const isSender = userId === message.sender_id
    const isStarred = isSender ? message.sender_starred : message.recipient_starred
    const isDeleted = isSender ? message.sender_deleted : message.recipient_deleted

    // Local state for optimistic updates
    const [starred, setStarred] = useState(isStarred)

    useEffect(() => {
        setStarred(isSender ? message.sender_starred : message.recipient_starred)
    }, [message, isSender])

    const handleToggleStar = async () => {
        const newValue = !starred
        setStarred(newValue) // Optimistic

        const field = isSender ? 'sender_starred' : 'recipient_starred'
        const { error } = await supabase.from('inbox_messages').update({ [field]: newValue }).eq('id', message.id)

        if (error) {
            setStarred(!newValue) // Revert
            toast.error("Error al actualizar favorito")
        } else {
            if (onUpdate) onUpdate()
            else router.refresh()
        }
    }

    const handleDelete = async () => {
        if (!message) return

        // If already deleted, this action is PURGE (Permanent Delete)
        if (isDeleted) {
            const updates = isSender ? { sender_purged: true } : { recipient_purged: true }
            const { error } = await supabase
                .from('inbox_messages')
                .update(updates)
                .eq('id', message.id)

            if (error) {
                toast.error("Error al eliminar definitivamente")
            } else {
                toast.success("Eliminado definitivamente")
                if (onUpdate) onUpdate()
                else router.refresh()
            }
            return
        }

        const field = isSender ? 'sender_deleted' : 'recipient_deleted'
        const { error } = await supabase.from('inbox_messages').update({ [field]: true }).eq('id', message.id)

        if (error) {
            console.error("DELETE ERROR:", error)
            toast.error(`Error al mover a la papelera: ${error.message}`)
        } else {
            toast.success("Mensaje movido a la papelera")
            if (onUpdate) onUpdate()
            else router.refresh()
        }
    }

    const handleRestore = async () => {
        const field = isSender ? 'sender_deleted' : 'recipient_deleted'
        const { error } = await supabase.from('inbox_messages').update({ [field]: false }).eq('id', message.id)

        if (error) {
            toast.error("Error al restaurar mensaje")
        } else {
            toast.success("Mensaje restaurado")
            if (onUpdate) onUpdate()
            else router.refresh()
        }
    }

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
                                <span className="font-bold text-lg uppercase">{message.sender?.first_name?.[0] || message.sender?.last_name?.[0] || '?'}</span>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-lg">
                                {message.sender?.first_name || message.sender?.last_name
                                    ? `${message.sender.first_name || ''} ${message.sender.last_name || ''}`.trim()
                                    : 'Desconocido'}
                            </p>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                {format(new Date(message.created_at), "PPP 'a las' p", { locale: es })}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {!isDeleted ? (
                            <>
                                <Button
                                    onClick={handleToggleStar}
                                    variant="ghost"
                                    size="icon"
                                    className={`rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/10 ${starred ? 'text-yellow-500' : 'text-slate-400'}`}
                                    title={starred ? "Quitar de favoritos" : "Marcar como favorito"}
                                >
                                    <Star className={`w-5 h-5 ${starred ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10"
                                    title="Mover a papelera"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                                <Button
                                    onClick={onReply}
                                    className="ml-2 rounded-xl flex items-center gap-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 font-bold uppercase tracking-widest text-[10px] h-10 px-6 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <Reply className="w-4 h-4" /> Responder
                                </Button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleRestore}
                                    className="rounded-xl flex items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold uppercase tracking-widest text-[10px]"
                                >
                                    <Reply className="w-4 h-4 rotate-180" /> Restaurar
                                </Button>
                                <Button
                                    onClick={handleDelete} // Logic handles purge when isDeleted is true
                                    className="rounded-xl flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold uppercase tracking-widest text-[10px]"
                                    title="Eliminar definitivamente"
                                >
                                    <Trash2 className="w-4 h-4" /> Eliminar Definitivamente
                                </Button>
                            </div>
                        )}
                    </div>
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
