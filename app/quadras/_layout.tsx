import React from 'react';
import { Stack, Slot } from 'expo-router';

export default function QuadrasLayout() {
  return (
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
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="proximas"
        options={{
          headerShown: false,
          title: "Quadras Próximas",
        }}
      />
      <Slot />
    </Stack>
  );
}
