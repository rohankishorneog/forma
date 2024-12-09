"use client";

import { Field_Types } from "@/app/types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ReactNode, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

interface DropTargetProps {
  children: ReactNode;
  field?: Field_Types;
}

export default function DropTarget({ children, field }: DropTargetProps) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
      onDrop: (e) => {
        console.log(e);
        setIsDraggedOver(false);
      },
      getData: () => ({
        ...field,
      }),
      getIsSticky: () => true,
    });
  }, [field]);

  return (
    <div
      className={`${
        isDraggedOver ? "bg-gray-100" : ""
      } w-full h-full flex flex-col items-center`}
      ref={ref}
    >
      {children}
    </div>
  );
}
