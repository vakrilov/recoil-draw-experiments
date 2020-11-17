import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectedShape, selectionDrag } from "../state/selection";
import { positionStyle } from "../utils";

const borderSize = 3;

export const Selection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const [shape, setSelected] = useRecoilState(selectedShape);
  const [dragState, setDragState] = useRecoilState(selectionDrag);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();

      setDragState({
        isMoving: true,
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
        pointerId: e.pointerId
      });
    },
    [setDragState]
  );

  const drag = useCallback(
    (e: React.PointerEvent) => {
      if (dragState.isMoving && shape) {
        setSelected({
          ...shape,
          x: e.clientX - dragState.offsetX,
          y: e.clientY - dragState.offsetY
        });
      }
    },
    [shape, dragState, setSelected]
  );

  const stopDrag = useCallback(
    (e: React.PointerEvent) => {
      setDragState({ isMoving: false, offsetX: 0, offsetY: 0, pointerId: 0 });
    },
    [setDragState]
  );

  useEffect(() => {
    const div = ref.current;
    if (shape && div && dragState.isMoving) {
      div.setPointerCapture(dragState.pointerId);
    }
    return () => {
      if (div && div.hasPointerCapture(dragState.pointerId)) {
        div?.releasePointerCapture(dragState.pointerId);
      }
    };
  }, [shape, dragState.isMoving, dragState.pointerId]);

  const startResize = useCallback(
    (e: React.PointerEvent) => {
      if (shape && resizeHandleRef.current) {
        e.stopPropagation();
        setDragState({
          isResizing: true,
          offsetX: e.clientX - shape.width,
          offsetY: e.clientY - shape.height,
          pointerId: e.pointerId
        });
        resizeHandleRef.current.setPointerCapture(e.pointerId);
      }
    },
    [setDragState, shape]
  );

  const resize = useCallback(
    (e: React.PointerEvent) => {
      if (dragState.isResizing && shape) {
        setSelected({
          ...shape,
          ...{
            width: Math.max(e.clientX - dragState.offsetX, 10),
            height: Math.max(e.clientY - dragState.offsetY, 10)
          }
        });
      }
    },
    [shape, dragState, setSelected]
  );

  const stopResize = useCallback(
    (e: React.PointerEvent) => {
      setDragState({ isResizing: false, offsetX: 0, offsetY: 0, pointerId: 0 });
      if (
        resizeHandleRef.current &&
        resizeHandleRef.current.hasPointerCapture(e.pointerId)
      ) {
        resizeHandleRef.current.releasePointerCapture(e.pointerId);
      }
    },
    [setDragState]
  );

  return shape ? (
    <div
      ref={ref}
      className="selection"
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      style={positionStyle(shape, borderSize)}
    >
      <div
        ref={resizeHandleRef}
        className="resize-handle"
        onPointerDown={startResize}
        onPointerMove={resize}
        onPointerUp={stopResize}
      >
        {" "}
      </div>
    </div>
  ) : null;
};
