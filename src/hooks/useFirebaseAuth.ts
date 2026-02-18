/**
 * @file src/hooks/useFirebaseAuth.ts
 * @description Hook de autenticación Firebase con Google.
 * Gestiona estado de sesión, loading y errores.
 */

import { useState, useEffect, useCallback } from 'react';
import { signInWithGoogle, signOut, onAuthChange, type User } from '@services/firebase';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface FirebaseAuthState {
    /** Usuario autenticado o null */
    user: User | null;
    /** True mientras se verifica la sesión inicial */
    loading: boolean;
    /** True durante operaciones de login/logout */
    actionLoading: boolean;
    /** Mensaje de error si algo falla */
    error: string | null;
}

interface FirebaseAuthActions {
    /** Iniciar sesión con Google */
    loginWithGoogle: () => Promise<void>;
    /** Cerrar sesión */
    logout: () => Promise<void>;
    /** Limpiar error */
    clearError: () => void;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Hook principal de autenticación Firebase.
 *
 * @example
 * const { user, loading, loginWithGoogle } = useFirebaseAuth();
 */
export function useFirebaseAuth(): FirebaseAuthState & FirebaseAuthActions {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ── Escuchar cambios de sesión ───────────────
    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // ── Login con Google ─────────────────────────
    const loginWithGoogle = useCallback(async () => {
        setError(null);
        setActionLoading(true);
        try {
            await signInWithGoogle();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Error al iniciar sesión con Google';
            // Ignorar cancelación del popup por el usuario
            if (!msg.includes('popup-closed-by-user')) {
                setError(msg);
            }
        } finally {
            setActionLoading(false);
        }
    }, []);

    // ── Logout ───────────────────────────────────
    const logout = useCallback(async () => {
        setError(null);
        setActionLoading(true);
        try {
            await signOut();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al cerrar sesión');
        } finally {
            setActionLoading(false);
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { user, loading, actionLoading, error, loginWithGoogle, logout, clearError };
}
