/**
 * @file src/screens/HomeScreen.tsx
 * @description Main home screen for Impostor GameWeb.
 * Entry point after authentication — allows creating or joining a game session.
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Colors, FontSize, Spacing, Radius, FontFamily } from '@constants/theme';
import { generateGameCode } from '@utils/index';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Home screen — lets players create a new game or join an existing one.
 */
export const HomeScreen: React.FC = () => {
    const { logout, user } = useFirebaseAuth();
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateGame = async () => {
        setLoading(true);
        const code = generateGameCode();
        // TODO: Create game session in Firebase and navigate to Lobby
        console.log('Creating game with code:', code);
        setLoading(false);
    };

    const handleJoinGame = async () => {
        if (!joinCode.trim()) return;
        setLoading(true);
        // TODO: Validate code and navigate to Lobby
        console.log('Joining game with code:', joinCode.toUpperCase());
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Header ── */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                        <Text style={styles.logoutText}>Salir</Text>
                    </TouchableOpacity>
                    <Text style={styles.emoji}>🕵️</Text>
                    <Text style={styles.title}>IMPOSTOR</Text>
                    <Text style={styles.welcome}>Hola, {user?.displayName || 'Agente'}</Text>
                    <Text style={styles.subtitle}>¿Quién es el impostor entre nosotros?</Text>
                </View>

                {/* ── Create Game ── */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Host a Game</Text>
                    <Text style={styles.cardDesc}>
                        Create a new session and invite your friends with a code.
                    </Text>
                    <Button
                        label="Create Game"
                        onPress={handleCreateGame}
                        variant="primary"
                        size="lg"
                        loading={loading}
                        style={styles.button}
                    />
                </Card>

                {/* ── Join Game ── */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Join a Game</Text>
                    <Text style={styles.cardDesc}>
                        Enter the 6-character code shared by your host.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ABC123"
                        placeholderTextColor={Colors.textDisabled}
                        value={joinCode}
                        onChangeText={(t) => setJoinCode(t.toUpperCase())}
                        maxLength={6}
                        autoCapitalize="characters"
                        autoCorrect={false}
                    />
                    <Button
                        label="Join Game"
                        onPress={handleJoinGame}
                        variant="secondary"
                        size="lg"
                        loading={loading}
                        disabled={joinCode.length < 6}
                        style={styles.button}
                    />
                </Card>
            </ScrollView>
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
    container: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
        paddingTop: Spacing.xl,
        position: 'relative',
        width: '100%',
    },
    logoutBtn: {
        position: 'absolute',
        top: Spacing.md,
        right: 0,
        padding: Spacing.sm,
    },
    logoutText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontFamily: FontFamily.interBold,
    },
    emoji: {
        fontSize: 64,
        marginBottom: Spacing.sm,
    },
    title: {
        fontSize: FontSize.hero,
        fontFamily: FontFamily.drowner,
        color: Colors.textPrimary,
        letterSpacing: 4,
    },
    welcome: {
        fontSize: FontSize.lg,
        fontFamily: FontFamily.interBold,
        color: Colors.textPrimary,
        marginTop: Spacing.md,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        textAlign: 'center',
    },
    card: {
        marginBottom: Spacing.lg,
    },
    cardTitle: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    cardDesc: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        lineHeight: FontSize.sm * 1.5,
    },
    input: {
        backgroundColor: Colors.surfaceElevated,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: '700',
        letterSpacing: 6,
        textAlign: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
    },
    button: {
        width: '100%',
    },
});
