"use server";

import { getRecentActivity } from "@/lib/queries/dashboard";

/**
 * Server action to fetch paginated activity
 */
export async function getPaginatedActivity(page: number) {
    return await getRecentActivity(page, 10);
}
