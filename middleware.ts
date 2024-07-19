import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else {
    if (request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/signup') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
