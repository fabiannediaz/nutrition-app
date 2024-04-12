import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
//import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

const supabaseUrl = 'https://ohecythgeprqoktofqtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWN5dGhnZXBycW9rdG9mcXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2ODE2ODAsImV4cCI6MjAyODI1NzY4MH0.Dx0cjCxxeNLaiHpT20qTFxsZLadKX5N5AqTDYv1jfoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
        