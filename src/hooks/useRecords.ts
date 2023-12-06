import useSWR from "swr";
import { getRecords } from "../lib/api/records";

export function useRecords() {
  return useSWR("get-records", () => getRecords());
}
