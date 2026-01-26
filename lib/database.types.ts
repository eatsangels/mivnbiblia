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
                    id?: string
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
                    book_slug: string
                    context: string | null
                    created_at: string
                    date_written: string | null
                    id: string
                    image_path: string | null
                    intro: string | null
                    themes: string[] | null
                    title: string
                }
                Insert: {
                    author?: string | null
                    book_slug: string
                    context?: string | null
                    created_at?: string
                    date_written?: string | null
                    id?: string
                    image_path?: string | null
                    intro?: string | null
                    themes?: string[] | null
                    title: string
                }
                Update: {
                    author?: string | null
                    book_slug?: string
                    context?: string | null
                    created_at?: string
                    date_written?: string | null
                    id?: string
                    image_path?: string | null
                    intro?: string | null
                    themes?: string[] | null
                    title?: string
                }
                Relationships: []
            }
            books: {
                Row: {
                    chapters: number
                    display_order: number | null
                    id: number
                    name: string
                    testament: string | null
                }
                Insert: {
                    chapters: number
                    display_order?: number | null
                    id?: number
                    name: string
                    testament?: string | null
                }
                Update: {
                    chapters?: number
                    display_order?: number | null
                    id?: number
                    name?: string
                    testament?: string | null
                }
                Relationships: []
            }
            bulletins: {
                Row: {
                    content: string | null
                    created_at: string | null
                    pdf_url: string | null
                    id: string
                    is_published: boolean | null
                    publish_date: string | null
                    title: string
                }
                Insert: {
                    content?: string | null
                    created_at?: string | null
                    pdf_url?: string | null
                    id?: string
                    is_published?: boolean | null
                    publish_date?: string | null
                    title: string
                }
                Update: {
                    content?: string | null
                    created_at?: string | null
                    pdf_url?: string | null
                    id?: string
                    is_published?: boolean | null
                    publish_date?: string | null
                    title?: string
                }
                Relationships: []
            }
            commentaries: {
                Row: {
                    author_name: string | null
                    book_name: string
                    chapter: number
                    content: string
                    created_at: string
                    id: string
                    type: string
                    verse_number: number
                }
                Insert: {
                    author_name?: string | null
                    book_name: string
                    chapter: number
                    content: string
                    created_at?: string
                    id?: string
                    type: string
                    verse_number: number
                }
                Update: {
                    author_name?: string | null
                    book_name?: string
                    chapter?: number
                    content?: string
                    created_at?: string
                    id?: string
                    type?: string
                    verse_number?: number
                }
                Relationships: []
            }
            comments: {
                Row: {
                    content: string
                    created_at: string
                    devotional_id: string | null
                    id: string
                    is_approved: boolean
                    sermon_id: string | null
                    user_id: string
                }
                Insert: {
                    content: string
                    created_at?: string
                    devotional_id?: string | null
                    id?: string
                    is_approved?: boolean
                    sermon_id?: string | null
                    user_id: string
                }
                Update: {
                    content?: string
                    created_at?: string
                    devotional_id?: string | null
                    id?: string
                    is_approved?: boolean
                    sermon_id?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "comments_devotional_id_fkey"
                        columns: ["devotional_id"]
                        isOneToOne: false
                        referencedRelation: "devotionals"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "comments_sermon_id_fkey"
                        columns: ["sermon_id"]
                        isOneToOne: false
                        referencedRelation: "sermons"
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
            devotionals: {
                Row: {
                    author: string
                    content: string
                    created_at: string | null
                    date: string
                    id: string
                    image_url: string | null
                    slug: string
                    summary: string | null
                    title: string
                }
                Insert: {
                    author: string
                    content: string
                    created_at?: string | null
                    date: string
                    id?: string
                    image_url?: string | null
                    slug: string
                    summary?: string | null
                    title: string
                }
                Update: {
                    author?: string
                    content?: string
                    created_at?: string | null
                    date?: string
                    id?: string
                    image_url?: string | null
                    slug?: string
                    summary?: string | null
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
                    image_url: string | null
                    is_active: boolean | null
                    start_date: string | null
                    title: string
                }
                Insert: {
                    created_at?: string | null
                    current_amount?: number | null
                    description?: string | null
                    end_date?: string | null
                    goal_amount: number
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    start_date?: string | null
                    title: string
                }
                Update: {
                    created_at?: string | null
                    current_amount?: number | null
                    description?: string | null
                    end_date?: string | null
                    goal_amount?: number
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    start_date?: string | null
                    title?: string
                }
                Relationships: []
            }
            donations: {
                Row: {
                    amount: number
                    campaign_id: string | null
                    created_at: string | null
                    currency: string
                    donor_email: string | null
                    donor_name: string | null
                    id: string
                    notes: string | null
                    payment_intent_id: string | null
                    payment_method: string
                    status: string
                    type: string
                    user_id: string | null
                }
                Insert: {
                    amount: number
                    campaign_id?: string | null
                    created_at?: string | null
                    currency?: string
                    donor_email?: string | null
                    donor_name?: string | null
                    id?: string
                    notes?: string | null
                    payment_intent_id?: string | null
                    payment_method: string
                    status?: string
                    type: string
                    user_id?: string | null
                }
                Update: {
                    amount?: number
                    campaign_id?: string | null
                    created_at?: string | null
                    currency?: string
                    donor_email?: string | null
                    donor_name?: string | null
                    id?: string
                    notes?: string | null
                    payment_intent_id?: string | null
                    payment_method?: string
                    status?: string
                    type?: string
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
            event_registrations: {
                Row: {
                    created_at: string | null
                    email: string
                    event_id: string | null
                    full_name: string
                    id: string
                    notes: string | null
                    phone: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    event_id?: string | null
                    full_name: string
                    id?: string
                    notes?: string | null
                    phone?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    event_id?: string | null
                    full_name?: string
                    id?: string
                    notes?: string | null
                    phone?: string | null
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
                    },
                ]
            }
            events: {
                Row: {
                    address: string | null
                    capacity: number | null
                    category: string | null
                    created_at: string | null
                    description: string
                    end_date: string | null
                    end_time: string | null
                    event_date: string
                    id: string
                    image: string | null
                    image_url: string | null
                    is_featured: boolean | null
                    is_published: boolean | null
                    location: string | null
                    max_attendees: number | null
                    registration_url: string | null
                    slug: string
                    speaker: string | null
                    start_time: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    address?: string | null
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description: string
                    end_date?: string | null
                    end_time?: string | null
                    event_date: string
                    id?: string
                    image?: string | null
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    location?: string | null
                    max_attendees?: number | null
                    registration_url?: string | null
                    slug: string
                    speaker?: string | null
                    start_time?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    address?: string | null
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description?: string
                    end_date?: string | null
                    end_time?: string | null
                    event_date?: string
                    id?: string
                    image?: string | null
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    location?: string | null
                    max_attendees?: number | null
                    registration_url?: string | null
                    slug?: string
                    speaker?: string | null
                    start_time?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            messages: {
                Row: {
                    channel: string
                    created_at: string
                    id: string
                    user_id: string | null
                    content: string
                }
                Insert: {
                    channel?: string
                    created_at?: string
                    id?: string
                    user_id?: string | null
                    content: string
                }
                Update: {
                    channel?: string
                    created_at?: string
                    id?: string
                    user_id?: string | null
                    content?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "messages_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            ministries: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    image_url: string | null
                    leader_name: string | null
                    meeting_time: string | null
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    leader_name?: string | null
                    meeting_time?: string | null
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    leader_name?: string | null
                    meeting_time?: string | null
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            navigation_items: {
                Row: {
                    created_at: string
                    icon: string | null
                    id: string
                    is_external: boolean
                    label: string
                    menu_id: string
                    order: number
                    parent_id: string | null
                    url: string
                }
                Insert: {
                    created_at?: string
                    icon?: string | null
                    id?: string
                    is_external?: boolean
                    label: string
                    menu_id: string
                    order?: number
                    parent_id?: string | null
                    url: string
                }
                Update: {
                    created_at?: string
                    icon?: string | null
                    id?: string
                    is_external?: boolean
                    label?: string
                    menu_id?: string
                    order?: number
                    parent_id?: string | null
                    url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "navigation_items_menu_id_fkey"
                        columns: ["menu_id"]
                        isOneToOne: false
                        referencedRelation: "navigation_menus"
                        referencedColumns: ["id"]
                    },
                ]
            }
            navigation_menus: {
                Row: {
                    created_at: string
                    description: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            newsletter_subscriptions: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    is_active: boolean | null
                    name: string | null
                    subscribed_at: string | null
                    unsubscribed_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    subscribed_at?: string | null
                    unsubscribed_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    subscribed_at?: string | null
                    unsubscribed_at?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            pages: {
                Row: {
                    content: string
                    created_at: string | null
                    featured_image: string | null
                    id: string
                    is_published: boolean | null
                    meta_description: string | null
                    order: number | null
                    slug: string
                    subtitle: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    featured_image?: string | null
                    id?: string
                    is_published?: boolean | null
                    meta_description?: string | null
                    order?: number | null
                    slug: string
                    subtitle?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    featured_image?: string | null
                    id?: string
                    is_published?: boolean | null
                    meta_description?: string | null
                    order?: number | null
                    slug?: string
                    subtitle?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            notifications: {
                Row: {
                    created_at: string
                    id: string
                    is_read: boolean
                    message: string
                    title: string
                    type: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    is_read?: boolean
                    message: string
                    title: string
                    type: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    is_read?: boolean
                    message?: string
                    title?: string
                    type?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
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
                    updated_at: string | null
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
                    updated_at?: string | null
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
                    updated_at?: string | null
                    video_url?: string | null
                }
                Relationships: []
            }
            prayer_requests: {
                Row: {
                    created_at: string
                    email: string | null
                    id: string
                    is_anonymous: boolean
                    is_answered: boolean
                    is_approved: boolean
                    is_private: boolean
                    request: string
                    requester_name: string
                    updated_at: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean
                    is_answered?: boolean
                    is_approved?: boolean
                    is_private?: boolean
                    request: string
                    requester_name: string
                    updated_at?: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean
                    is_answered?: boolean
                    is_approved?: boolean
                    is_private?: boolean
                    request?: string
                    requester_name?: string
                    updated_at?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "prayer_requests_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            prayer_intersessions: {
                Row: {
                    created_at: string
                    id: string
                    prayer_request_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    prayer_request_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    prayer_request_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "prayer_intersessions_prayer_request_id_fkey"
                        columns: ["prayer_request_id"]
                        isOneToOne: false
                        referencedRelation: "prayer_requests"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    email: string | null
                    full_name: string | null
                    id: string
                    phone: string | null
                    role: string | null
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_role_fkey"
                        columns: ["role"]
                        isOneToOne: false
                        referencedRelation: "app_roles"
                        referencedColumns: ["slug"]
                    },
                ]
            }
            reading_history: {
                Row: {
                    book_name: string
                    chapter: number
                    id: string
                    read_at: string
                    user_id: string
                }
                Insert: {
                    book_name: string
                    chapter: number
                    id?: string
                    read_at?: string
                    user_id: string
                }
                Update: {
                    book_name?: string
                    chapter?: number
                    id?: string
                    read_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "reading_history_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            resource_categories: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            resources: {
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
                    image_url: string | null
                    is_featured: boolean | null
                    is_published: boolean | null
                    slug: string
                    thumbnail: string | null
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
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    slug: string
                    thumbnail?: string | null
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
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    slug?: string
                    thumbnail?: string | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "resources_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "resource_categories"
                        referencedColumns: ["id"]
                    },
                ]
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
                }
                Relationships: [
                    {
                        foreignKeyName: "role_permissions_role_id_fkey"
                        columns: ["role_id"]
                        isOneToOne: false
                        referencedRelation: "app_roles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            scriptures: {
                Row: {
                    book_name: string
                    chapter: number
                    content: string
                    id: number
                    search_vector: unknown
                    testament: string
                    verse_number: number
                    visual_theme: string | null
                }
                Insert: {
                    book_name: string
                    chapter: number
                    content: string
                    id?: number
                    search_vector?: unknown
                    testament: string
                    verse_number: number
                    visual_theme?: string | null
                }
                Update: {
                    book_name?: string
                    chapter?: number
                    content?: string
                    id?: number
                    search_vector?: unknown
                    testament?: string
                    verse_number?: number
                    visual_theme?: string | null
                }
                Relationships: []
            }
            sermons: {
                Row: {
                    created_at: string | null
                    date: string
                    description: string | null
                    id: string
                    image_url: string | null
                    location: string | null
                    speaker: string
                    title: string
                    video_url: string | null
                }
                Insert: {
                    created_at?: string | null
                    date: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    location?: string | null
                    speaker: string
                    title: string
                    video_url?: string | null
                }
                Update: {
                    created_at?: string | null
                    date?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    location?: string | null
                    speaker?: string
                    title?: string
                    video_url?: string | null
                }
                Relationships: []
            }
            site_settings: {
                Row: {
                    created_at: string
                    id: string
                    key: string
                    updated_at: string
                    value: Json
                }
                Insert: {
                    created_at?: string
                    id?: string
                    key: string
                    updated_at?: string
                    value: Json
                }
                Update: {
                    created_at?: string
                    id?: string
                    key?: string
                    updated_at?: string
                    value?: Json
                }
                Relationships: []
            }
            testimonials: {
                Row: {
                    content: string
                    created_at: string
                    id: string
                    is_approved: boolean
                    name: string
                    user_id: string | null
                }
                Insert: {
                    content: string
                    created_at?: string
                    id?: string
                    is_approved?: boolean
                    name: string
                    user_id?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string
                    id?: string
                    is_approved?: boolean
                    name?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "testimonials_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            testimonies: {
                Row: {
                    author_name: string
                    author_role: string | null
                    content: string
                    created_at: string | null
                    id: string
                    image: string | null
                    is_approved: boolean | null
                    is_featured: boolean | null
                    order: number | null
                    updated_at: string | null
                }
                Insert: {
                    author_name: string
                    author_role?: string | null
                    content: string
                    created_at?: string | null
                    id?: string
                    image?: string | null
                    is_approved?: boolean | null
                    is_featured?: boolean | null
                    order?: number | null
                    updated_at?: string | null
                }
                Update: {
                    author_name?: string
                    author_role?: string | null
                    content?: string
                    created_at?: string | null
                    id?: string
                    image?: string | null
                    is_approved?: boolean | null
                    is_featured?: boolean | null
                    order?: number | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            user_highlights: {
                Row: {
                    book_name: string
                    chapter: number
                    color: string | null
                    created_at: string | null
                    id: string
                    user_id: string
                    verse_number: number
                }
                Insert: {
                    book_name: string
                    chapter: number
                    color?: string | null
                    created_at?: string | null
                    id?: string
                    user_id: string
                    verse_number: number
                }
                Update: {
                    book_name?: string
                    chapter?: number
                    color?: string | null
                    created_at?: string | null
                    id?: string
                    user_id?: string
                    verse_number?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "user_highlights_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_notes: {
                Row: {
                    book_name: string
                    chapter: number
                    content: string
                    created_at: string
                    id: number
                    user_id: string
                    verse_number: number
                }
                Insert: {
                    book_name: string
                    chapter: number
                    content: string
                    created_at?: string
                    id?: number
                    user_id: string
                    verse_number: number
                }
                Update: {
                    book_name?: string
                    chapter?: number
                    content?: string
                    created_at?: string
                    id?: number
                    user_id?: string
                    verse_number?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "user_notes_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_progress: {
                Row: {
                    current_streak: number
                    id: number
                    last_book: string | null
                    last_chapter: number | null
                    last_read_at: string
                    total_chapters_read: number
                    user_id: string
                }
                Insert: {
                    current_streak?: number
                    id?: number
                    last_book?: string | null
                    last_chapter?: number | null
                    last_read_at?: string
                    total_chapters_read?: number
                    user_id: string
                }
                Update: {
                    current_streak?: number
                    id?: number
                    last_book?: string | null
                    last_chapter?: number | null
                    last_read_at?: string
                    total_chapters_read?: number
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
            small_groups: {
                Row: {
                    id: string
                    name: string
                    category: string
                    leader: string
                    description: string | null
                    members_count: number
                    image_url: string | null
                    leader_image_url: string | null
                    schedule: string | null
                    location: string | null
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    category: string
                    leader: string
                    description?: string | null
                    members_count?: number
                    image_url?: string | null
                    leader_image_url?: string | null
                    schedule?: string | null
                    location?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    category?: string
                    leader?: string
                    description?: string | null
                    members_count?: number
                    image_url?: string | null
                    leader_image_url?: string | null
                    schedule?: string | null
                    location?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            courses: {
                Row: {
                    created_at: string
                    description: string | null
                    id: string
                    is_active: boolean
                    level: "Básico" | "Intermedio" | "Avanzado" | null
                    thumbnail_url: string | null
                    title: string
                    total_lessons: number
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_active?: boolean
                    level?: "Básico" | "Intermedio" | "Avanzado" | null
                    thumbnail_url?: string | null
                    title: string
                    total_lessons?: number
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_active?: boolean
                    level?: "Básico" | "Intermedio" | "Avanzado" | null
                    thumbnail_url?: string | null
                    title?: string
                    total_lessons?: number
                    updated_at?: string
                }
                Relationships: []
            }
            course_lessons: {
                Row: {
                    content: string | null
                    course_id: string
                    created_at: string
                    description: string | null
                    duration_minutes: number
                    id: string
                    order_index: number
                    title: string
                    video_url: string | null
                }
                Insert: {
                    content?: string | null
                    course_id: string
                    created_at?: string
                    description?: string | null
                    duration_minutes?: number
                    id?: string
                    order_index?: number
                    title: string
                    video_url?: string | null
                }
                Update: {
                    content?: string | null
                    course_id?: string
                    created_at?: string
                    description?: string | null
                    duration_minutes?: number
                    id?: string
                    order_index?: number
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
                    }
                ]
            }
            course_enrollments: {
                Row: {
                    completed_at: string | null
                    course_id: string
                    enrolled_at: string
                    id: string
                    progress_percentage: number
                    user_id: string
                }
                Insert: {
                    completed_at?: string | null
                    course_id: string
                    enrolled_at?: string
                    id?: string
                    progress_percentage?: number
                    user_id: string
                }
                Update: {
                    completed_at?: string | null
                    course_id?: string
                    enrolled_at?: string
                    id?: string
                    progress_percentage?: number
                    user_id?: string
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
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            handle_new_member_email: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            is_admin: {
                Args: Record<PropertyKey, never>
                Returns: boolean
            }
            reset_reading_progress: {
                Args: Record<PropertyKey, never>
                Returns: void
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

type PublicSchema = Database["public"]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
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
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
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
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
