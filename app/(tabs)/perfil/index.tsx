import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import PlayerAvatar from '@/components/PlayerAvatar';
import GroupAvatar from '@/components/GroupAvatar';
import { gruposAtivos } from '@/constants/mockData';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notificacoesJogos, setNotificacoesJogos] = React.useState(true);
  const [novosGrupos, setNovosGrupos] = React.useState(false);
  
  const usuario = {
    nome: 'João Silva',
    posicao: 'Goleiro',
    initials: 'JS',
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Perfil</Text>
      </View>
      
      <ScrollView>
        <View style={styles.profileContainer}>
          <PlayerAvatar 
            initials={usuario.initials} 
            size={80} 
          />
          <Text style={styles.userName}>{usuario.nome}</Text>
          <Text style={styles.userPosition}>{usuario.posicao}</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/perfil/editar')}
          >
            <Settings size={16} color="#6B7280" style={styles.editIcon} />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Seus Grupos</Text>
          
          <View style={styles.gruposContainer}>
            {gruposAtivos.map(grupo => (
              <View key={grupo.id} style={styles.grupoItem}>
                <GroupAvatar initials="AF" size={40} />
                <View style={styles.grupoInfo}>
                  <Text style={styles.grupoNome}>{grupo.nome}</Text>
                  <Text style={styles.grupoHorario}>{grupo.dia}</Text>
                </View>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.verTodosButton}>
            <Text style={styles.verTodosText}>Ver todos os grupos</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesTitle}>Preferências</Text>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Notificações de jogos</Text>
            <Switch
              value={notificacoesJogos}
              onValueChange={setNotificacoesJogos}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Novos grupos próximos</Text>
            <Switch
              value={novosGrupos}
              onValueChange={setNovosGrupos}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
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
  profileContainer: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 8,
    borderBottomColor: '#F3F4F6',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  userPosition: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  editIcon: {
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  gruposContainer: {
    gap: 16,
  },
  grupoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grupoInfo: {
    marginLeft: 12,
  },
  grupoNome: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  grupoHorario: {
    fontSize: 12,
    color: '#6B7280',
  },
  verTodosButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  verTodosText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  preferencesContainer: {
    padding: 16,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceText: {
    fontSize: 14,
    color: '#4B5563',
  },
});
