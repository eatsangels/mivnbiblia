export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
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
                    color: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    is_system: boolean | null
                    name: string
                    slug: string
                }
                Insert: {
                    color?: string | null
                    created_at?: string | null
                    description?: string | null
                    id: string
                    is_system?: boolean | null
                    name: string
                    slug: string
                }
                Update: {
                    color?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_system?: boolean | null
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            book_metadata: {
                Row: {
                    author: string | null
                    book_id: string
                    category: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    language: string | null
                    pages_count: number | null
                    publication_year: number | null
                    publisher: string | null
                    tags: string[] | null
                }
                Insert: {
                    author?: string | null
                    book_id: string
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    language?: string | null
                    pages_count?: number | null
                    publication_year?: number | null
                    publisher?: string | null
                    tags?: string[] | null
                }
                Update: {
                    author?: string | null
                    book_id?: string
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    language?: string | null
                    pages_count?: number | null
                    publication_year?: number | null
                    publisher?: string | null
                    tags?: string[] | null
                }
                Relationships: [
                    {
                        foreignKeyName: "book_metadata_book_id_fkey"
                        columns: ["book_id"]
                        isOneToOne: true
                        referencedRelation: "books"
                        referencedColumns: ["id"]
                    },
                ]
            }
            books: {
                Row: {
                    author: string | null
                    category: string | null
                    category_id: string | null
                    created_at: string | null
                    description: string | null
                    external_url: string | null
                    file_type: string | null
                    file_url: string | null
                    id: string
                    is_active: boolean | null
                    is_featured: boolean | null
                    published_at: string | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    author?: string | null
                    category?: string | null
                    category_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    external_url?: string | null
                    file_type?: string | null
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    is_featured?: boolean | null
                    published_at?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    author?: string | null
                    category?: string | null
                    category_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    external_url?: string | null
                    file_type?: string | null
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    is_featured?: boolean | null
                    published_at?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            bulletins: {
                Row: {
                    content: string | null
                    created_at: string | null
                    date_published: string
                    file_url: string | null
                    id: string
                    is_active: boolean | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    content?: string | null
                    created_at?: string | null
                    date_published: string
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    content?: string | null
                    created_at?: string | null
                    date_published?: string
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            commentaries: {
                Row: {
                    author: string | null
                    category: string | null
                    content: string | null
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    published_at: string | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    author?: string | null
                    category?: string | null
                    content?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    published_at?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    author?: string | null
                    category?: string | null
                    content?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    published_at?: string | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            comments: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    is_approved: boolean | null
                    parent_id: string | null
                    post_id: string
                    post_type: string
                    user_id: string
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    parent_id?: string | null
                    post_id: string
                    post_type: string
                    user_id: string
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    parent_id?: string | null
                    post_id?: string
                    post_type?: string
                    user_id?: string
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
                    },
                ]
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
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            course_lessons: {
                Row: {
                    content: string | null
                    course_id: string | null
                    created_at: string | null
                    description: string | null
                    duration_minutes: number | null
                    id: string
                    order_index: number | null
                    title: string
                    video_url: string | null
                }
                Insert: {
                    content?: string | null
                    course_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    duration_minutes?: number | null
                    id?: string
                    order_index?: number | null
                    title: string
                    video_url?: string | null
                }
                Update: {
                    content?: string | null
                    course_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    duration_minutes?: number | null
                    id?: string
                    order_index?: number | null
                    title?: string
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
            courses: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    is_active: boolean | null
                    level: string | null
                    thumbnail_url: string | null
                    title: string
                    total_lessons: number | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_active?: boolean | null
                    level?: string | null
                    thumbnail_url?: string | null
                    title: string
                    total_lessons?: number | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_active?: boolean | null
                    level?: string | null
                    thumbnail_url?: string | null
                    title?: string
                    total_lessons?: number | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            devotionals: {
                Row: {
                    author: string | null
                    category: string | null
                    content: string
                    created_at: string | null
                    date_published: string
                    id: string
                    is_active: boolean | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    author?: string | null
                    category?: string | null
                    content: string
                    created_at?: string | null
                    date_published: string
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    author?: string | null
                    category?: string | null
                    content?: string
                    created_at?: string | null
                    date_published?: string
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            donation_campaigns: {
                Row: {
                    created_at: string | null
                    current_amount: number | null
                    description: string | null
                    end_date: string | null
                    goal_amount: number
                    id: string
                    is_active: boolean | null
                    start_date: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    created_at?: string | null
                    current_amount?: number | null
                    description?: string | null
                    end_date?: string | null
                    goal_amount: number
                    id?: string
                    is_active?: boolean | null
                    start_date?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    created_at?: string | null
                    current_amount?: number | null
                    description?: string | null
                    end_date?: string | null
                    goal_amount?: number
                    id?: string
                    is_active?: boolean | null
                    start_date?: string | null
                    thumbnail_url?: string | null
                    title?: string
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
                        foreignKeyName: "donations_campaign_id_fkey"
                        columns: ["campaign_id"]
                        isOneToOne: false
                        referencedRelation: "donation_campaigns"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "donations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            events: {
                Row: {
                    category: string | null
                    created_at: string | null
                    description: string | null
                    end_date: string | null
                    id: string
                    is_featured: boolean | null
                    location: string | null
                    slug: string | null
                    start_date: string
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_date?: string | null
                    id?: string
                    is_featured?: boolean | null
                    location?: string | null
                    slug?: string | null
                    start_date: string
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_date?: string | null
                    id?: string
                    is_featured?: boolean | null
                    location?: string | null
                    slug?: string | null
                    start_date?: string
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
            }
            lesson_progress: {
                Row: {
                    completed: boolean | null
                    completed_at: string | null
                    id: string
                    lesson_id: string | null
                    user_id: string | null
                }
                Insert: {
                    completed?: boolean | null
                    completed_at?: string | null
                    id?: string
                    lesson_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    completed?: boolean | null
                    completed_at?: string | null
                    id?: string
                    lesson_id?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "lesson_progress_lesson_id_fkey"
                        columns: ["lesson_id"]
                        isOneToOne: false
                        referencedRelation: "course_lessons"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "lesson_progress_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ministerios: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    is_active: boolean | null
                    lider_id: string | null
                    nombre: string
                    slug: string | null
                    thumbnail_url: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_active?: boolean | null
                    lider_id?: string | null
                    nombre: string
                    slug?: string | null
                    thumbnail_url?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_active?: boolean | null
                    lider_id?: string | null
                    nombre?: string
                    slug?: string | null
                    thumbnail_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ministerios_lider_id_fkey"
                        columns: ["lider_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            oracion: {
                Row: {
                    created_at: string | null
                    full_name: string | null
                    id: string
                    is_anonymous: boolean | null
                    is_notified: boolean | null
                    peticion: string
                    phone: string | null
                    status: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_notified?: boolean | null
                    peticion: string
                    phone?: string | null
                    status?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_notified?: boolean | null
                    peticion?: string
                    phone?: string | null
                    status?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "oracion_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    bio: string | null
                    created_at: string | null
                    email: string | null
                    full_name: string | null
                    id: string
                    phone: string | null
                    role: string | null
                    updated_at: string | null
                    username: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                }
                Relationships: []
            }
            resources: {
                Row: {
                    author: string | null
                    category: string
                    created_at: string | null
                    description: string | null
                    file_url: string | null
                    id: string
                    is_active: boolean | null
                    slug: string | null
                    thumbnail_url: string | null
                    title: string
                }
                Insert: {
                    author?: string | null
                    category: string
                    created_at?: string | null
                    description?: string | null
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title: string
                }
                Update: {
                    author?: string | null
                    category?: string
                    created_at?: string | null
                    description?: string | null
                    file_url?: string | null
                    id?: string
                    is_active?: boolean | null
                    slug?: string | null
                    thumbnail_url?: string | null
                    title?: string
                }
                Relationships: []
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
            service_settings: {
                Row: {
                    created_at: string | null
                    google_maps_url: string | null
                    id: string
                    is_live: boolean | null
                    live_video_url: string | null
                    next_service_date: string | null
                    next_service_description: string | null
                    next_service_image: string | null
                    next_service_location: string | null
                    next_service_preacher: string | null
                    next_service_series: string | null
                    next_service_time: string | null
                    next_service_title: string | null
                    offline_message: string | null
                    offline_subtitle: string | null
                    service_time_sunday: string | null
                    service_time_wednesday: string | null
                    updated_at: string | null
                    youtube_channel_id: string | null
                    youtube_video_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    google_maps_url?: string | null
                    id?: string
                    is_live?: boolean | null
                    live_video_url?: string | null
                    next_service_date?: string | null
                    next_service_description?: string | null
                    next_service_image?: string | null
                    next_service_location?: string | null
                    next_service_preacher?: string | null
                    next_service_series?: string | null
                    next_service_time?: string | null
                    next_service_title?: string | null
                    offline_message?: string | null
                    offline_subtitle?: string | null
                    service_time_sunday?: string | null
                    service_time_wednesday?: string | null
                    updated_at?: string | null
                    youtube_channel_id?: string | null
                    youtube_video_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    google_maps_url?: string | null
                    id?: string
                    is_live?: boolean | null
                    live_video_url?: string | null
                    next_service_date?: string | null
                    next_service_description?: string | null
                    next_service_image?: string | null
                    next_service_location?: string | null
                    next_service_preacher?: string | null
                    next_service_series?: string | null
                    next_service_time?: string | null
                    next_service_title?: string | null
                    offline_message?: string | null
                    offline_subtitle?: string | null
                    service_time_sunday?: string | null
                    service_time_wednesday?: string | null
                    updated_at?: string | null
                    youtube_channel_id?: string | null
                    youtube_video_id?: string | null
                }
                Relationships: []
            }
            site_settings: {
                Row: {
                    address: string | null
                    background_dark: string | null
                    background_light: string | null
                    contact_email: string | null
                    contact_phone: string | null
                    created_at: string | null
                    facebook_url: string | null
                    footer_bg_color: string | null
                    footer_bottom_bg: string | null
                    footer_text_color: string | null
                    id: string
                    instagram_url: string | null
                    logo_footer_url: string | null
                    logo_url: string | null
                    primary_color: string | null
                    secondary_color: string | null
                    service_time_sunday: string | null
                    service_time_wednesday: string | null
                    site_name: string | null
                    site_tagline: string | null
                    updated_at: string | null
                    youtube_url: string | null
                }
                Insert: {
                    address?: string | null
                    background_dark?: string | null
                    background_light?: string | null
                    contact_email?: string | null
                    contact_phone?: string | null
                    created_at?: string | null
                    facebook_url?: string | null
                    footer_bg_color?: string | null
                    footer_bottom_bg?: string | null
                    footer_text_color?: string | null
                    id?: string
                    instagram_url?: string | null
                    logo_footer_url?: string | null
                    logo_url?: string | null
                    primary_color?: string | null
                    secondary_color?: string | null
                    service_time_sunday?: string | null
                    service_time_wednesday?: string | null
                    site_name?: string | null
                    site_tagline?: string | null
                    updated_at?: string | null
                    youtube_url?: string | null
                }
                Update: {
                    address?: string | null
                    background_dark?: string | null
                    background_light?: string | null
                    contact_email?: string | null
                    contact_phone?: string | null
                    created_at?: string | null
                    facebook_url?: string | null
                    footer_bg_color?: string | null
                    footer_bottom_bg?: string | null
                    footer_text_color?: string | null
                    id?: string
                    instagram_url?: string | null
                    logo_footer_url?: string | null
                    logo_url?: string | null
                    primary_color?: string | null
                    secondary_color?: string | null
                    service_time_sunday?: string | null
                    service_time_wednesday?: string | null
                    site_name?: string | null
                    site_tagline?: string | null
                    updated_at?: string | null
                    youtube_url?: string | null
                }
                Relationships: []
            }
            user_progress: {
                Row: {
                    completed_at: string | null
                    created_at: string | null
                    id: string
                    item_id: string
                    item_type: string
                    progress_percent: number | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    completed_at?: string | null
                    created_at?: string | null
                    id?: string
                    item_id: string
                    item_type: string
                    progress_percent?: number | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    completed_at?: string | null
                    created_at?: string | null
                    id?: string
                    item_id?: string
                    item_type?: string
                    progress_percent?: number | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_progress_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
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
                    time: string
                    title: string
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
                    time: string
                    title: string
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
                    time?: string
                    title?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database['public']

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
