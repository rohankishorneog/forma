"use client";

import { fields } from "@/app/constants/constants";
import { Field_Types } from "@/app/types";
import React, { useState, useRef, useEffect } from "react";

interface MobileAddFieldButtonProps {
  handleAddField: (field: Field_Types) => void;
}
const MobileAddFieldButton = ({
  handleAddField,
}: MobileAddFieldButtonProps) => {
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
    <div className="absolute top-20 left-4 lg:hidden" ref={dropdownRef}>
      <button
        className="absolute bg-green-600 w-8 h-8 rounded-full text-white"
        onClick={handleDropdown}
      >
        +
      </button>

      {showDropdown && (
        <div className="flex flex-col gap-3 absolute top-9 border left-8 backdrop-blur-sm rounded-md p-2 w-40 ">
          {fields.map((field) => (
            <button
              key={field.type}
              className="bg-green-600 text-white rounded-md text-sm md:text-lg "
              onClick={() => handleAddField(field)}
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
