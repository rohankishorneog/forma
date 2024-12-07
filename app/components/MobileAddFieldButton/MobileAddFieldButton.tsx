"use client";

import { Field_Types } from "@/app/constants/constants";
import React, { useState, useRef, useEffect } from "react";

const MobileAddFieldButton = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-2 left-2 lg:hidden" ref={dropdownRef}>
      <button
        className="absolute bg-black w-8 h-8 rounded-full text-white"
        onClick={handleDropdown}
      >
        +
      </button>

      {showDropdown && (
        <div className="flex flex-col gap-3 absolute top-9 border left-8 backdrop-blur-sm rounded-md p-2 w-40 ">
          {Field_Types.map((field) => (
            <button
              key={field.type}
              className="bg-slate-500 text-white rounded-md text-sm md:text-lg "
            >
              {field.type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileAddFieldButton;
