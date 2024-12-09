"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { Field_Types } from "@/app/types";

const DraggableItem = ({
  children,
  field,
}: {
  children: ReactNode;
  field: Field_Types;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,

      onDragStart: (e) => {
        // console.log(e);
        setDragging(true);
      },
      onDrag: (e) => {
        // console.log(e);
      },
      onDrop: () => {
        setDragging(false);
      },

      getInitialData: () => ({ field }),
    });
  });

  return (
    <>
      <div ref={ref} className={`${dragging ? "bg-lime-600" : ""} w-full`}>
        {children}
      </div>
    </>
  );
};

export default DraggableItem;
