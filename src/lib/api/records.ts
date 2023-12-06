import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

const REC_URL = new URL("records/", API_URL);

export async function getRecords() {
  const url = new URL(REC_URL.href);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}
