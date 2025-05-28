// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ojtncszyrwjdnpjvwcrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdG5jc3p5cndqZG5wanZ3Y3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MDA4OTQsImV4cCI6MjA2Mzk3Njg5NH0.3tzRyULRkibacaZ2Z69RVU_h9DvgNy7cBCBHedRBzCE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
