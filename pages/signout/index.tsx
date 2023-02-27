import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react'

function Index() {
    useEffect(() => {
        try {
          const stored = localStorage.getItem("user");
          const user = stored ? JSON.parse(stored) : "";
          const config = {
            baseURL: "https://quocson.fatcatweb.top/",
            headers: { Authorization: "Bearer " + user.tokens.accessToken },
          };
          const axiosHeader = axios.create(config);
          axiosHeader.get("/auth/logout").then((res) => {
            console.log("res ", res.data.response);
            localStorage.removeItem("user");
          });
        } catch (error) {
          console.log(error);
        }
      }, []);
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <p className="text-md">Signout successfully</p>
      <Link href="/login" className="font-medium text-blue-700 text-md mt-4">
        Back to Login page
      </Link>
    </div>
  )
}

export default Index