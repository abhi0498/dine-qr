"use server";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./utils/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Define a list of keywords for authentication-related paths
  const authPaths = ["/signUp", "/auth", "/login", "/register"];

  // Check if the pathname includes any of the authentication paths
  if (authPaths.some((authPath) => pathname.includes(authPath))) {
    return NextResponse.next();
  }

  // Exclude static file requests (e.g., /_next/static/, /_next/image/, /public/ assets)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }
  const session = await getSession();

  if (pathname.includes("signIn")) {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
  console.log("middleware 1");
  return NextResponse.next();
}

export const config = {
  //apply to all routes except /signIn
};
