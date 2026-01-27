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
            scriptures: {
                Row: {
                    book_name: string
                    chapter: number
                    content: string
                    id: number
                    search_vector: string | null
                    testament: string
                    verse_number: number
                    visual_theme: string | null
                }
                Insert: {
                    book_name: string
                    chapter: number
                    content: string
                    id?: number
                    search_vector?: string | null
                    testament: string
                    verse_number: number
                    visual_theme?: string | null
                }
                Update: {
                    book_name?: string
                    chapter?: number
                    content?: string
                    id?: number
                    search_vector?: string | null
                    testament?: string
                    verse_number?: number
                    visual_theme?: string | null
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
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
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
