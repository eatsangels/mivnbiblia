import { DonationsBanner } from "@/components/website/DonationsBanner";
import { createClient } from "@/lib/supabase/server";
import { getDonationStats, getDonationHistory } from "@/app/actions/donations";

export default async function Page() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let userProfile = null;
    let stats = null;
    let recentDonations: any[] = [];

    if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        userProfile = profile;
        stats = await getDonationStats();
        recentDonations = await getDonationHistory();
    }

    return (
        <DonationsBanner
            userProfile={userProfile as any}
            stats={stats as any}
            recentDonations={recentDonations as any}
        />
    );
}
