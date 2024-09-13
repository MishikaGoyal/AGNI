"use client";
import { useEffect, useState } from "react";

const Page = () => {
  const code = "29200123908";
  const [data, setData] = useState("");
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/test", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(code),
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  return <div></div>;
};

export default Page;
