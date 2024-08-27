"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function logIn(loginId, password) {
    if (loginId === "" || password === "") {
      return;
    }
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ loginId, password }),
    });
    const resData = await res.json();
    console.log(resData.message);
  }

  return (
    <div className="grid place-items-center w-full h-[100vh] ">
      <div className=" w-[20rem]  flex flex-col h-[15rem]  justify-between ">
        <div className="w-full text-black">
          <input
            className="w-full py-3 px-3"
            type="text"
            name=""
            placeholder="Login ID"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center py-3 border">
          <button
            className="w-[100%] h-[100%]"
            onClick={() => logIn(loginId, password)}
          >
            sign in
          </button>
        </div>
      </div>
    </div>
  );
}
