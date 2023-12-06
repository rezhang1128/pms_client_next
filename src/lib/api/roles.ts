import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

export async function getRoles(id?: string) {
  let url = new URL("users-permissions/roles/", API_URL);

  url = new URL(`${id || ""}`, url);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}
