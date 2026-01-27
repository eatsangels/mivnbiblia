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

    // Ensure Gallery link exists
    if (!navItems.find(item => item.url === '/galeria')) {
        navItems.push({
            id: 'gallery-manual',
            label: 'Galería',
            url: '/galeria',
            order: 85, // Position before typical last items
            is_external: false,
            icon: null,
            menu_id: 'manual',
            parent_id: null,
            created_at: new Date().toISOString(),
            children: []
        });
        // Re-sort by order to respect hierarchy
        navItems.sort((a, b) => a.order - b.order);
    }

    return <GlobalNavClient user={user} navItems={navItems} />;
}
