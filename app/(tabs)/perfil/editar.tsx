import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Edit2 } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import PlayerAvatar from '@/components/PlayerAvatar';

export default function EditarPerfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Estado inicial do usuário (poderia vir de um contexto ou props em um app real)
  const [usuario, setUsuario] = useState({
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    telefone: '(11) 99999-9999',
    posicao: 'Goleiro',
    idade: '28',
    nivel: 'Intermediário',
    disponibilidade: 'Noites e fins de semana',
    bioDescricao: 'Goleiro com experiência em campeonatos amadores. Disponível para jogos casuais e competições.',
    initials: 'JS',
  });

  // Manipulação das mudanças nos campos
  const handleChange = (field: keyof typeof usuario, value: string) => {
    setUsuario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Lista de posições disponíveis no futebol
  const posicoes = [
    'Goleiro', 
    'Zagueiro', 
    'Lateral Direito', 
    'Lateral Esquerdo',
    'Volante',
    'Meio-Campo',
    'Atacante',
    'Ponta Direita',
    'Ponta Esquerda',
    'Centroavante'
  ];

  // Lista de níveis de habilidade
  const niveis = [
    'Iniciante',
    'Intermediário',
    'Avançado',
    'Profissional'
  ];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <PlayerAvatar 
              initials={usuario.initials} 
              size={100} 
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={usuario.nome}
              onChangeText={(text) => handleChange('nome', text)}
              placeholder="Seu nome completo"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={usuario.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="seu.email@exemplo.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={usuario.telefone}
              onChangeText={(text) => handleChange('telefone', text)}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              value={usuario.idade}
              onChangeText={(text) => handleChange('idade', text)}
              placeholder="Sua idade"
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Informações do Jogador</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Posição Preferida</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={usuario.posicao}
                onValueChange={(value) => handleChange('posicao', value)}
                style={styles.picker}
              >
                {posicoes.map((posicao) => (
                  <Picker.Item key={posicao} label={posicao} value={posicao} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nível de Habilidade</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={usuario.nivel}
                onValueChange={(value) => handleChange('nivel', value)}
                style={styles.picker}
              >
                {niveis.map((nivel) => (
                  <Picker.Item key={nivel} label={nivel} value={nivel} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Disponibilidade</Text>
            <TextInput
              style={styles.input}
              value={usuario.disponibilidade}
              onChangeText={(text) => handleChange('disponibilidade', text)}
              placeholder="Ex: Noites e fins de semana"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sobre Você</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={usuario.bioDescricao}
              onChangeText={(text) => handleChange('bioDescricao', text)}
              placeholder="Conte um pouco sobre você como jogador..."
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]}
            onPress={() => {
              // Em um app real, essa função salvaria os dados e navegaria de volta
              router.back();
            }}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
        
        {/* Espaço adicional no final do ScrollView */}
        <View style={styles.bottomSpace} />
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSpace: {
    height: 40,
  }
});
