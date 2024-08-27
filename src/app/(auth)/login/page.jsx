"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (loginId, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });

      if (res.ok) {
        router.push("/protected");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="grid place-items-center w-full h-[100vh] ">
      <div className=" w-[20rem]  flex flex-col h-[15rem]  justify-between ">
        <div className="w-full text-black">
          <input
            className="w-full py-3 px-3"
            type="text"
            name=""
            placeholder="Login ID"
            id=""
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className="w-full text-black">
          <input
            className="w-full py-3 px-3"
            type="Password"
            name=""
            placeholder="password"
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center py-3 border">
          <button className="" onClick={() => signIn(loginId, password)}>
            sign in
          </button>
        </div>
      </div>
    </div>
  );
}
