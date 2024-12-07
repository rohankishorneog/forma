"use client";

import FormCanvas from "@/app/components/FormCanvas/FormCanvas";
import { fields } from "@/app/constants/constants";
import { Field_Types } from "@/app/types";
import React, { useState } from "react";

const Page = () => {
  const [formFields, setFormFields] = useState<Field_Types[]>([]);

  const handleAddField = (newField: Field_Types) => {
    setFormFields((prevFields) => [
      ...prevFields,
      { ...newField, id: Date.now().toLocaleString() },
    ]);
  };

  const removeFormField = (field: Field_Types) => {
    setFormFields((prevFields) =>
      prevFields.filter((prevField) => prevField.id !== field.id)
    );
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center pt-12">
      <div className="w-full justify-center gap-7 mb-10 hidden md:flex">
        {fields.map((field) => (
          <button
            key={field.label}
            className="bg-slate-900 text-white px-2 py-1 rounded-md"
            onClick={() => handleAddField(field)}
          >
            {field.type}
          </button>
        ))}
      </div>
      <FormCanvas fields={formFields} handleRemove={removeFormField} />
    </div>
  );
};

export default Page;
