"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [schoolData, setSchoolData] = useState({});
  const [udiseId, setUdiseId] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("udiseId");
    if (id) {
      setUdiseId(id);
      fetchSchoolData(id);
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
      console.log(data)
      setSchoolData(data);

    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold mb-4">Status of your school</h1>
      <div>
        <strong>School Data:</strong>
        <pre>{JSON.stringify(schoolData, null, 2)}</pre>
      </div>
    </div>

  );
};

export default Page;
