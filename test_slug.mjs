import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
let url = '', key = ''
for (const line of envFile.split('\n')) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim().replace(/^"|"$/g, '')
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim().replace(/^"|"$/g, '')
}

const supabase = createClient(url, key)

async function run() {
    const { data, error } = await supabase.from('resources').select('id, title, slug, is_published')
    console.log("RESOURCES_DATA=" + JSON.stringify(data, null, 2))
}
run()
