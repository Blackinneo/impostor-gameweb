/**
 * @file src/screens/LoginScreen.tsx
 * @description Pantalla de Login/Register — Identidad Visual Impostor GameWeb.
 * Glassmorphism + fondo rojo/negro + animaciones premium + fuente DROWNER.
 */

import React, { useEffect, useRef, useState } from 'react';
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
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { GlassCard } from '@components/GlassCard';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { Colors, FontFamily, FontSize, Spacing, Radius, Duration } from '@constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/**
 * Pantalla principal de autenticación.
 * Gestiona Login y Registro con Google o Email/Password.
 */
export const LoginScreen: React.FC = () => {
    const {
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        actionLoading,
        error,
        clearError
    } = useFirebaseAuth();

    // ── Estado ──────────────────────────────────
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

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

    const toggleMode = () => {
        const nextMode = mode === 'login' ? 'register' : 'login';
        clearError();
        setMode(nextMode);
    };

    const handleAuth = async () => {
        if (mode === 'login') {
            await loginWithEmail(email, password);
        } else {
            await registerWithEmail(email, password, displayName);
        }
    };

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
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbMain,
                        { opacity: glowAnim, transform: [{ translateY: orb1Anim }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbSecondary,
                        { opacity: glowAnim, transform: [{ translateY: orb2Anim }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbTertiary,
                        { opacity: glowAnim },
                    ]}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
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
                            <View style={styles.iconWrapper}>
                                <GlassCard intensity="strong" style={styles.iconCard}>
                                    <Text style={styles.iconEmoji}>🕵️</Text>
                                </GlassCard>
                            </View>

                            <Text style={styles.title}>IMPOSTOR</Text>
                            <Text style={styles.subtitle}>GAME</Text>
                        </View>

                        {/* ── Card de Auth ── */}
                        <GlassCard intensity="medium" style={styles.loginCard}>
                            <Text style={styles.loginTitle}>
                                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                            </Text>
                            <Text style={styles.loginDesc}>
                                {mode === 'login'
                                    ? 'Entrá para descubrir al impostor'
                                    : 'Unite a la partida secreta'}
                            </Text>

                            {/* Error */}
                            {error ? (
                                <View style={styles.errorBadge}>
                                    <Text style={styles.errorText}>⚠️ {error}</Text>
                                </View>
                            ) : null}

                            {/* Inputs */}
                            <View style={styles.inputsWrapper}>
                                {mode === 'register' && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nombre de Jugador"
                                        placeholderTextColor={Colors.textDisabled}
                                        value={displayName}
                                        onChangeText={setDisplayName}
                                        autoCapitalize="words"
                                    />
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor={Colors.textDisabled}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Contraseña"
                                    placeholderTextColor={Colors.textDisabled}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            {/* Botón Principal */}
                            <Animated.View style={{ transform: [{ scale: pulseAnim }], marginTop: Spacing.md }}>
                                <TouchableOpacity
                                    style={[styles.primaryButton, actionLoading && styles.buttonLoading]}
                                    onPress={handleAuth}
                                    onPressIn={handlePressIn}
                                    onPressOut={handlePressOut}
                                    disabled={actionLoading}
                                    activeOpacity={1}
                                >
                                    {actionLoading ? (
                                        <ActivityIndicator color={Colors.white} size="small" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>
                                            {mode === 'login' ? 'ENTRAR' : 'REGISTRARME'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>

                            <TouchableOpacity onPress={toggleMode} style={styles.modeToggle}>
                                <Text style={styles.modeToggleText}>
                                    {mode === 'login'
                                        ? '¿No tenés cuenta? Registrate'
                                        : '¿Ya tenés cuenta? Iniciá sesión'}
                                </Text>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>o también</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Botón Google */}
                            <TouchableOpacity
                                style={styles.googleButton}
                                onPress={loginWithGoogle}
                                disabled={actionLoading}
                            >
                                <View style={styles.googleIconWrapper}>
                                    <View style={styles.googleG}>
                                        <Text style={styles.googleGText}>G</Text>
                                    </View>
                                </View>
                                <Text style={styles.googleButtonText}>Continuar con Google</Text>
                            </TouchableOpacity>
                        </GlassCard>

                        {/* ── Footer ── */}
                        <Text style={styles.footer}>
                            Hecho con ❤️ por el equipo de Impostor
                        </Text>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: Spacing.xl,
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
        justifyContent: 'center',
    },

    // ── Logo Section ──
    logoSection: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    iconWrapper: {
        marginBottom: Spacing.md,
    },
    iconCard: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    iconEmoji: {
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 70,
    },
    title: {
        fontSize: FontSize.xxl * 1.5,
        fontFamily: FontFamily.drowner,
        color: Colors.textPrimary,
        letterSpacing: 8,
        textAlign: 'center',
        textShadowColor: Colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    subtitle: {
        fontSize: FontSize.xl * 1.5,
        fontFamily: FontFamily.drowner,
        color: Colors.primaryLight,
        letterSpacing: 12,
        textAlign: 'center',
        marginTop: -Spacing.xs,
        textShadowColor: Colors.primaryLight,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },

    // ── Login Card ──
    loginCard: {
        padding: Spacing.lg,
        marginVertical: Spacing.md,
    },
    loginTitle: {
        fontSize: FontSize.lg,
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

    // ── Inputs ──
    inputsWrapper: {
        gap: Spacing.md,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
        color: Colors.textPrimary,
        fontFamily: FontFamily.inter,
        fontSize: FontSize.md,
    },

    // ── Buttons ──
    primaryButton: {
        backgroundColor: Colors.primary,
        borderRadius: Radius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    primaryButtonText: {
        color: Colors.white,
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.md,
        letterSpacing: 2,
    },
    buttonLoading: {
        opacity: 0.7,
    },
    modeToggle: {
        marginTop: Spacing.md,
        alignItems: 'center',
    },
    modeToggleText: {
        color: Colors.textSecondary,
        fontFamily: FontFamily.inter,
        fontSize: FontSize.sm,
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
        color: Colors.textDisabled,
        fontSize: FontSize.xs,
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
        gap: Spacing.md,
    },
    googleIconWrapper: {
        width: 24,
        height: 24,
    },
    googleG: {
        flex: 1,
        backgroundColor: '#4285F4',
        borderRadius: Radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleGText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    googleButtonText: {
        color: '#1a1a1a',
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.md,
    },

    // ── Footer ──
    footer: {
        textAlign: 'center',
        color: Colors.textDisabled,
        fontSize: FontSize.xs,
        fontFamily: FontFamily.inter,
        marginTop: Spacing.lg,
    },
});
