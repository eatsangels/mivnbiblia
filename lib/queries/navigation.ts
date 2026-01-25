import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type NavigationMenu = {
    id: string;
    name: string;
    created_at: string;
};

export type NavigationItem = {
    id: string;
    menu_id: string;
    label: string;
    url: string;
    icon: string | null;
    order: number;
    parent_id: string | null;
    is_external: boolean;
    created_at: string;
};

/**
 * Get navigation menu with items by menu name
 */
export const getNavigationMenu = cache(async (menuName: string) => {
    const supabase = await createClient();

    // Get menu
    const { data: menuRaw, error: menuError } = await supabase
        .from("navigation_menus")
        .select("*")
        .eq("name", menuName)
        .maybeSingle();

    const menu = menuRaw as unknown as NavigationMenu | null;

    if (menuError) {
        throw menuError;
    }

    if (!menu) {
        // console.warn("DEBUG [Query Warn]: Menú no encontrado, devolviendo vacío:", menuName);
        return {
            menu: { id: '', name: menuName, created_at: '' } as NavigationMenu,
            items: [] as NavigationItem[],
        };
    }


    // Get items
    const { data: items, error: itemsError } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("menu_id", menu.id)
        .order("order", { ascending: true });

    if (itemsError) {
        throw itemsError;
    }


    return {
        menu: menu as NavigationMenu,
        items: (items || []) as unknown as NavigationItem[],
    };
});

/**
 * Get all navigation items for a menu (organized hierarchically)
 */
export const getNavigationItemsHierarchical = cache(async (menuName: string) => {
    const { items } = await getNavigationMenu(menuName);

    // Separate parent and child items
    const parentItems = items.filter(item => !item.parent_id);
    const childItems = items.filter(item => item.parent_id);

    // Build hierarchy
    return parentItems.map(parent => ({
        ...parent,
        children: childItems.filter(child => child.parent_id === parent.id),
    }));
});
