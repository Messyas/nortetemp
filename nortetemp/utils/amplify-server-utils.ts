import { authConfig } from "@/app/seed/amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

// representa o contexto do servidor Amplify para lidar com autenticação.
export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

// retorna o usuário autenticado no contexto do servidor Next.js.
export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return; // Retorna vazio se não houver sessão ativa.
        }
        const user = {
          ...(await getCurrentUser(contextSpec)) // Obtém informações do usuário autenticado.
        };
        return user;
      } catch (error) {
        console.log(error); // Log de erros de autenticação.
      }
    },
  });
}