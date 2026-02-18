/**
 * @file src/components/Card.tsx
 * @description Reusable Card container with glassmorphism effect.
 * Use this as a surface for any grouped content.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Shadow } from '@constants/theme';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface CardProps {
    /** Card content */
    children: React.ReactNode;
    /** Additional container styles */
    style?: ViewStyle;
    /** Elevation level — affects shadow intensity */
    elevation?: 'sm' | 'md' | 'lg';
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Surface card component with dark glassmorphism styling.
 *
 * @example
 * <Card elevation="md">
 *   <Text>Game info here</Text>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
    children,
    style,
    elevation = 'md',
}) => (
    <View style={[styles.card, Shadow[elevation], style]}>
        {children}
    </View>
);

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
});
