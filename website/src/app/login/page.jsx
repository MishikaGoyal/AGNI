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
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        router.push(`/${resData.role.toLowerCase()}`);
      }
      console.log(resData.message);
    } catch (error) {
      console.error("an unexpected error occured", error);
    }
  }

  return (
    <>
    <div>
      <div className='absolute mt-[50px]'>
        <img src="https://cdn.pixabay.com/photo/2015/08/05/13/55/children-876543_1280.jpg" alt="" className='mt-[70px] ml-[80px] w-[400px]' />
        <img src="https://cdn.pixabay.com/photo/2018/09/04/10/27/never-stop-learning-3653430_1280.jpg" alt="" className='w-[400px] ml-[80px]' />
        <div className='flex'>
          <img src="https://cdn.pixabay.com/photo/2017/12/22/08/01/book-3033196_1280.jpg" alt="" className='w-[400px] ml-[480px] -mt-[493px]' />
        </div>
      </div>
     <div className="stats stats-vertical lg:stats-horizontal shadow absolute mt-[320px] ml-[80px] ">
  <div className="stat">
    <div className="stat-title tracking-in-expand-fwd">Categorising Schools</div>
    <div className="stat-value">Odd</div>
    <div className="stat-desc">Standard</div>
  </div>

  <div className="stat">
    <div className="stat-title tracking-in-expand-fwd">Restructure</div>
    <div className="stat-value">Strategy</div>
    <div className="stat-desc">Ways</div>
  </div>

  <div className="stat">
    <div className="stat-title tracking-in-expand-fwd">Resource</div>
    <div className="stat-value">Allocation</div>
    <div className="stat-desc">To Transform</div>
  </div>
  <div className="stat ">
    <div className="stat-title tracking-in-expand-fwd">Feedback</div>
    <div className="stat-value">Verify</div>
    <div className="stat-desc">Discussions</div>
  </div>
</div>
    </div>
    <div className="grid place-items-center h-[100vh] ml-[900px] ">
      <div className=" w-[20rem]  flex flex-col h-[15rem]  justify-between ">
        <div className="w-full text-black border-2 rounded-xl">
          <input
 
            className="w-full py-3 px-3 rounded-xl tracking-in-expand-fwd "
            type="text"
            name=""
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className=" tracking-in-expand-fwd w-full text-black border-2 rounded-xl">
          <input
            className="w-full py-3 px-3 rounded-xl"
            type="Password"
            name=""
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center py-3 border bg-black text-white rounded-full hover:bg-slate-600">
          <button
            className=" bounce-bottom w-[100px] h-[100%]"
            onClick={() => logIn(loginId, password)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
</>);
}
