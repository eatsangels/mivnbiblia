import { SermonsManager } from "@/components/admin/SermonsManager";
import { getSermons } from "./actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PastorMessagesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Optional: Verify admin permissions again if needed, 
    // though the actions perform checks and the layout hides links.
    // Ideally we should check here too to prevent manual URL access.
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if ((profile as any)?.role !== 'admin' && (profile as any)?.role !== 'super_admin' && (profile as any)?.role !== 'editor') {
        redirect("/dashboard");
    }

    const sermons = await getSermons();

    return (
        <SermonsManager initialSermons={sermons || []} />
    );
}
