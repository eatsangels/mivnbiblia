import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { SpiritualGrowth } from "@/components/dashboard/SpiritualGrowth";
import { Bell, LayoutDashboard, TrendingUp, User, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getUserMilestones, getUserCertificates, getUserActivity } from "@/lib/queries/growth";
import { getUserPrayerRequests } from "@/lib/queries/prayer-requests";

export default async function GrowthDashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Parallel data fetching
    const [
        { data: profile },
        { data: progress },
        milestones,
        certificates,
        activity,
        prayerRequests
    ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
        getUserMilestones(user.id),
        getUserCertificates(user.id),
        getUserActivity(user.id),
        getUserPrayerRequests(user.id)
    ]);

    if (!profile) {
        return <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-white">Error loading profile.</div>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFB] dark:bg-[#05070a] transition-colors duration-500 font-lexend">
            {/* Headers and Nav stay same ... */}
            {/* ... */}
            <main className="max-w-7xl mx-auto px-6 py-16 w-full">
                <SpiritualGrowth
                    profile={profile}
                    progress={progress}
                    milestones={milestones}
                    certificates={certificates}
                    activity={activity}
                    prayerRequests={prayerRequests}
                />
            </main>
// ... rest same ...

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-8 py-5 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl">
                <Link href="/dashboard" className="text-slate-400"><LayoutDashboard className="w-6 h-6" /></Link>
                <Link href="/dashboard/growth" className="text-mivn-blue"><TrendingUp className="w-6 h-6" /></Link>
                <Link href="/dashboard/ofrendas" className="text-slate-400"><Heart className="w-6 h-6" /></Link>
                <Link href="/dashboard/profile" className="text-slate-400"><User className="w-6 h-6" /></Link>
            </div>
        </div>
    );
}
