// assets/js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 👉 Replace with your own Supabase URL & anon key:
const SUPABASE_URL   = 'https://qxxwfdesrbveraojkkyn.supabase.co'
const SUPABASE_ANON  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eHdmZGVzcmJ2ZXJhb2pra3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDc0NzMsImV4cCI6MjA2MDQ4MzQ3M30.5niJCWr_b7UvOaMkknqxni_QRp8zmgrTCpeErPTSyJo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
