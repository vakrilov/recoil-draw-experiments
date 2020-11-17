import React from "react";
import { useRecoilState } from "recoil";
import { shapeList } from "../state/shapes";

export const Toolbox: React.FC = () => {
  const [list, setList] = useRecoilState(shapeList);

  const addShape = () => setList([...list, list.length]);
  return (
    <div className="toolbox">
      <button onClick={addShape}>add</button>
    </div>
  );
};
