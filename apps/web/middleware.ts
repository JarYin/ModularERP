import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ skip middleware สำหรับหน้า public
  if (pathname === '/signin' || pathname === '/api/health') {
    return NextResponse.next();
  }

  const token = request.cookies.get('sb-access-token')?.value;

  // ✅ ไม่มี token → redirect ไป signin
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/signin';
    return NextResponse.redirect(loginUrl);
  }

  try {
    // ✅ fetch backend แบบ safe
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
        // important! ป้องกัน edge runtime fetch error
        cache: 'no-store',
      }
    ).catch(() => null);

    if (!res || !res.ok) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/signin';
      return NextResponse.redirect(loginUrl);
    }

    const user = await res.json().catch(() => null);
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/signin';
      return NextResponse.redirect(loginUrl);
    }

    // ✅ redirect ตาม org_id
    if (!user.org_id && pathname !== '/workspace') {
      const url = request.nextUrl.clone();
      url.pathname = '/workspace';
      return NextResponse.redirect(url);
    }

    if (user.org_id && pathname !== '/dashboard') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.warn('Middleware safe-catch:', err);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/signin';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ✅ ปรับ matcher ให้ชัดเจน
export const config = {
  matcher: ['/dashboard', '/workspace'],
};
