import * as React from "react";
import { useRecoilState } from "recoil";
import { Shape } from "./Shape";
import { Selection } from "./Selection";
import { shapeList } from "../state/shapes";
import { useResetRecoilState } from "recoil";
import { selectedShapeIds } from "../state/selection";

export const Plot: React.FC = () => {
  const [shapes] = useRecoilState(shapeList);
  const resetSelection = useResetRecoilState(selectedShapeIds);
  return (
    <div className="plot" onPointerDown={resetSelection}>
      {shapes.map((id) => (
        <Shape key={id} id={id} />
      ))}

      <Selection />
    </div>
  );
};
