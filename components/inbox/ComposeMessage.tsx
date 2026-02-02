"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { UserSearch, UserResult } from "./UserSearch"
import { RichTextEditor } from "./RichTextEditor"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X, Send, Loader2 } from "lucide-react"
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
    const [recipient, setRecipient] = React.useState<UserResult | null>(null)
    const [subject, setSubject] = React.useState(replyTo ? `Re: ${replyTo.subject}` : "")
    const [body, setBody] = React.useState("")
    const [sending, setSending] = React.useState(false)

    const supabase = createClient()
    const router = useRouter()

    React.useEffect(() => {
        if (replyTo) {
            setRecipient({
                id: replyTo.userId,
                full_name: replyTo.userName,
                avatar_url: null, // Opcional, ojalá se pasara si se tiene
                email: null
            })
        }
    }, [replyTo])

    const handleSend = async () => {
        if (!recipient) {
            toast.error("Debes seleccionar un destinatario")
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

            const { error } = await supabase.from("inbox_messages").insert({
                sender_id: user.id,
                recipient_id: recipient.id,
                subject,
                body,
                is_read: false
            })

            if (error) throw error

            toast.success("Mensaje enviado correctamente")
            if (onSuccess) onSuccess()
            else if (onCancel) onCancel() // Si no hay onSuccess pero hay onCancel
            else router.refresh() // Si no hay callbacks, refresh

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
                {/* Destinatario */}
                <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-slate-500">Para</Label>
                    {recipient ? (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
                            <div className="w-10 h-10 rounded-full bg-mivn-blue flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0">
                                {recipient.avatar_url ? (
                                    <img src={recipient.avatar_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    recipient.full_name?.[0] || "?"
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-900 dark:text-white truncate">{recipient.full_name}</p>
                                {recipient.email && <p className="text-xs text-slate-500 truncate">{recipient.email}</p>}
                            </div>
                            {!replyTo && (
                                <button onClick={() => setRecipient(null)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <UserSearch onSelect={setRecipient} />
                    )}
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
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {replyTo ? 'Enviar Respuesta' : 'Enviar Mensaje'}
                </Button>
            </div>
        </div>
    )
}
