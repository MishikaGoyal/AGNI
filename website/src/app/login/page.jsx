"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const logIn = useCallback(async () => {
    if (!loginId || !password) return; 

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });

      const resData = await res.json();
      if (res.ok) {
        router.push(`/${resData.role.toLowerCase()}`);
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  }, [loginId, password, router]);

  return (
    <div className="relative max-w-screen-md">
   
      <div className="absolute mt-[50px]">
        <Image
          src="/img1.jpg"
          alt="Children"
          className="mt-[70px] ml-[80px] w-[400px] tracking-in-expand-fwd"
          width={400}
          height={300}
          layout="intrinsic"
        />

        <Image
          src="/img2.jpg"
          alt="Learning"
          className="w-[400px] ml-[80px] tracking-in-expand-fwd"
          width={400}
          height={300}
          layout="intrinsic"
        />
        <Image
          src="/img3.jpg"
          alt="Book"
          className="w-[400px] ml-[480px] -mt-[493px] tracking-in-expand-fwd"
          width={400}
          height={300}
          layout="intrinsic"
        />
        <Image
          src="/img4.jpg"
          alt="Learning"
          className="w-[400px] ml-[480px] -mt-[6px] tracking-in-expand-fwd"
          width={400}
          height={300}
          layout="intrinsic"
        />
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow absolute mt-[320px] ml-[80px] ">
        {["Categorising Schools", "Restructure", "Resource", "Feedback"].map(
          (title, index) => (
            <div className="stat tracking-in-expand-fwd" key={index}>
              <div className="stat-title">{title}</div>
              <div className="stat-value">
                {["Odd", "Strategy", "Allocation", "Verify"][index]}
              </div>
              <div className="stat-desc">
                {["Standard", "Ways", "To Transform", "Discussions"][index]}
              </div>
            </div>
          )
        )}
      </div>


      <div className="grid place-items-center h-[100vh] ml-[900px]">
        <div className="w-[20rem] flex flex-col h-[15rem] justify-between">
          <input
            className="w-full py-3 px-3 text-black border-2 rounded-xl tracking-in-expand-fwd"
            type="text"
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            className="w-full py-3 px-3 mt-4 text-black border-2 rounded-xl tracking-in-expand-fwd"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 mt-4 bg-black text-white rounded-full hover:bg-slate-600 bounce-bottom"
            onClick={logIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
