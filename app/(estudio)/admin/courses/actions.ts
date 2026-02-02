"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Database } from "@/lib/database.types";

export type Course = Database['public']['Tables']['courses']['Row'];
export type CourseLesson = Database['public']['Tables']['course_lessons']['Row'];
export type CourseEnrollment = Database['public']['Tables']['course_enrollments']['Row'];
export type CourseCategory = Database['public']['Tables']['course_categories']['Row'];

export type CourseWithStats = Course & {
    enrolled_count: number;
    avg_progress: number;
    category?: CourseCategory | null;
};

/**
 * Get all course categories
 */
export async function getCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('course_categories')
        .select('*')
        .order('name');

    if (error) throw error;
    return data as CourseCategory[];
}

/**
 * Get all courses with enrollment statistics and category info
 */
export async function getCourses() {
    const supabase = await createClient();

    const { data: courses, error } = await supabase
        .from('courses')
        .select(`
            *,
            course_categories(*),
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

            const { course_categories, ...rest } = course;
            return {
                ...rest,
                category: course_categories,
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
        .select('*, course_categories(*)')
        .eq('id', id)
        .single();

    if (error) throw error;

    const { course_categories, ...rest } = data as any;
    return {
        ...rest,
        category: course_categories
    } as CourseWithStats;
}

/**
 * Create a new course
 */
export async function createCourse(courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = await createClient();

    // @ts-ignore
    const { enrolled_count, avg_progress, category, ...dataToInsert } = courseData;

    const { data, error } = await supabase
        .from('courses')
        .insert([dataToInsert] as any)
        .select()
        .single();

    if (error) throw error;

    revalidatePath('/admin/courses');
    revalidatePath('/instituto');
    return data as Course;
}

/**
 * Update an existing course
 */
export async function updateCourse(id: string, courseData: Partial<Course>) {
    const supabase = await createClient();

    // Remove derived/joined fields that shouldn't be effectively sent to DB
    const {
        id: _id,
        created_at: _created,
        updated_at: _updated,
        // @ts-ignore - these might exist on the incoming object
        enrolled_count,
        // @ts-ignore
        avg_progress,
        // @ts-ignore
        category,
        // @ts-ignore
        course_enrollments,
        ...dataToUpdate
    } = courseData;

    const { data, error } = await supabase
        .from('courses')
        .update({
            ...dataToUpdate,
            updated_at: new Date().toISOString()
        } as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    revalidatePath('/admin/courses');
    revalidatePath('/instituto');
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

    // 1. Get enrollment data with course title
    const { data: enrollment, error: enrollError } = await supabase
        .from('course_enrollments')
        .select(`
            user_id, 
            course_id,
            courses!inner(title)
        `)
        .eq('id', enrollmentId)
        .single();

    if (enrollError || !enrollment) throw new Error("Enrollment not found");

    // 2. Create certificate record
    const { error: certError } = await supabase
        .from('user_certificates')
        .insert({
            user_id: enrollment.user_id as string,
            title: (enrollment.courses as any).title || 'Certificado MIVN',
            type: 'Diploma',
            issued_at: new Date().toISOString()
        });

    if (certError) throw certError;

    // 3. Mark enrollment as completed
    const { error } = await (supabase as any)
        .from('course_enrollments')
        .update({ completed_at: new Date().toISOString() } as any)
        .eq('id', enrollmentId);

    if (error) throw error;

    revalidatePath('/admin/courses');
    revalidatePath('/instituto');
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

/**
 * Get students enrolled in a course
 */
export async function getCourseStudents(courseId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
            *,
            profiles!inner(full_name, email, avatar_url)
        `)
        .eq('course_id', courseId)
        .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Search students to certify
 */
export async function searchStudentsToCertify(query: string) {
    if (!query || query.length < 3) return [];

    const supabase = await createClient();

    // 1. Find users matching query
    const { data: users, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
        .limit(10);

    if (error) throw error;
    if (!users.length) return [];

    // 2. Get their enrolled courses to simplify selection
    const userIds = users.map(u => u.id);
    const { data: enrollments } = await supabase
        .from('course_enrollments')
        .select(`
            user_id,
            course_id,
            progress_percentage,
            completed_at,
            courses (id, title)
        `)
        .in('user_id', userIds);

    // 3. Merge data
    return users.map(user => {
        const userEnrollments = enrollments?.filter(e => e.user_id === user.id) || [];
        return {
            ...user,
            enrollments: userEnrollments.map(e => ({
                courseId: e.courses?.id,
                courseTitle: e.courses?.title,
                progress: e.progress_percentage,
                completedAt: e.completed_at
            }))
        };
    });
}

/**
 * Issue a manual certificate (Admin override)
 */
export async function issueManualCertificate(userId: string, courseId: string) {
    const supabase = await createClient();

    // 1. Check if enrollment exists
    const { data: enrollment } = await supabase
        .from('course_enrollments')
        .select('id, user_id, course_id, courses(title)')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

    if (!enrollment) {
        // If not enrolled, enroll them first? Or error?
        // Let's error for now to keep it safe, admin should enroll them first if needed.
        throw new Error("El usuario no está inscrito en este curso.");
    }

    // 2. Mark as completed (force 100% and date)
    const { error: updateError } = await (supabase as any)
        .from('course_enrollments')
        .update({
            progress_percentage: 100,
            completed_at: new Date().toISOString()
        } as any)
        .eq('id', enrollment.id);

    if (updateError) throw updateError;

    // 3. Generate certificate record
    const { error: certError } = await supabase
        .from('user_certificates')
        .insert({
            user_id: userId,
            title: (enrollment.courses as any).title || 'Certificado MIVN',
            type: 'Diploma',
            issued_at: new Date().toISOString()
        });

    if (certError) {
        // Safe to ignore duplicate error if already certified? 
        // Best to just let it fail or log.
        console.error("Certificate creation error", certError);
    }

    revalidatePath('/admin/courses');
    return { success: true };
}

