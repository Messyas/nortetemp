/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export default function useAuthUser() {
  const [user, setUser] = useState<{ userCategory?: string; isAdmin?: boolean } | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }

        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        setUser({
          ...currentUser,
          userCategory: attributes['custom:userType'] || 'padrao', // Obtém o tipo de usuário
           // @ts-ignore
          isAdmin: session.tokens.accessToken.payload['cognito:groups']?.includes('Admins') || false,
        });
      } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
      }
    }

    getUser();
  }, []);

  return user;
}
