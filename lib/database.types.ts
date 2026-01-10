export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    website: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
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
            }
            user_progress: {
                Row: {
                    id: number
                    user_id: string
                    last_read_at: string | null
                    current_streak: number | null
                    total_chapters_read: number | null
                }
                Insert: {
                    id?: number
                    user_id: string
                    last_read_at?: string | null
                    current_streak?: number | null
                    total_chapters_read?: number | null
                }
                Update: {
                    id?: number
                    user_id?: string
                    last_read_at?: string | null
                    current_streak?: number | null
                    total_chapters_read?: number | null
                }
            }
            scriptures: {
                Row: {
                    id: number
                    testament: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    content: string
                    visual_theme: string | null
                    search_vector: string | null
                }
                Insert: {
                    id?: number
                    testament: string
                    book_name: string
                    chapter: number
                    verse_number: number
                    content: string
                    visual_theme?: string | null
                    search_vector?: string | null
                }
                Update: {
                    id?: number
                    testament?: string
                    book_name?: string
                    chapter?: number
                    verse_number?: number
                    content?: string
                    visual_theme?: string | null
                    search_vector?: string | null
                }
            }
            comments: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    book: string
                    chapter: number
                    verse: number
                    content: string
                    display_name: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    book: string
                    chapter: number
                    verse: number
                    content: string
                    display_name?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    book?: string
                    chapter?: number
                    verse?: number
                    content?: string
                    display_name?: string | null
                }
            }
        }
    }
}
