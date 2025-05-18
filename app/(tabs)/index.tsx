import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { List, Locate, Filter, Search } from 'lucide-react-native';
import Map, { MapHandles } from '@/components/Map';
import { quadras } from '@/constants/mockData';

// Tipos de quadras para filtro
type FilterType = 'todos' | 'society' | 'futsal' | 'gramado';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mapRef = useRef<MapHandles>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [showFilters, setShowFilters] = useState(false);
  
  // Converter os dados das quadras para o formato do marcador
  const mapMarkers = quadras.map(quadra => ({
    id: quadra.id,
    coordinate: {
      latitude: quadra.latitude,
      longitude: quadra.longitude,
    },
    title: quadra.nome,
    description: quadra.endereco,
    type: quadra.tipo as 'society' | 'futsal' | 'gramado',
    available: true // No futuro, isso viria de uma verificação de disponibilidade
  }));
  
  // Filtrar os marcadores com base no filtro ativo
  const filteredMarkers = activeFilter === 'todos' 
    ? mapMarkers 
    : mapMarkers.filter(marker => marker.type === activeFilter);

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(markerId);
  };

  const handleMyLocationPress = () => {
    mapRef.current?.moveToUserLocation();
  };

  const handleFilterPress = (filterType: FilterType) => {
    setActiveFilter(filterType);
    setShowFilters(false);
    // Após um breve atraso para o filtro ser aplicado, ajustar o mapa para mostrar todos os marcadores
    setTimeout(() => {
      mapRef.current?.fitToMarkers();
    }, 100);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const selectedQuadra = selectedMarker 
    ? quadras.find(q => q.id === selectedMarker) 
    : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Quadras</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleFilters}
        >
          <Filter size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === 'todos' && styles.activeFilterChip]}
              onPress={() => handleFilterPress('todos')}
            >
              <Text style={[styles.filterText, activeFilter === 'todos' && styles.activeFilterText]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === 'society' && styles.activeFilterChip]}
              onPress={() => handleFilterPress('society')}
            >
              <Text style={[styles.filterText, activeFilter === 'society' && styles.activeFilterText]}>Society</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === 'futsal' && styles.activeFilterChip]}
              onPress={() => handleFilterPress('futsal')}
            >
              <Text style={[styles.filterText, activeFilter === 'futsal' && styles.activeFilterText]}>Futsal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === 'gramado' && styles.activeFilterChip]}
              onPress={() => handleFilterPress('gramado')}
            >
              <Text style={[styles.filterText, activeFilter === 'gramado' && styles.activeFilterText]}>Gramado</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      
      <View style={styles.mapContainer}>
        <Map 
          ref={mapRef}
          markers={filteredMarkers}
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
      
      {selectedQuadra && (
        <View style={styles.infoPanel}>
          <View style={styles.infoPanelHandle} />
          <Text style={styles.infoTitle}>{selectedQuadra.nome}</Text>
          <Text style={styles.infoDescription}>
            {selectedQuadra.tipo === 'society' ? 'Quadra Society' :
             selectedQuadra.tipo === 'futsal' ? 'Quadra de Futsal' : 'Campo Gramado'}
          </Text>
          <Text style={styles.infoAddress}>{selectedQuadra.endereco}</Text>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => router.push(`/quadras/${selectedQuadra.id}`)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#10B981',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeFilterText: {
    color: '#FFFFFF',
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
    alignItems: 'center',
  },
  infoPanelHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111827',
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});