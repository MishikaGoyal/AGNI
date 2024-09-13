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
    console.log("hello world");
    if (!file) {
      alert("You need to upload a file");
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
  const stats = useMemo(() => [
    { icon: <LiaChalkboardTeacherSolid />, title: "Teachers", value: "31K" },
    { icon: <PiStudent />, title: "Students", value: "4,200" },
    { icon: <GrResources />, title: "Schools", value: "1,200" },
  ], []);

  return (
    <div>
      {/* Video Background - Lazy Load and Add Fallback */}
      <div>
        <video
          src="/video3.mp4"
          className="slide-in-elliptic-left-fwd w-[700px] absolute mt-[150px] ml-[360px] rounded-xl opacity-70"
          loop
          autoPlay
          muted
          loading="lazy" // Lazy loading video
        ></video>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Quote Section */}
      <p className="tracking-in-expand-fwd mt-[20px] ml-[40px] text-xl">
        The beautiful thing about learning is that no one can take it away from you.
      </p>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-between mt-[500px] px-10 gap-8 relative">
        {/* Analyse Structure Card */}
        <Card
          title="Analyse Structure"
          description="Get to know the structure of schools."
          imageSrc="/analyse.jpg"
          buttonText="Analyse Now"
          modalId="my_modal_1"
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
      <div className="stats shadow mt-[100px] w-full">
        {stats.map((stat, index) => (
          <div key={index} className="stat tracking-in-expand-fwd">
            <div className="stat-figure text-xl">{stat.icon}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({ title, description, imageSrc, buttonText, modalId }) => (
  <div className="card bg-base-100 image-full w-[380px] shadow-xl animate-fade-in-up">
    <figure>
      <Image
        src={imageSrc}
        alt={title}
        width={380}
        height={250}
        className="rounded-xl"
        loading="lazy" // Lazy loading image
      />
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
                  className="file-input file-input-bordered w-full max-w-xs mt-[20px]"
                />
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Submit</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        ) : (
          <button className="wobble-hor-bottom btn btn-primary">{buttonText}</button>
        )}
      </div>
      <div className="card bg-base-100 image-full w-[400px] shadow-xl  -mt-[258px] ml-[500px] absolute">
  <figure>
    <img
      src="https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Resource Request</h2>
    <p>See the requests made by the schools</p>
    <div className="card-actions justify-end">
      <button className=" wobble-hor-bottom btn btn-primary">See Now</button>
    </div>
  </div>
</div>
<div>
<div className="stats shadow mt-[100px] w-full">
  <div className="stat">
    <div className="stat-figure text-xl">
  <LiaChalkboardTeacherSolid />
    </div>
    <div className="stat-title">Teachers</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc"></div>
  </div>

  <div className="stat">
    <div className="stat-figure text-xl">
  <PiStudent />
    </div>
    <div className="stat-title">Students</div>
    <div className="stat-value">4,200</div>
   
  </div>

  <div className="stat">
    <div className="stat-figure text-xl">
   <GrResources />
    </div>
    <div className="stat-title">Resources</div>
    <div className="stat-value">1,200</div>
 
  </div>
</div>
</div>
      </div>
  
   </div>
   
  );
}

