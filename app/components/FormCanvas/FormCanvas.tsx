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

  const handleAddAndField = (field: Field_Types) => {
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

    if (selectedField.label.length === 0) {
      console.log("Error");
      return;
    }
    if (selectedField.options?.some((option) => option.length === 0)) {
      console.log("Error");
      return;
    }
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField.id ? selectedField : field
      )
    );
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
      } else {
        const newForm = await createForm({
          title: formTitle,
          fields: formFields,
        });
        console.log(newForm);
        router.push(`/forms/${newForm._id}`);
      }
    } catch (error) {}
  };

  return (
    <>
      <MobileAddFieldButton />

      <div className="w-screen h-screen flex">
        <div className="flex flex-col w-full h-full items-center pt-12">
          {/* Draggable Buttons */}
          <div className="w-full justify-center gap-7 mb-10 hidden md:flex">
            {fields.map((field) => (
              <DraggableItem key={field.type} field={field}>
                <button className="bg-slate-900 text-white px-2 py-1 rounded-md">
                  {field.type}
                </button>
              </DraggableItem>
            ))}
          </div>

          <input
            value={formTitle}
            placeholder="Add Form Title"
            onChange={(e) => handleFormTitle(e.target.value)}
          />
          <div
            className={`bg-slate-600 border-2 border-black shadow-md h-[calc(100vh-10rem)] flex  ${
              fields.length > 0 ? "items-start" : "items-center"
            } rounded-md p-10 sm:w-full md:w-[500px] lg:w-[750px] overflow-y-auto`}
          >
            <DropTarget>
              {formFields.length === 0 && (
                <p>Add fields by clicking or dragging the fields here.</p>
              )}

              <div className="flex flex-col gap-2 w-full bg-pink-400">
                {formFields.map((field: Field_Types) => (
                  <DropTarget key={field.id} field={field}>
                    <DraggableItem key={field.id} field={field}>
                      <div key={field.id} className="flex gap-2 w-full">
                        <div className="w-full">
                          <label className="w-full break-words break-all">
                            {field.label}
                          </label>
                          {getFieldComponent(field)}
                        </div>

                        <div className="self-end flex flex-col gap-2">
                          <button onClick={() => handleEdit(field)}>E</button>
                          <button onClick={() => handleRemove(field)}>R</button>
                        </div>
                      </div>
                    </DraggableItem>
                  </DropTarget>
                ))}
              </div>
            </DropTarget>
          </div>
          <button
            className="bg-green-700 text-white p-2 rounded-md"
            onClick={handleCreateForm}
          >
            {form?._id ? "Update Form" : "Create Form"}
          </button>

          <div className="p-4 bg-gray-100 shadow-lg rounded-md ml-4 hidden md:flex">
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
      </div>
    </>
  );
};

export default FormCanvas;
