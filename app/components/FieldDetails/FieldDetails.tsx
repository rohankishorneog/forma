import { Field_Types } from "@/app/types";
import React from "react";

interface FieldDetailsProps {
  selectedField: Field_Types | null;
  setSelectedField: React.Dispatch<React.SetStateAction<Field_Types | null>>;
  handleUpdateField: () => void;
  onClose?: () => void;
}

const FieldDetails = ({
  selectedField,
  setSelectedField,
  handleUpdateField,
  onClose,
}: FieldDetailsProps) => {
  const handleSetSelectedField = (
    key: keyof Field_Types,
    value: string,
    index?: number
  ) => {
    if (!value) return;
    setSelectedField((prev) => {
      if (!prev) return prev;

      if (key === "options" && typeof index === "number") {
        return {
          ...prev,
          options: prev.options?.map((opt, idx) =>
            idx === index ? value : opt
          ),
        };
      }

      return { ...prev, [key]: value };
    });
  };

  if (!selectedField) {
    return (
      <p className="text-gray-500 text-center flex justify-center items-center">
        Select a field to edit details.
      </p>
    );
  }

  const handleUpdate = () => {
    handleUpdateField();
    if (onClose) onClose();
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Field Details</h3>

      {/* Label */}
      <label className="block mb-2 text-sm font-medium">Label</label>
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        value={selectedField.label}
        onChange={(e) => handleSetSelectedField("label", e.target.value)}
      />

      {/* Placeholder */}
      {["short answer", "long answer"].includes(selectedField.type) && (
        <>
          <label className="block mb-2 text-sm font-medium">Placeholder</label>
          <textarea
            className="w-full p-2 border rounded-md mb-4"
            value={selectedField.placeholder || ""}
            onChange={(e) =>
              handleSetSelectedField("placeholder", e.target.value)
            }
          />
        </>
      )}

      {/* Select Options */}
      {selectedField.type === "select" && (
        <>
          <label className="block mb-2 text-sm font-medium">Options</label>
          <div className="space-y-2">
            {selectedField.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="p-2 border rounded-md flex-1"
                  value={option}
                  onChange={(e) =>
                    handleSetSelectedField("options", e.target.value, index)
                  }
                />
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() =>
                    setSelectedField((prev) =>
                      prev
                        ? {
                            ...prev,
                            options: prev.options?.filter(
                              (_, idx) => idx !== index
                            ),
                          }
                        : prev
                    )
                  }
                >
                  R
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={() =>
              setSelectedField((prev) =>
                prev
                  ? {
                      ...prev,
                      options: [...(prev.options || []), ""],
                    }
                  : prev
              )
            }
          >
            Add Option
          </button>
        </>
      )}

      {/* Update Button */}
      <button
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default FieldDetails;
