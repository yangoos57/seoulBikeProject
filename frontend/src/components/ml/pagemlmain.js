import React, { useState } from "react";
import "./assets/mlstyle.css";
import MlTitle from "./mltitle";
import MlMapData from "./mlmapdata";
import MlSearchButton from "./mlsearchbutton";
function MlMain() {
  const [isLogo, setIsLogo] = useState(true);
  setTimeout(() => setIsLogo(false), 1500);
  return (
    <>
      {isLogo ? (
        <MlTitle />
      ) : (
        <div className="whole-ml d-flex ">
          <div className="main-ml m-auto ">
            <div style={{ position: "relative" }} className="flex-container">
              <MlSearchButton />
              <div className="flex-item">
                <MlMapData mapdata={""} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MlMain;
