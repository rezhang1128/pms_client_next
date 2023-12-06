import { getDefaultHeaders } from "../helpers";
import { Location } from "../types";
import { API_URL } from "../variables/urls";

export const LOC_URL = new URL("locations/", API_URL);

export async function getLocations({ name }: { name?: string }) {
  const url = new URL(LOC_URL.href);
  name && url.searchParams.append("filters[name][$contains]", name);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}

export async function createLocation({ location }: { location: Location }) {
  const { name, email, streetNumber, street, suburb, postcode, phone } =
    location;
  const url = new URL(LOC_URL.href);

  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      data: {
        name,
        email,
        streetNumber,
        street,
        suburb,
        postcode,
        phone,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

export async function updateLocation(
  { location }: { location: Location },
  locationId: string
) {
  const url = new URL(`${locationId}`, LOC_URL.href);
  const { name, email, streetNumber, street, suburb, postcode, phone } =
    location;
  const res = await fetch(url, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      data: {
        name,
        email,
        streetNumber,
        street,
        suburb,
        postcode,
        phone,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

export async function deleteLocation(locationId: string) {
  const url = new URL(`${locationId}`, LOC_URL.href);

  const res = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return await res.json();
}
