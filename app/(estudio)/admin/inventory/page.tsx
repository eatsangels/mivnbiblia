import { InventoryManager } from "@/components/admin/InventoryManager";
import { getResources } from "@/lib/queries/admin";

export default async function InventoryPage() {
    const resources = await getResources();

    return <InventoryManager initialResources={resources} />;
}
