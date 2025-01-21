/* eslint-disable @typescript-eslint/ban-ts-comment */

import { authConfig } from "@/app/seed/amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return null;
        }

        // Buscar usuário autenticado
        const user = await getCurrentUser(contextSpec);
        const attributes = await fetchUserAttributes(contextSpec);

        // Criar objeto com os dados relevantes
        return {
          ...user,
          userCategory: attributes["custom:userType"], // Armazena a categoria do usuário
          // @ts-ignore
          isAdmin: session.tokens.accessToken.payload["cognito:groups"]?.includes("Admins") || false,
        };
      } catch (error) {
        console.log("Erro ao buscar usuario autenticado:", error);
        return null;
      }
    },
  });
}
