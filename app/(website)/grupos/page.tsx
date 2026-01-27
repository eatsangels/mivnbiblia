import { getSmallGroups, getPublicMemberLocations } from "@/app/(estudio)/admin/groups/actions";
import { GroupsExplorer } from "@/components/website/GroupsExplorer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mapa de Grupos Pequeños | Ministerio Internacional Vida Nueva",
    description: "Encuentra un grupo de crecimiento cerca de ti y conéctate con la comunidad.",
};

export default async function GruposPage() {
    // Fetch data from database
    const groups = await getSmallGroups();
    const members = await getPublicMemberLocations();

    return <GroupsExplorer initialGroups={groups} memberLocations={members} />;
}
