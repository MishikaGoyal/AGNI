"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import Image from "next/image";
import Navbar from "@/app/Components/Navbar";

// Dynamically import components that are not immediately needed
const SearchBar = dynamic(() => import("@/app/Components/Searchbar"), { ssr: false });

export default function Page() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit() {
    if (!file) {
      alert("You need to upload a file");
      return; // Exit function if no file is selected
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/result", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (schoolData) => {
    setSelectedSchool(schoolData);
  };

  // Memoize stats data to avoid unnecessary recalculations
  const stats = useMemo(
    () => [
      { icon: <LiaChalkboardTeacherSolid />, title: "Teachers", value: "31K" },
      { icon: <PiStudent />, title: "Students", value: "4,200" },
      { icon: <GrResources />, title: "Schools", value: "1,200" },
    ],
    []
  );

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {/* Video Background - Lazy Load and Add Fallback */}
      <div className="relative w-full h-[60vh]">
        <video
          src="/video3.mp4"
          className="w-full h-full object-cover opacity-70"
          loop
          autoPlay
          muted
          loading="lazy"
        ></video>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Quote Section */}
      <p className="tracking-in-expand-fwd mt-8 mx-4 text-xl text-center">
        The beautiful thing about learning is that no one can take it away from you.
      </p>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center mt-16 gap-8 px-4">
        {/* Analyse Structure Card */}
        <Card
          title="Analyse Structure"
          description="Get to know the structure of schools."
          imageSrc="/analyse.jpg"
          buttonText="Analyse Now"
          modalId="my_modal_1"
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />

        {/* Updates Card */}
        <Card
          title="Updates"
          description="See the updates by principal."
          imageSrc="/update.jpg"
          buttonText="See Now"
        />

        {/* Resource Allocation Card */}
        <Card
          title="Resource Allocation"
          description="See the requests made by the schools."
          imageSrc="/resource.jpg"
          buttonText="See Now"
        />
      </div>

      {/* Stats Section */}
      <div className="stats shadow mt-12 w-full flex justify-around px-4 py-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat tracking-in-expand-fwd flex-1 text-center mx-4">
            <div className="stat-figure text-xl">{stat.icon}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({ title, description, imageSrc, buttonText, modalId, handleFileChange, handleSubmit }) => (
  <div className="card bg-base-100 image-full w-full max-w-xs shadow-xl animate-fade-in-up">
    <figure>
      <Image src={imageSrc} alt={title} width={380} height={250} className="rounded-xl" loading="lazy" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        {modalId ? (
          <>
            <button
              className="wobble-hor-bottom btn bg-blue-700 text-white"
              onClick={() => document.getElementById(modalId).showModal()}
            >
              {buttonText}
            </button>
            <dialog id={modalId} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Submit Report</h3>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs mt-4"
                  onChange={handleFileChange}
                />
                <div className="modal-action">
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        ) : (
          <button className="wobble-hor-bottom btn btn-primary">{buttonText}</button>
        )}
      </div>
    </div>
  </div>
);
