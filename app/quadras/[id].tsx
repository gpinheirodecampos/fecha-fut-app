import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react-native';
import { quadras, gruposPorQuadra } from '@/constants/mockData';

export default function QuadraDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Find the quadra with the matching id
  const quadra = quadras.find(q => q.id === id);
  const grupos = gruposPorQuadra[id] || [];
  
  if (!quadra) {
    return (
      <View style={styles.container}>
        <Text>Quadra não encontrada</Text>
      </View>
    );
  }
  
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
              source={{ uri: 'https://images.pexels.com/photos/3574062/pexels-photo-3574062.jpeg' }}
              style={styles.quadraImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.imageText}>Imagem da quadra</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MapPin size={18} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText}>Endereço</Text>
          </View>
          <Text style={styles.addressText}>{quadra.endereco}</Text>
        </View>
        
        <View style={styles.gruposContainer}>
          <Text style={styles.gruposTitle}>Grupos nesta quadra</Text>
          
          {grupos.map(grupo => {
            const vagas = grupo.vagas > 0 
              ? <Text style={styles.vagas}>{grupo.vagas} vagas</Text>
              : <Text style={styles.lotado}>Lotado</Text>;
              
            return (
              <TouchableOpacity 
                key={grupo.id}
                style={styles.grupoCard}
                onPress={() => router.push(`/(tabs)/grupos/${grupo.id}`)}
              >
                <View style={styles.grupoHeader}>
                  <Text style={styles.grupoName}>{grupo.nome}</Text>
                  {vagas}
                </View>
                
                <View style={styles.grupoInfoContainer}>
                  <View style={styles.grupoInfoRow}>
                    <Calendar size={16} color="#6B7280" style={styles.grupoInfoIcon} />
                    <Text style={styles.grupoInfoText}>{grupo.dia} às {grupo.horario}</Text>
                  </View>
                  
                  <View style={styles.grupoInfoRow}>
                    <Users size={16} color="#6B7280" style={styles.grupoInfoIcon} />
                    <Text style={styles.grupoInfoText}>{grupo.confirmados} confirmados</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 26,
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
  grupoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  vagas: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  lotado: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  grupoInfoContainer: {
    gap: 8,
  },
  grupoInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grupoInfoIcon: {
    marginRight: 8,
  },
  grupoInfoText: {
    fontSize: 14,
    color: '#6B7280',
  },
});