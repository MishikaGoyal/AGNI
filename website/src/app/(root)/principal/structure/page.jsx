"use client";
import Navbar from "@/app/Components/NavbarPrincipal";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

export function ActionPlan({ data }) {
  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {/* Comparison to Standards */}
      <h2 className="text-xl font-bold mb-4">Comparison to Standards</h2>
      <div className="mb-6">
        <p>
          <strong>Teacher-student ratio:</strong> The recommended
          teacher-student ratio is 1:40, but your school has a ratio of{" "}
          {data.teacherStudentRatio}.
        </p>
        <p>
          <strong>Infrastructure:</strong> {data.infrastructure}
        </p>
      </div>

      {/* Action Plan */}
      <h2 className="text-xl font-bold mb-4">Action Plan</h2>

      {/* Immediate Actions */}
      <h3 className="text-lg font-semibold mb-2">Immediate Actions</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Teacher reallocation:</strong>{" "}
          {data.immediateActions.teacherReallocation}
        </li>
        <li>
          <strong>Boundary wall construction:</strong>{" "}
          {data.immediateActions.boundaryWallConstruction}
        </li>
      </ul>

      {/* Resource Use */}
      <h3 className="text-lg font-semibold mb-2">Resource Use</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Samagra Shiksha Scheme:</strong>{" "}
          {data.resourceUse.samagraShiksha}
        </li>
        <li>
          <strong>RMSA:</strong> {data.resourceUse.rmsa}
        </li>
      </ul>

      {/* Implementation */}
      <h2 className="text-xl font-bold mb-4">Implementation</h2>

      {/* Stakeholder Involvement */}
      <h3 className="text-lg font-semibold mb-2">Stakeholder Involvement</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>School authorities:</strong>{" "}
          {data.implementation.stakeholders.schoolAuthorities}
        </li>
        <li>
          <strong>Teachers:</strong> {data.implementation.stakeholders.teachers}
        </li>
        <li>
          <strong>Students:</strong> {data.implementation.stakeholders.students}
        </li>
      </ul>

      {/* Resource Management */}
      <h3 className="text-lg font-semibold mb-2">Resource Management</h3>
      <p>{data.implementation.resourceManagement}</p>

      {/* Timeline */}
      <h3 className="text-lg font-semibold mt-6">Timeline</h3>
      <ul className="list-disc pl-6">
        <li>
          <strong>Immediate:</strong> {data.timeline.immediate}
        </li>
        <li>
          <strong>Long-term:</strong> {data.timeline.longTerm}
        </li>
      </ul>
    </div>
  );
}

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

  const formatText = (text) => {
    return text
      .split("\n\n") // Split by double new lines to get sections
      .map((paragraph, index) => (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ));
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
    <>
    <Navbar />
    <div className="flex flex-col items-center mt-[10px]">

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
        <div>{suggestions ? formatText(suggestions) : ""}</div>
      </div>
    </div>
    </>
  );
};

export default Page;
