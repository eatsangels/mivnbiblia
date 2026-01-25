import { EventManager } from "@/components/admin/EventManager";
import { getEvents } from "@/lib/queries/admin";

export default async function EventsPage() {
    const events = await getEvents();

    return <EventManager initialEvents={events} />;
}
