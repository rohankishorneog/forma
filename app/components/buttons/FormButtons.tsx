"use client";

import { deleteForm } from "@/lib/actions/forms.actions";
import Link from "next/link";
import React from "react";

interface FormButtonsProps {
  formId: string;
}

const FormButtons = ({ formId }: FormButtonsProps) => {
  const handleDelete = async (id: string) => {
    await deleteForm(id);
  };

  return (
    <div className="flex gap-7 items-center">
      <Link href={`/forms/${formId}`}>
        <button className="  px-4 py-2 rounded-xl border border-green-200">
          View
        </button>
      </Link>
      <Link href={`/forms/${formId}/responses`}>
        <button className="  px-4 py-2 rounded-xl border border-green-500">
          Responses
        </button>
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={`/forms/${formId}/edit`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
            E
          </button>
        </Link>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md"
          onClick={() => handleDelete(formId)}
        >
          D
        </button>
      </div>
    </div>
  );
};

export default FormButtons;
