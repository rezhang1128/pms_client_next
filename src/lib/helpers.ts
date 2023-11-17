// All helper functions go here

import { useAuthStore } from "@/stores/auth";

export function getDefaultHeaders(auth: boolean = true) {
  return {
    "Content-Type": "application/json",
    Authorization: auth ? `Bearer ${useAuthStore.getState().token}` : "",
  };
}
