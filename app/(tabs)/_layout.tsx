import React from 'react';
import { Tabs } from 'expo-router';
import { Map as MapIcon, Users as UsersIcon, User as UserIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <>
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
          tabBarIcon: ({ color, size }) => {
            return <MapIcon size={size} color={color} />;
          }
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color, size }) => {
            return <UsersIcon size={size} color={color} />;
          }
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <UserIcon size={size} color={color} />;
          }
        }}
      />
    </Tabs>
    </>
  );
}