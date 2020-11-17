import * as React from "react";
import { RecoilRoot } from "recoil";
import "./styles.scss";

import { Plot } from "./components/Plot";
import { Toolbox } from "./components/Toolbox";
import { Propbox } from "./components/Propbox";

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Plot />
        <Toolbox />
        <Propbox />
      </div>
    </RecoilRoot>
  );
}
