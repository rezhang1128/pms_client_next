import { getAvailabilities } from "@/lib/api/availability";
import useSWR from "swr";

export default function useAvailabilities() {
  return useSWR("get-all-availabilities", () => getAvailabilities());
}
