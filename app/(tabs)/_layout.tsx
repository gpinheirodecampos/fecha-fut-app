import React from 'react';
import { Tabs } from 'expo-router';
import { Map, Users, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: 'Grupo',
          tabBarLabel: 'Grupos',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}