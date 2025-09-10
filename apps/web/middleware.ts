import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = Boolean(request.cookies.get('authToken'));

    if (!isAuthenticated && request.nextUrl.pathname !== '/signin') {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/signin';
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};