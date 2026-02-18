/**
 * @file src/constants/theme.ts
 * @description Design system — Impostor GameWeb Brand DNA
 * Paleta: Negro absoluto + Rojo Sangre + Glassmorphism
 */

// ─────────────────────────────────────────────
// Brand Color Palette
// ─────────────────────────────────────────────

export const Colors = {
    // Brand Reds
    primary: '#960018',          // Rojo Vibrante
    primaryDark: '#3c0000',      // Rojo Sangre Oscuro
    primaryLight: '#ff8478',     // Coral Suave
    primaryGlow: 'rgba(150, 0, 24, 0.6)',

    // Backgrounds
    background: '#000000',       // Negro absoluto
    backgroundDeep: '#0a0000',
    surface: 'rgba(255, 255, 255, 0.05)',   // Glass surface
    surfaceElevated: 'rgba(255, 255, 255, 0.08)',

    // Glass borders
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    glassBorderTop: 'rgba(255, 255, 255, 0.2)',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textDisabled: 'rgba(255, 255, 255, 0.3)',

    // Semantic
    success: '#4CAF50',
    error: '#FF4444',
    google: '#FFFFFF',

    // Utility
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0,0,0,0.7)',
} as const;

// ─────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────

export const FontFamily = {
    drowner: 'Drowner',          // Display / Títulos
    inter: 'Inter_400Regular',
    interMedium: 'Inter_500Medium',
    interBold: 'Inter_700Bold',
    mono: 'monospace',
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 28,
    display: 40,
    hero: 56,
} as const;

// ─────────────────────────────────────────────
// Spacing (8pt grid)
// ─────────────────────────────────────────────

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;

// ─────────────────────────────────────────────
// Border Radius
// ─────────────────────────────────────────────

export const Radius = {
    sm: 8,
    md: 14,
    lg: 22,
    xl: 32,
    full: 9999,
} as const;

// ─────────────────────────────────────────────
// Shadows / Glows
// ─────────────────────────────────────────────

export const Shadow = {
    sm: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    md: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 8,
    },
    lg: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 30,
        elevation: 16,
    },
} as const;

// ─────────────────────────────────────────────
// Animation Durations (ms)
// ─────────────────────────────────────────────

export const Duration = {
    fast: 150,
    normal: 300,
    slow: 600,
    reveal: 1200,
} as const;
