import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase est maintenant optionnel (utilisé uniquement pour le CRM)
// Si les credentials ne sont pas fournis, on retourne un client vide qui échouera gracieusement
export const supabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : (null as any);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
