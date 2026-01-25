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
                    capacity: number | null
                    category: string | null
                    created_at: string | null
                    description: string | null
                    end_time: string
                    id: string
                    image_url: string | null
                    is_featured: boolean | null
                    location: string | null
                    speaker: string | null
                    start_time: string
                    title: string
                }
                Insert: {
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_time: string
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    location?: string | null
                    speaker?: string | null
                    start_time: string
                    title: string
                }
                Update: {
                    capacity?: number | null
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    end_time?: string
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    location?: string | null
                    speaker?: string | null
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
            prayer_requests: {
                Row: {
                    created_at: string | null
                    full_name: string | null
                    id: string
                    is_anonymous: boolean | null
                    is_private: boolean | null
                    message: string
                    prayer_count: number | null
                    status: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_private?: boolean | null
                    message: string
                    prayer_count?: number | null
                    status?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    is_anonymous?: boolean | null
                    is_private?: boolean | null
                    message?: string
                    prayer_count?: number | null
                    status?: string | null
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
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            handle_new_member_email: {
                Args: Record<PropertyKey, never>
                Returns: string
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
    ?keyof(Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
        ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ?R
    : never
  : PublicTableNameOrOptions extends keyof(PublicSchema["Tables"] &
        PublicSchema["Views"])
            ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ?R
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
  ?Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
Insert: infer I
    }
    ?I
: never
: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
Insert: infer I
      }
      ?I
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
  ?Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
Update: infer U
    }
    ?U
: never
: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
Update: infer U
      }
      ?U
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
  ?Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
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
  ?Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
