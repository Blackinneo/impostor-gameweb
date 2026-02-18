/**
 * @file src/screens/LoginScreen.tsx
 * @description Pantalla de Login/Register — PREMIUM Glassmorphic & Motion Design.
 * Sigue estrictamente la identidad visual "Blood & Glass".
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
 * Componente para el efecto de revelado "escaneo" del título DROWNER.
 */
const DrownerReveal: React.FC<{ text: string; style?: any }> = ({ text, style }) => {
    const animatedValues = useRef(text.split('').map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animations = animatedValues.map((anim, i) => {
            return Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                delay: i * 100,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            });
        });
        Animated.stagger(50, animations).start();
    }, []);

    return (
        <View style={[styles.revealContainer, style]}>
            {text.split('').map((char, i) => (
                <Animated.Text
                    key={i}
                    style={[
                        styles.drownerChar,
                        {
                            opacity: animatedValues[i],
                            transform: [
                                {
                                    translateY: animatedValues[i].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [10, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {char}
                </Animated.Text>
            ))}
        </View>
    );
};

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
    const slideAnim = useRef(new Animated.Value(30)).current;
    const glowIntensity = useRef(new Animated.Value(0)).current;

    // Background Orbs
    const orb1Pos = useRef(new Animated.ValueXY({ x: -SCREEN_W * 0.2, y: -SCREEN_H * 0.1 })).current;
    const orb2Pos = useRef(new Animated.ValueXY({ x: SCREEN_W * 0.5, y: SCREEN_H * 0.6 })).current;

    useEffect(() => {
        // Entrada suave
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
        ]).start();

        // Animación de orbs (Efecto Floating)
        const animateOrb = (pos: Animated.ValueXY, toX: number, toY: number, duration: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pos, {
                        toValue: { x: toX, y: toY },
                        duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pos, {
                        toValue: { x: -toX * 0.5, y: -toY * 0.5 },
                        duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateOrb(orb1Pos, 20, 30, 6000);
        animateOrb(orb2Pos, -30, -20, 8000);
    }, []);

    const toggleMode = () => {
        setMode(prev => prev === 'login' ? 'register' : 'login');
        clearError();
    };

    const handleAuth = async () => {
        // Al presionar, intensificamos el resplandor momentáneamente
        Animated.sequence([
            Animated.timing(glowIntensity, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(glowIntensity, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]).start();

        if (mode === 'login') {
            await loginWithEmail(email, password);
        } else {
            await registerWithEmail(email, password, displayName);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* ── Background: Blood & Glass DNA ── */}
            <View style={styles.bgContainer}>
                <View style={styles.blackBase} />

                {/* Glow Central */}
                <Animated.View
                    style={[
                        styles.centralGlow,
                        {
                            opacity: glowIntensity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.15, 0.4],
                            }),
                        }
                    ]}
                />

                {/* Orb 1: Dark Blood */}
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orb1,
                        { transform: orb1Pos.getTranslateTransform() }
                    ]}
                />

                {/* Orb 2: Vibrant Red */}
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orb2,
                        { transform: orb2Pos.getTranslateTransform() }
                    ]}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        {/* Header Section */}
                        <View style={styles.header}>
                            <DrownerReveal text="IMPOSTOR" style={styles.title} />
                            <Text style={styles.subtitle}>GAME SESSION</Text>
                        </View>

                        {/* Main Glass Card */}
                        <GlassCard intensity="medium" style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>
                                    {mode === 'login' ? 'BIENVENIDO' : 'UNIRSE'}
                                </Text>
                                <View style={styles.accentLine} />
                            </View>

                            {error && (
                                <View style={styles.errorBox}>
                                    <Text style={styles.errorText}>⚡ {error}</Text>
                                </View>
                            )}

                            <View style={styles.form}>
                                {mode === 'register' && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>NICKNAME</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Tu nombre de código..."
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            value={displayName}
                                            onChangeText={setDisplayName}
                                        />
                                    </View>
                                )}

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>EMAIL</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="agente@impostor.com"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>PASSWORD</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            {/* Auth Button */}
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.8}
                                onPress={handleAuth}
                                disabled={actionLoading}
                            >
                                {actionLoading ? (
                                    <ActivityIndicator color={Colors.white} />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        {mode === 'login' ? 'INICIAR MISIÓN' : 'COMPLETAR REGISTRO'}
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleMode} style={styles.toggle}>
                                <Text style={styles.toggleText}>
                                    {mode === 'login'
                                        ? '¿NUEVO AGENTE? CREAR CUENTA'
                                        : '¿YA TIENES ACCESO? LOGUEARSE'}
                                </Text>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.dividerText}>SECURE ACCESS</Text>
                                <View style={styles.line} />
                            </View>

                            {/* Google Button */}
                            <TouchableOpacity
                                style={styles.googleBtn}
                                onPress={loginWithGoogle}
                                disabled={actionLoading}
                            >
                                <Text style={styles.googleText}>CONTINUAR CON GOOGLE</Text>
                            </TouchableOpacity>
                        </GlassCard>

                        <Text style={styles.footerText}>
                            SISTEMA ENCRIPTADO © 2026 IMPOSTOR LABS
                        </Text>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    bgContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
    },
    blackBase: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
    },
    centralGlow: {
        position: 'absolute',
        width: SCREEN_W * 1.5,
        height: SCREEN_W * 1.5,
        borderRadius: Radius.full,
        backgroundColor: Colors.primary,
        top: SCREEN_H * 0.1,
        left: -SCREEN_W * 0.25,
        opacity: 0.15,
        transform: [{ scale: 1.2 }],
    },
    orb: {
        position: 'absolute',
        borderRadius: Radius.full,
    },
    orb1: {
        width: SCREEN_W * 0.8,
        height: SCREEN_W * 0.8,
        backgroundColor: '#3c0000',
        top: -100,
        left: -50,
        opacity: 0.6,
    },
    orb2: {
        width: SCREEN_W * 0.6,
        height: SCREEN_W * 0.6,
        backgroundColor: Colors.primary,
        bottom: 100,
        right: -50,
        opacity: 0.3,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: Spacing.xl,
    },
    content: {
        paddingHorizontal: Spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    revealContainer: {
        flexDirection: 'row',
    },
    drownerChar: {
        fontSize: 52,
        fontFamily: FontFamily.drowner,
        color: Colors.textPrimary,
        textShadowColor: Colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    title: {
        marginBottom: -Spacing.xs,
    },
    subtitle: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.interBold,
        color: Colors.primaryLight,
        letterSpacing: 4,
        marginTop: Spacing.xs,
    },
    card: {
        padding: Spacing.lg,
        borderRadius: 24,
    },
    cardHeader: {
        marginBottom: Spacing.lg,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontFamily: FontFamily.interBold,
        color: Colors.white,
        letterSpacing: 2,
    },
    accentLine: {
        width: 40,
        height: 3,
        backgroundColor: Colors.primary,
        marginTop: 4,
    },
    errorBox: {
        backgroundColor: 'rgba(150, 0, 24, 0.15)',
        padding: Spacing.md,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: 'rgba(150, 0, 24, 0.3)',
        marginBottom: Spacing.lg,
    },
    errorText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontFamily: FontFamily.inter,
    },
    form: {
        gap: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 10,
        fontFamily: FontFamily.interBold,
        color: Colors.textSecondary,
        letterSpacing: 1.5,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: Radius.md,
        paddingVertical: 14,
        paddingHorizontal: 16,
        color: Colors.white,
        fontFamily: FontFamily.inter,
        fontSize: FontSize.md,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: Radius.md,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.md,
        letterSpacing: 1.5,
    },
    toggle: {
        marginTop: Spacing.lg,
        alignItems: 'center',
    },
    toggleText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 11,
        fontFamily: FontFamily.interBold,
        letterSpacing: 1,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.xl,
        gap: Spacing.md,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    dividerText: {
        fontSize: 9,
        fontFamily: FontFamily.interBold,
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: 2,
    },
    googleBtn: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 14,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    googleText: {
        color: Colors.white,
        fontFamily: FontFamily.interBold,
        fontSize: 12,
        letterSpacing: 1,
    },
    footerText: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: 10,
        fontFamily: FontFamily.inter,
        marginTop: Spacing.xxl,
        letterSpacing: 1,
    },
});
