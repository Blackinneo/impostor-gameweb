/**
 * @file src/screens/LoginScreen.tsx
 * @description Pantalla de Login con Google — Identidad Visual Impostor GameWeb.
 * Glassmorphism + fondo rojo/negro + animaciones premium + fuente DROWNER.
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Animated,
    Easing,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Platform,
} from 'react-native';
import { GlassCard } from '@components/GlassCard';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { Colors, FontFamily, FontSize, Spacing, Radius, Duration } from '@constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Pantalla principal de autenticación.
 * Muestra el logo DROWNER, fondo animado con focos rojos y botón Google.
 */
export const LoginScreen: React.FC = () => {
    const { loginWithGoogle, actionLoading, error } = useFirebaseAuth();

    // ── Animaciones ──────────────────────────────
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const glowAnim = useRef(new Animated.Value(0.4)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const orb1Anim = useRef(new Animated.Value(0)).current;
    const orb2Anim = useRef(new Animated.Value(0)).current;

    // Reveal de entrada
    useEffect(() => {
        Animated.sequence([
            Animated.delay(200),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: Duration.reveal,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: Duration.reveal,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // Glow pulsante del fondo
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 0.8,
                    duration: 3000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0.4,
                    duration: 3000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Orbs flotantes
        Animated.loop(
            Animated.sequence([
                Animated.timing(orb1Anim, {
                    toValue: -20,
                    duration: 4000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(orb1Anim, {
                    toValue: 20,
                    duration: 4000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(orb2Anim, {
                    toValue: 15,
                    duration: 5000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(orb2Anim, {
                    toValue: -15,
                    duration: 5000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Pulse del botón al presionar
    const handlePressIn = () => {
        Animated.spring(pulseAnim, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(pulseAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* ── Fondo: orbs rojos animados ── */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {/* Orb principal — centro-superior */}
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbMain,
                        { opacity: glowAnim, transform: [{ translateY: orb1Anim }] },
                    ]}
                />
                {/* Orb secundario — inferior-derecho */}
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbSecondary,
                        { opacity: glowAnim, transform: [{ translateY: orb2Anim }] },
                    ]}
                />
                {/* Orb terciario — superior-izquierdo */}
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbTertiary,
                        { opacity: glowAnim },
                    ]}
                />
            </View>

            {/* ── Contenido principal ── */}
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                {/* ── Logo / Título ── */}
                <View style={styles.logoSection}>
                    {/* Ícono del juego */}
                    <View style={styles.iconWrapper}>
                        <GlassCard intensity="strong" style={styles.iconCard}>
                            <Text style={styles.iconEmoji}>🕵️</Text>
                        </GlassCard>
                    </View>

                    {/* Título DROWNER */}
                    <Text style={styles.title}>IMPOSTOR</Text>
                    <Text style={styles.subtitle}>GAME</Text>

                    {/* Tagline */}
                    <Text style={styles.tagline}>¿Quién es el impostor entre ustedes?</Text>
                </View>

                {/* ── Card de Login ── */}
                <GlassCard intensity="medium" style={styles.loginCard}>
                    <Text style={styles.loginTitle}>Iniciar Sesión</Text>
                    <Text style={styles.loginDesc}>
                        Usá tu cuenta de Google para entrar al juego
                    </Text>

                    {/* Error */}
                    {error ? (
                        <View style={styles.errorBadge}>
                            <Text style={styles.errorText}>⚠️ {error}</Text>
                        </View>
                    ) : null}

                    {/* Botón Google */}
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <TouchableOpacity
                            style={[styles.googleButton, actionLoading && styles.googleButtonLoading]}
                            onPress={loginWithGoogle}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            disabled={actionLoading}
                            activeOpacity={1}
                        >
                            {actionLoading ? (
                                <ActivityIndicator color={Colors.background} size="small" />
                            ) : (
                                <>
                                    {/* Google Icon SVG-like */}
                                    <View style={styles.googleIconWrapper}>
                                        <Text style={styles.googleIconText}>G</Text>
                                    </View>
                                    <Text style={styles.googleButtonText}>Continuar con Google</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Seguro y privado</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Features */}
                    <View style={styles.features}>
                        {[
                            { icon: '🔒', text: 'Sin contraseñas' },
                            { icon: '⚡', text: 'Acceso instantáneo' },
                            { icon: '🎮', text: 'Perfil de jugador' },
                        ].map((f) => (
                            <View key={f.text} style={styles.featureItem}>
                                <Text style={styles.featureIcon}>{f.icon}</Text>
                                <Text style={styles.featureText}>{f.text}</Text>
                            </View>
                        ))}
                    </View>
                </GlassCard>

                {/* ── Footer ── */}
                <Text style={styles.footer}>
                    Al continuar aceptás los Términos de Servicio
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    // ── Orbs de fondo ──
    orb: {
        position: 'absolute',
        borderRadius: Radius.full,
    },
    orbMain: {
        width: SCREEN_W * 0.9,
        height: SCREEN_W * 0.9,
        top: -SCREEN_W * 0.3,
        left: -SCREEN_W * 0.2,
        backgroundColor: Colors.primaryDark,
        // Blur simulado con opacidad en capas
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 80,
        elevation: 0,
    },
    orbSecondary: {
        width: SCREEN_W * 0.7,
        height: SCREEN_W * 0.7,
        bottom: SCREEN_H * 0.05,
        right: -SCREEN_W * 0.2,
        backgroundColor: '#2a0000',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 60,
        elevation: 0,
    },
    orbTertiary: {
        width: SCREEN_W * 0.4,
        height: SCREEN_W * 0.4,
        top: SCREEN_H * 0.35,
        left: -SCREEN_W * 0.1,
        backgroundColor: '#1a0000',
        shadowColor: Colors.primaryLight,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 40,
        elevation: 0,
    },

    // ── Layout ──
    container: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
        justifyContent: 'space-between',
    },

    // ── Logo Section ──
    logoSection: {
        alignItems: 'center',
        paddingTop: Spacing.xl,
    },
    iconWrapper: {
        marginBottom: Spacing.lg,
    },
    iconCard: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    iconEmoji: {
        fontSize: 42,
        textAlign: 'center',
        lineHeight: 80,
    },
    title: {
        fontSize: FontSize.hero,
        fontFamily: FontFamily.drowner,
        color: Colors.textPrimary,
        letterSpacing: 8,
        textAlign: 'center',
        // Glow rojo en el texto
        textShadowColor: Colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    subtitle: {
        fontSize: FontSize.display,
        fontFamily: FontFamily.drowner,
        color: Colors.primaryLight,
        letterSpacing: 12,
        textAlign: 'center',
        marginTop: -8,
        textShadowColor: Colors.primaryLight,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    tagline: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.inter,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.md,
        letterSpacing: 0.5,
    },

    // ── Login Card ──
    loginCard: {
        padding: Spacing.xl,
        marginVertical: Spacing.lg,
    },
    loginTitle: {
        fontSize: FontSize.xl,
        fontFamily: FontFamily.interBold,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    loginDesc: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.inter,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
        lineHeight: FontSize.sm * 1.6,
    },

    // ── Error ──
    errorBadge: {
        backgroundColor: 'rgba(255, 68, 68, 0.15)',
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 68, 68, 0.3)',
        padding: Spacing.sm,
        marginBottom: Spacing.md,
    },
    errorText: {
        color: Colors.error,
        fontSize: FontSize.sm,
        textAlign: 'center',
        fontFamily: FontFamily.inter,
    },

    // ── Google Button ──
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        minHeight: 54,
        // Glow rojo al presionar
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        gap: Spacing.sm,
    },
    googleButtonLoading: {
        opacity: 0.8,
    },
    googleIconWrapper: {
        width: 24,
        height: 24,
        borderRadius: Radius.full,
        backgroundColor: '#4285F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIconText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '900',
        lineHeight: 24,
    },
    googleButtonText: {
        fontSize: FontSize.md,
        fontFamily: FontFamily.interBold,
        color: '#1a1a1a',
        letterSpacing: 0.3,
    },

    // ── Divider ──
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
        gap: Spacing.sm,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.glassBorder,
    },
    dividerText: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.inter,
        color: Colors.textDisabled,
        letterSpacing: 0.5,
    },

    // ── Features ──
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    featureItem: {
        alignItems: 'center',
        gap: Spacing.xs,
    },
    featureIcon: {
        fontSize: 20,
    },
    featureText: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.inter,
        color: Colors.textSecondary,
        textAlign: 'center',
    },

    // ── Footer ──
    footer: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.inter,
        color: Colors.textDisabled,
        textAlign: 'center',
    },
});
