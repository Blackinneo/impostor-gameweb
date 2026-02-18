/**
 * @file src/constants/theme.ts
 * @description Design system tokens for Impostor GameWeb.
 * Follows Apple HIG and Material Design 3 principles.
 * All UI components should reference these values — never hardcode styles.
 */

// ─────────────────────────────────────────────
// Color Palette
// ─────────────────────────────────────────────

export const Colors = {
    // Brand
    primary: '#6C63FF',       // Electric violet — main accent
    primaryDark: '#4B44CC',
    primaryLight: '#9D97FF',

    secondary: '#FF6584',     // Coral pink — secondary accent
    secondaryDark: '#CC4D67',

    // Backgrounds
    background: '#0D0D1A',    // Deep space dark
    surface: '#1A1A2E',       // Card / surface
    surfaceElevated: '#252540',

    // Text
    textPrimary: '#F0F0FF',
    textSecondary: '#A0A0C0',
    textDisabled: '#555570',

    // Semantic
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',

    // Utility
    border: '#2E2E4A',
    overlay: 'rgba(0, 0, 0, 0.6)',
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#000000',
} as const;

// ─────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────

export const FontFamily = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'monospace',
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 32,
    hero: 40,
} as const;

export const LineHeight = {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
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
    sm: 6,
    md: 12,
    lg: 20,
    xl: 28,
    full: 9999,
} as const;

// ─────────────────────────────────────────────
// Shadows
// ─────────────────────────────────────────────

export const Shadow = {
    sm: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    lg: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 12,
    },
} as const;

// ─────────────────────────────────────────────
// Animation Durations (ms)
// ─────────────────────────────────────────────

export const Duration = {
    fast: 150,
    normal: 300,
    slow: 500,
} as const;
