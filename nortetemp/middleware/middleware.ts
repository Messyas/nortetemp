import { authenticatedUser } from "@/utils/amplify-server-utils";
import { type NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");

  if (isOnDashboard) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    if (isOnAdminArea && !user.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    return response;
  } else if (user) {
    // Redirecionamento baseado nos grupos
    if (user.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/admins", request.nextUrl));
    } else if (user.isJornalista) {
      return NextResponse.redirect(new URL("/dashboard/jornalista", request.nextUrl));
    } else if (user.isAgricultor) {
      return NextResponse.redirect(new URL("/dashboard/agricultor", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl)); // Usuário padrão
    }
  }

  return response;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
