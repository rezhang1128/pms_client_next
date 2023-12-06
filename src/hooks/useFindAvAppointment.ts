import useSWR from "swr";
import { findAvailableAppointment } from "@/lib/api/appointments";

export function useFindAvAppointments(
  treatment: number,
  date: Date,
  doctor?: number,
  location?: number
) {
  return useSWR(
    [treatment, date, doctor, location],
    ([treatment, date, doctor, location]) =>
      findAvailableAppointment(treatment, date, doctor, location)
  );
}
