import React, { useState } from "react";
import Timeselect from "./time_select";

function Test() {
  const [val, setVal] = useState(0);
  console.clear();
  return (
    <div>
      <div class="fa-4x">
        <span className="fa-layers fa-fw" style={{ background: "MistyRose" }}>
          <i className="fas fa-play" data-fa-transform="rotate--90 grow-2"></i>
          <i className="fas fa-sun fa-inverse" data-fa-transform="shrink-10 up-2"></i>
          <i className="fas fa-moon fa-inverse" data-fa-transform="shrink-11 down-4.2 left-4"></i>
          <i className="fas fa-star fa-inverse" data-fa-transform="shrink-11 down-4.2 right-4"></i>
        </span>
      </div>
    </div>
  );
}

export default Test;
