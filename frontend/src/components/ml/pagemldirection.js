import React, { useEffect, useState } from "react";
import MlSearchButton from "./mlsearchbutton";
import MlSlider from "./mlslider";
import MlMapData from "./mlmapdata";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MlDirection() {
  const [mapData, setMapData] = useState("");
  const location = useLocation();
  const depArrParams = location.state;

  useEffect(() => {
    axios
      .post("api/leafletMap", depArrParams) //

      .then((res) => setMapData(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="whole-ml d-flex ">
      <div className="main-ml m-auto ">
        <div
          style={{ position: "relative" }} //
          className="flex-container">
          {/* 검색창 */}
          <MlSearchButton />

          {/* card */}
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              width: "100%",
              top: "65%",
              height: "30%",
            }}>
            <MlSlider />
          </div>

          {/* 지도*/}
          <div className="flex-item">
            <MlMapData mapdata={mapData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MlDirection;
