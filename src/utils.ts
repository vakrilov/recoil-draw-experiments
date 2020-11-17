import { CSSProperties } from "react";
import { ShapeDef, Rect } from "../state/shapes";

export const positionStyle = (
  shape: ShapeDef,
  padding: number = 0
): CSSProperties => ({
  left: `${shape.x - padding}px`,
  top: `${shape.y - padding}px`,
  width: `${shape.width + 2 * padding}px`,
  height: `${shape.height + 2 * padding}px`
});

export const getBoundingRect = (rects: Rect[]): Rect => {
  let [first, ...rest] = rects;

  let curr = {
    x: first.x,
    y: first.y,
    width: first.width,
    height: first.height
  };

  rest.forEach((rect) => {
    const xDelta = curr.x - rect.x;
    if (xDelta > 0) {
      curr.width += xDelta;
      curr.x = rect.x;
    }

    const yDelta = curr.y - rect.y;
    if (yDelta > 0) {
      curr.height += yDelta;
      curr.y = rect.y;
    }

    const leftDelta = rect.x + rect.width - (curr.x + curr.width);
    if (leftDelta > 0) {
      curr.width += leftDelta;
    }

    const bottomDelta = rect.y + rect.height - (curr.y + curr.height);
    if (bottomDelta > 0) {
      curr.height += bottomDelta;
    }
  });

  return curr;
};
