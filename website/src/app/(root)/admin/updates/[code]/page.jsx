"use client";
import React from "react";
import { useState, useEffect } from "react";

const Page = ({ params }) => {
  const { code } = params;
  const [schoolData, setSchoolData] = useState({});
  async function fetchData() {
    const response = await fetch(`/api/update/${code}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    setSchoolData(data[0]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{JSON.stringify(schoolData)}</div>;
};

export default Page;
