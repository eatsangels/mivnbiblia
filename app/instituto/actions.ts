"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Get current user's enrollments with course details
 */
export async function getUserEnrollments() {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
            *,
            courses!inner(
                id,
                title,
                instructor_name,
                thumbnail_url,
                level,
                course_categories(name)
            )
        `)
        .eq('user_id', user.id)
        .order('last_accessed_at', { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Get current user's profile
 */
export async function getUserProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows returned
            console.log("Profile missing for user, creating one...");
            const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    email: user.email,
                    first_name: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0],
                    last_name: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                    avatar_url: user.user_metadata?.avatar_url,
                    roles: ['student']
                })
                .select()
                .single();

            if (createError) {
                console.error("Failed to create profile:", createError);
                return null;
            }
            return newProfile;
        }

        console.error("Error fetching user profile:", error);
        return null;
    }
    return data;
}

/**
 * Get current user's certificates
 */
export async function getUserCertificates() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from('user_certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Enroll user in a course
 */
export async function enrollInCourse(courseId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Check if already enrolled
    const { data: existing } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

    if (existing) return { success: true, message: "Already enrolled" };

    const { error } = await supabase
        .from('course_enrollments')
        .insert({
            user_id: user.id,
            course_id: courseId,
            progress_percentage: 0
        });

    if (error) throw error;

    revalidatePath('/instituto');
    return { success: true };
}

/**
 * Get course details with all lessons and user progress
 */
export async function getCourseWithLessons(courseId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // 1. Get course data
    const { data: course, error: courseError } = await supabase
        .from('courses')
        .select(`
            *,
            course_categories(name),
            course_lessons(*)
        `)
        .eq('id', courseId)
        .single();

    if (courseError) throw courseError;

    // 2. Get user progress for this course's lessons
    const lessonIds = (course.course_lessons || []).map((l: any) => l.id);
    let progress: any[] = [];

    if (lessonIds.length > 0) {
        const { data: progressData, error: progressError } = await supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', user.id)
            .in('lesson_id', lessonIds);

        if (progressError) throw progressError;
        progress = progressData || [];
    }

    // 3. Get enrollment data
    const { data: enrollment } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

    return {
        course,
        lessons: (course.course_lessons || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)),
        progress: progress || [],
        enrollment
    };
}

/**
 * Mark a lesson as completed and update course progress
 */
export async function completeLesson(lessonId: string, courseId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // 1. Mark lesson as completed in lesson_progress
    const { error: progressError } = await supabase
        .from('lesson_progress')
        .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });

    if (progressError) throw progressError;

    // 2. Recalculate course progress
    // Get total lessons
    const { count: totalLessons } = await supabase
        .from('course_lessons')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);

    // Get completed lessons
    const { data: lessonIds } = await supabase
        .from('course_lessons')
        .select('id')
        .eq('course_id', courseId);

    const { count: completedLessons } = await supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('completed', true)
        .in('lesson_id', lessonIds?.map(l => l.id) || []);

    const progressPercentage = totalLessons && totalLessons > 0
        ? Math.round(((completedLessons || 0) / totalLessons) * 100)
        : 0;

    // 3. Update course_enrollments
    const { error: enrollError } = await (supabase as any)
        .from('course_enrollments')
        .update({
            progress_percentage: progressPercentage,
            last_accessed_at: new Date().toISOString()
        } as any)
        .eq('user_id', user.id)
        .eq('course_id', courseId);

    if (enrollError) throw enrollError;

    revalidatePath(`/instituto/clase/${courseId}`);
    revalidatePath('/instituto');
    revalidatePath('/admin/courses');

    return { success: true, progressPercentage };
}

/**
 * Get all available courses for the catalog (not already enrolled)
 */
export async function getCatalogCourses(categoryId?: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // 1. Get current enrollments to exclude them
    const { data: enrollments } = await supabase
        .from('course_enrollments')
        .select('course_id')
        .eq('user_id', user.id);

    const enrolledIds = enrollments?.map(e => e.course_id) || [];

    // 2. Query courses (only published courses should be shown, assuming metadata exists or just all for now)
    let query = supabase
        .from('courses')
        .select(`
            *,
            course_categories(name)
        `);

    if (enrolledIds.length > 0) {
        query = query.not('id', 'in', `(${enrolledIds.join(',')})`);
    }

    if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Get all course categories
 */
export async function getAllCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('course_categories')
        .select('*')
        .order('name');

    if (error) throw error;
    return data || [];
}
