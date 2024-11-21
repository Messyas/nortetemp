import {
  fetchAuthSession, // Recupera a sessão de autenticação do usuário atual.
  fetchUserAttributes, // Busca os atributos do usuário autenticado, como email, nome, etc.
  getCurrentUser, // Obtém os dados básicos do usuário autenticado.
} from "aws-amplify/auth";
import { useEffect, useState } from "react"; 
// `useEffect` é usado para executar efeitos colaterais (como chamadas de API) após a montagem do componente.
// `useState` gerencia o estado local dentro do hook.

export default function useAuthUser() { 
  // Hook personalizado para gerenciar a autenticação do usuário.
  const [user, setUser] = useState<Record<string, unknown>>(); 
  // Estado para armazenar as informações do usuário. 
  // A tipagem `Record<string, unknown>` indica que o objeto pode conter qualquer chave com valores variados.

  useEffect(() => {
    async function getUser() { 
      // Função assíncrona que busca as informações do usuário.
      const session = await fetchAuthSession(); 
      // Obtém a sessão atual do usuário, incluindo os tokens de autenticação.

      if (!session.tokens) { 
        // Verifica se a sessão não contém tokens, indicando que o usuário não está autenticado.
        return; 
        // Sai da função sem fazer mais nada.
      }

      const user = { 
        ...(await getCurrentUser()), // retorna o ID e nome de usuário e as infos.
        ...(await fetchUserAttributes()), // Mescla os atributos do usuário (como email, nome, etc.) com os dados básicos.
        isAdmin: false, // Esse campo e pra se precisar de admin no futuro
      };

      setUser(user); // Atualiza o estado com os dados completos do usuário.
    }
    getUser();  // Executa a função `getUser` assim que o componente é montado.
  }, []); // O array vazio `[]` indica que o efeito será executado apenas uma vez, na montagem do componente.

  return user; // Retorna os dados do usuário para o componente ou hook que o consumir.
}
