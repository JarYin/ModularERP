// components/auth/RoleGuard.tsx
"use client";
import { ReactNode } from "react";
import { useUser } from "@/hooks/useUser";

type Props = {
  roles: string[];
  children: ReactNode;
};

export const RoleGuard = ({ roles, children }: Props) => {
  const { roles: userRoles, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  const hasRole = roles.some(r => userRoles.includes(r));
  if (!hasRole) return <p>Access Denied</p>;

  return <>{children}</>;
};