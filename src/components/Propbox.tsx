import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { ShapeDef } from "../state/shapes";
import { selectedShape } from "../state/selection";
import { TextField } from "@material-ui/core";

type NumberInputProps = {
  shape: ShapeDef;
  name: keyof ShapeDef;
  setShapeProp: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export const NumberInput: React.FC<NumberInputProps> = ({
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
    return (
      <div className="propbox">
        <h3>Select Something</h3>
      </div>
    );
  } else if (shape.isMultiple) {
    return (
      <div className="propbox">
        <h3> Multiple Selection</h3>
      </div>
    );
  } else {
    return (
      <div className="propbox">
        <h3> Shape: {shape.id}</h3>
        <NumberInput shape={shape} setShapeProp={setShapeProp} name="x" />
        <NumberInput shape={shape} setShapeProp={setShapeProp} name="y" />
        <NumberInput shape={shape} setShapeProp={setShapeProp} name="width" />
        <NumberInput shape={shape} setShapeProp={setShapeProp} name="height" />
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
