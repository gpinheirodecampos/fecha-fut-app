// Mock data for the app

// Quadras
export const quadras = [
  { 
    id: '1', 
    nome: 'Arena Soccer Pro', 
    endereco: 'Rua das Palmeiras, 123', 
    tipo: 'society',
    distancia: '0.8',
  },
  { 
    id: '2', 
    nome: 'Estádio do Maracanã', 
    endereco: 'Av. Presidente Castelo Branco', 
    tipo: 'gramado',
    distancia: '1.2',
  },
  { 
    id: '3', 
    nome: 'Quadra Municipal', 
    endereco: 'Praça da República, s/n', 
    tipo: 'futsal',
    distancia: '1.5',
  },
  { 
    id: '4', 
    nome: 'Sport Center', 
    endereco: 'Av. Brasil, 1500', 
    tipo: 'society',
    distancia: '2.3',
  },
  { 
    id: '5', 
    nome: 'Clube Atlético', 
    endereco: 'Rua dos Esportes, 300', 
    tipo: 'gramado',
    distancia: '3.1',
  },
];

// Grupos
export const grupos = [
  {
    id: '1',
    nome: 'Amigos do Futebol',
    dia: 'Quarta-feira',
    horario: '19:00',
    local: 'Arena Soccer Pro',
    vagas: 6,
    confirmados: 8,
    membros: [
      { id: '1', nome: 'João Silva', initials: 'JS' },
      { id: '2', nome: 'Carlos Eduardo', initials: 'CE' },
      { id: '3', nome: 'Roberto Alves', initials: 'RA' },
      { id: '4', nome: 'Marcelo Santos', initials: 'MS' },
      { id: '5', nome: 'Fernando Costa', initials: 'FC' },
      { id: '6', nome: 'André Oliveira', initials: 'AO' },
      { id: '7', nome: 'José Pereira', initials: 'JP' },
      { id: '8', nome: 'Paulo Souza', initials: 'PS' },
    ],
  },
  {
    id: '2',
    nome: 'Futebol & Cerveja',
    dia: 'Sábado',
    horario: '16:00',
    local: 'Arena Soccer Pro',
    vagas: 0,
    confirmados: 12,
    membros: [
      { id: '1', nome: 'João Silva', initials: 'JS' },
      { id: '2', nome: 'Carlos Eduardo', initials: 'CE' },
      { id: '3', nome: 'Roberto Alves', initials: 'RA' },
      { id: '9', nome: 'Lucas Oliveira', initials: 'LO' },
      { id: '10', nome: 'Rafael Mendes', initials: 'RM' },
      { id: '11', nome: 'Gabriel Santos', initials: 'GS' },
      { id: '12', nome: 'Felipe Sousa', initials: 'FS' },
    ],
  },
  {
    id: '3',
    nome: 'Craques da Bola',
    dia: 'Sexta-feira',
    horario: '20:00',
    local: 'Quadra Municipal',
    vagas: 6,
    confirmados: 10,
    membros: [
      { id: '1', nome: 'João Silva', initials: 'JS' },
      { id: '3', nome: 'Roberto Alves', initials: 'RA' },
      { id: '13', nome: 'Marcelo Lima', initials: 'ML' },
      { id: '14', nome: 'Rodrigo Costa', initials: 'RC' },
      { id: '15', nome: 'Bruno Moraes', initials: 'BM' },
    ],
  },
  {
    id: '4',
    nome: 'Pelada dos Amigos',
    dia: 'Domingo',
    horario: '09:00',
    local: 'Sport Center',
    vagas: 7,
    confirmados: 7,
    membros: [
      { id: '1', nome: 'João Silva', initials: 'JS' },
      { id: '16', nome: 'Anderson Silva', initials: 'AS' },
      { id: '17', nome: 'Luiz Carlos', initials: 'LC' },
    ],
  },
];

// Grupos ativos no perfil
export const gruposAtivos = [
  {
    id: '1',
    nome: 'Amigos do Futebol',
    dia: 'Quarta-feira',
  },
  {
    id: '3',
    nome: 'Craques da Bola',
    dia: 'Sexta-feira',
  },
];

// Grupos por quadra
export const gruposPorQuadra = {
  '1': [
    {
      id: '1',
      nome: 'Amigos do Futebol',
      dia: 'Quarta-feira',
      horario: '19:00',
      vagas: 6,
      confirmados: 8,
    },
    {
      id: '2',
      nome: 'Futebol & Cerveja',
      dia: 'Sábado',
      horario: '16:00',
      vagas: 0,
      confirmados: 12,
    },
  ],
  '3': [
    {
      id: '3',
      nome: 'Craques da Bola',
      dia: 'Sexta-feira',
      horario: '20:00',
      vagas: 6,
      confirmados: 10,
    },
  ],
  '4': [
    {
      id: '4',
      nome: 'Pelada dos Amigos',
      dia: 'Domingo',
      horario: '09:00',
      vagas: 7,
      confirmados: 7,
    },
  ],
};

// Jogadores
export const jogadores = [
  { id: '1', nome: 'João Silva', posicao: 'Goleiro', initials: 'JS' },
  { id: '2', nome: 'Carlos Eduardo', posicao: 'Zagueiro', initials: 'CE' },
  { id: '3', nome: 'Roberto Alves', posicao: 'Meio-campo', initials: 'RA' },
  { id: '4', nome: 'Marcelo Santos', posicao: 'Atacante', initials: 'MS' },
  { id: '5', nome: 'Fernando Costa', posicao: 'Lateral', initials: 'FC' },
  { id: '6', nome: 'André Oliveira', posicao: 'Zagueiro', initials: 'AO' },
  { id: '7', nome: 'José Pereira', posicao: 'Atacante', initials: 'JP' },
  { id: '8', nome: 'Paulo Souza', posicao: 'Meio-campo', initials: 'PS' },
];