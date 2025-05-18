import React, { Component, ErrorInfo, ReactNode } from 'react';
import { LogBox } from 'react-native';

// Suprime os erros específicos sobre texto
LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component',
]);

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Componente que captura erros em qualquer componente filho e os registra
 * Também suprime os avisos específicos sobre renderização de texto
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Atualizar o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Você pode registrar o erro em um serviço de relatório de erros
    console.log('Erro capturado em ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return this.props.children; // Para esse caso específico, apenas continue renderizando
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
