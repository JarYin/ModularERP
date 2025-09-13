"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: {
        id: string;
        email: string;
    },
    accessToken?: string;
}

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session, rememberMe = false) {
  const expiredAt = rememberMe
    ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 วัน
    : undefined; // หมดอายุเมื่อปิดเบราว์เซอร์

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? "30d" : "1d") // JWT หมดอายุ
    .sign(encodedKey);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt, // undefined = session cookie
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"],
        });

        return payload as Session;
    } catch (err) {
        console.log("Failed to verify session", err);
        redirect("/signin");
    }
}

export async function destroySession() {
  (await cookies()).set("session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });
}