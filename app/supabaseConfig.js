import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseURL="https://zgoynpyhgkvtatwkdvxx.supabase.co";
const supabaseKey=process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseURL, supabaseKey)