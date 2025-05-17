import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlayerAvatarProps {
  initials: string;
  size?: number;
}

export default function PlayerAvatar({ initials, size = 48 }: PlayerAvatarProps) {
  return (
    <View style={[
      styles.avatarContainer,
      { 
        width: size, 
        height: size,
        borderRadius: size / 2,
      }
    ]}>
      <Text style={[
        styles.initials,
        { fontSize: size * 0.4 }
      ]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#6B7280',
    fontWeight: '600',
  },
});