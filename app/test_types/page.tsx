import { Database } from '@/lib/database.types'
import { createClient } from "@/lib/supabase/client"

export default function TestPage() {
    // Test 1: Check if announcements exists in Tables
    type Tables = Database['public']['Tables']
    type AnnouncementsTable = Tables['announcements']

    // Test 2: Check Insert type explicitly
    // If this errors, then Insert IS never or missing
    type AnnouncementsInsert = AnnouncementsTable['Insert']

    // Test 3: Assign to it
    const testInsert: AnnouncementsInsert = {
        message: "Test"
    }

    // Test 4: Check Update type
    type AnnouncementsUpdate = AnnouncementsTable['Update']
    const testUpdate: AnnouncementsUpdate = {
        message: "Updated"
    }

    // Test 5: Check Supabase Client usage
    const sb = createClient();
    const checkBuilder = async () => {
        const { error } = await sb.from('announcements').insert({ message: "Test" });
        const { error: err2 } = await sb.from('announcements').update({ message: "Test" }).eq('id', '1');
    };

    return <div>Test Types</div>
}
