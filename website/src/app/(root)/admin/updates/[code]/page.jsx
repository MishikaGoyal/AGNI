import React from "react";

const page = async ({ params }) => {
  const code = params.code;
  const response = await fetch(`/api/updates/${code}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  const schoolData = await response.json();
  return <div></div>;
};

export default page;
