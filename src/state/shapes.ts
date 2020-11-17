import { atom, atomFamily } from "recoil";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ShapeDef = Rect & {
  id: number;
  text: string;
};

export const shapeFamily = atomFamily({
  key: "shapes",
  default: (id: number) => ({
    id,
    x: 100 + (id % 5) * 100,
    y: 100 + Math.floor(id / 5) * 100,
    width: 80,
    height: 80,
    text: "hi"
  })
});

export const shapeList = atom<number[]>({
  key: "shape-list",
  default: [0, 1, 2]
});
