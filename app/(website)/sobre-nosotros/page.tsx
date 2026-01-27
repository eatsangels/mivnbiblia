import { AboutUs } from "@/components/website/AboutUs";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
    const supabase = await createClient();
    const { data } = await supabase.from("about_us_content").select("*").single();

    return <AboutUs initialData={data} />;
}
