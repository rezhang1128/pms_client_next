"use client";

import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth";
import { Button } from "antd";
import React from "react";

export default function LoginButton() {
  const auth = useAuthStore();
  const [data, setData] = React.useState({});

  return (
    <>
      <Button
        onClick={async () => {
          const res = await login({
            identifier: "test_admin",
            password: "testAdmin",
          });

          auth.setToken(res.jwt);
          setData(res.user);
        }}
      >
        Login Button
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
