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
import BkDirctionInfo from "./bkdirectioninfo";

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
  // console.log("dep", dep);
  //   console.log("arr", arr);

  //child1
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

  //child2
  function child2() {
    return (
      <div className="w-100 h-100">
        <BkDirctionInfo dep={dep} arr={arr} />
        <BkMapData>
          {/* <Marker position={dep["coor"]} icon={bikeIcon()} /> */}
          <Marker position={[37.534863, 126.90241]} icon={bikeIcon()} />

          <Marker position={arr["coor"]} icon={arrIcon()}></Marker>
        </BkMapData>
      </div>
    );
  }
  return <BkMainFrame children={child1()} children2={child2()} />;
};

export default BkDirection;
