"use client";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  <div className="w-[100vw] h-[100vh] bg-white absolute">
    <div className="top-0 left-0">
      <ClipLoader />
    </div>
  </div>;
}
