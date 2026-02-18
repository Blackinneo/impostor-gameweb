/**
 * @file src/services/firebase.ts
 * @description Firebase client initialization for Impostor GameWeb.
 *
 * Setup:
 * 1. Creá un proyecto en https://console.firebase.google.com
 * 2. Habilitá Authentication → Google provider
 * 3. Copiá las credenciales a tu archivo .env
 *
 * Variables requeridas en .env:
 *   EXPO_PUBLIC_FIREBASE_API_KEY
 *   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   EXPO_PUBLIC_FIREBASE_PROJECT_ID
 *   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   EXPO_PUBLIC_FIREBASE_APP_ID
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// ─────────────────────────────────────────────
// Firebase Config (from env vars)
// ─────────────────────────────────────────────

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
};

// ─────────────────────────────────────────────
// Initialize (singleton — safe for hot reload)
// ─────────────────────────────────────────────

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/** Firebase Auth instance */
export const auth = getAuth(app);

/** Firestore database instance */
export const db = getFirestore(app);

/** Google Auth Provider */
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// ─────────────────────────────────────────────
// Auth Actions
// ─────────────────────────────────────────────

/**
 * Sign in with Google.
 * Uses popup on web, redirect on native (Expo).
 * @returns {Promise<User | null>} Authenticated Firebase user
 */
export async function signInWithGoogle(): Promise<User | null> {
    try {
        if (Platform.OS === 'web') {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } else {
            // On native, use redirect flow (requires expo-auth-session for full native)
            await signInWithRedirect(auth, googleProvider);
            const result = await getRedirectResult(auth);
            return result?.user ?? null;
        }
    } catch (error) {
        console.error('[Firebase] signInWithGoogle error:', error);
        throw error;
    }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
    await firebaseSignOut(auth);
}

/**
 * Subscribe to auth state changes.
 * @param callback - Called with User or null on every auth change
 * @returns Unsubscribe function
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
}

export type { User };
