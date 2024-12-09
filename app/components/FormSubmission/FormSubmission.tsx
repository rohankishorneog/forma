"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { Field_Types } from "@/app/types";
import { getFieldComponent } from "@/app/components/getFieldComponent/getFieldComponent";
import { createResponse } from "@/lib/actions/responses.actions";

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
  const [formResponses, setFormResponses] = useState<{ [key: string]: string }>(
    {}
  );
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate completion percentage
  useEffect(() => {
    const filledFields = Object.values(formResponses).filter(
      (response) => response.trim() !== ""
    ).length;
    const totalFields = fields.length;

    const percentage =
      totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

    setCompletionPercentage(percentage);
  }, [formResponses, fields]);

  // Handle input changes
  const handleInputChange = (label: string, value: string) => {
    setFormResponses((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Convert formResponses to the array of objects format
      const responseData = Object.entries(formResponses).map(
        ([key, value]) => ({ [key]: value })
      );

      console.log("Submitting form responses:", responseData);
      await createResponse(formId.toString(), responseData);

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

      {/* Completion Percentage Indicator */}
      <div className="mb-6 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
        <div className="text-center text-sm mt-2 font-medium">
          {completionPercentage}% Completed
        </div>
      </div>

      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          <div className="w-full">
            {React.cloneElement(getFieldComponent(field), {
              onChange: (
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
              ) => handleInputChange(field.label || "", e.target.value),
              value: formResponses[field.label || ""] || "",
            })}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        disabled={completionPercentage < 100}
      >
        Submit Responses{" "}
        {completionPercentage < 100 ? `(${completionPercentage}%)` : ""}
      </button>
    </form>
  );
}
