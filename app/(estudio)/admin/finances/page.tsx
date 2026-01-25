import { FinanceManager } from "@/components/admin/FinanceManager";
import { getDonations, getFinanceStats } from "@/lib/queries/admin";

export default async function FinancesPage() {
    const donations = await getDonations();
    const stats = await getFinanceStats();

    return <FinanceManager initialDonations={donations} stats={stats} />;
}
