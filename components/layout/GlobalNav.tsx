import { createClient } from "@/lib/supabase/server";
import { GlobalNavClient } from "./GlobalNavClient";
import { getNavigationItemsHierarchical, type NavigationItem } from "@/lib/queries/navigation";

export async function GlobalNav() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get navigation items from database
    let navItems: (NavigationItem & { children: NavigationItem[] })[] = [];
    try {
        navItems = await getNavigationItemsHierarchical("main");
    } catch (error) {
        console.error("Error fetching navigation:", error);
        // Fallback to empty array if DB fails
    }

    return <GlobalNavClient user={user} navItems={navItems} />;
}
