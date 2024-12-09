// app/components/FormSubmission.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { Field_Types } from "@/app/types";
import { getFieldComponent } from "@/app/components/getFieldComponent/getFieldComponent";

interface FormSubmissionProps {
  formId: string;
  fields: Field_Types[];
  formTitle: string;
}

export default function FormSubmission({
  formId,
  fields,
  formTitle,
}: FormSubmissionProps) {
  // State to track form responses
  const [formResponses, setFormResponses] = useState<{ [key: string]: string }>(
    {}
  );

  // Handle input changes
  const handleInputChange = (fieldId: string, value: string) => {
    setFormResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Implement form submission logic
      console.log("Submitting form responses:", formResponses);

      // Example of how you might send the data
      // const response = await submitFormResponses(formId, formResponses);

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">{formTitle}</h2>

      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <div className="w-full">
            {React.cloneElement(getFieldComponent(field), {
              onChange: (
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
              ) => handleInputChange(field.id || "", e.target.value),
              value: formResponses[field.id || ""] || "",
            })}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Submit Responses
      </button>
    </form>
  );
}
