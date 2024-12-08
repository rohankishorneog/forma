import React, { useRef } from "react";
import MobileAddFieldButton from "../MobileAddFieldButton/MobileAddFieldButton";
import { Field_Types } from "@/app/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../DragAndDropComponents/SortableItem";
import { Droppable } from "../DragAndDropComponents/Droppable";

interface FormCanvasProps {
  fields: Field_Types[];
  handleRemove: (field: Field_Types) => void;
  handleDragEnd: (event: any) => void;
  handleSelectedField: (field: Field_Types) => void;
  openDialog: () => void;
}

const FormCanvas = ({
  fields,
  handleRemove,
  handleDragEnd,
  handleSelectedField,
  openDialog,
}: FormCanvasProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEdit = (field: Field_Types) => {
    handleSelectedField(field);

    if (window.innerWidth < 768) openDialog();
  };

  return (
    <>
      <MobileAddFieldButton />
      <div
        className={`bg-slate-600 border-2 border-black shadow-md h-[calc(100vh-10rem)] flex  ${
          fields.length > 0 ? "items-start" : "items-center"
        } rounded-md p-10 sm:w-full md:w-[500px] lg:w-[750px] overflow-y-auto`}
      >
        {fields.length === 0 && (
          <p>Add fields by clicking or dragging the fields here.</p>
        )}

        <Droppable id="droppable">
          <div className="flex flex-col gap-2 w-full bg-pink-400">
            <SortableContext
              items={fields.map((field) => field.id || "")}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field: Field_Types) => (
                <SortableItem key={field.id} id={field?.id || ""}>
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
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        </Droppable>
      </div>
    </>
  );
};

export default FormCanvas;

export const getFieldComponent = (field: Field_Types) => {
  switch (field.type.toLowerCase()) {
    case "short answer":
    case "long answer":
      return <textarea className="w-full" placeholder={field.placeholder} />;
    case "select":
      return (
        <select className="w-full">
          {field.options &&
            field.options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
      );
    default:
      return (
        <input
          type={field.type}
          className="w-full"
          placeholder={field.placeholder}
        />
      );
  }
};
