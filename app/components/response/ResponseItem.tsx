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
      <h3>{response._id}</h3>
      <Link
        href={`/forms/${response.formId.toString()}/responses/${response._id}`}
      >
        <button className="px-4 py-2 rounded-xl border border-green-500">
          view
        </button>
      </Link>
    </div>
  );
};

export default ResponseItem;
