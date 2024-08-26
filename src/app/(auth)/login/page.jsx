"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (loginId, password) => {
    const response = await fetch("http://localhost:3000/api/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ loginId, password }),
    });

    const data = await response.json();
    console.log(data.message);
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
