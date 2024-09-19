import Link from "next/link";
import React from "react";

const UpdateComponent = ({ data }) => {
  return (
    <div>
      <div className="grid grid-cols-5 border-2 py-3 px-5 rounded-lg my-3  ">
        <div className="col-span-2 py-2 font-bold">{data.School_Name}</div>
        <div className="py-2 font-semibold">{data.UDISE_CODE}</div>
        <div>
          <div
            className={` w-[80%]  py-2  px-2  rounded-lg  text-white ${
              data.Verified === false ? "bg-red-500" : "bg-green-400"
            }`}
          >{`${data.Verified === false ? "Pending" : "Verifed"}`}</div>
        </div>
        <div>
          <Link href={`/admin/updates/${data.UDISE_CODE}`}>
            <button className="py-2 bg-blue-600 text-white rounded-lg px-2">
              Verify Documents
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateComponent;
