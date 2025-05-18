import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import ErrorBoundary from '@/components/ErrorBoundary';

// Suprime explicitamente os erros de texto em todo o aplicativo
LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component',
]);

export default function RootLayout() {
  useFrameworkReady();
  return (
    <ErrorBoundary>
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="quadras"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </>
    </ErrorBoundary>
  );
}