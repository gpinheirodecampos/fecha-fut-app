import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Users } from 'lucide-react-native';
import GroupAvatar from '@/components/GroupAvatar';
import { grupos } from '@/constants/mockData';

export default function GruposScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderGrupoItem = ({ item }: { item: typeof grupos[0] }) => {
    const vagas = item.vagas > 0 
      ? <Text style={styles.vagas}>{item.vagas} vagas</Text>
      : <Text style={styles.lotado}>Lotado</Text>;
      
    return (
      <TouchableOpacity 
        style={styles.grupoCard}
        onPress={() => router.push(`/(tabs)/grupos/${item.id}`)}
      >
        <View style={styles.grupoHeader}>
          <Text style={styles.grupoName}>{item.nome}</Text>
          {vagas}
        </View>
        
        <View style={styles.grupoInfoContainer}>
          <View style={styles.infoRow}>
            <Calendar size={16} color="#6B7280" style={styles.infoIcon} />
            <Text style={styles.infoText}>{item.dia} às {item.horario}</Text>
          </View>
        </View>
        
        <View style={styles.avatarsContainer}>
          {item.membros.slice(0, 3).map((membro, index) => (
            <View key={membro.id} style={[styles.avatarWrapper, { zIndex: 10 - index, marginLeft: index > 0 ? -10 : 0 }]}>
              <GroupAvatar initials={membro.initials} size={32} />
            </View>
          ))}
          
          {item.membros.length > 3 && (
            <View style={[styles.avatarWrapper, { zIndex: 6, marginLeft: -10 }]}>
              <View style={[styles.moreAvatars, { width: 32, height: 32 }]}>
                <Text style={styles.moreAvatarsText}>+{item.membros.length - 3}</Text>
              </View>
            </View>
          )}
          
          <Text style={styles.confirmedText}>{item.confirmados} confirmados</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
              <Text style={styles.title}>Grupos</Text>
            </View>
      <FlatList
        data={grupos}
        renderItem={renderGrupoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 16,
    gap: 16,
  },
  grupoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
    fontSize: 18,
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
    marginBottom: 16,
    gap: 6,
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
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  moreAvatars: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAvatarsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  confirmedText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
});