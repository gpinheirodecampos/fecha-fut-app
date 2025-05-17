import React from 'react';
import { Stack } from 'expo-router';

export default function GruposLayout() {  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          color: '#111827',
        },
        headerShadowVisible: false,
      }}
    >      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
          title: "Grupos",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
          },
        }} 
      />
      {/* Não defina explicitamente a tela [id] aqui, o Expo Router a criará automaticamente */}
    </Stack>
  );
}
