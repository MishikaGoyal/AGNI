"use client";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [schoolData, setSchoolData] = useState({});
  const [udiseId, setUdiseId] = useState(null);
  const [reason, setReason] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
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
      console.log(data);
    }
  };

  const generateReason = async () => {
    const response = await fetch("/api/reasons", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(schoolData),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error({ message: "Error in fetching data" });
    }
    const resData = await response.json();
    setReason(resData);
    console.log(resData);
  };

  const generateSuggestions = async () => {
    const response = await fetch("/api/suggestions", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(schoolData),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Error in generating suggestions");
    }
    const resData = await response.json();
    setSuggestions(resData);
    console.log(suggestions);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold mb-4">Status of your school</h1>

      {/* Conditionally render the table only after data is fetched */}
      {schoolData && schoolData.data ? (
        <table className="table w-full max-w-md">
          <thead>
            <tr>
              <th className="text-left">Field</th>
              <th className="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">UDISE Code</td>
              <td>{schoolData.data.UDISE_CODE}</td>
            </tr>
            <tr>
              <td className="font-semibold">Result</td>
              <td>{schoolData.data.Result}</td>
            </tr>
            {/* <tr>
              <td className="font-semibold">School Name</td>
              <td>{schoolData.data.School_Name || "N/A"}</td>
            </tr> */}
            <tr>
              <td className="font-semibold">State</td>
              <td>{schoolData.data.State}</td>
            </tr>
            <tr>
              <td className="font-semibold">Total Class Rooms</td>
              <td>{schoolData.data.Total_Class_Rooms}</td>
            </tr>
            <tr>
              <td className="font-semibold">Total Teachers</td>
              <td>{schoolData.data.Total_Teachers}</td>
            </tr>
            <tr>
              <td className="font-semibold">Total Students</td>
              <td>{schoolData.data.Total_Students}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading school data...</p>
      )}

      <div className="mt-8 mb-8">
        <button onClick={generateReason} className="btn btn-outline">
          Find Out Why
        </button>
        <div>{reason !== null && <div>{JSON.stringify(reason)}</div>}</div>
      </div>
      <div className="mt-8 mb-8">
        <button onClick={generateSuggestions} className="btn btn-outline">
          Get Suggestions
        </button>
        <div>
          {suggestions !== null && <div>{JSON.stringify(suggestions)}</div>}
        </div>
      </div>
    </div>
  );
};

export default Page;
