import { getCourseWithLessons, getUserProfile } from "@/app/instituto/actions";
import { LessonManager } from "@/components/institute/LessonManager";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { id } = await params;

    if (!user) {
        redirect("/login?returnTo=/instituto/clase/" + id);
    }

    try {
        const userProfile = await getUserProfile();
        const { course, lessons, progress, enrollment } = await getCourseWithLessons(id);

        if (!course) {
            notFound();
        }

        // If not enrolled, maybe we should redirect to a preview or enrollment page
        if (!enrollment) {
            redirect("/instituto");
        }

        return (
            <LessonManager
                course={course}
                lessons={lessons}
                initialProgress={progress}
                courseId={id}
                userProfile={userProfile}
            />
        );
    } catch (error: any) {
        console.error("Error loading lesson page DETAILS:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
            full: error
        });
        notFound();
    }
}
