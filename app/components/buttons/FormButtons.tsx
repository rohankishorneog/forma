"use client";

import Edit from "@/app/assets/icons/Edit";
import Trash from "@/app/assets/icons/Trash";
import { deleteForm } from "@/lib/actions/forms.actions";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

interface FormButtonsProps {
  formId: string;
}

const FormButtons = ({ formId }: FormButtonsProps) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteForm(id);
      return toast("Deleted", {
        position: "top-center",
        type: "success",
      });
    } catch (error) {
      toast("Failed to delete", {
        position: "top-center",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-7 items-center">
      <div className="flex flex-col md:flex-row gap-2">
        <Link href={`/forms/${formId}/responses`}>
          <button className=" px-1.5 md:px-4 py-0.5 md:py-1 rounded-xl border border-green-500 text-xs  md:text-md">
            Responses
          </button>
        </Link>
        <Link href={`/forms/${formId}`}>
          <button className=" text-xs  md:text-md px-1.5 md:px-4 py-0.5 md:py-1 rounded-xl border border-green-200">
            View
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/forms/${formId}/edit`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
            <Edit />
          </button>
        </Link>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md"
          onClick={() => handleDelete(formId)}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default FormButtons;
