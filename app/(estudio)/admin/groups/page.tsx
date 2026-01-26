import { SmallGroupsManager } from "@/components/admin/SmallGroupsManager";
import { getSmallGroups } from "./actions";

export default async function GroupsPage() {
    const groups = await getSmallGroups();
    return <SmallGroupsManager groups={groups} />;
}
