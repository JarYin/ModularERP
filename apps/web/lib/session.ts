"use server";
import { cookies } from "next/headers";

export async function createSession(accessToken: string, rememberMe = false) {
  const expiredAt = rememberMe
    ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    : undefined;

  (await cookies()).set("sb-access-token", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const token = (await cookies()).get("sb-access-token")?.value;
  return token ?? null;
}

export async function destroySession() {
  (await cookies()).set("sb-access-token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });
}
