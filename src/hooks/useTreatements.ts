import { getTreatments } from "@/lib/api/treatments";
import useSWR from "swr";

export default function useTreatments(populate?: string, title?: string) {
  return useSWR(
    [populate, title] || "get-all-treatments",
    ([populate, title]) => getTreatments(populate, title)
  );
}
