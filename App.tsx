/**
 * @file App.tsx
 * @description Root — carga fuentes, gestiona sesión Firebase y enruta pantallas.
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { LoginScreen } from '@screens/LoginScreen';
import { HomeScreen } from '@screens/HomeScreen';
import { Colors } from '@constants/theme';

/**
 * Root component.
 * 1. Carga fuentes (Drowner + Inter)
 * 2. Verifica sesión Firebase
 * 3. Muestra LoginScreen o HomeScreen según estado
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Drowner: require('./assets/fonts/Drowner-Free.otf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const { user, loading } = useFirebaseAuth();

  // Mostrar spinner mientras cargan fuentes o se verifica sesión
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return user ? <HomeScreen /> : <LoginScreen />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
