import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function CheckAuth() {
  const [authenticateUser, setAuthenticateUser] = useState([] as any);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : "";
    setAuthenticateUser(user);
    if (user.roles !== "admin") {
      router.push("/login");
    }
  }, []);
  return (
    <></>
  )
}

export default CheckAuth;
