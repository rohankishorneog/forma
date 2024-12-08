"use client";

import Draggable from "@/app/components/DragAndDropComponents/Draggable";
import FieldDetails from "@/app/components/FieldDetails/FieldDetails";
import FieldDetailsModal from "@/app/components/FieldDetails/FieldDetailsModal";
import FormCanvas from "@/app/components/FormCanvas/FormCanvas";
import { fields, findField } from "@/app/constants/constants";
import { Field_Types } from "@/app/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useRef, useState } from "react";

const Page = () => {
  const [formFields, setFormFields] = useState<Field_Types[]>([]);
  const [selectedField, setSelectedField] = useState<Field_Types | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<Field_Types | null>(null);

  const handleSelectedField = (field: Field_Types) => {
    setSelectedField(field);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveOverlay(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const itemIds = formFields.map((item) => item.id);

    const draggableFieldTypes = [
      "long answer",
      "short answer",
      "url",
      "select",
      "number",
    ];

    // Handle adding a new field
    if (draggableFieldTypes.includes(activeId)) {
      const fieldToAdd = fields.find((field) => field.type === activeId);
      if (fieldToAdd) {
        const newField = { ...fieldToAdd, id: Date.now().toString() };

        if (overId === "droppable") {
          setFormFields((currentFields) => [...currentFields, newField]);
        } else if (itemIds.includes(overId)) {
          const overIndex = itemIds.indexOf(overId);
          setFormFields((currentFields) => {
            const updatedFields = [...currentFields, newField];
            return arrayMove(
              updatedFields,
              updatedFields.length - 1,
              overIndex
            );
          });
        }
      }
      return;
    }

    // Handle reordering existing fields
    if (
      activeId !== overId &&
      itemIds.includes(activeId) &&
      itemIds.includes(overId)
    ) {
      const oldIndex = itemIds.indexOf(activeId);
      const newIndex = itemIds.indexOf(overId);
      setFormFields((currentFields) =>
        arrayMove(currentFields, oldIndex, newIndex)
      );
    }
  };

  const removeFormField = (field: Field_Types) => {
    setFormFields((prevFields) =>
      prevFields.filter((prevField) => prevField.id !== field.id)
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) =>
        setActiveOverlay(findField(event?.active?.id.toString()) || null)
      }
    >
      <div className="w-screen h-screen flex">
        <div className="flex flex-col w-full h-full items-center pt-12">
          {/* Draggable Buttons */}
          <div className="w-full justify-center gap-7 mb-10 hidden md:flex">
            {fields.map((field) => (
              <Draggable key={field.type} id={field.type}>
                <button
                  className="bg-slate-900 text-white px-2 py-1 rounded-md"
                  // onClick={() => handleAddField(field)}
                >
                  {field.type}
                </button>
              </Draggable>
            ))}
          </div>
          {/* Form Canvas */}
          <FormCanvas
            fields={formFields}
            handleRemove={removeFormField}
            handleDragEnd={handleDragEnd}
            handleSelectedField={handleSelectedField}
            openDialog={openDialog}
          />
        </div>

        {/* Field Details Sidebar for larger screen */}
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
    </DndContext>
  );
};

export default Page;
