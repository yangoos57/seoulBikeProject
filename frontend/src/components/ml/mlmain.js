import React from "react";
import "./assets/mlstyle.css";
import MlMap from "./mlmap";
import MlTitle from "./mltitle";
import MlSearch from "./mlsearch";
import MlSearch2 from "./mlsearch2";
function MLMain() {
  return (
    <>
      <div className="whole-ml">
        <div className="main-ml m-auto ">
          {/* <MlTitle /> */}
          {/* <MlMap /> */}
          <MlSearch2 />
        </div>
      </div>
    </>
  );
}
export default MLMain;
