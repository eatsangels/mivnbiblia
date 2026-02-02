"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { UserSearch, UserResult } from "./UserSearch"
import { RichTextEditor } from "./RichTextEditor"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X, Send, Loader2, Users } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ComposeMessageProps {
    onCancel?: () => void
    onSuccess?: () => void
    replyTo?: {
        userId: string
        userName: string
        subject: string
    }
}

export function ComposeMessage({ onCancel, onSuccess, replyTo }: ComposeMessageProps) {
    const [recipients, setRecipients] = React.useState<UserResult[]>([])
    const [subject, setSubject] = React.useState(replyTo ? `Re: ${replyTo.subject}` : "")
    const [body, setBody] = React.useState("")
    const [sending, setSending] = React.useState(false)

    const supabase = createClient()
    const router = useRouter()

    React.useEffect(() => {
        if (replyTo) {
            setRecipients([{
                id: replyTo.userId,
                full_name: replyTo.userName,
                avatar_url: null,
                email: null
            }])
        }
    }, [replyTo])

    const handleAddRecipient = (user: UserResult) => {
        if (recipients.some(r => r.id === user.id)) return
        setRecipients(prev => [...prev, user])
    }

    const handleRemoveRecipient = (userId: string) => {
        setRecipients(prev => prev.filter(r => r.id !== userId))
    }

    const handleSend = async () => {
        if (recipients.length === 0) {
            toast.error("Debes seleccionar al menos un destinatario")
            return
        }
        if (!subject) {
            toast.error("El asunto es obligatorio")
            return
        }
        if (!body || body === "<p></p>") {
            toast.error("El mensaje no puede estar vacío")
            return
        }

        setSending(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                toast.error("No estás autenticado")
                return
            }

            // Prepare validation for all inserts
            const inserts = recipients.map(recipient => ({
                sender_id: user.id,
                recipient_id: recipient.id,
                subject,
                body,
                is_read: false
            }))

            const { error } = await supabase.from("inbox_messages").insert(inserts)

            if (error) throw error

            const recipientCount = recipients.length
            toast.success(recipientCount > 1
                ? `Mensaje enviado a ${recipientCount} destinatarios`
                : "Mensaje enviado correctamente"
            )

            if (onSuccess) onSuccess()
            else if (onCancel) onCancel()
            else router.refresh()

            router.refresh()

        } catch (e) {
            console.error(e)
            toast.error("Error al enviar el mensaje")
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 space-y-6 max-h-[85vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Send className="w-6 h-6 text-mivn-blue" />
                    Redactar Mensaje
                </h2>
                {onCancel && (
                    <button onClick={onCancel} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Destinatarios */}
                <div className="space-y-3">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-slate-500 flex items-center gap-2">
                        Para <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full text-[9px]">{recipients.length}</span>
                    </Label>

                    {/* Lista de Chips */}
                    {recipients.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2 p-2 max-h-32 overflow-y-auto">
                            {recipients.map(recipient => (
                                <div key={recipient.id} className="flex items-center gap-2 pl-1 pr-2 py-1 bg-mivn-blue/5 text-mivn-blue rounded-full border border-mivn-blue/10 animate-in fade-in zoom-in-95">
                                    <div className="w-6 h-6 rounded-full bg-mivn-blue flex items-center justify-center text-white font-bold text-[10px] overflow-hidden shrink-0">
                                        {recipient.avatar_url ? (
                                            <img src={recipient.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            recipient.full_name?.[0] || "?"
                                        )}
                                    </div>
                                    <span className="text-xs font-bold truncate max-w-[150px]">{recipient.full_name}</span>
                                    <button
                                        onClick={() => handleRemoveRecipient(recipient.id)}
                                        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-rose-100 hover:text-rose-500 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <UserSearch
                        onSelect={handleAddRecipient}
                        selectedIds={recipients.map(r => r.id)}
                        label={recipients.length > 0 ? "Agregar otro destinatario..." : "Buscar destinatarios..."}
                    />
                </div>

                {/* Asunto */}
                <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-slate-500">Asunto</Label>
                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Escribe un asunto..."
                        className="h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-mivn-blue/20"
                        disabled={!!replyTo}
                    />
                </div>

                {/* Cuerpo */}
                <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-slate-500">Mensaje</Label>
                    <RichTextEditor
                        content={body}
                        onChange={setBody}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                {onCancel && (
                    <Button variant="ghost" onClick={onCancel} className="rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white">
                        Cancelar
                    </Button>
                )}
                <Button
                    onClick={handleSend}
                    disabled={sending}
                    className="rounded-xl bg-mivn-blue hover:bg-mivn-blue/90 text-white px-8 h-12 font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg shadow-mivn-blue/20"
                >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : recipients.length > 1 ? <Users className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    {sending ? 'Enviando...' : recipients.length > 1 ? `Enviar a ${recipients.length}` : (replyTo ? 'Enviar Respuesta' : 'Enviar Mensaje')}
                </Button>
            </div>
        </div>
    )
}
