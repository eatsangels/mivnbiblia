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
            .select('*, recipient:profiles!recipient_id(full_name, avatar_url), sender:profiles!sender_id(full_name, avatar_url)')
            .eq('sender_id', user.id)
            .eq('sender_deleted', false) // Only not deleted
            .eq('sender_purged', false) // Only not purged
            .order('created_at', { ascending: false })
        messages = data || []
    } else if (tab === 'starred') {
        const { data } = await supabase.from('inbox_messages')
            .select('*, sender:profiles!sender_id(full_name, avatar_url), recipient:profiles!recipient_id(full_name, avatar_url)')
            .or(`and(sender_id.eq.${user.id},sender_starred.eq.true,sender_deleted.eq.false,sender_purged.eq.false),and(recipient_id.eq.${user.id},recipient_starred.eq.true,recipient_deleted.eq.false,recipient_purged.eq.false)`)
            .order('created_at', { ascending: false })
        messages = data || []
    } else if (tab === 'trash') {
        const { data } = await supabase.from('inbox_messages')
            .select('*, sender:profiles!sender_id(full_name, avatar_url), recipient:profiles!recipient_id(full_name, avatar_url)')
            .or(`and(sender_id.eq.${user.id},sender_deleted.eq.true,sender_purged.eq.false),and(recipient_id.eq.${user.id},recipient_deleted.eq.true,recipient_purged.eq.false)`)
            .order('created_at', { ascending: false })
        messages = data || []
    } else {
        // Inbox
        const { data } = await supabase.from('inbox_messages')
            .select('*, sender:profiles!sender_id(full_name, avatar_url), recipient:profiles!recipient_id(full_name, avatar_url)')
            .eq('recipient_id', user.id)
            .eq('recipient_deleted', false) // Only not deleted
            .eq('recipient_purged', false) // Only not purged
            .order('created_at', { ascending: false })
        messages = data || []
    }

    return (
        <InboxManager initialMessages={messages} userId={user.id} />
    )
}
