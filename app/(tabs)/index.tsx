import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, PanResponder, Animated } from 'react-native';
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
  
  // Animated value para controlar a posição do painel
  const panelPosition = useRef(new Animated.Value(0)).current;
    // Pan responder para permitir arrastar o painel para baixo
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Quando começa o gesto, interrompe qualquer animação em andamento
        panelPosition.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) { // Permitir apenas arrastar para baixo
          // Aplicar o valor do deslocamento à posição do painel
          panelPosition.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) { // Se arrastar mais de 100px, fecha o painel
          closeInfoPanel();
        } else {
          // Caso contrário, anima de volta para a posição original
          Animated.spring(panelPosition, {
            toValue: 0,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;
  
  // Reset da posição do painel quando muda a seleção
  useEffect(() => {
    if (selectedMarker) {
      panelPosition.setValue(0);
    }
  }, [selectedMarker]);
  
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
    
  // Chave para forçar a re-renderização do mapa quando o filtro mudar
  const mapKey = `map-${activeFilter}-${filteredMarkers.length}`;

  useEffect(() => {
    // Quando o filtro mudar, atualizar o mapa para mostrar os marcadores filtrados
    if (filteredMarkers.length > 0) {
      // Pequeno atraso para garantir que o estado foi atualizado
      const timer = setTimeout(() => {
        mapRef.current?.fitToMarkers();
      }, 150);
      
      return () => clearTimeout(timer); // Limpar o timer quando o componente desmontar ou o filtro mudar
    }
  }, [activeFilter]);

  // Garantir que activeFilter seja sempre um dos valores esperados
  useEffect(() => {
    // Validar o filtro ativo
    if (!['todos', 'society', 'futsal', 'gramado'].includes(activeFilter)) {
      console.error('Filtro inválido:', activeFilter);
      setActiveFilter('todos'); // Redefinir para um valor válido
    }
  }, [activeFilter]);

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(markerId);
  };

  const handleMyLocationPress = () => {
    mapRef.current?.moveToUserLocation();
  };

  const closeInfoPanel = () => {
    setSelectedMarker(null);
  };
  
  const handleFilterPress = (filterType: FilterType) => {
    // Verificar se o tipo de filtro é válido
    if (!['todos', 'society', 'futsal', 'gramado'].includes(filterType)) {
      console.error("Tipo de filtro inválido:", filterType);
      return;
    }
    
    setActiveFilter(filterType);
    
    // Usar um timeout mais longo para garantir que o estado foi atualizado
    setTimeout(() => {
      // Verificar se temos marcadores filtrados antes de ajustar o mapa
      const filtered = filterType === 'todos' 
        ? mapMarkers 
        : mapMarkers.filter(marker => marker.type === filterType);
        
      if (filtered.length > 0 && mapRef.current) {
        mapRef.current.fitToMarkers();
      } else {
        console.log("Nenhum marcador encontrado para o filtro:", filterType);
      }
    }, 300);
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    // Não alteramos o filtro ativo quando apenas alternamos a visibilidade do painel
  };

  const selectedQuadra = selectedMarker 
    ? quadras.find(q => q.id === selectedMarker) 
    : null;
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Quadras</Text>
        <View style={styles.headerRight}>
          {activeFilter !== 'todos' && (
            <View style={styles.activeFilterIndicator}>
              <Text style={styles.activeFilterText}>
                {activeFilter === 'society' ? 'Society' : 
                 activeFilter === 'futsal' ? 'Futsal' : 
                 activeFilter === 'gramado' ? 'Gramado' : ''}
              </Text>
            </View>
          )}
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter !== 'todos' && styles.activeFilterButton]}
            onPress={toggleFilters}
          >
            <Filter size={20} color={activeFilter !== 'todos' ? '#FFFFFF' : '#111827'} />
          </TouchableOpacity>
        </View>
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
          key={mapKey}
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
      </View>      {selectedQuadra && (
        <>
          {/* Overlay para permitir fechar o painel ao tocar fora dele */}          <TouchableOpacity 
            style={styles.infoOverlay}
            activeOpacity={0.2}
            onPress={closeInfoPanel}
          />
            <Animated.View style={[styles.infoPanel, { transform: [{ translateY: panelPosition }] }]} {...panResponder.panHandlers}>
            {/* Alça para arrastar (visual) */}
            <View style={styles.infoPanelHandle} />
            
            <Text style={styles.infoTitle}>{selectedQuadra.nome}</Text>
            <Text style={styles.infoDescription}>
              {selectedQuadra.tipo === 'society' ? 'Quadra Society' :
               selectedQuadra.tipo === 'futsal' ? 'Quadra de Futsal' : 
               selectedQuadra.tipo === 'gramado' ? 'Campo Gramado' : ''}
            </Text>
            <Text style={styles.infoAddress}>{selectedQuadra.endereco}</Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => router.push(`/quadras/${selectedQuadra.id}`)}
            >
              <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  activeFilterButton: {
    backgroundColor: '#10B981',
  },
  activeFilterIndicator: {
    backgroundColor: '#E6F7F1',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
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
  },  infoOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 16,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B7280',
    lineHeight: 30,
    textAlign: 'center',
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