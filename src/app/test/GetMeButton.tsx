"use client";

import { getMe } from "@/lib/api/users";
import React from "react";

export default function GetMeButton() {
  const [data, setData] = React.useState({});
  return (
    <>
      <button
        onClick={() => {
          getMe().then(setData);
        }}
      >
        Get Me Button
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
