"use server";

import { connectToDatabase } from "./mongoose";
import Form from "@/database/Forms.model";
import Response from "@/database/responses.model";

// Create a new response
export async function createResponse(
  formId: string,
  responseData: { [key: string]: any }
) {
  try {
    connectToDatabase();

    const form = await Form.findById(formId);
    if (!form) {
      throw new Error("Form not found");
    }
    console.log(formId);

    const newResponse = await Response.create({
      formId: formId,
      title: form.title,
      responseData,
    });

    return {
      _id: newResponse._id.toString(),
      formTitle: newResponse.title,
      formId: newResponse.formId,
      responseData: newResponse.responseData,
    };
  } catch (error) {
    console.error("Error creating response:", error);
    throw new Error("Failed to create response");
  }
}

// Get all responses for a form
export async function getResponsesByFormId(formId: string) {
  try {
    await connectToDatabase();

    const form = await Form.findById(formId);
    if (!form) {
      throw new Error("Form not found");
    }

    const responses = await Response.find({ formId });

    return responses.map((response) => ({
      _id: response._id.toString(),
      formTitle: response.title,
      formId: response.formId,
      responseData: response.responseData,
    }));
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw new Error("Failed to fetch responses");
  }
}

// Get a specific response by its ID
export async function getResponseById(responseId: string) {
  try {
    await connectToDatabase();

    const response = await Response.findById(responseId);

    if (!response) {
      throw new Error("Response not found");
    }

    console.log({
      _id: response._id.toString(),
      formId: response.formId.toString(),
      responseData: response.responseData,
    });
    return {
      _id: response._id.toString(),
      formId: response.formId.toString(),
      responseData: response.responseData,
    };
  } catch (error) {
    console.error("Error fetching response:", error);
    throw new Error("Failed to fetch response");
  }
}

// Update a specific response by its ID
export async function updateResponseById(
  responseId: string,
  updatedData: { [key: string]: any }
) {
  try {
    await connectToDatabase();

    const response = await Response.findByIdAndUpdate(
      responseId,
      { responseData: updatedData },
      { new: true }
    );

    if (!response) {
      throw new Error("Response not found");
    }

    return {
      _id: response._id.toString(),
      formId: response.formId,
      responseData: response.responseData,
    };
  } catch (error) {
    console.error("Error updating response:", error);
    throw new Error("Failed to update response");
  }
}

// Delete a specific response by its ID
export async function deleteResponseById(responseId: string) {
  try {
    await connectToDatabase();

    const response = await Response.findByIdAndDelete(responseId);

    console.log("here", response);

    if (!response) {
      throw new Error("Response not found");
    }

    return {
      message: "Response deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting response:", error);
    throw new Error("Failed to delete response");
  }
}
