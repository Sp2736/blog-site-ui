// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    const adminToken = request.cookies.get('admin_token');
    
    if (adminToken?.value !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}