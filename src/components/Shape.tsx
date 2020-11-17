import * as React from "react";
import { useRecoilState } from "recoil";
import { shapeFamily } from "../state/shapes";
import { selectedShapeIds, selectionDrag } from "../state/selection";
import { positionStyle } from "../utils";

type ShapeProps = {
  id: number;
};

export const Shape: React.FC<ShapeProps> = ({ id }) => {
  const [shape] = useRecoilState(shapeFamily(id));
  const [selectedIds, setSelectedIds] = useRecoilState(selectedShapeIds);
  const [, setSelectionDrag] = useRecoilState(selectionDrag);

  const select = React.useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();

      if (e.nativeEvent.shiftKey) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([id]);
        setSelectionDrag({
          isMoving: true,
          offsetX: e.nativeEvent.offsetX,
          offsetY: e.nativeEvent.offsetY,
          pointerId: e.pointerId
        });
      }
    },
    [id, selectedIds, setSelectedIds, setSelectionDrag]
  );

  return (
    <div onPointerDown={select} className="shape" style={positionStyle(shape)}>
      <span>{shape.text}</span>
    </div>
  );
};
