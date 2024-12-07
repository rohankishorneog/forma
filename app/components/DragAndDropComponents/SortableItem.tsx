import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableProps {
  children: React.ReactNode;
  id: string;
}

export function SortableItem(props: SortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleAttributes = {
    ...attributes,
    ...listeners,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      <span
        {...dragHandleAttributes}
        className="cursor-grab mr-2 p-2 bg-transparent rounded opacity-5 hover:opacity-65"
      >
        #
      </span>

      <div className="flex-1">{props.children}</div>
    </div>
  );
}
