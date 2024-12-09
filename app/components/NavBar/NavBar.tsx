"use client";

import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="border-b-2 border-green-500">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="text-3xl font-bold text-green-400 ">FORMA</div>

        <div className="flex gap-2">
          <Link href={"/forms"}>
            <button className=" border border-green-300 rounded-xl p-2 text-xs md:text-sm">
              My Forms
            </button>
          </Link>
          <Link href={"/create-form"}>
            <button className=" border bg-green-600 rounded-xl p-2 text-white  text-xs md:text-sm">
              Create{" "}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
