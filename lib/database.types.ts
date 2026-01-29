export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
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
  public: {
    Tables: {
      about_us_content: {
        Row: {
          cta_description: string | null
          cta_title: string | null
          hero_image_public_id: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string
          history_content: string | null
          history_image_public_id: string | null
          history_image_url: string | null
          history_since: string | null
          history_title: string | null
          id: string
          mission_content: string | null
          mission_title: string | null
          updated_at: string | null
          updated_by: string | null
          values_json: Json | null
          vision_content: string | null
          vision_title: string | null
        }
        Insert: {
          cta_description?: string | null
          cta_title?: string | null
          hero_image_public_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title: string
          history_content?: string | null
          history_image_public_id?: string | null
          history_image_url?: string | null
          history_since?: string | null
          history_title?: string | null
          id?: string
          mission_content?: string | null
          mission_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          values_json?: Json | null
          vision_content?: string | null
          vision_title?: string | null
        }
        Update: {
          cta_description?: string | null
          cta_title?: string | null
          hero_image_public_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string
          history_content?: string | null
          history_image_public_id?: string | null
          history_image_url?: string | null
          history_since?: string | null
          history_title?: string | null
          id?: string
          mission_content?: string | null
          mission_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
          values_json?: Json | null
          vision_content?: string | null
          vision_title?: string | null
        }
        Relationships: []
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
          expires_at: string | null
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
          expires_at?: string | null
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
          expires_at?: string | null
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
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
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
          content: string
          created_at: string | null
          id: string
          is_published: boolean | null
          pdf_url: string | null
          publish_date: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          pdf_url?: string | null
          publish_date: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          pdf_url?: string | null
          publish_date?: string
          slug?: string
          title?: string
          updated_at?: string | null
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
          author_name: string | null
          book: string
          chapter: number
          comment: string | null
          content: string
          content_id: string | null
          content_type: string | null
          created_at: string | null
          display_name: string | null
          id: string
          is_approved: boolean | null
          parent_id: string | null
          updated_at: string | null
          user_id: string
          verse: number
        }
        Insert: {
          author_name?: string | null
          book: string
          chapter: number
          comment?: string | null
          content: string
          content_id?: string | null
          content_type?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
          verse: number
        }
        Update: {
          author_name?: string | null
          book?: string
          chapter?: number
          comment?: string | null
          content?: string
          content_id?: string | null
          content_type?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
          verse?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
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
          is_published: boolean | null
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
          is_published?: boolean | null
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
          is_published?: boolean | null
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
          author_name: string | null
          content: string
          created_at: string | null
          id: string
          image: string | null
          is_published: boolean | null
          publish_date: string
          scripture_reference: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          content: string
          created_at?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          publish_date: string
          scripture_reference: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          publish_date?: string
          scripture_reference?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      donation_campaigns: {
        Row: {
          created_at: string | null
          current_amount: number | null
          description: string
          end_date: string | null
          goal_amount: number | null
          id: string
          image: string | null
          is_active: boolean | null
          name: string
          slug: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          description: string
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          description?: string
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          start_date?: string
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
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean | null
          payment_id: string | null
          payment_method: string
          status: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          campaign_id?: string | null
          created_at?: string | null
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          payment_id?: string | null
          payment_method: string
          status?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string | null
          created_at?: string | null
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          payment_id?: string | null
          payment_method?: string
          status?: string | null
          type?: string | null
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
      gallery_albums: {
        Row: {
          cover_image_public_id: string | null
          cover_image_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          cover_image_public_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          cover_image_public_id?: string | null
          cover_image_url?: string | null
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
          },
        ]
      }
      gallery_photos: {
        Row: {
          album_id: string | null
          caption: string | null
          created_at: string | null
          height: number | null
          id: string
          public_id: string | null
          uploaded_by: string | null
          url: string
          width: number | null
        }
        Insert: {
          album_id?: string | null
          caption?: string | null
          created_at?: string | null
          height?: number | null
          id?: string
          public_id?: string | null
          uploaded_by?: string | null
          url: string
          width?: number | null
        }
        Update: {
          album_id?: string | null
          caption?: string | null
          created_at?: string | null
          height?: number | null
          id?: string
          public_id?: string | null
          uploaded_by?: string | null
          url?: string
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
      group_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          joined_at: string
          role: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          joined_at?: string
          role?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          status?: string
          updated_at?: string
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
        ]
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
      messages: {
        Row: {
          channel: string
          content: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          channel?: string
          content: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          channel?: string
          content?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ministries: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image: string | null
          is_active: boolean | null
          leader_email: string | null
          leader_id: string | null
          leader_name: string | null
          location: string | null
          meeting_day: string | null
          meeting_time: string | null
          name: string
          order: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image?: string | null
          is_active?: boolean | null
          leader_email?: string | null
          leader_id?: string | null
          leader_name?: string | null
          location?: string | null
          meeting_day?: string | null
          meeting_time?: string | null
          name: string
          order?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image?: string | null
          is_active?: boolean | null
          leader_email?: string | null
          leader_id?: string | null
          leader_name?: string | null
          location?: string | null
          meeting_day?: string | null
          meeting_time?: string | null
          name?: string
          order?: number | null
          slug?: string
          updated_at?: string | null
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
      navigation_items: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          is_external: boolean | null
          label: string
          menu_id: string | null
          order: number
          parent_id: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_external?: boolean | null
          label: string
          menu_id?: string | null
          order?: number
          parent_id?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          is_external?: boolean | null
          label?: string
          menu_id?: string | null
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
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
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
      prayer_intersessions: {
        Row: {
          created_at: string
          id: string
          prayer_request_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          prayer_request_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
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
        ]
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
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          baptism_date: string | null
          birth_date: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_location_public: boolean | null
          latitude: number | null
          longitude: number | null
          ministry: string | null
          phone: string | null
          role: string | null
          role_id: string | null
          small_group: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          baptism_date?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_location_public?: boolean | null
          latitude?: number | null
          longitude?: number | null
          ministry?: string | null
          phone?: string | null
          role?: string | null
          role_id?: string | null
          small_group?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          baptism_date?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_location_public?: boolean | null
          latitude?: number | null
          longitude?: number | null
          ministry?: string | null
          phone?: string | null
          role?: string | null
          role_id?: string | null
          small_group?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "app_roles"
            referencedColumns: ["id"]
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
        Relationships: []
      }
      resource_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          order: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order?: number | null
          slug?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string
          download_count: number | null
          external_url: string | null
          file_type: string | null
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
          download_count?: number | null
          external_url?: string | null
          file_type?: string | null
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
          download_count?: number | null
          external_url?: string | null
          file_type?: string | null
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
          content: string | null
          created_at: string | null
          id: string
          reference_book: string | null
          reference_chapter: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          reference_book?: string | null
          reference_chapter?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          reference_book?: string | null
          reference_chapter?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      service_settings: {
        Row: {
          created_at: string | null
          google_maps_url: string | null
          id: string
          next_service_date: string
          next_service_description: string | null
          next_service_image: string | null
          next_service_image_public_id: string | null
          next_service_image_url: string | null
          next_service_location: string
          next_service_preacher: string
          next_service_series: string | null
          next_service_tags: string[] | null
          next_service_title: string
          offline_message: string
          offline_subtitle: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          google_maps_url?: string | null
          id?: string
          next_service_date?: string
          next_service_description?: string | null
          next_service_image?: string | null
          next_service_image_public_id?: string | null
          next_service_image_url?: string | null
          next_service_location?: string
          next_service_preacher?: string
          next_service_series?: string | null
          next_service_tags?: string[] | null
          next_service_title?: string
          offline_message?: string
          offline_subtitle?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          google_maps_url?: string | null
          id?: string
          next_service_date?: string
          next_service_description?: string | null
          next_service_image?: string | null
          next_service_image_public_id?: string | null
          next_service_image_url?: string | null
          next_service_location?: string
          next_service_preacher?: string
          next_service_series?: string | null
          next_service_tags?: string[] | null
          next_service_title?: string
          offline_message?: string
          offline_subtitle?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          type: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          type?: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          type?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      small_groups: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_location_public: boolean | null
          latitude: number | null
          leader: string
          leader_image_url: string | null
          location: string | null
          longitude: number | null
          members_count: number | null
          name: string
          schedule: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_location_public?: boolean | null
          latitude?: number | null
          leader: string
          leader_image_url?: string | null
          location?: string | null
          longitude?: number | null
          members_count?: number | null
          name: string
          schedule?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_location_public?: boolean | null
          latitude?: number | null
          leader?: string
          leader_image_url?: string | null
          location?: string | null
          longitude?: number | null
          members_count?: number | null
          name?: string
          schedule?: string | null
          updated_at?: string | null
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
      testimonials: {
        Row: {
          avatar_url: string | null
          category: string | null
          created_at: string
          handle: string | null
          id: string
          is_active: boolean | null
          name: string
          text: string
          type: string | null
        }
        Insert: {
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          handle?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          text: string
          type?: string | null
        }
        Update: {
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          handle?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          text?: string
          type?: string | null
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          author_name: string | null
          author_role: string | null
          avatar_url: string | null
          category: string | null
          content: string
          created_at: string | null
          featured: boolean | null
          full_name: string | null
          id: string
          image: string | null
          is_approved: boolean | null
          is_featured: boolean | null
          order: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          author_role?: string | null
          avatar_url?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          featured?: boolean | null
          full_name?: string | null
          id?: string
          image?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          order?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          author_role?: string | null
          avatar_url?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          featured?: boolean | null
          full_name?: string | null
          id?: string
          image?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          order?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_certificates: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          issued_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          issued_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          issued_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
      }
      user_milestones: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          milestone_slug: string
          title: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          milestone_slug: string
          title: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          milestone_slug?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_milestones_user_id_fkey"
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
      user_notes: {
        Row: {
          book_name: string
          chapter: number
          content: string
          created_at: string
          id: number
          user_id: string
          verse_number: number | null
        }
        Insert: {
          book_name: string
          chapter: number
          content: string
          created_at?: string
          id?: number
          user_id: string
          verse_number?: number | null
        }
        Update: {
          book_name?: string
          chapter?: number
          content?: string
          created_at?: string
          id?: number
          user_id?: string
          verse_number?: number | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          current_streak: number | null
          id: number
          last_book: string | null
          last_chapter: number | null
          last_read_at: string | null
          total_chapters_read: number | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: number
          last_book?: string | null
          last_chapter?: number | null
          last_read_at?: string | null
          total_chapters_read?: number | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: number
          last_book?: string | null
          last_chapter?: number | null
          last_read_at?: string | null
          total_chapters_read?: number | null
          user_id?: string
        }
        Relationships: []
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
      weekly_activities: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          day_of_week: string
          description: string | null
          display_order: number
          icon_name: string | null
          id: string
          is_active: boolean | null
          time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          color?: string | null
          created_at?: string | null
          day_of_week: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          day_of_week?: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_prayer_count: { Args: { request_id: string }; Returns: number }
      is_admin:
        | { Args: never; Returns: boolean }
        | { Args: { user_id: string }; Returns: boolean }
      reset_reading_progress: { Args: never; Returns: undefined }
      track_reading: {
        Args: { p_book_name: string; p_chapter: number }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
