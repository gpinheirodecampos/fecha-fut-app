import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Map } from 'lucide-react-native';
import { quadras } from '@/constants/mockData';

export default function QuadrasProximasScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const renderQuadraItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quadraItem}
      onPress={() => router.push(`/quadras/${item.id}`)}
    >
      <View style={styles.quadraImageContainer}>
        {item.tipo === 'society' && (
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg' }}
            style={styles.quadraTypeImage}
            resizeMode="cover"
          />
        )}
        {item.tipo === 'gramado' && (
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg' }}
            style={styles.quadraTypeImage}
            resizeMode="cover"
          />
        )}
        {item.tipo === 'futsal' && (
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3574062/pexels-photo-3574062.jpeg' }}
            style={styles.quadraTypeImage}
            resizeMode="cover"
          />
        )}
      </View>
      
      <View style={styles.quadraInfo}>
        <Text style={styles.quadraNome}>{item.nome}</Text>
        <View style={styles.addressContainer}>
          <MapPin size={14} color="#6B7280" style={styles.addressIcon} />
          <Text style={styles.quadraEndereco}>{item.endereco}</Text>
        </View>
        <Text style={styles.quadraDistancia}>{item.distancia}km</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Quadras Próximas</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={quadras}
        renderItem={renderQuadraItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Map size={20} color="#FFFFFF" style={styles.mapIcon} />
          <Text style={styles.mapButtonText}>Ver no mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  listContainer: {
    padding: 16,
    gap: 16,
    paddingBottom: 80,
  },
  quadraItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  quadraImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadraTypeImage: {
    width: 70,
    height: 70,
  },
  quadraInfo: {
    flex: 1,
    padding: 12,
  },
  quadraNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressIcon: {
    marginRight: 4,
  },
  quadraEndereco: {
    fontSize: 12,
    color: '#6B7280',
  },
  quadraDistancia: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 16,
  },
  mapButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
  },
  mapIcon: {
    marginRight: 8,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});