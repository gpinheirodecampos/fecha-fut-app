import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Calendar, Check, ArrowLeft } from 'lucide-react-native';
import { grupos, jogadores } from '@/constants/mockData';
import PlayerAvatar from '@/components/PlayerAvatar';

export default function GrupoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [confirmado, setConfirmado] = useState(false);
  
  // Encontrar o grupo com o id correspondente
  const grupo = grupos.find(g => g.id === id);
  
  if (!grupo) {
    return (
      <View style={styles.container}>
        <Text>Grupo não encontrado</Text>
      </View>
    );
  }

  const handleConfirmar = () => {
    setConfirmado(!confirmado);
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
        <Text style={styles.title}>{grupo.nome}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MapPin size={18} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText}>{grupo.local}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Calendar size={18} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText}>{grupo.dia} às {grupo.horario}</Text>
          </View>
        </View>
        
        <View style={styles.presencaContainer}>
          <View style={styles.presencaHeader}>
            <Text style={styles.presencaTitle}>Lista de presença</Text>
            <Text style={styles.vagasText}>{grupo.vagas} vagas</Text>
          </View>
          
          <View style={styles.jogadoresContainer}>
            {jogadores.map(jogador => (
              <View key={jogador.id} style={styles.jogadorItem}>
                <View style={styles.jogadorInfo}>
                  <PlayerAvatar 
                    initials={jogador.initials} 
                    size={40} 
                  />
                  <View style={styles.jogadorTexts}>
                    <Text style={styles.jogadorNome}>{jogador.nome}</Text>
                    <Text style={styles.jogadorPosicao}>{jogador.posicao}</Text>
                  </View>
                </View>
                <View style={styles.checkContainer}>
                  <Check size={18} color="#10B981" />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity 
          style={[
            styles.confirmarButton,
            confirmado && styles.confirmarButtonActive
          ]}
          onPress={handleConfirmar}
        >
          {confirmado ? (
            <Text style={styles.confirmarButtonText}>Presença confirmada</Text>
          ) : (
            <Text style={styles.confirmarButtonText}>Confirmar presença</Text>
          )}
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
  content: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
    gap: 12,
    borderBottomWidth: 8,
    borderBottomColor: '#F3F4F6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  presencaContainer: {
    padding: 16,
  },
  presencaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  presencaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  vagasText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  jogadoresContainer: {
    gap: 16,
  },
  jogadorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jogadorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jogadorTexts: {
    marginLeft: 12,
  },
  jogadorNome: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  jogadorPosicao: {
    fontSize: 12,
    color: '#6B7280',
  },
  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmarButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmarButtonActive: {
    backgroundColor: '#047857',
  },
  confirmarButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
