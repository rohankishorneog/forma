"use client";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen  justify-center">
      <p className="mb-16 text-5xl">Build Forms That Work for You 🚀</p>
      <p className="w-[657px] text-center mb-8">
        Create stunning, dynamic, and user-friendly forms effortlessly. Collect
        data, engage users, and streamline your workflow with our form builder.
      </p>
      <p className="text-7xl mb-10 font-extrabold text-lime-500 shadown-lg shadow-lime-400">
        FORMA
      </p>

      <Link href={"/create-form"}>
        <button className="bg-green-500 text-white p-2 rounded-lg ">
          Lets Begin
        </button>
      </Link>
    </div>
  );
};

export default page;
