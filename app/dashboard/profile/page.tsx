import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as any;

    if (!profile) {
        // Handle edge case where profile might not exist (though it should)
        return <div>Error loading profile.</div>;
    }

    return (
        <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 relative overflow-hidden">
            {/* Background setup similar to Dashboard */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{ backgroundImage: 'url(/dashboard-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent pointer-events-none" />

            <DashboardHeader user={user} profile={profile} />

            <div className="max-w-4xl mx-auto relative z-10 mt-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Editar Perfil
                        </h1>
                        <p className="text-sm text-gray-500">
                            Personaliza tu identidad en MIVN
                        </p>
                    </div>
                </div>

                <ProfileSettings profile={profile} />
            </div>
        </div>
    );
}
