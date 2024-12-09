"use client";

import React, { forwardRef, useRef } from "react";
import FieldDetails from "./FieldDetails";
import { Field_Types } from "@/app/types";

interface FieldDetailsModalProps {
  selectedField: Field_Types | null;
  setSelectedField: React.Dispatch<React.SetStateAction<Field_Types | null>>;
  handleUpdateField: () => void;
  closeDialog: () => void;
  openDialog: () => void;
}

export type Ref = HTMLDialogElement;

const FieldDetailsModal = forwardRef<Ref, FieldDetailsModalProps>(
  (
    { selectedField, setSelectedField, handleUpdateField, closeDialog },
    ref
  ) => {
    return (
      <dialog
        open={selectedField !== null}
        className=" relative rounded-md shadow-lg p-6 bg-white w-96 max-w-full md:hidden"
      >
        <button
          onClick={closeDialog}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <FieldDetails
          selectedField={selectedField}
          handleUpdateField={handleUpdateField}
          setSelectedField={setSelectedField}
          onClose={closeDialog}
        />
      </dialog>
    );
  }
);

export default FieldDetailsModal;
