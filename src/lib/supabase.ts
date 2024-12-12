import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgaaqnwttopgjsudpntg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYWFxbnd0dG9wZ2pzdWRwbnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Nzk5ODgsImV4cCI6MjA0OTQ1NTk4OH0.QjPegNeuLkMF2m9cpboxbaD5U1IXrDcWHqmBwM7okoY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 