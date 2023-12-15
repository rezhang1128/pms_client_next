import useSWR from "swr";
import { getRoles } from "@/lib/api/roles";

export function useRoles(id?: string) {
  return useSWR(id || "get-all-roles", () => getRoles(id));
}
