/**
 * @file src/screens/AuthScreen.tsx
 * @description Authentication screen — sign in / sign up with email or Google.
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { useAuth } from '@hooks/useAuth';
import { Colors, FontSize, Spacing, Radius } from '@constants/theme';

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Authentication screen with sign-in and sign-up modes.
 */
export const AuthScreen: React.FC = () => {
    const { signIn, signUp, loading, error, clearError } = useAuth();

    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = async () => {
        clearError();
        if (mode === 'signin') {
            await signIn(email, password);
        } else {
            await signUp(email, password, displayName);
        }
    };

    const toggleMode = () => {
        clearError();
        setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* ── Header ── */}
                    <View style={styles.header}>
                        <Text style={styles.emoji}>🕵️</Text>
                        <Text style={styles.title}>
                            {mode === 'signin' ? 'Welcome back' : 'Join the game'}
                        </Text>
                        <Text style={styles.subtitle}>
                            {mode === 'signin'
                                ? 'Sign in to continue playing'
                                : 'Create your account to start'}
                        </Text>
                    </View>

                    {/* ── Form ── */}
                    <Card style={styles.card}>
                        {mode === 'signup' && (
                            <TextInput
                                style={styles.input}
                                placeholder="Display Name"
                                placeholderTextColor={Colors.textDisabled}
                                value={displayName}
                                onChangeText={setDisplayName}
                                autoCapitalize="words"
                                autoCorrect={false}
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
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={Colors.textDisabled}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        {error ? <Text style={styles.error}>{error}</Text> : null}

                        <Button
                            label={mode === 'signin' ? 'Sign In' : 'Create Account'}
                            onPress={handleSubmit}
                            variant="primary"
                            size="lg"
                            loading={loading}
                            style={styles.button}
                        />

                        <TouchableOpacity onPress={toggleMode} style={styles.toggle}>
                            <Text style={styles.toggleText}>
                                {mode === 'signin'
                                    ? "Don't have an account? Sign up"
                                    : 'Already have an account? Sign in'}
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },
    flex: { flex: 1 },
    container: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxxl,
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    emoji: { fontSize: 56, marginBottom: Spacing.sm },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    card: { gap: Spacing.sm },
    input: {
        backgroundColor: Colors.surfaceElevated,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        paddingVertical: Spacing.sm + 2,
        paddingHorizontal: Spacing.md,
    },
    error: {
        color: Colors.error,
        fontSize: FontSize.sm,
        textAlign: 'center',
    },
    button: { marginTop: Spacing.xs },
    toggle: { alignItems: 'center', paddingTop: Spacing.sm },
    toggleText: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: '600' },
});
