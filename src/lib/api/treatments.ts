import { getDefaultHeaders } from "../helpers";
import { API_URL } from "../variables/urls";

const TRT_URL = new URL("treatments/", API_URL);

export async function getTreatments(populate?: string, title?: string) {
  const url = new URL(TRT_URL.href);
  populate && url.searchParams.append("populate", populate);
  title && url.searchParams.append("filters[title]", title);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}

export async function createTreatments(
  title: string,
  description: string,
  appointments: number[],
  locations: number[],
  users: number[]
) {
  const url = new URL(TRT_URL.href);

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      data: {
        title: title,
        description: description,
        appointments: {
          connect: appointments,
        },
        locations: locations,
        users: users,
      },
    }),
  });

  return await res.json();
}
