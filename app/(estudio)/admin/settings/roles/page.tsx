import { RolesManager } from "@/components/admin/RolesManager";
import { getRolesSummary, getUsersByRole } from "@/lib/queries/admin";

export default async function RolesPage() {
    const rolesSummary = await getRolesSummary();
    const initialUsers = await getUsersByRole('admin'); // Default active role in Manager

    return (
        <RolesManager
            rolesSummary={rolesSummary}
            initialUsers={initialUsers}
        />
    );
}
