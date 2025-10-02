import { useUser } from "./useUser";

export function useRole(role: string) {
  const { roles } = useUser();
  return roles.includes(role);
}
