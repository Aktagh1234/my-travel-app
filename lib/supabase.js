// This file is no longer needed since the mobile app communicates only with the backend API
// The backend handles all Supabase operations using service keys
// 
// If you need to restore direct Supabase access in the future, uncomment below:
//
// import { createClient } from '@supabase/supabase-js';
// 
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
// 
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }
// 
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('📱 Mobile app uses backend API only - no direct database access needed');