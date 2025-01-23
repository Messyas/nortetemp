"use client"; 

import { Amplify, type ResourcesConfig } from "aws-amplify"; 
// Importa o módulo Amplify para configuração e tipos para melhor tipagem do recurso.

export const authConfig: ResourcesConfig["Auth"] = { 
  // Define a configuração de autenticação para o Cognito.
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID), 
    // ID do User Pool obtido de variáveis de ambiente para segurança.
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID), 
    // ID do cliente do User Pool obtido de variáveis de ambiente.
  },
};

Amplify.configure(
  {
    Auth: authConfig, 
    // Aplica a configuração de autenticação ao Amplify.
  },
  { ssr: true } 
  // Habilita o suporte para Server-Side Rendering (SSR) no Amplify.
);

export default function ConfigureAmplifyClientSide() { 
  // Componente funcional vazio usado apenas para carregar as configurações no lado do cliente.
  return null; 
  // Retorna `null` porque a configuração ocorre apenas como efeito colateral, sem renderizar conteúdo visível.
}
