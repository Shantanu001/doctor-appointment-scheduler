import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/' || path.startsWith('/auth');
  const token = request.cookies.get('token')?.value || '';

  const decoded = token ? await verifyToken(token) : null;

  // If path is protected and no token, redirect to login
  if (!isPublicPath && !decoded) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  // If path is auth and has token, redirect to dashboard
  if (isPublicPath && path.startsWith('/auth') && decoded) {
    const role = (decoded as any).role;
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.nextUrl));
  }

  // Role-based access control for dashboards
  if (path.startsWith('/dashboard/patient') && (decoded as any)?.role !== 'patient') {
    return NextResponse.redirect(new URL('/dashboard/doctor', request.nextUrl));
  }

  if (path.startsWith('/dashboard/doctor') && (decoded as any)?.role !== 'doctor') {
    return NextResponse.redirect(new URL('/dashboard/patient', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
