import React from "react";
import MobileAddFieldButton from "../MobileAddFieldButton/MobileAddFieldButton";

const FormCanvas = () => {
  return (
    <>
      <MobileAddFieldButton />
      <div className="bg-slate-600 border-2 border-black shadow-md h-[calc(100vh-10rem)] flex items-center rounded-md p-10">
        Add fields by clicking or dragging the fields here.
      </div>
    </>
  );
};

export default FormCanvas;
