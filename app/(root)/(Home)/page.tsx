'use client'

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Link href={"/create-form"}>
        <button className="bg-green-500 text-white p-2 rounded-lg ">
          Navigate to create
        </button>
      </Link>
    </div>
  );
};

export default page;
