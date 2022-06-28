import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { useLocation } from "react-router-dom";
import BkMainFrame from "./bkmainframe";
import BkMapData from "./bkmapdata";
import BkSelect from "./bkselect";
import bikegreen from "./assets/icons/bikegreen.svg";
import arricon from "./assets/icons/arricon.svg";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

function bikeIcon() {
  return L.icon({
    iconUrl: bikegreen,
    iconSize: [25, 25],
  });
}

function arrIcon() {
  return L.icon({
    iconUrl: arricon,
    iconSize: [30, 30],
  });
}

//main
const BkDirection = () => {
  const navigate = useNavigate();
  const [stationInfo, setStationInfo] = useState(undefined);

  if (stationInfo !== undefined) {
    navigate("/bk", { state: stationInfo });
  }

  const location = useLocation();
  const params = location.state;
  const dep = params["dep"]; // coor, label, value,
  const arr = params["arr"]; // coor, label, value, min
  //   console.log("dep", dep);
  //   console.log("arr", arr);

  function child1() {
    return (
      <div
        className="d-flex mx-auto"
        style={{
          flexBasis: "30%", //
          border: "0.9px dashed black",
          width: "90%",
        }}>
        <div className="m-auto" style={{ flexBasis: "100%" }}>
          <BkSelect setStationInfo={setStationInfo} />
        </div>
      </div>
    );
  }
  function child2() {
    return (
      <div className="w-100 h-100">
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            backgroundColor: "var(--black-color)",
            height: "30%",
            width: "80%",
            zIndex: 1000,
            borderRadius: "5px",
            display: "flex",
          }}>
          <div
            className="d-flex flex-column p-2 justify-content-start ms-3" //
            style={{ color: "var(--silver-color)", paddingLeft: "20px", width: "90%", fontSize: "15px" }}>
            {/* 1 */}
            <div style={{ flexBasis: "5%" }}> </div>
            {/* 2 */}
            <div className="d-flex" style={{ flexBasis: "15%" }}>
              <div className="my-auto" style={{ fontFamily: "NEXON" }}>
                출발 :
              </div>
              <div className="my-auto ms-2">{dep["label"]}</div>
            </div>
            <div style={{ flexBasis: "15%", marginLeft: "5px" }}>
              <i className="fa-solid fa-arrow-down"></i>
            </div>
            {/* 3 */}
            <div className="d-flex" style={{ flexBasis: "15%" }}>
              <div className="my-auto" style={{ fontFamily: "NEXON" }}>
                도착 :
              </div>
              <div className="my-auto ms-2">{arr["label"]}</div>
            </div>
            {/* 4 */}
            <div className="p-1" style={{ flexBasis: "10%" }}></div>
            {/* 5 */}
            <div className="d-flex" style={{ flexBasis: "20%" }}>
              <div className="my-auto" style={{ fontFamily: "NEXON" }}>
                예상도착시간 :
              </div>
              <div className="my-auto ms-2">{arr["time"]} 분</div>
            </div>
          </div>
        </div>
        <BkMapData>
          <Marker position={arr["coor"]} icon={arrIcon()}></Marker>
        </BkMapData>
      </div>
    );
  }
  return <BkMainFrame children={child1()} children2={child2()} />;
};

export default BkDirection;
