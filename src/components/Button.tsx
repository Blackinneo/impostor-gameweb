/**
 * @file src/components/Button.tsx
 * @description Reusable Button component following Apple HIG & Material Design 3.
 * Supports primary, secondary, ghost, and danger variants with loading state.
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing, Shadow, Duration } from '@constants/theme';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    /** Button label text */
    label: string;
    /** Callback when button is pressed */
    onPress: () => void;
    /** Visual variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Shows a loading spinner and disables interaction */
    loading?: boolean;
    /** Disables the button */
    disabled?: boolean;
    /** Additional container styles */
    style?: ViewStyle;
    /** Additional text styles */
    textStyle?: TextStyle;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Primary action button for the application.
 *
 * @example
 * <Button label="Start Game" onPress={handleStart} variant="primary" />
 */
export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.75}
            style={[
                styles.base,
                styles[variant],
                styles[`size_${size}`],
                isDisabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'ghost' ? Colors.primary : Colors.white}
                />
            ) : (
                <Text style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`], textStyle]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Radius.md,
        ...Shadow.md,
    },

    // Variants
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    ghost: {
        backgroundColor: Colors.transparent,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    danger: {
        backgroundColor: Colors.error,
    },

    // Sizes
    size_sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 36 },
    size_md: { paddingVertical: Spacing.sm + 2, paddingHorizontal: Spacing.lg, minHeight: 48 },
    size_lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 56 },

    // Disabled
    disabled: { opacity: 0.45 },

    // Labels
    label: {
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    label_primary: { color: Colors.white },
    label_secondary: { color: Colors.white },
    label_ghost: { color: Colors.primary },
    label_danger: { color: Colors.white },

    labelSize_sm: { fontSize: FontSize.sm },
    labelSize_md: { fontSize: FontSize.md },
    labelSize_lg: { fontSize: FontSize.lg },
});
