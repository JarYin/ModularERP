// hooks/useUser.ts
"use client";
import { getSession } from "@/lib/session";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  roles: string[];
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const accessToken = await getSession();
        console.log('Access token in useUser:', accessToken);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Fetch /api/auth/me response:', res);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, roles: user?.roles ?? [], loading };
}
