/**
 * @file src/services/supabase.ts
 * @description Supabase client initialization for Impostor GameWeb.
 *
 * Setup:
 * 1. Copy `.env.example` to `.env` and fill in your Supabase credentials.
 * 2. Never commit `.env` to version control.
 *
 * @see https://supabase.com/docs/reference/javascript/initializing
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// ─────────────────────────────────────────────
// Environment Variables
// ─────────────────────────────────────────────

const supabaseUrl: string =
    (Constants.expoConfig?.extra?.supabaseUrl as string) ?? '';

const supabaseAnonKey: string =
    (Constants.expoConfig?.extra?.supabaseAnonKey as string) ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing environment variables. ' +
        'Copy .env.example to .env and fill in your credentials.'
    );
}

// ─────────────────────────────────────────────
// Client
// ─────────────────────────────────────────────

/**
 * Singleton Supabase client instance.
 * Import this wherever you need to interact with the database or auth.
 *
 * @example
 * import { supabase } from '@services/supabase';
 * const { data, error } = await supabase.from('game_sessions').select('*');
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});
