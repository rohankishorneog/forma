"use client";

import { deleteResponseById } from "@/lib/actions/responses.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResponseType } from "../response/ResponseItem";

interface DeleteResponseButtonProps {
  response: ResponseType;
}

const DeleteResponseButton: React.FC<DeleteResponseButtonProps> = ({
  response,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteResponse = async () => {
    setIsDeleting(true);
    try {
      await deleteResponseById(response._id);
      // Manually navigate after deletion
      router.push(`/forms/${response.formId}/responses`);
    } catch (error) {
      console.error("Failed to delete response", error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      className="bg-red-500 text-white w-18 md:w-24 rounded-md text-sm md:text-md p-2 disabled:opacity-50"
      onClick={handleDeleteResponse}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteResponseButton;
