"use server";
import { getChannelVideosPaginated } from "@/lib/youtube";

export async function loadMoreCultos(pageToken: string) {
    return await getChannelVideosPaginated(pageToken, 4);
}
