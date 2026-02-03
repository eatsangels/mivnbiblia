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
      about_us_content: {
        Row: {
          cta_description: string | null
          cta_title: string | null
          hero_image_public_id: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          mission_content: string | null
          mission_image_public_id: string | null
          mission_image_url: string | null
          mission_title: string | null
          updated_at: string | null
          values_content: string | null
          values_list: Json | null
          values_title: string | null
          vision_content: string | null
          vision_image_public_id: string | null
          vision_image_url: string | null
          vision_title: string | null
        }
        Insert: {
          cta_description?: string | null
          cta_title?: string | null
          hero_image_public_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          mission_content?: string | null
          mission_image_public_id?: string | null
          mission_image_url?: string | null
          mission_title?: string | null
          updated_at?: string | null
          values_content?: string | null
          values_list?: Json | null
          values_title?: string | null
          vision_content?: string | null
          vision_image_public_id?: string | null
          vision_image_url?: string | null
          vision_title?: string | null
        }
        Update: {
          cta_description?: string | null
          cta_title?: string | null
          hero_image_public_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          mission_content?: string | null
          mission_image_public_id?: string | null
          mission_image_url?: string | null
          mission_title?: string | null
          updated_at?: string | null
          values_content?: string | null
          values_list?: Json | null
          values_title?: string | null
          vision_content?: string | null
          vision_image_public_id?: string | null
          vision_image_url?: string | null
          vision_title?: string | null
        }
        Relationships: []
      }
      analytics_daily_metrics: {
        Row: {
          id: string
          date: string
          metric_type: string
          value: number
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          date?: string
          metric_type: string
          value: number
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          date?: string
          metric_type?: string
          value?: number
          metadata?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          id: string
          created_at: string | null
          message: string
          target_audience: string | null
          scheduled_for: string | null
          is_pinned: boolean | null
          is_notified: boolean | null
          created_by: string | null
          views_count: number | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          message: string
          target_audience?: string | null
          scheduled_for?: string | null
          is_pinned?: boolean | null
          is_notified?: boolean | null
          created_by?: string | null
          views_count?: number | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          message?: string
          target_audience?: string | null
          scheduled_for?: string | null
          is_pinned?: boolean | null
          is_notified?: boolean | null
          created_by?: string | null
          views_count?: number | null
          expires_at?: string | null
        }
        Relationships: []
      }
      app_roles: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          color: string | null
          is_system: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          color?: string | null
          is_system?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          color?: string | null
          is_system?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      book_metadata: {
        Row: {
          id: string
          book_slug: string
          title: string
          author: string | null
          date_written: string | null
          context: string | null
          themes: string[] | null
          intro: string | null
          image_path: string | null
          created_at: string
        }
        Insert: {
          id?: string
          book_slug: string
          title: string
          author?: string | null
          date_written?: string | null
          context?: string | null
          themes?: string[] | null
          intro?: string | null
          image_path?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          book_slug?: string
          title?: string
          author?: string | null
          date_written?: string | null
          context?: string | null
          themes?: string[] | null
          intro?: string | null
          image_path?: string | null
          created_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          id: number
          name: string
          chapters: number
          testament: string | null
          display_order: number | null
        }
        Insert: {
          id?: number
          name: string
          chapters: number
          testament?: string | null
          display_order?: number | null
        }
        Update: {
          id?: number
          name?: string
          chapters?: number
          testament?: string | null
          display_order?: number | null
        }
        Relationships: []
      }
      bulletins: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          pdf_url: string | null
          publish_date: string
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          pdf_url?: string | null
          publish_date: string
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          pdf_url?: string | null
          publish_date?: string
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      commentaries: {
        Row: {
          id: string
          book_slug: string
          chapter: number
          verse: number | null
          content: string
          author: string | null
          created_at: string
        }
        Insert: {
          id?: string
          book_slug: string
          chapter: number
          verse?: number | null
          content: string
          author?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          book_slug?: string
          chapter?: number
          verse?: number | null
          content?: string
          author?: string | null
          created_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          id: string
          user_id: string | null
          book: string | null
          chapter: number | null
          verse: number | null
          content: string | null
          author_name: string | null
          display_name: string | null
          comment: string | null
          is_approved: boolean | null
          content_type: string | null
          content_id: string | null
          parent_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          book?: string | null
          chapter?: number | null
          verse?: number | null
          content?: string | null
          author_name?: string | null
          display_name?: string | null
          comment?: string | null
          is_approved?: boolean | null
          content_type?: string | null
          content_id?: string | null
          parent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          book?: string | null
          chapter?: number | null
          verse?: number | null
          content?: string | null
          author_name?: string | null
          display_name?: string | null
          comment?: string | null
          is_approved?: boolean | null
          content_type?: string | null
          content_id?: string | null
          parent_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon_name: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon_name?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon_name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          id: string
          user_id: string | null
          course_id: string | null
          enrolled_at: string | null
          completed_at: string | null
          progress_percentage: number | null
          last_accessed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          completed_at?: string | null
          progress_percentage?: number | null
          last_accessed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          completed_at?: string | null
          progress_percentage?: number | null
          last_accessed_at?: string | null
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
      course_lessons: {
        Row: {
          id: string
          course_id: string | null
          title: string
          description: string | null
          video_url: string | null
          duration_minutes: number | null
          order_index: number | null
          content: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          order_index?: number | null
          content?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string | null
          title?: string
          description?: string | null
          video_url?: string | null
          duration_minutes?: number | null
          order_index?: number | null
          content?: string | null
          created_at?: string | null
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
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          level: string | null
          thumbnail_url: string | null
          total_lessons: number | null
          is_active: boolean | null
          is_published: boolean | null
          category_id: string | null
          instructor_name: string | null
          certificate_template_url: string | null
          diploma_intro_text: string | null
          diploma_completion_text: string | null
          diploma_signature_title: string | null
          diploma_program_name: string | null
          diploma_member_text: string | null
          diploma_seal_url: string | null
          diploma_signer1_name: string | null
          diploma_signer1_title: string | null
          diploma_signer2_name: string | null
          diploma_signer2_title: string | null
          diploma_show_lessons: boolean | null
          diploma_title_text: string | null
          diploma_lessons_list: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          level?: string | null
          thumbnail_url?: string | null
          total_lessons?: number | null
          is_active?: boolean | null
          is_published?: boolean | null
          category_id?: string | null
          instructor_name?: string | null
          certificate_template_url?: string | null
          diploma_intro_text?: string | null
          diploma_completion_text?: string | null
          diploma_signature_title?: string | null
          diploma_program_name?: string | null
          diploma_member_text?: string | null
          diploma_seal_url?: string | null
          diploma_signer1_name?: string | null
          diploma_signer1_title?: string | null
          diploma_signer2_name?: string | null
          diploma_signer2_title?: string | null
          diploma_show_lessons?: boolean | null
          diploma_title_text?: string | null
          diploma_lessons_list?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          level?: string | null
          thumbnail_url?: string | null
          total_lessons?: number | null
          is_active?: boolean | null
          is_published?: boolean | null
          category_id?: string | null
          instructor_name?: string | null
          certificate_template_url?: string | null
          diploma_intro_text?: string | null
          diploma_completion_text?: string | null
          diploma_signature_title?: string | null
          diploma_program_name?: string | null
          diploma_member_text?: string | null
          diploma_seal_url?: string | null
          diploma_signer1_name?: string | null
          diploma_signer1_title?: string | null
          diploma_signer2_name?: string | null
          diploma_signer2_title?: string | null
          diploma_show_lessons?: boolean | null
          diploma_title_text?: string | null
          diploma_lessons_list?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      devotionals: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          scripture_reference: string
          author_name: string | null
          publish_date: string
          image: string | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          scripture_reference: string
          author_name?: string | null
          publish_date: string
          image?: string | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          scripture_reference?: string
          author_name?: string | null
          publish_date?: string
          image?: string | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      donation_campaigns: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          goal_amount: number | null
          current_amount: number | null
          start_date: string
          end_date: string | null
          image: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          goal_amount?: number | null
          current_amount?: number | null
          start_date: string
          end_date?: string | null
          image?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          goal_amount?: number | null
          current_amount?: number | null
          start_date?: string
          end_date?: string | null
          image?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          id: string
          user_id: string | null
          campaign_id: string | null
          amount: number
          currency: string
          payment_method: string | null
          payment_id: string | null
          donor_name: string | null
          donor_email: string | null
          is_anonymous: boolean | null
          status: string
          created_at: string | null
          type: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          amount: number
          currency?: string
          payment_method?: string | null
          payment_id?: string | null
          donor_name?: string | null
          donor_email?: string | null
          is_anonymous?: boolean | null
          status?: string
          created_at?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          amount?: number
          currency?: string
          payment_method?: string | null
          payment_id?: string | null
          donor_name?: string | null
          donor_email?: string | null
          is_anonymous?: boolean | null
          status?: string
          created_at?: string | null
          type?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string | null
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          event_id?: string | null
          user_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string | null
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          status?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          event_date: string
          end_date: string | null
          location: string | null
          address: string | null
          image: string | null
          registration_url: string | null
          max_attendees: number | null
          is_featured: boolean | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
          category: string | null
          capacity: number | null
          speaker: string | null
          start_time: string | null
          end_time: string | null
          image_url: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          event_date: string
          end_date?: string | null
          location?: string | null
          address?: string | null
          image?: string | null
          registration_url?: string | null
          max_attendees?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          category?: string | null
          capacity?: number | null
          speaker?: string | null
          start_time?: string | null
          end_time?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          event_date?: string
          end_date?: string | null
          location?: string | null
          address?: string | null
          image?: string | null
          registration_url?: string | null
          max_attendees?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          category?: string | null
          capacity?: number | null
          speaker?: string | null
          start_time?: string | null
          end_time?: string | null
          image_url?: string | null
        }
        Relationships: []
      }
      gallery_albums: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          cover_image: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          cover_image?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          cover_image?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          id: string
          album_id: string | null
          url: string
          caption: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          album_id?: string | null
          url: string
          caption?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          album_id?: string | null
          url?: string
          caption?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      group_attendance: {
        Row: {
          id: string
          group_id: string | null
          meeting_date: string
          members_present_count: number | null
          new_guests_count: number | null
          notes: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          group_id?: string | null
          meeting_date: string
          members_present_count?: number | null
          new_guests_count?: number | null
          notes?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          group_id?: string | null
          meeting_date?: string
          members_present_count?: number | null
          new_guests_count?: number | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      group_members: {
        Row: {
          id: string
          user_id: string
          group_id: string
          status: string
          role: string
          joined_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          group_id: string
          status?: string
          role?: string
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          group_id?: string
          status?: string
          role?: string
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inbox_messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          subject: string
          body: string
          is_read: boolean | null
          parent_id: string | null
          attachments: any | null
          sender_deleted: boolean | null
          recipient_deleted: boolean | null
          sender_starred: boolean | null
          recipient_starred: boolean | null
          sender_purged: boolean | null
          recipient_purged: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          subject: string
          body: string
          is_read?: boolean | null
          parent_id?: string | null
          attachments?: any | null
          sender_deleted?: boolean | null
          recipient_deleted?: boolean | null
          sender_starred?: boolean | null
          recipient_starred?: boolean | null
          sender_purged?: boolean | null
          recipient_purged?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          subject?: string
          body?: string
          is_read?: boolean | null
          parent_id?: string | null
          attachments?: any | null
          sender_deleted?: boolean | null
          recipient_deleted?: boolean | null
          sender_starred?: boolean | null
          recipient_starred?: boolean | null
          sender_purged?: boolean | null
          recipient_purged?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inbox_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "inbox_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbox_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbox_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          user_id: string | null
          content: string
          channel: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content: string
          channel?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content?: string
          channel?: string | null
          created_at?: string
        }
        Relationships: []
      }
      ministries: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          leader_name: string | null
          leader_email: string | null
          image: string | null
          meeting_day: string | null
          meeting_time: string | null
          location: string | null
          is_active: boolean | null
          order: number | null
          created_at: string | null
          updated_at: string | null
          leader_id: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          leader_name?: string | null
          leader_email?: string | null
          image?: string | null
          meeting_day?: string | null
          meeting_time?: string | null
          location?: string | null
          is_active?: boolean | null
          order?: number | null
          created_at?: string | null
          updated_at?: string | null
          leader_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          leader_name?: string | null
          leader_email?: string | null
          image?: string | null
          meeting_day?: string | null
          meeting_time?: string | null
          location?: string | null
          is_active?: boolean | null
          order?: number | null
          created_at?: string | null
          updated_at?: string | null
          leader_id?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          id: string
          menu_id: string | null
          label: string
          url: string
          icon: string | null
          order: number
          parent_id: string | null
          is_external: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          menu_id?: string | null
          label: string
          url: string
          icon?: string | null
          order?: number
          parent_id?: string | null
          is_external?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          menu_id?: string | null
          label?: string
          url?: string
          icon?: string | null
          order?: number
          parent_id?: string | null
          is_external?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      navigation_menus: {
        Row: {
          id: string
          name: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          name: string | null
          is_active: boolean | null
          subscribed_at: string | null
          unsubscribed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          is_active?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email: string
          name?: string | null
          is_active?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pastor_messages: {
        Row: {
          id: string
          title: string
          pastor_name: string
          date: string
          image_url: string | null
          video_url: string | null
          duration: string | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          pastor_name: string
          date?: string
          image_url?: string | null
          video_url?: string | null
          duration?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          pastor_name?: string
          date?: string
          image_url?: string | null
          video_url?: string | null
          duration?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      prayer_intersessions: {
        Row: {
          id: string
          request_id: string | null
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          request_id?: string | null
          user_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          request_id?: string | null
          user_id?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          id: string
          user_id: string | null
          requester_name: string | null
          email: string | null
          request: string
          is_anonymous: boolean | null
          is_approved: boolean | null
          is_answered: boolean | null
          created_at: string | null
          updated_at: string | null
          is_private: boolean | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          requester_name?: string | null
          email?: string | null
          request: string
          is_anonymous?: boolean | null
          is_approved?: boolean | null
          is_answered?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          is_private?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string | null
          requester_name?: string | null
          email?: string | null
          request?: string
          is_anonymous?: boolean | null
          is_approved?: boolean | null
          is_answered?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          is_private?: boolean | null
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
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          baptized: boolean | null
          birth_date: string | null
          city: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          member_since: string | null
          ministries: string[] | null
          phone: string | null
          roles: string[] | null
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          baptized?: boolean | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          member_since?: string | null
          ministries?: string[] | null
          phone?: string | null
          roles?: string[] | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          baptized?: boolean | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          member_since?: string | null
          ministries?: string[] | null
          phone?: string | null
          roles?: string[] | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      reading_history: {
        Row: {
          id: string
          user_id: string
          book_name: string
          chapter: number
          read_at: string
        }
        Insert: {
          id?: string
          user_id: string
          book_name: string
          chapter: number
          read_at?: string
        }
        Update: {
          id?: string
          user_id: string
          book_name: string
          chapter: number
          read_at?: string
        }
        Relationships: []
      }
      resource_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          id: string
          category_id: string | null
          title: string
          slug: string
          description: string
          file_url: string | null
          external_url: string | null
          thumbnail: string | null
          file_type: string | null
          download_count: number | null
          is_featured: boolean | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          category_id?: string | null
          title: string
          slug: string
          description: string
          file_url?: string | null
          external_url?: string | null
          thumbnail?: string | null
          file_type?: string | null
          download_count?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          category_id?: string | null
          title?: string
          slug?: string
          description?: string
          file_url?: string | null
          external_url?: string | null
          thumbnail?: string | null
          file_type?: string | null
          download_count?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: string
          role_id: string
          permission_slug: string
          created_at: string | null
        }
        Insert: {
          id?: string
          role_id: string
          permission_slug: string
          created_at?: string | null
        }
        Update: {
          id?: string
          role_id?: string
          permission_slug?: string
          created_at?: string | null
        }
        Relationships: []
      }
      scriptures: {
        Row: {
          book_name: string | null
          chapter: number | null
          content: string | null
          id: number
          search_vector: string | null
          testament: string | null
          verse_number: number | null
          visual_theme: string | null
        }
        Insert: {
          book_name?: string | null
          chapter?: number | null
          content?: string | null
          id?: number
          search_vector?: string | null
          testament?: string | null
          verse_number?: number | null
          visual_theme?: string | null
        }
        Update: {
          book_name?: string | null
          chapter?: number | null
          content?: string | null
          id?: number
          search_vector?: string | null
          testament?: string | null
          verse_number?: number | null
          visual_theme?: string | null
        }
        Relationships: []
      }
      sermons: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          reference_book: string | null
          reference_chapter: number | null
          tags: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          reference_book?: string | null
          reference_chapter?: number | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string | null
          reference_book?: string | null
          reference_chapter?: number | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_settings: {
        Row: {
          id: string
          next_service_title: string | null
          next_service_preacher: string | null
          next_service_date: string | null
          next_service_location: string | null
          next_service_image: string | null
          next_service_series: string | null
          next_service_description: string | null
          offline_message: string | null
          offline_subtitle: string | null
          google_maps_url: string | null
          next_service_image_url: string | null
          next_service_image_public_id: string | null
          next_service_tags: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          next_service_title?: string | null
          next_service_preacher?: string | null
          next_service_date?: string | null
          next_service_location?: string | null
          next_service_image?: string | null
          next_service_series?: string | null
          next_service_description?: string | null
          offline_message?: string | null
          offline_subtitle?: string | null
          google_maps_url?: string | null
          next_service_image_url?: string | null
          next_service_image_public_id?: string | null
          next_service_tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          next_service_title?: string | null
          next_service_preacher?: string | null
          next_service_date?: string | null
          next_service_location?: string | null
          next_service_image?: string | null
          next_service_series?: string | null
          next_service_description?: string | null
          offline_message?: string | null
          offline_subtitle?: string | null
          google_maps_url?: string | null
          next_service_image_url?: string | null
          next_service_image_public_id?: string | null
          next_service_tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          type: string
          description: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: string
          type?: string
          description?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: string
          type?: string
          description?: string | null
          updated_at?: string | null
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
          members_count: number | null
          image_url: string | null
          leader_image_url: string | null
          schedule: string | null
          location: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          latitude: number | null
          longitude: number | null
          is_location_public: boolean | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          leader: string
          description?: string | null
          members_count?: number | null
          image_url?: string | null
          leader_image_url?: string | null
          schedule?: string | null
          location?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          latitude?: number | null
          longitude?: number | null
          is_location_public?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          leader?: string
          description?: string | null
          members_count?: number | null
          image_url?: string | null
          leader_image_url?: string | null
          schedule?: string | null
          location?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          latitude?: number | null
          longitude?: number | null
          is_location_public?: boolean | null
        }
        Relationships: []
      }
      spiritual_journey_steps: {
        Row: {
          id: string
          name: string
          description: string | null
          order_index: number
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          order_index: number
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          order_index?: number
          created_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          user_id: string | null
          name: string
          content: string
          rating: number | null
          is_published: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          content: string
          rating?: number | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          content?: string
          rating?: number | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          id: string
          user_id: string | null
          author_name: string | null
          author_role: string | null
          full_name: string | null
          content: string
          image: string | null
          avatar_url: string | null
          category: string | null
          is_featured: boolean | null
          featured: boolean | null
          is_approved: boolean | null
          is_public: boolean | null
          order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          author_name?: string | null
          author_role?: string | null
          full_name?: string | null
          content: string
          image?: string | null
          avatar_url?: string | null
          category?: string | null
          is_featured?: boolean | null
          featured?: boolean | null
          is_approved?: boolean | null
          is_public?: boolean | null
          order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          author_name?: string | null
          author_role?: string | null
          full_name?: string | null
          content?: string
          image?: string | null
          avatar_url?: string | null
          category?: string | null
          is_featured?: boolean | null
          featured?: boolean | null
          is_approved?: boolean | null
          is_public?: boolean | null
          order?: number | null
          created_at?: string | null
          updated_at?: string | null
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
      user_certificates: {
        Row: {
          completion_date: string | null
          completion_text: string | null
          course_id: string | null
          course_template_url: string | null
          id: string
          intro_text: string | null
          issued_at: string | null
          lessons_completed: string[] | null
          member_text: string | null
          program_name: string | null
          seal_url: string | null
          show_lessons: boolean | null
          signature_title: string | null
          signer1_name: string | null
          signer1_title: string | null
          signer2_name: string | null
          signer2_title: string | null
          student_name: string | null
          title: string | null
          title_text: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          completion_date?: string | null
          completion_text?: string | null
          course_id?: string | null
          course_template_url?: string | null
          id?: string
          intro_text?: string | null
          issued_at?: string | null
          lessons_completed?: string[] | null
          member_text?: string | null
          program_name?: string | null
          seal_url?: string | null
          show_lessons?: boolean | null
          signature_title?: string | null
          signer1_name?: string | null
          signer1_title?: string | null
          signer2_name?: string | null
          signer2_title?: string | null
          student_name?: string | null
          title?: string | null
          title_text?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          completion_date?: string | null
          completion_text?: string | null
          course_id?: string | null
          course_template_url?: string | null
          id?: string
          intro_text?: string | null
          issued_at?: string | null
          lessons_completed?: string[] | null
          member_text?: string | null
          program_name?: string | null
          seal_url?: string | null
          show_lessons?: boolean | null
          signature_title?: string | null
          signer1_name?: string | null
          signer1_title?: string | null
          signer2_name?: string | null
          signer2_title?: string | null
          student_name?: string | null
          title?: string | null
          title_text?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_certificates_user_id_fkey"
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
          verse: number
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          book_name: string
          chapter: number
          verse: number
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          book_name?: string
          chapter?: number
          verse?: number
          color?: string | null
          created_at?: string
        }
        Relationships: []
      }
      user_milestones: {
        Row: {
          id: string
          user_id: string
          milestone_type: string
          achieved_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          milestone_type: string
          achieved_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          milestone_type?: string
          achieved_at?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      user_ministries: {
        Row: {
          user_id: string
          ministry_id: string
          joined_at: string | null
          role: string | null
        }
        Insert: {
          user_id: string
          ministry_id: string
          joined_at?: string | null
          role?: string | null
        }
        Update: {
          user_id?: string
          ministry_id?: string
          joined_at?: string | null
          role?: string | null
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
          }
        ]
      }
      user_notes: {
        Row: {
          id: number
          user_id: string
          book_name: string
          chapter: number
          verse_number: number | null
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          book_name: string
          chapter: number
          verse_number?: number | null
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          book_name?: string
          chapter?: number
          verse_number?: number | null
          content?: string
          created_at?: string
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
      user_progress: {
        Row: {
          id: string
          user_id: string
          item_type: string
          item_id: string
          progress: number | null
          completed: boolean | null
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_type: string
          item_id: string
          progress?: number | null
          completed?: boolean | null
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_type?: string
          item_id?: string
          progress?: number | null
          completed?: boolean | null
          completed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_spiritual_journey: {
        Row: {
          id: string
          user_id: string | null
          step_id: string | null
          completed_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          step_id?: string | null
          completed_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          step_id?: string | null
          completed_at?: string | null
          notes?: string | null
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
          }
        ]
      }
      weekly_activities: {
        Row: {
          id: string
          day_of_week: string
          title: string
          time: string
          description: string | null
          category: string
          icon_name: string | null
          color: string | null
          is_active: boolean | null
          display_order: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          day_of_week: string
          title: string
          time: string
          description?: string | null
          category?: string
          icon_name?: string | null
          color?: string | null
          is_active?: boolean | null
          display_order?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          day_of_week: string
          title: string
          time: string
          description?: string | null
          category?: string
          icon_name?: string | null
          color?: string | null
          is_active?: boolean | null
          display_order?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_prayer_count: {
        Args: {
          request_id: string
        }
        Returns: number
      }
      is_admin: {
        Args: {
          user_id?: string
        }
        Returns: boolean
      }
      track_reading: {
        Args: {
          p_book_name: string
          p_chapter: number
        }
        Returns: Json
      }
      reset_reading_progress: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
