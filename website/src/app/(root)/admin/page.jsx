"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import Image from "next/image";
import Navbar from "@/app/Components/Navbar";

const SearchBar = dynamic(() => import("@/app/Components/Searchbar"), { ssr: false });

export default function Page() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async () => {
    if (!file) {
      alert("You need to upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/result", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (schoolData) => setSelectedSchool(schoolData);

  const statistics = useMemo(
    () => [
      { icon: <LiaChalkboardTeacherSolid />, title: "Teachers", value: "31K" },
      { icon: <PiStudent />, title: "Students", value: "4,200" },
      { icon: <GrResources />, title: "Schools", value: "1,200" },
    ],
    []
  );

  return (
    <div className="min-w-max">
      {/* Background Image */}
      <div>
        <Image
          src="/img5.jpg"
          alt="Background"
          width={600}
          height={100}
          className="rounded-xl absolute ml-[800px] mt-[150px]"
          priority
        />
      </div>

      <Navbar />

      <p className="tracking-in-expand-fwd mt-[20px] ml-[40px] text-xl">
        The beautiful thing about learning is that no one can take it away from you.
      </p>

      <div className="flex flex-wrap justify-between mt-[500px] px-10 gap-8 relative">
        {/* Reusable Card Component */}
        <Card
          title="Analyse Structure"
          description="Get to know the structure of schools."
          imageSrc="/analyse.jpg"
          buttonText="Analyse Now"
          modalId="my_modal_1"
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />

        <Card
          title="Updates"
          description="See the updates by principal."
          imageSrc="/update.jpg"
          buttonText="See Now"
        />

        <Card
          title="Resource Allocation"
          description="See the requests made by the schools."
          imageSrc="/resource.jpg"
          buttonText="See Now"
        />
      </div>

      <div className="stats shadow mt-[100px] w-full">
        {statistics.map((stat, index) => (
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

const Card = ({ title, description, imageSrc, buttonText, modalId, handleFileChange, handleSubmit }) => (
  <div className="card bg-base-100 image-full w-[380px] shadow-xl animate-fade-in-up">
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
                  className="file-input file-input-bordered w-full max-w-xs mt-[20px]"
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
