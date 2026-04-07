import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

export function createSupabaseAdminClient() {
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const key = serviceRoleKey ?? getSupabaseAnonKey();

  return createClient(getSupabaseUrl(), key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
