import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GroupAvatarProps {
  initials: string;
  size?: number;
}

export default function GroupAvatar({ initials, size = 48 }: GroupAvatarProps) {
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
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#10B981',
    fontWeight: '600',
  },
});