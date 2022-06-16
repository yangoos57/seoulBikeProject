import React, { useState } from "react";
import Timeselect from "./time_select";

function Test() {
  const [val, setVal] = useState(0);
  console.clear();
  return (
    <div>
      <Timeselect onChange={setVal} value={{ img_2: "hello", img_4: "world" }} />
      {val}
    </div>
  );
}

export default Test;
