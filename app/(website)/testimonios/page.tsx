import { Testimonials } from "@/components/website/Testimonials";
import { getTestimonials } from "@/lib/queries/testimonials";

export default async function Page() {
    const testimonials = await getTestimonials();
    return <Testimonials initialTestimonials={testimonials} />;
}
