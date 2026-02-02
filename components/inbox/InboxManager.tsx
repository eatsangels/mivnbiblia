"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { MessageList } from "./MessageList"
import { MessageDetail } from "./MessageDetail"
import { ComposeMessage } from "./ComposeMessage"
import { Button } from "@/components/ui/button"
import { Plus, Inbox, Send, ArrowLeft, Star, Trash2 } from "lucide-react"

export default function InboxManager({ initialMessages, userId }: { initialMessages: any[], userId: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentTab = searchParams.get('tab') || 'inbox'

    // Almacenamos mensajes en estado para poder actualizarlos (ej: marcar como leido)
    const [messages, setMessages] = useState<any[]>(initialMessages)
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null)
    const [isComposing, setIsComposing] = useState(false)
    const [replyingTo, setReplyingTo] = useState<any | null>(null)

    // Sync when props change (tab change -> new initialMessages)
    useEffect(() => {
        setMessages(initialMessages)
        setSelectedMessage(null)
        setIsComposing(false)
    }, [initialMessages, currentTab])

    const handleSelectMessage = async (msg: any) => {
        setSelectedMessage(msg)
        setIsComposing(false)
        console.log("Selected msg", msg);

        // Mark as read if needed
        if (!msg.is_read && currentTab === 'inbox') {
            const supabase = createClient()
            const { error } = await supabase.from('inbox_messages').update({ is_read: true }).eq('id', msg.id)
            if (error) console.error("Error updating read status", error)

            // Update local state
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
        }
    }

    const handleReply = () => {
        if (!selectedMessage) return
        setReplyingTo({
            userId: selectedMessage.sender_id,
            userName: selectedMessage.sender?.full_name,
            subject: selectedMessage.subject
        })
        setIsComposing(true)
    }

    return (
        <div className="flex flex-col lg:flex-row h-[85vh] gap-6 bg-[#F8FAFC] dark:bg-[#05070a] lg:pt-8 lg:h-[calc(100vh-8rem)]">

            {/* Sidebar & List */}
            <div className={`w-full lg:w-96 flex flex-col gap-4 ${selectedMessage || isComposing ? 'hidden lg:flex' : 'flex'}`}>
                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => { setIsComposing(true); setSelectedMessage(null); setReplyingTo(null); }}
                        className="flex-1 h-12 rounded-xl bg-mivn-blue text-white font-bold uppercase tracking-widest text-xs hover:bg-mivn-blue/90 shadow-lg shadow-mivn-blue/20"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Redactar
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('?tab=inbox')}
                        className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider ${currentTab === 'inbox' ? 'bg-slate-100 dark:bg-slate-800 text-mivn-blue shadow-sm' : 'text-slate-400'}`}
                    >
                        <Inbox className="w-4 h-4 mr-2" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('?tab=sent')}
                        className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider ${currentTab === 'sent' ? 'bg-slate-100 dark:bg-slate-800 text-mivn-blue shadow-sm' : 'text-slate-400'}`}
                    >
                        <Send className="w-4 h-4 mr-2" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('?tab=starred')}
                        className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider ${currentTab === 'starred' ? 'bg-slate-100 dark:bg-slate-800 text-yellow-500 shadow-sm' : 'text-slate-400'}`}
                    >
                        <Star className="w-4 h-4 mr-2" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('?tab=trash')}
                        className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider ${currentTab === 'trash' ? 'bg-slate-100 dark:bg-slate-800 text-rose-500 shadow-sm' : 'text-slate-400'}`}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                    </Button>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <MessageList
                        messages={messages}
                        selectedId={selectedMessage?.id}
                        onSelect={handleSelectMessage}
                        type={currentTab as 'inbox' | 'sent' | 'starred' | 'trash'}
                        userId={userId}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 flex flex-col ${!selectedMessage && !isComposing ? 'hidden lg:flex' : 'flex'}`}>
                {(selectedMessage || isComposing) && (
                    <div className="lg:hidden mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => { setSelectedMessage(null); setIsComposing(false); }}
                            className="text-slate-500 hover:text-mivn-blue -ml-2"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" /> Volver
                        </Button>
                    </div>
                )}

                {isComposing ? (
                    <ComposeMessage
                        onCancel={() => { setIsComposing(false); setReplyingTo(null); }}
                        onSuccess={() => { setIsComposing(false); setReplyingTo(null); router.refresh(); }}
                        replyTo={replyingTo}
                    />
                ) : selectedMessage ? (
                    <MessageDetail
                        message={selectedMessage}
                        onReply={handleReply}
                        userId={userId}
                        onUpdate={() => {
                            // Remove message from local state immediately
                            setMessages(prev => prev.filter(m => m.id !== selectedMessage.id))
                            setSelectedMessage(null)
                            // Then refresh to get updated data from server
                            router.refresh()
                        }}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-dashed">
                        <Inbox className="w-24 h-24 mb-6 opacity-20" />
                        <p className="text-lg font-medium">Selecciona un mensaje para leerlo</p>
                    </div>
                )}
            </div>
        </div>
    )
}
