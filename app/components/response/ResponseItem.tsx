import Link from "next/link";
import React from "react";

export interface ResponseType {
  _id: string;
  title?: string;
  responseData: { [key: string]: string | number }[];
  formId: string;
}

interface ResponseItemProps {
  response: ResponseType;
}

const ResponseItem = ({ response }: ResponseItemProps) => {
  return (
    <div
      key={response._id}
      className="flex justify-between items-center border p-5 w-full shadow-md rounded-md"
    >
      <h3 className="truncate w-24 md:w-48 text-gray-800 font-bold text-xs  md:text-md">
        No: {response._id}
      </h3>

      <Link
        href={`/forms/${response.formId.toString()}/responses/${response._id}`}
      >
        <button className=" text-xs  md:text-md px-1.5 md:px-4 py-0.5 md:py-1 rounded-xl border border-green-500">
          view
        </button>
      </Link>
    </div>
  );
};

export default ResponseItem;
