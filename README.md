# Fut Project Front

Este é um projeto mobile desenvolvido com [Expo](https://expo.dev/) e [React Native](https://reactnative.dev/) utilizando navegação por abas e rotas dinâmicas com [expo-router](https://docs.expo.dev/router/introduction/).

## Funcionalidades

- **Mapa:** Visualização de quadras e grupos disponíveis.
- **Grupos:** Lista de grupos, detalhes do grupo, confirmação de presença e visualização dos membros.
- **Perfil:** Tela de perfil do usuário.
- **Detalhes de Quadra:** Visualização de informações e grupos associados a uma quadra.

## Estrutura de Pastas

```
app/
  (tabs)/
    _layout.tsx         # Layout das abas principais
    index.tsx           # Tela do mapa
    grupos/
      _layout.tsx       # Stack de grupos
      index.tsx         # Lista de grupos
      [id].tsx          # Detalhe do grupo
    perfil.tsx          # Tela de perfil
  quadras/
    [id].tsx            # Detalhe da quadra
    proximas.tsx        # Quadras próximas
assets/
  images/               # Ícones e imagens
components/             # Componentes reutilizáveis
constants/              # Dados mockados e constantes
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
2. Inicie o projeto:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
3. Use o aplicativo Expo Go no seu celular ou um emulador para visualizar o app.

## Principais Tecnologias
- React Native
- Expo
- expo-router
- TypeScript
- Lucide Icons

## Scripts úteis
- `npm run dev` — inicia o projeto Expo
- `npm run lint` — executa o linter
- `npm run build:web` — exporta o projeto para web

## Observações
- O projeto utiliza dados mockados em `constants/mockData.ts`.
- O layout e navegação seguem o padrão de rotas por arquivos do expo-router.

---
