"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Database } from "@/lib/database.types";

export type Course = Database['public']['Tables']['courses']['Row'];
export type CourseLesson = Database['public']['Tables']['course_lessons']['Row'];
export type CourseEnrollment = Database['public']['Tables']['course_enrollments']['Row'];

export type CourseWithStats = Course & {
    enrolled_count: number;
    avg_progress: number;
};

/**
 * Get all courses with enrollment statistics
 */
export async function getCourses() {
    const supabase = await createClient();

    const { data: courses, error } = await supabase
        .from('courses')
        .select(`
            *,
            course_enrollments(count)
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate stats for each course
    const coursesWithStats: CourseWithStats[] = await Promise.all(
        (courses || []).map(async (course: any) => {
            const { data: enrollments } = await supabase
                .from('course_enrollments')
                .select('progress_percentage')
                .eq('course_id', course.id) as { data: Array<{ progress_percentage: number }> | null };

            const enrolled_count = enrollments?.length || 0;
            const avg_progress = enrolled_count > 0
                ? Math.round(enrollments!.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) / enrolled_count)
                : 0;

            return {
                ...course,
                enrolled_count,
                avg_progress
            };
        })
    );

    return coursesWithStats;
}

/**
 * Get course by ID
 */
export async function getCourseById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Course;
}

/**
 * Create a new course
 */
export async function createCourse(courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = await createClient();

    const { data, error } = await (supabase as any)
        .from('courses')
        .insert([courseData] as any)
        .select()
        .single();

    if (error) throw error;

    revalidatePath('/admin/courses');
    return data as Course;
}

/**
 * Update an existing course
 */
export async function updateCourse(id: string, courseData: Partial<Course>) {
    const supabase = await createClient();

    const { data, error } = await (supabase as any)
        .from('courses')
        .update({
            ...courseData,
            updated_at: new Date().toISOString()
        } as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    revalidatePath('/admin/courses');
    return data as Course;
}

/**
 * Delete a course
 */
export async function deleteCourse(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/courses');
    return { success: true };
}

/**
 * Get course statistics
 */
export async function getCourseStats() {
    const supabase = await createClient();

    // Total active students (unique users enrolled)
    const { count: activeStudents } = await supabase
        .from('course_enrollments')
        .select('user_id', { count: 'exact', head: true });

    // Total courses
    const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

    // Total diplomas (completed courses)
    const { count: totalDiplomas } = await supabase
        .from('course_enrollments')
        .select('*', { count: 'exact', head: true })
        .not('completed_at', 'is', null);

    return {
        activeStudents: activeStudents || 0,
        totalCourses: totalCourses || 0,
        totalDiplomas: totalDiplomas || 0
    };
}

/**
 * Get students ready for certification (100% progress)
 */
export async function getStudentsReadyForCertification() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
            id,
            user_id,
            course_id,
            completed_at,
            profiles!inner(full_name, email),
            courses!inner(title)
        `)
        .eq('progress_percentage', 100)
        .is('completed_at', null)
        .order('enrolled_at', { ascending: false });

    if (error) throw error;

    return data || [];
}

/**
 * Mark student as certified
 */
export async function markAsCertified(enrollmentId: string) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from('course_enrollments')
        .update({ completed_at: new Date().toISOString() } as any)
        .eq('id', enrollmentId);

    if (error) throw error;

    revalidatePath('/admin/courses');
    return { success: true };
}

/**
 * Get lessons for a course
 */
export async function getCourseLessons(courseId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('course_lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

    if (error) throw error;
    return data as CourseLesson[];
}

/**
 * Create a new lesson
 */
export async function createLesson(lessonData: Omit<CourseLesson, 'id' | 'created_at'>) {
    if (!lessonData.course_id) throw new Error('Course ID is required');

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('course_lessons')
        .insert([lessonData] as any)
        .select()
        .single();

    if (error) throw error;

    // Update total_lessons count in course
    const { data: lessons } = await supabase
        .from('course_lessons')
        .select('id')
        .eq('course_id', lessonData.course_id);

    await (supabase as any)
        .from('courses')
        .update({ total_lessons: lessons?.length || 0 } as any)
        .eq('id', lessonData.course_id);

    revalidatePath('/admin/courses');
    return data as CourseLesson;
}

/**
 * Update a lesson
 */
export async function updateLesson(id: string, lessonData: Partial<CourseLesson>) {
    const supabase = await createClient();

    const { data, error } = await (supabase as any)
        .from('course_lessons')
        .update(lessonData as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    revalidatePath('/admin/courses');
    return data as CourseLesson;
}

/**
 * Delete a lesson
 */
export async function deleteLesson(id: string, courseId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('course_lessons')
        .delete()
        .eq('id', id);

    if (error) throw error;

    // Update total_lessons count
    const { data: lessons } = await supabase
        .from('course_lessons')
        .select('id')
        .eq('course_id', courseId);

    await (supabase as any)
        .from('courses')
        .update({ total_lessons: lessons?.length || 0 } as any)
        .eq('id', courseId);

    revalidatePath('/admin/courses');
    return { success: true };
}
