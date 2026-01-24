import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/website/Navbar";
import { Footer } from "@/components/website/Footer";
import { GlobalNav } from "@/components/layout/GlobalNav";

export default async function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-[#FDFDFF] dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 font-sans selection:bg-mivn-blue/30 scroll-smooth">
            <GlobalNav />
            {/* <Navbar user={user} /> */}
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
