import { FAQ } from "@/components/website/FAQ";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();
    const { data: faqs } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

    return <FAQ initialFaqs={faqs || []} />;
}
