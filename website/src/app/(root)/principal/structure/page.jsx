"use client";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [schoolData, setSchoolData] = useState({});
  const [udiseId, setUdiseId] = useState(null);
  const [reason, setReason] = useState(null);
  useEffect(() => {
    const id = sessionStorage.getItem("udiseId");
    if (id) {
      setUdiseId(id);
      fetchSchoolData();
    }
  }, []);

  const fetchSchoolData = async (id) => {
    const response = await fetch("/api/school-data", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ udiseId: id }),
    });
    if (!response.ok) {
      console.error("Error in fetching school data");
    } else {
      const data = await response.json();
      console.log(data);
      setSchoolData(data);
    }
  };

  const generateReason = async () => {
    const response = await fetch("/api/reasons", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(schoolData),
    });
    if (!response.ok) {
      console.error({ message: "Error in fetching data" });
    }
    const resData = await response.json();
    setReason(resData);
    console.log(resData);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold mb-4">Status of your school</h1>
      <div>
        <strong>School Data:</strong>
        <pre>{JSON.stringify(schoolData, null, 2)}</pre>
      </div>
      <div>
        <button onClick={generateReason}>Find Out Why</button>
        {reason !== null && <div>{JSON.stringify(reason)}</div>}
      </div>
    </div>
  );
};

export default Page;
