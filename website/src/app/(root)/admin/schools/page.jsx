"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSchoolData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/all-school-data",
          {
            method: "GET",
          }
        );
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/json")
        ) {
          throw new Error("Invalid response");
        }

        const data = await response.json();
        setSchools(data.schools || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSchoolData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        School Information
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              UDISE Code: {school.UDISE_CODE}
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">State:</span> {school.State}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">School Category:</span>{" "}
              {school.School_Category}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">School Management:</span>{" "}
              {school.School_Management}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">School Type:</span>{" "}
              {school.School_Type}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Grade Configuration:</span>{" "}
              {school.Grade_Configuration}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Year of Establishment:</span>{" "}
              {school.Year_of_Establishment}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Boundary Wall:</span>{" "}
              {school.Boundary_Wall ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Class Rooms:</span>{" "}
              {school.Total_Class_Rooms}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Library Available:</span>{" "}
              {school.Library_Available ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Separate Room for HM:</span>{" "}
              {school.Separate_Room_for_HM ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Drinking Water Available:</span>{" "}
              {school.Drinking_Water_Available ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Playground Available:</span>{" "}
              {school.Playground_Available ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Electricity Availability:</span>{" "}
              {school.Electricity_Availability ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Teachers:</span>{" "}
              {school.Total_Teachers}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Washrooms:</span>{" "}
              {school.Total_Washrooms}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Students:</span>{" "}
              {school.Total_Students}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Result:</span> {school.Result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
