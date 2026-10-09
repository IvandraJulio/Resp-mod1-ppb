import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️  SUPABASE_URL & SUPABASE_ANON_KEY must be defined in .env');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
