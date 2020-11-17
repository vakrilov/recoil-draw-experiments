import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { ShapeDef } from "../state/shapes";
import { selectedShape } from "../state/selection";
import { TextField } from "@material-ui/core";

const renderInfo = (shape: ShapeDef) => (
  <>
    <h3> Shape: {shape.id}</h3>
    <p>x: {shape.x} </p>
    <p>y: {shape.y} </p>
    <p>width: {shape.width} </p>
    <p>height: {shape.height} </p>
  </>
);
type ShapeInputProps = {
  shape: ShapeDef;
  name: keyof ShapeDef;
  setShapeProp: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export const ShapePropInput: React.FC<ShapeInputProps> = ({
  shape,
  name,
  setShapeProp
}) => (
  <TextField
    label={name}
    name={name}
    type="number"
    value={shape[name]}
    inputProps={{ step: 10 }}
    onChange={setShapeProp}
  />
);
export const Propbox: React.FC = () => {
  const [shape, setShape] = useRecoilState(selectedShape);

  const setShapeProp = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (shape) {
        setShape({ ...shape, [e.target.name]: value });
      }
    },
    [shape, setShape]
  );

  if (!shape) {
    return <div className="propbox"> select something</div>;
  } else {
    return (
      <div className="propbox">
        <h3> Shape: {shape.id}</h3>
        <ShapePropInput shape={shape} setShapeProp={setShapeProp} name="x" />
        <ShapePropInput shape={shape} setShapeProp={setShapeProp} name="y" />
        <ShapePropInput
          shape={shape}
          setShapeProp={setShapeProp}
          name="width"
        />
        <ShapePropInput
          shape={shape}
          setShapeProp={setShapeProp}
          name="height"
        />
        <TextField
          label="text"
          name="text"
          value={shape.text}
          onChange={setShapeProp}
        />
      </div>
    );
  }
};
