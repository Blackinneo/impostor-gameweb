/**
 * @file App.tsx
 * @description Root application component for Impostor GameWeb.
 * Handles auth state and renders the appropriate screen.
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { HomeScreen } from '@screens/HomeScreen';
import { AuthScreen } from '@screens/AuthScreen';
import { Colors } from '@constants/theme';

/**
 * Root component — shows a loading spinner while auth initializes,
 * then routes to HomeScreen (authenticated) or AuthScreen (guest).
 */
export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return user ? <HomeScreen /> : <AuthScreen />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
