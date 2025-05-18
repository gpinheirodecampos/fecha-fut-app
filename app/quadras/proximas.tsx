import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar, Users, Filter } from 'lucide-react-native';
import { Map as MapIcon } from 'lucide-react-native';
import { quadras } from '@/constants/mockData';

// Tipos de quadras para filtro
type FilterType = 'todos' | 'society' | 'futsal' | 'gramado';

// Tipo para quadra
type Quadra = {
  id: string;
  nome: string;
  endereco: string;
  tipo: string;
  distancia: string;
  latitude: number;
  longitude: number;
  horarios: string;
  capacidade: number;
};

export default function QuadrasProximasScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  
  // Filtrar as quadras com base no filtro ativo
  const filteredQuadras = activeFilter === 'todos' 
    ? quadras 
    : quadras.filter(quadra => quadra.tipo === activeFilter);

  const renderQuadraItem = ({ item }: { item: Quadra }) => {
    // Texto do tipo de quadra para exibição
    const tipoText = 
      item.tipo === 'society' ? 'Society' :
      item.tipo === 'futsal' ? 'Futsal' : 'Gramado';

    // Cor associada ao tipo de quadra
    const tipoColor = 
      item.tipo === 'society' ? '#10B981' :
      item.tipo === 'futsal' ? '#3B82F6' : '#8B5CF6';
      
    return (
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
          
          <View 
            style={[
              styles.quadraBadge,
              { backgroundColor: tipoColor }
            ]}
          >
            <Text style={styles.quadraBadgeText}>{tipoText}</Text>
          </View>
        </View>
        
        <View style={styles.quadraInfo}>
          <Text style={styles.quadraNome}>{item.nome}</Text>
          
          <View style={styles.infoRow}>
            <MapPin size={14} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText} numberOfLines={1}>{item.endereco}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Calendar size={14} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText} numberOfLines={1}>
              Disponível {item.horarios}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Users size={14} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {item.capacidade} jogadores por time
            </Text>
          </View>
          
          <View style={styles.detailsRow}>
            <Text style={styles.quadraDistancia}>{item.distancia}km</Text>
            <Text style={styles.viewDetails}>Ver detalhes</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.title}>Quadras Próximas</Text>
        <TouchableOpacity style={styles.filterIcon}>
          <Filter size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'todos' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('todos')}
          >
            <Text style={[styles.filterText, activeFilter === 'todos' && styles.activeFilterText]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'society' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('society')}
          >
            <Text style={[styles.filterText, activeFilter === 'society' && styles.activeFilterText]}>Society</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'futsal' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('futsal')}
          >
            <Text style={[styles.filterText, activeFilter === 'futsal' && styles.activeFilterText]}>Futsal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'gramado' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('gramado')}
          >
            <Text style={[styles.filterText, activeFilter === 'gramado' && styles.activeFilterText]}>Gramado</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredQuadras}
        renderItem={renderQuadraItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={[styles.mapButton, { bottom: insets.bottom ? insets.bottom + 16 : 24 }]}
        onPress={() => router.back()}
      >
        <MapIcon size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.mapButtonText}>Ver no Mapa</Text>
      </TouchableOpacity>
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
  filterIcon: {
    padding: 4,
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
  listContent: {
    padding: 16,
  },
  quadraItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  quadraImageContainer: {
    width: 100,
    height: 140,
    position: 'relative',
  },
  quadraTypeImage: {
    width: '100%',
    height: '100%',
  },
  quadraBadge: {
    position: 'absolute',
    top: 8,
    left: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  quadraBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  quadraInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  quadraNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quadraDistancia: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  viewDetails: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  mapButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
    elevation: 3,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});