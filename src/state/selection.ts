import { atom, DefaultValue, selector } from "recoil";
import { ShapeDef, shapeFamily } from "./shapes";
import { getBoundingRect } from "../utils";

export const selectedShapeIds = atom<number[]>({
  key: "selected-shape-id",
  default: []
});

export const selectedShape = selector<ShapeDef | undefined>({
  key: "selected-shape",
  get: ({ get }) => {
    const selectedShapes = get(selectedShapeIds).map((shapeId) =>
      get(shapeFamily(shapeId))
    );

    if (selectedShapes.length === 0) {
      return undefined;
    } else if (selectedShapes.length === 1) {
      return selectedShapes[0];
    } else {
      const rect = getBoundingRect(selectedShapes);
      return {
        ...rect,
        id: -1,
        text: ""
      };
    }
  },
  set: ({ get, set }, value) => {
    if (!value || value instanceof DefaultValue) {
      return;
    }

    const ids = get(selectedShapeIds);
    if (ids.length === 1) {
      const state = shapeFamily(ids[0]);
      set(state as any, value);
    } else if (ids.length > 1) {
      const selectedShapes = ids.map((shapeId) => get(shapeFamily(shapeId)));
      const rect = getBoundingRect(selectedShapes);
      const offsetX = value.x - rect.x;
      const offsetY = value.y - rect.y;
      selectedShapes.forEach((shape) => {
        const state = shapeFamily(shape.id);
        set(state as any, {
          ...shape,
          x: shape.x + offsetX,
          y: shape.y + offsetY
        });
      });
    }
  }
});

type SelectionDragState = {
  isMoving?: boolean;
  isResizing?: boolean;
  offsetX: number;
  offsetY: number;
  pointerId: number;
};

export const selectionDrag = atom<SelectionDragState>({
  key: "selection-drag",
  default: {
    isMoving: false,
    isResizing: false,
    offsetX: 0,
    offsetY: 0,
    pointerId: 0
  }
});
