/**
 * @file src/hooks/useAuth.ts
 * @description Custom hook for authentication state management.
 * Wraps Supabase Auth and exposes a clean interface for components.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@services/supabase';
import type { User } from '../types/index';
import type { Session } from '@supabase/supabase-js';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface AuthState {
    /** The currently authenticated user, or null if not logged in */
    user: User | null;
    /** Raw Supabase session object */
    session: Session | null;
    /** True while the initial session is being loaded */
    loading: boolean;
    /** Error message if auth operation failed */
    error: string | null;
}

interface AuthActions {
    /** Sign in with email and password */
    signIn: (email: string, password: string) => Promise<void>;
    /** Sign up with email and password */
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    /** Sign out the current user */
    signOut: () => Promise<void>;
    /** Clear any auth error */
    clearError: () => void;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Hook that provides authentication state and actions.
 *
 * @returns {AuthState & AuthActions} Auth state and action handlers
 *
 * @example
 * const { user, loading, signIn, signOut } = useAuth();
 */
export function useAuth(): AuthState & AuthActions {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ── Map Supabase user to our User type ──────
    const mapUser = (supabaseUser: import('@supabase/supabase-js').User): User => ({
        id: supabaseUser.id,
        email: supabaseUser.email ?? '',
        displayName:
            (supabaseUser.user_metadata?.display_name as string) ??
            supabaseUser.email?.split('@')[0] ??
            'Player',
        avatarUrl: supabaseUser.user_metadata?.avatar_url as string | undefined,
        role: (supabaseUser.user_metadata?.role as User['role']) ?? 'player',
        createdAt: supabaseUser.created_at,
    });

    // ── Listen for auth state changes ───────────
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s);
            setUser(s?.user ? mapUser(s.user) : null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, s) => {
                setSession(s);
                setUser(s?.user ? mapUser(s.user) : null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // ── Actions ─────────────────────────────────

    const signIn = useCallback(async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        const { error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) setError(e.message);
        setLoading(false);
    }, []);

    const signUp = useCallback(
        async (email: string, password: string, displayName: string) => {
            setError(null);
            setLoading(true);
            const { error: e } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { display_name: displayName, role: 'player' } },
            });
            if (e) setError(e.message);
            setLoading(false);
        },
        []
    );

    const signOut = useCallback(async () => {
        setError(null);
        await supabase.auth.signOut();
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { user, session, loading, error, signIn, signUp, signOut, clearError };
}
