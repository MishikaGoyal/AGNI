"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function logIn(loginId, password) {
    if (loginId === "" || password === "") {
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        sessionStorage.setItem("userId", resData.loginId);
        sessionStorage.setItem("udiseId", resData.udiseId);
        router.push(`/${resData.role.toLowerCase()}`);
      }
      console.log(resData.message);
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[20rem] flex flex-col gap-4">
        <input
          className="w-full py-3 px-3 border-2 rounded-xl"
          type="text"
          placeholder="Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input
          className="w-full py-3 px-3 border-2 rounded-xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-700"
          onClick={() => logIn(loginId, password)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
