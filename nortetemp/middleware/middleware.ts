import { type NextRequest, NextResponse } from "next/server";  // Importação de tipos e resposta para middleware.
import { authenticatedUser } from "../utils/amplify-server-utils"; // Função de autenticação.

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();  // Continua para a próxima resposta no pipeline.
  const user = await authenticatedUser({ request, response }); // Obtém o usuário autenticado.
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard"); // Verifica se está acessando o dashboard.
  
  if (isOnDashboard && user) { // se o usuario esta usando o dash, redireciona para tela configurações.
      return NextResponse.redirect(new URL("/dashboard/configuracoes", request.nextUrl));
  } 
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], 
};