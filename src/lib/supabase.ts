import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zavxkbbwbrxnkfipfwip.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdnhrYmJ3YnJ4bmtmaXBmd2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NTU5MjIsImV4cCI6MjA1MDEzMTkyMn0.izPb5dl1ISJK6JiEJDdzfo953pOsOud96hFsfDCLx04';

export const supabase = createClient(supabaseUrl, supabaseKey);