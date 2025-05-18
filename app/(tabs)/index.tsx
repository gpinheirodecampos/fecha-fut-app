import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { List, Locate } from 'lucide-react-native';
import Map, { MapHandles } from '@/components/Map';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mapRef = useRef<MapHandles>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  
  const sampleMarkers = [
    {
      id: '1',
      coordinate: {
        latitude: -22.9068,
        longitude: -43.1729,
      },
      title: 'Quadra Maracanã',
      description: 'Campo de futebol disponível',
    },
    {
      id: '2',
      coordinate: {
        latitude: -22.9168,
        longitude: -43.1829,
      },
      title: 'Arena Sintética',
      description: 'Quadra sintética de última geração',
    },
  ];

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(markerId);
  };

  const handleMyLocationPress = () => {
    mapRef.current?.moveToUserLocation();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <Map 
          ref={mapRef}
          markers={sampleMarkers}
          onMarkerPress={handleMarkerPress}
          showUserLocation={true}
        />
      </View>
      
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity 
          style={styles.currentLocationButton}
          onPress={handleMyLocationPress}
        >
          <Locate size={24} color="#111827" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.listButton}
          onPress={() => router.push('/quadras/proximas')}
        >
          <List size={20} color="#FFFFFF" style={styles.listIcon} />
          <Text style={styles.listButtonText}>Ver como lista</Text>
        </TouchableOpacity>
      </View>
      
      {selectedMarker && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>
            {sampleMarkers.find(m => m.id === selectedMarker)?.title}
          </Text>
          <Text style={styles.infoDescription}>
            {sampleMarkers.find(m => m.id === selectedMarker)?.description}
          </Text>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => router.push(`/quadras/${selectedMarker}`)}
          >
            <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  mapContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  currentLocationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listIcon: {
    marginRight: 8,
  },
  listButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111827',
  },
  infoDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15,
  },
  detailsButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});