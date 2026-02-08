import { AboutUs } from "@/components/website/AboutUs";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nosotros",
    description: "Conoce la historia, visión y valores del Ministerio Internacional Vida Nueva. Nuestra misión es transformar vidas a través del amor de Cristo.",
    openGraph: {
        title: "Sobre Nosotros | MIVN",
        description: "Conoce nuestra historia y nuestra pasión por Dios.",
        images: ["/logo_mivn.png"],
    },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
    const supabase = await createClient();
    const { data } = await supabase.from("about_us_content").select("*").single();

    return <AboutUs initialData={data} />;
}
