import React from "react";
import MobileAddFieldButton from "../MobileAddFieldButton/MobileAddFieldButton";
import { Field_Types } from "@/app/types";

interface FormCanvasProps {
  fields: Field_Types[];
  handleRemove: (field: Field_Types) => void;
}

const FormCanvas = ({ fields, handleRemove }: FormCanvasProps) => {
  return (
    <>
      <MobileAddFieldButton />
      <div
        className={`bg-slate-600 border-2 border-black shadow-md h-[calc(100vh-10rem)] flex  ${
          fields.length > 0 ? "items-start" : "items-center"
        } rounded-md p-10 sm:w-full md:w-[500px] lg:w-[750px] overflow-y-auto`}
      >
        {fields.length === 0 && (
          <p>Add fields by clicking or dragging the fields here.</p>
        )}

        <div className="flex flex-col gap-2 w-full">
          {fields.map((field: Field_Types) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <label>{field.label}</label>
                {getFieldComponent(field)}
              </div>

              <div className="self-end flex flex-col gap-2">
                <button>E</button>
                <button onClick={() => handleRemove(field)}>R</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormCanvas;

const getFieldComponent = (field: Field_Types) => {
  switch (field.type.toLowerCase()) {
    case "short answer":
    case "long answer":
      return <textarea className="w-full" placeholder="Enter your answer" />;
    case "select":
      return (
        <select className="w-full">
          {field.options &&
            field.options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
      );
    default:
      return <input type={field.type} className="w-full" />;
  }
};
