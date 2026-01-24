import { createClient } from "@/lib/supabase/server";
import { GlobalNavClient } from "./GlobalNavClient";

export async function GlobalNav() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return <GlobalNavClient user={user} />;
}
