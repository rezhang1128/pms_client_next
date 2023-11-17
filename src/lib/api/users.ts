import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

const USERS_URL = new URL("users/", API_URL);

export async function getMe() {
  const res = await fetch(new URL("me?populate=role", USERS_URL), {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });
  return await res.json();
}
