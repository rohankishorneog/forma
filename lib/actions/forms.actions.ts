"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Field_Types } from "@/app/types";
import Form from "@/database/Forms.model";
import { connectToDatabase } from "./mongoose";

// Create a new form
export async function createForm(formData: {
  title: string;
  fields: Field_Types[];
}) {
  console.log("hola");
  try {
    console.log(formData);
    if (!formData.title) {
      throw new Error("Form title is required");
    }

    await connectToDatabase();

    const newForm = await Form.create({
      title: formData.title,
      fields: formData.fields,
    });

    return JSON.parse(
      JSON.stringify({
        _id: newForm._id.toString(),
        title: newForm.title,
        fields: newForm.fields.map((field) => ({
          type: field.type,
          label: field.label,
          placeholder: field.placeholder || "",
          options: field.options || [],
          id: field.id || Date.now().toString(),
        })),
        createdAt: newForm.createdAt,
        updatedAt: newForm.updatedAt,
      })
    );
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to create form");
  }
}

export async function updateForm(
  formId: string,
  formData: {
    title?: string;
    fields?: Field_Types[];
  }
) {
  try {
    // Ensure database connection
    await connectToDatabase();

    const fieldsToUpdate = formData.fields?.map((field) => ({
      type: field.type,
      label: field.label,
      placeholder: field.placeholder || "",
      options: field.options || [],
      id: field.id || Date.now().toString(),
    }));

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      {
        ...(formData.title && { title: formData.title }),
        ...(fieldsToUpdate && { fields: fieldsToUpdate }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedForm) {
      throw new Error("Form not found");
    }

    const serializedForm = {
      _id: updatedForm._id.toString(),
      title: updatedForm.title,
      fields: updatedForm.fields.map((field) => ({
        type: field.type,
        label: field.label,
        placeholder: field.placeholder || "",
        options: field.options || [],
        id: field.id || Date.now().toString(),
      })),
      createdAt: updatedForm.createdAt,
      updatedAt: updatedForm.updatedAt,
    };

    return serializedForm;
  } catch (error) {
    console.error("Error updating form:", error);
    throw new Error(
      `Failed to update form: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Remove a form
export async function deleteForm(formId: string) {
  try {
    connectToDatabase();

    const deletedForm = await Form.findByIdAndDelete(formId);

    if (!deletedForm) {
      throw new Error("Form not found");
    }

    revalidatePath("/forms");

    redirect("/forms");
  } catch (error) {
    console.error("Error deleting form:", error);
    throw new Error("Failed to delete form");
  }
}

// Get a single form by ID
export async function getFormById(formId: string) {
  try {
    connectToDatabase();

    const form = await Form.findById(formId);

    if (!form) {
      throw new Error("Form not found");
    }

    return JSON.parse(
      JSON.stringify({
        _id: form._id.toString(),
        title: form.title,
        fields: form.fields.map((field) => ({
          type: field.type,
          label: field.label,
          placeholder: field.placeholder || "",
          options: field.options || [],
          id: field.id || Date.now().toString(),
        })),
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      })
    );
  } catch (error) {
    console.error("Error fetching form:", error);
    throw new Error("Failed to fetch form");
  }
}

// Get all forms
export async function getAllForms() {
  try {
    connectToDatabase();

    const forms = await Form.find({}).sort({ updatedAt: -1, createdAt: -1 });

    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw new Error("Failed to fetch forms");
  }
}
