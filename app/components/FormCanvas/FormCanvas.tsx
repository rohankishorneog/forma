"use client";

import React, { useRef, useState, useEffect } from "react";
import MobileAddFieldButton from "../MobileAddFieldButton/MobileAddFieldButton";
import { Field_Types } from "@/app/types";
import DropTarget from "../DragAndDropComponents/DropTarget";
import DraggableItem from "../DragAndDropComponents/DraggableItem";
import FieldDetails from "../FieldDetails/FieldDetails";
import FieldDetailsModal from "../FieldDetails/FieldDetailsModal";
import { fields } from "@/app/constants/constants";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { createForm, updateForm } from "@/lib/actions/forms.actions";
import { useRouter } from "next/navigation";
import { getFieldComponent } from "../getFieldComponent/getFieldComponent";
import Edit from "@/app/assets/icons/Edit";
import Trash from "@/app/assets/icons/Trash";
import { toast } from "react-toastify";

interface FormCanvas {
  form?: {
    _id: string;
    title: string;
    fields: Field_Types[];
  };
  params?: {
    id: string;
  };
}

const FormCanvas = ({ form }: FormCanvas) => {
  const [formTitle, setFormTitle] = useState(form?.title || "Untitled Form");
  const [formFields, setFormFields] = useState<Field_Types[]>(
    form?.fields || []
  );
  const [selectedField, setSelectedField] = useState<Field_Types | null>(null);

  const router = useRouter();

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (form) setFormTitle(form?.title || "untitled form");
  }, [form]);

  useEffect(() => {
    if (form) setFormFields(form?.fields || []);
  }, [form]);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleAddField = (field: Field_Types) => {
    if (!field.id) {
      setFormFields((prevFields) => [
        ...prevFields,
        { ...field, id: Date.now().toString() },
      ]);
    }
  };

  const handleRemove = (field: Field_Types) => {
    setFormFields((prevFields) =>
      prevFields.filter((prevField) => prevField.id !== field.id)
    );
  };

  const handleEdit = (field: Field_Types) => {
    setSelectedField(field);

    if (isMobile) openDialog();
  };

  const handleUpdateField = () => {
    if (!selectedField) return;

    const errors: string[] = [];

    if (selectedField.label.trim().length === 0) {
      errors.push("Label cannot be empty");
      return toast("Label Can't be empty", {
        position: "top-center",
        type: "error",
      });
    }

    if (
      ["short answer", "long answer"].includes(selectedField.type) &&
      selectedField.placeholder?.trim().length === 0
    ) {
      return toast("Placeholder Can't be empty", {
        position: "top-center",
        type: "error",
      });
    }

    if (
      selectedField.type === "select" &&
      selectedField.options?.some((option) => option.trim().length === 0)
    ) {
      return toast("Options cant be empty,", {
        position: "top-center",
        type: "error",
      });
    }

    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField.id ? selectedField : field
      )
    );
    toast("Updated", { position: "top-center", type: "success" });

    setSelectedField(null);
  };
  const handleFormTitle = (title: string) => {
    setFormTitle(title);
  };

  useEffect(() => {
    return monitorForElements({
      onDrop: (e) => {
        const sourceField: Field_Types = e.source.data.field as Field_Types;
        const target = e.location.current.dropTargets[0];

        if (!target) return;

        const targetField = target.data;

        if (!sourceField || !targetField) return;

        const closestEdgeOfTarget = extractClosestEdge(target.data);

        // Find the index where we want to insert the new field
        const targetIndex = formFields.findIndex(
          (f) => f.id === targetField.id
        );
        const insertIndex =
          closestEdgeOfTarget === "bottom" ? targetIndex + 1 : targetIndex;

        // If it's a new field, add it at the specific index
        if (!sourceField.id) {
          setFormFields((prevFields) => {
            const newFieldWithId = {
              ...sourceField,
              id: Date.now().toString(),
            };
            const newFields = [...prevFields];
            newFields.splice(insertIndex, 0, newFieldWithId);
            return newFields;
          });
        } else {
          // Existing field reordering logic
          setFormFields((prevFields) => {
            const sourceIndex = prevFields.findIndex(
              (f) => f.id === sourceField.id
            );

            if (sourceIndex === -1 || targetIndex === -1) return prevFields;

            const reorderedFields = [...prevFields];
            const [removed] = reorderedFields.splice(sourceIndex, 1);
            reorderedFields.splice(insertIndex, 0, removed);
            return reorderedFields;
          });
        }
      },
    });
  }, [formFields]);

  const handleCreateForm = async () => {
    console.log("clicking");
    try {
      if (form?._id) {
        const updatedForm = await updateForm(form._id, {
          title: formTitle,
          fields: formFields,
        });
        router.push(`/forms/${updatedForm._id}`);
        toast("Succesfully Created", {
          position: "top-center",
          type: "success",
        });
      } else {
        const newForm = await createForm({
          title: formTitle,
          fields: formFields,
        });
        console.log(newForm);
        router.push(`/forms/${newForm._id}`);
      }
    } catch (error) {
      toast("Error creating form", { position: "top-center", type: "error" });
    }
  };

  return (
    <>
      <MobileAddFieldButton handleAddField={handleAddField} />

      <div className="h-[calc(100vh-6rem)] w-full flex">
        <div className="flex flex-col w-full h-full items-center pt-12">
          {/* Draggable Buttons */}
          <div className="w-full justify-center gap-2 mb-10 hidden md:flex sm:w-full md:w-[500px] lg:w-[750px]">
            {fields.map((field) => (
              <DraggableItem key={field.type} field={field}>
                <button className="bg-lime-200 border-2 border-lime-500  px-2 py-1 rounded-md w-full h-full">
                  {field.type}
                </button>
              </DraggableItem>
            ))}
          </div>

          <div className="sm:w-full md:w-[500px] lg:w-[750px] flex gap-3 mb-1 items-center justify-between">
            <label className="font-bold">Title:</label>

            <input
              value={formTitle}
              placeholder="Add Form Title"
              onChange={(e) => handleFormTitle(e.target.value)}
              className="bg-transparent flex-1"
            />

            <button
              className="bg-green-700 text-white p-1 rounded-md mt-3 text-sm"
              onClick={handleCreateForm}
            >
              {form?._id ? "Update " : "Create"}
            </button>
          </div>

          <div
            className={`bg-lime-200 border-2 border-lime-500 shadow-md h-[calc(100vh-20rem)] flex  ${
              fields.length > 0 ? "items-start" : "items-center"
            } rounded-md p-10 sm:w-full md:w-[500px] lg:w-[750px] overflow-y-auto`}
          >
            <DropTarget>
              {formFields.length === 0 && (
                <p>Add fields by clicking or dragging the fields here.</p>
              )}

              <div className="flex flex-col gap-2 w-full  rounded-lg">
                {formFields.map((field: Field_Types) => (
                  <DropTarget key={field.id} field={field}>
                    <DraggableItem key={field.id} field={field}>
                      <div
                        key={field.id}
                        className="flex gap-2 w-full items-center h-full border-lime-400 border p-2 rounded-md"
                      >
                        {getFieldComponent(field)}

                        <div className=" flex flex-col gap-2">
                          <button
                            onClick={() => handleEdit(field)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                          >
                            <Edit />
                          </button>
                          <button
                            onClick={() => handleRemove(field)}
                            className="bg-orange-500 text-white px-3 py-1 rounded-md"
                          >
                            <Trash />
                          </button>
                        </div>
                      </div>
                    </DraggableItem>
                  </DropTarget>
                ))}
              </div>
            </DropTarget>
          </div>
        </div>
        <div className=" bg-gray-100 shadow-lime-400 rounded-md  hidden md:flex shadow-lg p-2 h-full">
          <FieldDetails
            selectedField={selectedField}
            handleUpdateField={handleUpdateField}
            setSelectedField={setSelectedField}
          />
        </div>
        {/* Field Details Modal for smaller screen   */}
        <FieldDetailsModal
          selectedField={selectedField}
          handleUpdateField={handleUpdateField}
          setSelectedField={setSelectedField}
          openDialog={openDialog}
          closeDialog={closeModal}
          ref={modalRef}
        />
      </div>
    </>
  );
};

export default FormCanvas;
