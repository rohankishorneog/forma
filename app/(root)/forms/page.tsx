import FormButtons from "@/app/components/buttons/FormButtons";
import { getAllForms } from "@/lib/actions/forms.actions";
import React from "react";

const page = async () => {
  const allForms = await getAllForms();

  if (!allForms || allForms.length === 0) {
    return (
      <div className="flex justify-center items-center">
        No forms available.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center p-10">
      <div className="flex flex-col gap-3 pl-5">
        <h3 className="font-extrabold md:text-4xl text-lg">All Forms</h3>
        <p>Check out and manage your forms here</p>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {allForms.map((form) => (
          <div
            key={form._id}
            className="flex justify-between items-center border p-5 w-full shadow-md rounded-md"
          >
            <div>
              <h4 className=" md:text-lg font-semibold w-20 md:w-96 truncate">
                {form.title}
              </h4>
              <p className="text-gray-500 text-sm">
                {new Date(form.createdAt).toLocaleString()}
              </p>
            </div>
            <FormButtons formId={form._id.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
