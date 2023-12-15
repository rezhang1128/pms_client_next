import { getDefaultHeaders } from "../helpers";
import { Appointment } from "../types";
import { API_URL } from "../variables/urls";

export const APP_URL = new URL("appointments/", API_URL);
export const FAA_URL = new URL("faa/", API_URL);

export async function getAppointments({ id }: { id?: string }) {
  let url = new URL(APP_URL.href);
  url = new URL(`${id || ""}`, APP_URL.href);

  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
  });

  return await res.json();
}

export async function createAppointment({
  appointment,
}: {
  appointment: Appointment;
}) {
  const url = new URL(APP_URL.href);
  const { start, end, treatment, doctor, location, patient } = appointment;

  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      data: {
        start,
        end,
        doctor,
        patient,
        treatment,
        location,
      },
    }),
  });

  return await res.json();
}

export async function findAvailableAppointment(
  treatment: number,
  date: Date,
  doctor?: number,
  location?: number
) {
  const url = new URL(FAA_URL.href);
  url.searchParams.append("treatment", treatment.toString());
  url.searchParams.append("date", date.toISOString());

  doctor && url.searchParams.append("practitioner", doctor.toString());
  location && url.searchParams.append("location", location.toString());

  const res = await fetch(url, {
    mode: "cors",
  });

  return await res.json();
}
