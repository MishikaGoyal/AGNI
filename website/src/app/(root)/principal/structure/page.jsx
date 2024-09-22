"use client";
import Navbar from "@/app/Components/NavbarPrincipal";
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
      setSchoolData(data.data);
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
      <section className="px-[10%]">
        <div className=" bg-white py-5 px-3">
          <div className="flex justify-between py-4 mb-4 bg-blue-500 text-white px-3 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold">
              Your school is {schoolData.Result}{" "}
            </h2>
            <h2 className="text-3xl font-bold">{schoolData.UDISE_CODE}</h2>
          </div>
          <div className="grid grid-cols-6  text-white grid-rows-2 gap-7 [&>*]:rounded-lg  h-[70vh] [&>*]:h-[22vh] [&>*]:border-black [&>*]:shadow-md ">
            <div className="col-span-2 flex text-white bg-blue-500 flex-col items-center justify-center">
              <div className="text-[5rem]">{schoolData.Total_Teachers}</div>
              <div className="font-semibold text-2xl">Teachers</div>
            </div>
            <div className="col-span-2 flex bg-blue-800  text-white flex-col items-center justify-center">
              <div className="text-[5rem]">{schoolData.Total_Students}</div>
              <div className="font-semibold text-2xl">Students</div>
            </div>
            <div className="col-span-2 flex bg-blue-500  text-white flex-col items-center justify-center">
              <div className="text-[5rem]">{schoolData.Total_Class_Rooms}</div>
              <div className="font-semibold text-2xl">Class Rooms</div>
            </div>
            <div className="col-span-2 flex flex-col bg-blue-800 items-center justify-center">
              <div className="text-[5rem]">
                {schoolData.Grade_Configuration}
              </div>
              <div className="font-semibold text-2xl">Grades</div>
            </div>
            <div className="col-span-2 font-semibold bg-blue-500  text-white flex flex-col items-center justify-center">
              <div className="text-[2.5rem] flex items-center justify-center flex-col">
                <div>Library</div>
                {`${
                  schoolData.Library_Available === "1"
                    ? "Available"
                    : "Not Available"
                }`}
              </div>
            </div>
            <div className="col-span-2 font-semibold flex bg-blue-800 flex-col items-center justify-center">
              <div className="text-[2.2rem] flex items-center justify-center flex-col">
                <div>Drinking water</div>
                {`${
                  schoolData.Drinking_Water_Available === "1"
                    ? "Available"
                    : "Not Available"
                }`}
              </div>
            </div>
            <div className="col-span-2 font-semibold bg-blue-500  text-white flex flex-col items-center justify-center">
              <div className="text-[2.2rem] flex items-center justify-center flex-col">
                <div>Playground</div>
                {`${
                  schoolData.Playground_Available === "1"
                    ? "Available"
                    : "Not Available"
                }`}
              </div>
            </div>
            <div className="col-span-2 flex font-semibold bg-blue-800 flex-col items-center justify-center">
              <div className="text-[2.2rem] flex items-center justify-center flex-col">
                <div>Electricity</div>
                {`${
                  schoolData.Electricity_Availability === "1"
                    ? "Available"
                    : "Not Available"
                }`}
              </div>
            </div>
            <div className="col-span-2  font-semibold bg-blue-500  text-white flex flex-col items-center justify-center">
              <div className="text-[2.2rem] flex items-center justify-center flex-col">
                <div>Boundary</div>
                {`${
                  schoolData.Boundary_Wall === "1" ? "Present" : "Not Present"
                }`}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8 w-full py-2 px-2 text-white flex items-center justify-center">
          <button
            onClick={generateReason}
            className="btn btn-outline  bg-blue-500 text-white"
          >
            Find Out Why
          </button>
        </div>
        <div>
          {reason !== null && (
            <div className="bg-slate-200 px-3 py-3 rounded-md flex items-center justify-center text-xl flex-col">
              {reason.map((item) => {
                return <div>{item}</div>;
              })}
            </div>
          )}
        </div>
        <div className="mt-8 mb-8 w-full  flex items-center justify-center">
          <button
            onClick={generateSuggestions}
            className="btn btn-outline bg-blue-500 text-white"
          >
            Get Suggestions
          </button>
        </div>
        <div className="text-lg bg-slate-100 px-5 py-3 rounded-lg font-semibold">
          {suggestions ? formatText(suggestions) : ""}
        </div>
      </section>
    </>
  );
};

export default Page;
