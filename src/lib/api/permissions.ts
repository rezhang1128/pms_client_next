import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

export async function getPermissions() {
  let url = new URL("users-permissions/permissions/", API_URL);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}
