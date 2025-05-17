import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Map } from 'lucide-react-native';

export default function MapPlaceholder() {
  return (
    <View style={styles.container}>
      <Map size={48} color="#6B7280" />
      <Text style={styles.text}>Mapa será carregado aqui</Text>
      <Text style={styles.subtext}>As quadras próximas de você aparecerão como pins no mapa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 16,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: '80%',
  },
});