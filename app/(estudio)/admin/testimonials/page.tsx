import { TestimonialManager } from "@/components/admin/TestimonialManager";
import { getTestimonies } from "./actions";

export default async function TestimonialsPage() {
    const testimonies = await getTestimonies();
    return <TestimonialManager initialTestimonies={testimonies} />;
}
