import DeleteResponseButton from "@/app/components/buttons/DeleteResponseButton";
import { URLProps } from "@/app/types";
import {
  deleteResponseById,
  getResponseById,
} from "@/lib/actions/responses.actions";
import React from "react";

const page = async ({ params }: URLProps) => {
  const response = await getResponseById(params.responseId);

  // Converting Map to an array of key-value pairs for rendering
  const responseEntries =
    response?.responseData instanceof Map
      ? Array.from(response.responseData.entries())
      : [];

  return (
    <div className="flex flex-col justify-center p-10">
      <div className="flex flex-col gap-3 pl-5">
        <h3 className="font-extrabold md:text-4xl text-lg">Response</h3>
        <div className="flex w-full justify-between items-center">
          <p>Title: {response?.title}</p>
          <DeleteResponseButton responseId={response._id} />
        </div>
      </div>

      <div className="mt-4 p-6">
        {responseEntries.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Question</th>
                <th className="border p-2 text-left">Answer</th>
              </tr>
            </thead>
            <tbody>
              {responseEntries.map(([key, value], index) => (
                <tr key={index} className="border-b">
                  <td className="border p-2">{String(key)}</td>
                  <td className="border p-2">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No response data available</p>
        )}
      </div>
    </div>
  );
};

export default page;
