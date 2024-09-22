import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResourceComponent = ({ data }) => {
  return (
    <div>
      <div className="grid grid-cols-7 border-2 py-3 px-5 rounded-lg my-3  ">
        <div className="col-span-2 py-2 font-bold">{data.School_Name}</div>
        <div className="py-2 font-semibold">{data.UDISE_CODE}</div>
        <div className="py-2 font-semibold">50000</div>
        <div>
          <div
            className={` w-[60%]  py-2  px-2  rounded-lg  text-white ${
              data.Verified === false ? "bg-red-500" : "bg-green-400"
            }`}
          >{`${data.Verified === false ? "Pending" : "Verifed"}`}</div>
        </div>
        <div>
          <Image src="/accept.png" width={30} height={30} alt="tick" />
        </div>
        <div>
          <Image src="/remove.png" width={30} height={30} alt="cross" />
        </div>
      </div>
    </div>
  );
};

export default ResourceComponent;
