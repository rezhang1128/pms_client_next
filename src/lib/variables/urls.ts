export const SERVER_URL = new URL(
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:1337"
);

export const API_URL = new URL("api/", SERVER_URL);
