/**
 * @file src/components/GlassCard.tsx
 * @description Glassmorphism card — superficie translúcida sobre fondo rojo/negro.
 * Replica el efecto de cristal con borde de luz superior e izquierdo.
 */

import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Radius } from '@constants/theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    /** Intensidad del efecto glass: 'subtle' | 'medium' | 'strong' */
    intensity?: 'subtle' | 'medium' | 'strong';
}

/**
 * Contenedor glassmorphism con borde de luz y fondo translúcido con desenfoque.
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
    const blurIntensity = intensity === 'subtle' ? 10 : intensity === 'medium' ? 25 : 45;

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                },
                style,
            ]}
        >
            <BlurView
                intensity={blurIntensity}
                tint="dark"
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` },
                ]}
            />
            {/* Borde de luz superior (reflejo de cristal) */}
            <View style={styles.lightBorderTop} />
            {/* Borde de luz izquierdo */}
            <View style={styles.lightBorderLeft} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    content: {
        zIndex: 2,
    },
});
