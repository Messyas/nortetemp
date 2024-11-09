import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "../utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  
  if (isOnDashboard && user) {
      return NextResponse.redirect(new URL("/dashboard/configuracoes", request.nextUrl));
  } 
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};