import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig.extra;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);