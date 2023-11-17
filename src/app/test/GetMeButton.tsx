"use client";

import { getMe } from "@/lib/api/users";
import { Button } from "antd";
import React from "react";

export default function GetMeButton() {
  const [data, setData] = React.useState({});
  return (
    <>
      <Button
        onClick={() => {
          getMe().then(setData);
        }}
      >
        Get Me Button
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
