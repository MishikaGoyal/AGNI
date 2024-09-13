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
      setSchoolData(data);
    }
  };

  return (
    <div>
      <div>UDISE ID: {udiseId}</div>
      <div>School Data: {JSON.stringify(schoolData)}</div>
    </div>
  );
};

export default Page;
