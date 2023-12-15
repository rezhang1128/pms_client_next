import useSWR from "swr";
import { getPermissions } from "@/lib/api/permissions";

export function usePermissions() {
  return useSWR("get-all-permissions", () => getPermissions());
}
