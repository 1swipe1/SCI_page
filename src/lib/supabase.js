import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wslpjtklajuyppocdwdf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbHBqdGtsYWp1eXBwb2Nkd2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDkzODYsImV4cCI6MjA4ODI4NTM4Nn0.gjchjgt0p2AOZP5Hk5syqsrXbbKY3zMbZF2iGQx5ZNk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);