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
        PostgrestVersion: "14.1";
    },
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
            events: {
                Row: {
                    created_at: string | null
                    description: string | null
                    end_time: string
                    id: string
                    image_url: string | null
                    is_featured: boolean | null
                    location: string | null
                    start_time: string
                    title: string
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    end_time: string
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    location?: string | null
                    start_time: string
                    title: string
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    end_time?: string
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    location?: string | null
                    start_time?: string
                    title?: string
                }
                Relationships: []
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
                    created_at: string
                    id: string
                    name: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    name: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            prayer_requests: {
                Row: {
                    category: string
                    content: string
                    created_at: string
                    email: string | null
                    id: string
                    is_anonymous: boolean
                    is_answered: boolean
                    is_approved: boolean
                    is_private: boolean
                    prayer_count: number | null
                    requester_name: string
                    status: string
                    title: string
                    user_id: string | null
                }
                Insert: {
                    category?: string
                    content: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean
                    is_answered?: boolean
                    is_approved?: boolean
                    is_private?: boolean
                    prayer_count?: number | null
                    requester_name: string
                    status?: string
                    title?: string
                    user_id?: string | null
                }
                Update: {
                    category?: string
                    content?: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_anonymous?: boolean
                    is_answered?: boolean
                    is_approved?: boolean
                    is_private?: boolean
                    prayer_count?: number | null
                    requester_name?: string
                    status?: string
                    title?: string
                    user_id?: string | null
                }
                Relationships: []
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
            scriptures: {
                Row: {
                    created_at: string | null
                    id: string
                    text: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    text?: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    text?: string
                }
                Relationships: []
            }
            sermons: {
                Row: {
                    audio_url: string | null
                    created_at: string | null
                    date: string
                    description: string | null
                    id: string
                    preacher: string
                    series: string | null
                    slug: string
                    thumbnail: string | null
                    title: string
                    video_url: string | null
                    views: number | null
                }
                Insert: {
                    audio_url?: string | null
                    created_at?: string | null
                    date: string
                    description?: string | null
                    id?: string
                    preacher: string
                    series?: string | null
                    slug: string
                    thumbnail?: string | null
                    title: string
                    video_url?: string | null
                    views?: number | null
                }
                Update: {
                    audio_url?: string | null
                    created_at?: string | null
                    date?: string
                    description?: string | null
                    id?: string
                    preacher?: string
                    series?: string | null
                    slug?: string
                    thumbnail?: string | null
                    title?: string
                    video_url?: string | null
                    views?: number | null
                }
                Relationships: []
            }
            site_settings: {
                Row: {
                    created_at: string | null
                    id: string
                    key: string
                    updated_at: string | null
                    value: Json
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    key: string
                    updated_at?: string | null
                    value: Json
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    key?: string
                    updated_at?: string | null
                    value?: Json
                }
                Relationships: []
            }
            testimonies: {
                Row: {
                    created_at: string | null
                    id: string
                    is_approved: boolean | null
                    testimony: string
                    user_email: string | null
                    user_name: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    testimony: string
                    user_email?: string | null
                    user_name: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    is_approved?: boolean | null
                    testimony?: string
                    user_email?: string | null
                    user_name?: string
                }
                Relationships: []
            }
            user_progress: {
                Row: {
                    created_at: string | null
                    id: string
                    user_id: string | null
                    data: Json
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    user_id?: string | null
                    data?: Json
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    user_id?: string | null
                    data?: Json
                }
                user_notes: {
                    Row: {
                        created_at: string | null
                        id: string
                        user_id: string
                        note_text: string
                    }
                    Insert: {
                        created_at?: string | null
                        id?: string
                        user_id: string
                        note_text: string
                    }
                    Update: {
                        created_at?: string | null
                        id?: string
                        user_id?: string
                        note_text?: string
                    }
                    Relationships: []
                }
            },
            Views: {
                [_ in never]: never
            },
            Functions: {
                is_admin: {
                    Args: Record<PropertyKey, never>
                    Returns: boolean
                },
                reset_reading_progress: {
                    Args: Record<PropertyKey, never>
                    Returns: void
                }
            },
            Enums: {
                [_ in never]: never
            },
            CompositeTypes: {
                [_ in never]: never
            }
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Extract<keyof Database, "public"> },
    TableName extends PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Row: infer R
    }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Extract<keyof Database, "public"> },
    TableName extends PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
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
    | { schema: Extract<keyof Database, "public"> },
    TableName extends PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Extract<keyof Database, "public"> }
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
    DefaultSchemaEnumNameOrOptions extends
    | { schema: Extract<keyof Database, "public"> } = { schema: Extract<keyof Database, "public"> },
    EnumName extends string = string
> = never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | { schema: Extract<keyof Database, "public"> } = { schema: Extract<keyof Database, "public"> },
    CompositeTypeName extends string = string
> = never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
