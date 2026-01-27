import { EventManager } from "@/components/admin/EventManager";
import { getEvents } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EventsPage() {
    let events: any[] = [];
    try {
        events = await getEvents();
    } catch (error) {
        console.error("Failed to load events:", error);
        // We can optionally show an error UI here, but for now we fallback to empty list
        // so the page works and user can see the "Create" form at least.
    }

    return <EventManager initialEvents={events} />;
}
