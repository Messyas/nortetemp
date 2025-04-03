/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  fetchAuthSession,
  fetchUserAttributes,
  //getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<{
    email?: string;
    name?: string;
    userCategory?: string;
    isAdmin?: boolean;
  } | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }

        const attributes = await fetchUserAttributes();

        setUser({
          email: attributes.email, 
          name: attributes.name,
          userCategory: attributes["custom:userType"] || "padrao",
          isAdmin:
            // @ts-ignore
            session.tokens.accessToken.payload["cognito:groups"]?.includes(
              "Admins"
            ) || false,
        });
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      }
    }

    getUser();
  }, []);

  return user;
}
