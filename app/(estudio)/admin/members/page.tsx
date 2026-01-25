import { MemberManager } from "@/components/admin/MemberManager";
import { getMembers, getMemberStats } from "@/lib/queries/admin";

export default async function MembersPage() {
    const members = await getMembers();
    const stats = await getMemberStats();

    return <MemberManager initialMembers={members} stats={stats} />;
}
