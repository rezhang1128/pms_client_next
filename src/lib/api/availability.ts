import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

export const AV_URL = new URL("availabilities/", API_URL);

export async function getAvailabilities() {
  const url = new URL(AV_URL.href);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}

export async function createAvailability(
  recurring: boolean,
  day: string,
  start: Date,
  end: Date,
  user: number
) {
  const url = new URL(AV_URL.href);

  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      data: {
        recurring,
        day,
        start,
        end,
        user,
      },
    }),
  });
  return res.json();
}
