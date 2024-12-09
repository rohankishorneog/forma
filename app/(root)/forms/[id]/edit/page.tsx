import FormCanvas from "@/app/components/FormCanvas/FormCanvas";
import { URLProps } from "@/app/types";
import { getFormById } from "@/lib/actions/forms.actions";
import React from "react";

const page = async ({ params }: URLProps) => {
  const { id } = await params;
  const form = await getFormById(id);
  return (
    <div>
      <FormCanvas form={form} />
    </div>
  );
};

export default page;
