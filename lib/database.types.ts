export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            about_us_content: {
                Row: {
                    id: string
                    hero_title: string
                    hero_subtitle: string | null
                    hero_image_url: string | null
                    history_since: string | null
                    history_title: string | null
                    history_content: string | null
                    history_image_url: string | null
                    mission_title: string | null
                    mission_content: string | null
                    vision_title: string | null
                    vision_content: string | null
                    cta_title: string | null
                    cta_description: string | null
                    values_json: Json | null
                    updated_at: string | null
                    updated_by: string | null
                    hero_image_public_id: string | null
                    history_image_public_id: string | null
                }
                Insert: {
                    id?: string
                    hero_title: string
                    hero_subtitle?: string | null
                    hero_image_url?: string | null
                    history_since?: string | null
                    history_title?: string | null
                    history_content?: string | null
                    history_image_url?: string | null
                    mission_title?: string | null
                    mission_content?: string | null
                    vision_title?: string | null
                    vision_content?: string | null
                    cta_title?: string | null
                    cta_description?: string | null
                    values_json?: Json | null
                    updated_at?: string | null
                    updated_by?: string | null
                    hero_image_public_id?: string | null
                    history_image_public_id?: string | null
                }
                Update: {
                    id?: string
                    hero_title?: string
                    hero_subtitle?: string | null
                    hero_image_url?: string | null
                    history_since?: string | null
                    history_title?: string | null
                    history_content?: string | null
                    history_image_url?: string | null
                    mission_title?: string | null
                    mission_content?: string | null
                    vision_title?: string | null
                    vision_content?: string | null
                    cta_title?: string | null
                    cta_description?: string | null
                    values_json?: Json | null
                    updated_at?: string | null
                    updated_by?: string | null
                    hero_image_public_id?: string | null
                    history_image_public_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "about_us_content_updated_by_fkey"
                        columns: ["updated_by"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            analytics_daily_metrics: {
                Row: {
                    created_at: string | null
                    date: string
                    id: string
                    metadata: Json | null
                    metric_type: string
                    value: number
                }
                Insert: {
                    created_at?: string | null
                    date?: string
                    id?: string
                    metadata?: Json | null
                    metric_type: string
                    value: number
                }
                Update: {
                    created_at?: string | null
                    date?: string
                    id?: string
                    metadata?: Json | null
                    metric_type?: string
                    value?: number
                }
                Relationships: []
            }
            announcements: {
                Row: {
                    created_at: string | null
                    created_by: string | null
                    id: string
                    is_notified: boolean | null
                    is_pinned: boolean | null
                    message: string
                    scheduled_for: string | null
                    target_audience: string | null
                    views_count: number | null
                }
                Insert: {
                    created_at?: string | null
                    created_by?: string | null
                    id?: string
                    is_notified?: boolean | null
                    is_pinned?: boolean | null
                    message: string
                    scheduled_for?: string | null
                    target_audience?: string | null
                    views_count?: number | null
                }
                Update: {
                    created_at?: string | null
                    created_by?: string | null
                    id?: string
                    is_notified?: boolean | null
                    is_pinned?: boolean | null
                    message?: string
                    scheduled_for?: string | null
                    target_audience?: string | null
                    views_count?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "announcements_created_by_fkey"
                        columns: ["created_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            app_roles: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    name: string
                    slug: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name: string
                    slug: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name?: string
                    slug?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            bulletins: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    is_published: boolean | null
                    pdf_url: string | null
                    publish_date: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    is_published?: boolean | null
                    pdf_url?: string | null
                    publish_date?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    is_published?: boolean | null
                    pdf_url?: string | null
                    publish_date?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            comments: {
                Row: {
                    author_name: string
                    comment: string
                    content_id: string
                    content_type: string
                    created_at: string | null
                    id: string
                    is_approved: boolean | null
                    parent_id: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    author_name: string
                    comment: string
                    content_id: string
                    content_type: string
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    parent_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    author_name?: string
                    comment?: string
                    content_id?: string
                    content_type?: string
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    parent_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "comments_parent_id_fkey"
                        columns: ["parent_id"]
                        isOneToOne: false
                        referencedRelation: "comments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "comments_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            devotionals: {
                Row: {
                    author: string
                    content: string
                    created_at: string | null
                    date: string | null
                    id: string
                    image_url: string | null
                    slug: string
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    author: string
                    content: string
                    created_at?: string | null
                    date?: string | null
                    id?: string
                    image_url?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    author?: string
                    content?: string
                    created_at?: string | null
                    date?: string | null
                    id?: string
                    image_url?: string | null
                    slug?: string
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }

            prayer_requests: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    is_anonymous: boolean | null
                    is_answered: boolean | null
                    is_approved: boolean | null
                    is_private: boolean | null
                    request: string
                    requester_name: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_answered?: boolean | null
                    is_approved?: boolean | null
                    is_private?: boolean | null
                    request: string
                    requester_name: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_answered?: boolean | null
                    is_approved?: boolean | null
                    is_private?: boolean | null
                    request?: string
                    requester_name?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "prayer_requests_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            prayer_intersessions: {
                Row: {
                    created_at: string | null
                    id: string
                    prayer_request_id: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    prayer_request_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    prayer_request_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "prayer_intersessions_prayer_request_id_fkey"
                        columns: ["prayer_request_id"]
                        isOneToOne: false
                        referencedRelation: "prayer_requests"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "prayer_intersessions_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            resource_categories: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            resources: {
                Row: {
                    category_id: string | null
                    created_at: string | null
                    description: string
                    external_url: string | null
                    file_type: string
                    file_url: string | null
                    id: string
                    is_featured: boolean | null
                    is_published: boolean | null
                    slug: string
                    thumbnail: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    category_id?: string | null
                    created_at?: string | null
                    description: string
                    external_url?: string | null
                    file_type: string
                    file_url?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    slug: string
                    thumbnail?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    category_id?: string | null
                    created_at?: string | null
                    description?: string
                    external_url?: string | null
                    file_type?: string
                    file_url?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    slug?: string
                    thumbnail?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "resources_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "resource_categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_progress: {
                Row: {
                    created_at: string | null
                    id: string
                    total_chapters_read: number | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    total_chapters_read?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    total_chapters_read?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_progress_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_milestones: {
                Row: {
                    completed_at: string | null
                    created_at: string | null
                    id: string
                    is_completed: boolean | null
                    milestone_slug: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    completed_at?: string | null
                    created_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    milestone_slug: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    completed_at?: string | null
                    created_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    milestone_slug?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_milestones_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_certificates: {
                Row: {
                    created_at: string | null
                    file_url: string | null
                    id: string
                    issued_at: string | null
                    title: string
                    type: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    file_url?: string | null
                    id?: string
                    issued_at?: string | null
                    title: string
                    type: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    file_url?: string | null
                    id?: string
                    issued_at?: string | null
                    title?: string
                    type?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_certificates_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            event_registrations: {
                Row: {
                    created_at: string | null
                    event_id: string | null
                    id: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    event_id?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    event_id?: string | null
                    id?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "event_registrations_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "event_registrations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            newsletter_subscriptions: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    is_active: boolean | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    is_active?: boolean | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    is_active?: boolean | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            courses: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    level: string | null
                    thumbnail_url: string | null
                    is_active: boolean | null
                    title: string
                    total_lessons: number | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    level?: string | null
                    thumbnail_url?: string | null
                    is_active?: boolean | null
                    title: string
                    total_lessons?: number | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    level?: string | null
                    thumbnail_url?: string | null
                    is_active?: boolean | null
                    title?: string
                    total_lessons?: number | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            course_enrollments: {
                Row: {
                    completed_at: string | null
                    course_id: string | null
                    enrolled_at: string | null
                    id: string
                    progress_percentage: number | null
                    user_id: string | null
                }
                Insert: {
                    completed_at?: string | null
                    course_id?: string | null
                    enrolled_at?: string | null
                    id?: string
                    progress_percentage?: number | null
                    user_id?: string | null
                }
                Update: {
                    completed_at?: string | null
                    course_id?: string | null
                    enrolled_at?: string | null
                    id?: string
                    progress_percentage?: number | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "course_enrollments_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "course_enrollments_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            course_lessons: {
                Row: {
                    course_id: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    order_index: number | null
                    title: string
                    updated_at: string | null
                    video_url: string | null
                }
                Insert: {
                    course_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    order_index?: number | null
                    title: string
                    updated_at?: string | null
                    video_url?: string | null
                }
                Update: {
                    course_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    order_index?: number | null
                    title?: string
                    updated_at?: string | null
                    video_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "course_lessons_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            group_attendance: {
                Row: {
                    created_at: string | null
                    group_id: string | null
                    id: string
                    meeting_date: string
                    members_present_count: number | null
                    new_guests_count: number | null
                    notes: string | null
                }
                Insert: {
                    created_at?: string | null
                    group_id?: string | null
                    id?: string
                    meeting_date: string
                    members_present_count?: number | null
                    new_guests_count?: number | null
                    notes?: string | null
                }
                Update: {
                    created_at?: string | null
                    group_id?: string | null
                    id?: string
                    meeting_date?: string
                    members_present_count?: number | null
                    new_guests_count?: number | null
                    notes?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "group_attendance_group_id_fkey"
                        columns: ["group_id"]
                        isOneToOne: false
                        referencedRelation: "small_groups"
                        referencedColumns: ["id"]
                    },
                ]
            }
            groups: {
                Row: {
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    is_location_public: boolean | null
                    latitude: number | null
                    leader_id: string | null
                    leader_image_url: string | null
                    location: string | null
                    longitude: number | null
                    schedule: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    is_location_public?: boolean | null
                    latitude?: number | null
                    leader_id?: string | null
                    leader_image_url?: string | null
                    location?: string | null
                    longitude?: number | null
                    schedule?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    is_location_public?: boolean | null
                    latitude?: number | null
                    leader_id?: string | null
                    leader_image_url?: string | null
                    location?: string | null
                    longitude?: number | null
                    schedule?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "groups_leader_id_fkey"
                        columns: ["leader_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            messages: {
                Row: {
                    channel: string
                    content: string
                    created_at: string | null
                    id: string
                    user_id: string
                }
                Insert: {
                    channel?: string
                    content: string
                    created_at?: string | null
                    id?: string
                    user_id: string
                }
                Update: {
                    channel?: string
                    content?: string
                    created_at?: string | null
                    id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "messages_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            ministries: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    leader_id: string | null
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    leader_id?: string | null
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    leader_id?: string | null
                    name?: string
                    slug?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "ministries_leader_id_fkey"
                        columns: ["leader_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            events: {
                Row: {
                    capacity: number | null
                    category: string | null
                    created_at: string | null
                    description: string | null
                    end_time: string | null
                    event_date: string | null
                    id: string
                    image: string | null
                    image_url: string | null
                    is_featured: boolean | null
                    is_published: boolean | null
                    location: string | null
                    slug: string
                    speaker: string | null
                    start_time: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_time?: string | null
                    event_date?: string | null
                    id?: string
                    image?: string | null
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    location?: string | null
                    slug: string
                    speaker?: string | null
                    start_time?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_time?: string | null
                    event_date?: string | null
                    id?: string
                    image?: string | null
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    location?: string | null
                    slug?: string
                    speaker?: string | null
                    start_time?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            gallery_albums: {
                Row: {
                    cover_image_url: string | null
                    cover_image_public_id: string | null
                    created_at: string | null
                    created_by: string | null
                    description: string | null
                    id: string
                    title: string
                }
                Insert: {
                    cover_image_url?: string | null
                    cover_image_public_id?: string | null
                    created_at?: string | null
                    created_by?: string | null
                    description?: string | null
                    id?: string
                    title: string
                }
                Update: {
                    cover_image_url?: string | null
                    cover_image_public_id?: string | null
                    created_at?: string | null
                    created_by?: string | null
                    description?: string | null
                    id?: string
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "gallery_albums_created_by_fkey"
                        columns: ["created_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            gallery_photos: {
                Row: {
                    album_id: string | null
                    caption: string | null
                    created_at: string | null
                    height: number | null
                    id: string
                    uploaded_by: string | null
                    url: string
                    public_id: string | null
                    width: number | null
                }
                Insert: {
                    album_id?: string | null
                    caption?: string | null
                    created_at?: string | null
                    height?: number | null
                    id?: string
                    uploaded_by?: string | null
                    url: string
                    public_id?: string | null
                    width?: number | null
                }
                Update: {
                    album_id?: string | null
                    caption?: string | null
                    created_at?: string | null
                    height?: number | null
                    id?: string
                    uploaded_by?: string | null
                    url?: string
                    public_id?: string | null
                    width?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "gallery_photos_album_id_fkey"
                        columns: ["album_id"]
                        isOneToOne: false
                        referencedRelation: "gallery_albums"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "gallery_photos_uploaded_by_fkey"
                        columns: ["uploaded_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            pastor_messages: {
                Row: {
                    created_at: string | null
                    date: string
                    duration: string | null
                    id: string
                    image_url: string | null
                    is_active: boolean | null
                    pastor_name: string
                    title: string
                    video_url: string | null
                }
                Insert: {
                    created_at?: string | null
                    date?: string
                    duration?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    pastor_name: string
                    title: string
                    video_url?: string | null
                }
                Update: {
                    created_at?: string | null
                    date?: string
                    duration?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    pastor_name?: string
                    title?: string
                    video_url?: string | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    full_name: string | null
                    id: string
                    phone: string | null
                    role: string | null
                    role_id: string | null
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id: string
                    phone?: string | null
                    role?: string | null
                    role_id?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    role?: string | null
                    role_id?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Relationships: []
            }

            role_permissions: {
                Row: {
                    can_create: boolean | null
                    can_delete: boolean | null
                    can_edit: boolean | null
                    can_export: boolean | null
                    can_view: boolean | null
                    created_at: string | null
                    id: string
                    module: string
                    role_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    can_create?: boolean | null
                    can_delete?: boolean | null
                    can_edit?: boolean | null
                    can_export?: boolean | null
                    can_view?: boolean | null
                    created_at?: string | null
                    id?: string
                    module: string
                    role_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    can_create?: boolean | null
                    can_delete?: boolean | null
                    can_edit?: boolean | null
                    can_export?: boolean | null
                    can_view?: boolean | null
                    created_at?: string | null
                    id?: string
                    module?: string
                    role_id?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "role_permissions_role_id_fkey"
                        columns: ["role_id"]
                        isOneToOne: false
                        referencedRelation: "app_roles"
                        referencedColumns: ["id"]
                    }
                ]
            }

            service_settings: {
                Row: {
                    created_at: string | null
                    google_maps_url: string | null
                    id: string
                    next_service_date: string | null
                    next_service_description: string | null
                    next_service_location: string | null
                    next_service_preacher: string | null
                    next_service_series: string | null
                    next_service_title: string | null
                    offline_message: string | null
                    offline_subtitle: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    google_maps_url?: string | null
                    id?: string
                    next_service_date?: string | null
                    next_service_description?: string | null
                    next_service_location?: string | null
                    next_service_preacher?: string | null
                    next_service_series?: string | null
                    next_service_title?: string | null
                    offline_message?: string | null
                    offline_subtitle?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    google_maps_url?: string | null
                    id?: string
                    next_service_date?: string | null
                    next_service_description?: string | null
                    next_service_location?: string | null
                    next_service_preacher?: string | null
                    next_service_series?: string | null
                    next_service_title?: string | null
                    offline_message?: string | null
                    offline_subtitle?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            site_settings: {
                Row: {
                    created_at: string | null
                    key: string
                    updated_at: string | null
                    value: string | null
                }
                Insert: {
                    created_at?: string | null
                    key: string
                    updated_at?: string | null
                    value?: string | null
                }
                Update: {
                    created_at?: string | null
                    key?: string
                    updated_at?: string | null
                    value?: string | null
                }
                Relationships: []
            }

            weekly_activities: {
                Row: {
                    category: string | null
                    color: string | null
                    created_at: string | null
                    day_of_week: string
                    description: string | null
                    display_order: number | null
                    icon_name: string | null
                    id: string
                    is_active: boolean | null
                    time: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    category?: string | null
                    color?: string | null
                    created_at?: string | null
                    day_of_week: string
                    description?: string | null
                    display_order?: number | null
                    icon_name?: string | null
                    id?: string
                    is_active?: boolean | null
                    time?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    category?: string | null
                    color?: string | null
                    created_at?: string | null
                    day_of_week?: string
                    description?: string | null
                    display_order?: number | null
                    icon_name?: string | null
                    id?: string
                    is_active?: boolean | null
                    time?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            small_groups: {
                Row: {
                    category: string
                    created_at: string
                    description: string | null
                    id: string
                    image_url: string | null
                    is_active: boolean
                    is_location_public: boolean | null
                    latitude: number | null
                    leader: string
                    leader_image_url: string | null
                    location: string | null
                    longitude: number | null
                    members_count: number
                    name: string
                    schedule: string | null
                    updated_at: string
                }
                Insert: {
                    category: string
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean
                    is_location_public?: boolean | null
                    latitude?: number | null
                    leader: string
                    leader_image_url?: string | null
                    location?: string | null
                    longitude?: number | null
                    members_count: number
                    name: string
                    schedule?: string | null
                    updated_at?: string
                }
                Update: {
                    category?: string
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean
                    is_location_public?: boolean | null
                    latitude?: number | null
                    leader?: string
                    leader_image_url?: string | null
                    location?: string | null
                    longitude?: number | null
                    members_count?: number
                    name?: string
                    schedule?: string | null
                    updated_at?: string
                }
                Relationships: []
            }
            navigation_items: {
                Row: {
                    created_at: string | null
                    href: string
                    id: string
                    icon_name: string | null
                    is_external: boolean | null
                    label: string
                    menu_id: string | null
                    order_index: number | null
                    parent_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    href: string
                    id?: string
                    icon_name?: string | null
                    is_external?: boolean | null
                    label: string
                    menu_id?: string | null
                    order_index?: number | null
                    parent_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    href?: string
                    id?: string
                    icon_name?: string | null
                    is_external?: boolean | null
                    label?: string
                    menu_id?: string | null
                    order_index?: number | null
                    parent_id?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "navigation_items_menu_id_fkey"
                        columns: ["menu_id"]
                        isOneToOne: false
                        referencedRelation: "navigation_menus"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "navigation_items_parent_id_fkey"
                        columns: ["parent_id"]
                        isOneToOne: false
                        referencedRelation: "navigation_items"
                        referencedColumns: ["id"]
                    },
                ]
            }
            navigation_menus: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    name: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            group_members: {
                Row: {
                    created_at: string | null
                    group_id: string
                    id: string
                    joined_at: string | null
                    role: string
                    status: string
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    group_id: string
                    id?: string
                    joined_at?: string | null
                    role?: string
                    status?: string
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    group_id?: string
                    id?: string
                    joined_at?: string | null
                    role?: string
                    status?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "group_members_group_id_fkey"
                        columns: ["group_id"]
                        isOneToOne: false
                        referencedRelation: "small_groups"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "group_members_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            testimonials: {
                Row: {
                    avatar_url: string | null
                    content: string
                    created_at: string | null
                    full_name: string
                    id: string
                    is_active: boolean | null
                    role: string | null
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    content: string
                    created_at?: string | null
                    full_name: string
                    id?: string
                    is_active?: boolean | null
                    role?: string | null
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    content?: string
                    created_at?: string | null
                    full_name?: string
                    id?: string
                    is_active?: boolean | null
                    role?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            testimonies: {
                Row: {
                    avatar_url: string | null
                    category: string | null
                    content: string
                    created_at: string | null
                    featured: boolean | null
                    full_name: string
                    id: string
                    is_approved: boolean | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    category?: string | null
                    content: string
                    created_at?: string | null
                    featured?: boolean | null
                    full_name: string
                    id?: string
                    is_approved?: boolean | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    category?: string | null
                    content?: string
                    created_at?: string | null
                    featured?: boolean | null
                    full_name?: string
                    id?: string
                    is_approved?: boolean | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "testimonies_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            spiritual_journey_steps: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    name: string
                    order_index: number
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name: string
                    order_index: number
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    name?: string
                    order_index?: number
                }
                Relationships: []
            }
            test_results: {
                Row: {
                    created_at: string | null
                    id: string
                    test_name: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    test_name: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    test_name?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "test_results_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            sermons: {
                Row: {
                    audio_url: string | null
                    category: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    is_featured: boolean | null
                    preacher: string | null
                    published_at: string | null
                    series: string | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                    video_url: string | null
                }
                Insert: {
                    audio_url?: string | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_featured?: boolean | null
                    preacher?: string | null
                    published_at?: string | null
                    series?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                    video_url?: string | null
                }
                Update: {
                    audio_url?: string | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_featured?: boolean | null
                    preacher?: string | null
                    published_at?: string | null
                    series?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                    video_url?: string | null
                }
                Relationships: []
            }
            pages: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    is_published: boolean | null
                    meta_description: string | null
                    meta_title: string | null
                    order: number | null
                    slug: string
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    is_published?: boolean | null
                    meta_description?: string | null
                    meta_title?: string | null
                    order?: number | null
                    slug: string
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    is_published?: boolean | null
                    meta_description?: string | null
                    meta_title?: string | null
                    order?: number | null
                    slug?: string
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            donations: {
                Row: {
                    amount: number
                    campaign_id: string | null
                    created_at: string | null
                    currency: string | null
                    email: string | null
                    full_name: string | null
                    id: string
                    is_anonymous: boolean | null
                    payment_method: string | null
                    payment_status: string | null
                    transaction_id: string | null
                    user_id: string | null
                }
                Insert: {
                    amount: number
                    campaign_id?: string | null
                    created_at?: string | null
                    currency?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    payment_method?: string | null
                    payment_status?: string | null
                    transaction_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    amount?: number
                    campaign_id?: string | null
                    created_at?: string | null
                    currency?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    payment_method?: string | null
                    payment_status?: string | null
                    transaction_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "donations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_ministries: {
                Row: {
                    joined_at: string | null
                    ministry_id: string
                    role: string | null
                    user_id: string
                }
                Insert: {
                    joined_at?: string | null
                    ministry_id: string
                    role?: string | null
                    user_id: string
                }
                Update: {
                    joined_at?: string | null
                    ministry_id?: string
                    role?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_ministries_ministry_id_fkey"
                        columns: ["ministry_id"]
                        isOneToOne: false
                        referencedRelation: "ministries"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "user_ministries_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_roles: {
                Row: {
                    created_at: string
                    id: string
                    role: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    role: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    role?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_roles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_notes: {
                Row: {
                    id: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    content: string
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number?: number
                    content: string
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    content?: string
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_notes_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_highlights: {
                Row: {
                    id: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    color: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    color?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    color?: string | null
                    created_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_highlights_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_bookmarks: {
                Row: {
                    id: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    created_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_bookmarks_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            books: {
                Row: {
                    id: string
                    name: string
                    chapters: number
                    testament: string | null
                    display_order: number | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    chapters: number
                    testament?: string | null
                    display_order?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    chapters?: number
                    testament?: string | null
                    display_order?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            commentaries: {
                Row: {
                    id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    type: string
                    content: string
                    author: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    book_name: string
                    chapter: number
                    verse_number?: number
                    type: string
                    content: string
                    author?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    type?: string
                    content?: string
                    author?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            scriptures: {
                Row: {
                    id: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    content: string
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    content: string
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    content?: string
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "scriptures_book_name_fkey"
                        columns: ["book_name"]
                        isOneToOne: false
                        referencedRelation: "books"
                        referencedColumns: ["name"]
                    }
                ]
            }
            user_spiritual_journey: {
                Row: {
                    completed_at: string | null
                    id: string
                    notes: string | null
                    step_id: string | null
                    user_id: string | null
                }
                Insert: {
                    completed_at?: string | null
                    id?: string
                    notes?: string | null
                    step_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    completed_at?: string | null
                    id?: string
                    notes?: string | null
                    step_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_spiritual_journey_step_id_fkey"
                        columns: ["step_id"]
                        isOneToOne: false
                        referencedRelation: "spiritual_journey_steps"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "user_spiritual_journey_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                    },
                ]
            }
        }
        Views: {
            user_details: {
                Row: {
                    email: string | null
                    id: string | null
                    is_anonymous: boolean | null
                    last_sign_in: string | null
                }
                Relationships: []
            }
        }
        Functions: {
            get_user_role: {
                Args: {
                    user_ui: string
                }
                Returns: string
            }
            has_role: {
                Args: {
                    user_ui: string
                    role_check: string
                }
                Returns: boolean
            }
            is_admin: {
                Args: {
                    user_ui: string
                }
                Returns: boolean
            }
            reset_reading_progress: {
                Args: Record<PropertyKey, never>
                Returns: undefined
            }
            track_reading: {
                Args: {
                    p_book_name: string
                    p_chapter: number
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]
        : never)
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]
        : never)[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never)
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never)[TableName] extends {
            Insert: infer I
        }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never)
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never)[TableName] extends {
            Update: infer U
        }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicEnumNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never)
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicEnumNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never)[EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof (Database[PublicCompositeTypeNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never)
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicCompositeTypeNameOrOptions["schema"]] extends Record<string, any>
        ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never)[CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
