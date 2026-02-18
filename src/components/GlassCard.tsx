/**
 * @file src/components/GlassCard.tsx
 * @description Glassmorphism card — superficie translúcida sobre fondo rojo/negro.
 * Replica el efecto de cristal con borde de luz superior e izquierdo.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius } from '@constants/theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    /** Intensidad del efecto glass: 'subtle' | 'medium' | 'strong' */
    intensity?: 'subtle' | 'medium' | 'strong';
}

/**
 * Contenedor glassmorphism con borde de luz y fondo translúcido.
 *
 * @example
 * <GlassCard intensity="medium">
 *   <Text>Contenido</Text>
 * </GlassCard>
 */
export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    intensity = 'medium',
}) => {
    const bgOpacity = intensity === 'subtle' ? 0.03 : intensity === 'medium' ? 0.06 : 0.1;
    const borderOpacity = intensity === 'subtle' ? 0.1 : intensity === 'medium' ? 0.18 : 0.28;

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                },
                style,
            ]}
        >
            {/* Borde de luz superior (reflejo de cristal) */}
            <View style={styles.lightBorderTop} />
            {/* Borde de luz izquierdo */}
            <View style={styles.lightBorderLeft} />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: Radius.lg,
        borderWidth: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    lightBorderTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        zIndex: 1,
    },
    lightBorderLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        zIndex: 1,
    },
});
