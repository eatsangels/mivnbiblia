import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import InboxManager from "@/components/inbox/InboxManager"

export const dynamic = 'force-dynamic'

export default async function MensajesPage(props: { searchParams: Promise<{ tab?: string }> }) {
    const searchParams = await props.searchParams
    const tab = searchParams.tab || "inbox"

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    let messages = []

    if (tab === 'sent') {
        const { data } = await supabase.from('inbox_messages')
            .select('*, recipient:profiles!recipient_id(full_name, avatar_url)')
            .eq('sender_id', user.id)
            .order('created_at', { ascending: false })
        messages = data || []
    } else {
        const { data } = await supabase.from('inbox_messages')
            .select('*, sender:profiles!sender_id(full_name, avatar_url)')
            .eq('recipient_id', user.id)
            .order('created_at', { ascending: false })
        messages = data || []
    }

    return (
        <InboxManager initialMessages={messages} userId={user.id} />
    )
}
