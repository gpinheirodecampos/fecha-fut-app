import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar, Users, Navigation } from 'lucide-react-native';
import { quadras, gruposPorQuadra } from '@/constants/mockData';
import Map from '@/components/Map';

export default function QuadraDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Find the quadra with the matching id
  const quadraId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '1';
  const quadra = quadras.find(q => q.id === quadraId);
  const grupos = gruposPorQuadra[quadraId as keyof typeof gruposPorQuadra] || [];
  
  if (!quadra) {
    return (
      <View style={styles.container}>
        <Text>Quadra não encontrada</Text>
      </View>
    );
  }

  // Default coordinates for Rio de Janeiro
  const defaultLat = -22.9068;
  const defaultLng = -43.1729;
  
  const quadraLocation = {
    latitude: quadra.latitude || defaultLat,
    longitude: quadra.longitude || defaultLng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const mapMarkers = [{
    id: quadra.id.toString(),
    coordinate: {
      latitude: quadra.latitude || defaultLat,
      longitude: quadra.longitude || defaultLng,
    },
    title: quadra.nome,
    description: `${quadra.tipo} - ${quadra.endereco}`
  }];
  
  // Function to open the location in maps app
  const openInMaps = () => {
    // In a real app, this would open the native maps app with the location
    console.log('Abrindo no mapa:', quadra.nome);
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>{quadra.nome}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {quadra.tipo === 'society' && (
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg' }}
              style={styles.quadraImage}
              resizeMode="cover"
            />
          )}
          {quadra.tipo === 'gramado' && (
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg' }}
              style={styles.quadraImage}
              resizeMode="cover"
            />
          )}
          {quadra.tipo === 'futsal' && (
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/186239/pexels-photo-186239.jpeg' }}
              style={styles.quadraImage}
              resizeMode="cover"
            />
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.quadraNome}>{quadra.nome}</Text>
          <View style={styles.detailRow}>
            <MapPin size={18} color="#6B7280" style={styles.detailIcon} />
            <Text style={styles.detailText}>{quadra.endereco}</Text>
          </View>
          <View style={styles.detailRow}>
            <Calendar size={18} color="#6B7280" style={styles.detailIcon} />
            <Text style={styles.detailText}>Disponível {quadra.horarios}</Text>
          </View>
          <View style={styles.detailRow}>
            <Users size={18} color="#6B7280" style={styles.detailIcon} />
            <Text style={styles.detailText}>{quadra.capacidade} jogadores por time</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Localização</Text>
          <View style={styles.mapContainer}>
            <Map
              initialRegion={quadraLocation}
              markers={mapMarkers}
              showUserLocation={true}
            />
            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={openInMaps}
            >
              <Navigation size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.directionsButtonText}>Como Chegar</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionTitle}>Grupos que jogam aqui</Text>
          {grupos.length > 0 ? grupos.map((grupo: any) => (
            <TouchableOpacity
              key={grupo.id}
              style={styles.grupoCard}
              onPress={() => router.push(`/grupos/${grupo.id}`)}
            >
              <Text style={styles.grupoNome}>{grupo.nome}</Text>
              <Text style={styles.grupoInfoText}>{grupo.membros?.length || 0} membros • {grupo.horario}</Text>
            </TouchableOpacity>
          )) : (
            <Text style={styles.emptyMessage}>Nenhum grupo joga nesta quadra ainda.</Text>
          )}
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 180,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadraImage: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    position: 'absolute',
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F3F4F6',
  },
  quadraNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  directionsButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  gruposContainer: {
    padding: 16,
  },
  gruposTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  grupoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  grupoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  grupoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  grupoInfoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 16,
  }
});