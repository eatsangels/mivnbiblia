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
    console.log("DEBUG [Query]: Buscando menú:", menuName);
    const supabase = await createClient();

    // Get menu
    const { data: menu, error: menuError } = await supabase
        .from("navigation_menus")
        .select("*")
        .eq("name", menuName)
        .maybeSingle();

    if (menuError) {
        console.error("DEBUG [Query Error]: Fallo al obtener menú:", menuError);
        throw menuError;
    }

    if (!menu) {
        console.warn("DEBUG [Query Warn]: Menú no encontrado, devolviendo vacío:", menuName);
        return {
            menu: { id: '', name: menuName, created_at: '' } as NavigationMenu,
            items: [] as NavigationItem[],
        };
    }

    console.log("DEBUG [Query Success]: Menú encontrado ID:", menu.id);

    // Get items
    const { data: items, error: itemsError } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("menu_id", menu.id)
        .order("order", { ascending: true });

    if (itemsError) {
        console.error("DEBUG [Query Error]: Fallo al obtener items:", itemsError);
        throw itemsError;
    }

    console.log("DEBUG [Query Success]: Items encontrados:", items?.length);

    return {
        menu: menu as NavigationMenu,
        items: items as NavigationItem[],
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
