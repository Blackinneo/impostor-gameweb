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
} from 'react-native';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Colors, FontSize, Spacing, Radius, FontFamily } from '@constants/theme';
import { generateGameCode } from '@utils/index';

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Home screen — lets players create a new game or join an existing one.
 */
export const HomeScreen: React.FC = () => {
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateGame = async () => {
        setLoading(true);
        const code = generateGameCode();
        // TODO: Create game session in Supabase and navigate to Lobby
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
                    <Text style={styles.emoji}>🕵️</Text>
                    <Text style={styles.title}>Impostor</Text>
                    <Text style={styles.subtitle}>Who's the impostor among you?</Text>
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
    },
    emoji: {
        fontSize: 64,
        marginBottom: Spacing.sm,
    },
    title: {
        fontSize: FontSize.hero,
        fontWeight: '900',
        color: Colors.textPrimary,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
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
        borderColor: Colors.border,
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
