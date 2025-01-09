import { authConfig } from "@/app/seed/amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

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
          return;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
          isJornalista: false,
          isAgricultor: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));
        // @ts-ignore
        user.isJornalista = Boolean(groups && groups.includes("jornalista"));
        // @ts-ignore
        user.isAgricultor = Boolean(groups && groups.includes("agricultor"));

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}