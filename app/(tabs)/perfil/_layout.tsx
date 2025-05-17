import React from 'react';
import { Stack, Slot } from 'expo-router';

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editar"
        options={{
          headerShown: false,
        }}
      />
      <Slot />
    </Stack>
  );
}
