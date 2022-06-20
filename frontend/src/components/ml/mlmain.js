import React from "react";
import "./assets/mlstyle.css";
import MlMap from "./mlmap";
import MlTitle from "./mltitle";
import MlSearchPage from "./mlsearchpage";
import MlMapCard from "./mlmapcard";

function MLMain() {
  return (
    <div className="whole-ml d-flex ">
      <div className="main-ml m-auto ">
        {/* <MlTitle /> */}
        {/* <MlMap /> */}
        {/* <MlSearchPage /> */}
        <MlMapCard />
      </div>
    </div>
  );
}
export default MLMain;
