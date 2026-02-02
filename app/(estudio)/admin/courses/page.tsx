import { CourseManager } from "@/components/admin/CourseManager";
import { getCourses, getCourseStats, getStudentsReadyForCertification, getCategories } from "./actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch all data in parallel
    const [courses, stats, studentsReady, categories] = await Promise.all([
        getCourses(),
        getCourseStats(),
        getStudentsReadyForCertification(),
        getCategories()
    ]);

    return <CourseManager
        initialCourses={courses}
        initialStats={stats}
        initialStudentsReady={studentsReady}
        categories={categories}
    />;
}
