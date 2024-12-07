"use client";

import Draggable from "@/app/components/DragAndDropComponents/Draggable";
import FormCanvas from "@/app/components/FormCanvas/FormCanvas";
import { fields } from "@/app/constants/constants";
import { Field_Types } from "@/app/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useState } from "react";

const Page = () => {
  const [formFields, setFormFields] = useState<Field_Types[]>([]);


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active);
    console.log(over);

    if (!over) return;

    if (active.id !== over.id) {
      setFormFields((items) => {
        const itemIds = items.map((item) => item.id);
        const oldIndex = itemIds.indexOf(active.id.toString());
        const newIndex = itemIds.indexOf(over.id.toString());
        console.log(oldIndex, newIndex);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  console.log(formFields);

  const handleAddField = (newField: Field_Types) => {
    setFormFields((prevFields) => [
      ...prevFields,
      { ...newField, id: Date.now().toLocaleString() },
    ]);
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

  const handleAddFieldOnDragEnd = (e: DragEndEvent) => {
    if (!e.active.id && !fields) return;
    const fieldToAdd = fields.find((field) => field.type === e.active.id);
    handleAddField(fieldToAdd);
  };

  console.log(formFields);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleAddFieldOnDragEnd}
    >
      <div className="flex flex-col w-screen h-screen items-center pt-12">
        <div className="w-full justify-center gap-7 mb-10 hidden md:flex">
          {fields.map((field) => (
            <Draggable key={field.type} id={field.type}>
              <button
                key={field.label}
                className="bg-slate-900 text-white px-2 py-1 rounded-md"
                onClick={() => handleAddField(field)}
              >
                {field.type}
              </button>
            </Draggable>
          ))}
        </div>
        <FormCanvas
          fields={formFields}
          handleRemove={removeFormField}
          handleDragEnd={handleDragEnd}
          
        />
      </div>
    </DndContext>
  );
};

export default Page;
