import React, { useEffect, useState } from "react";
import { Marker, Polyline, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import BkMainFrame from "./bkmainframe";
import BkMapData from "./bkmapdata";
import BkSelect from "./bkselect";
import bikegreen from "./assets/icons/bikegreen.svg";
import arricon from "./assets/icons/arricon.svg";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import BkDirctionInfo from "./bkdirectioninfo";
import axios from "axios";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function bikeIcon() {
  return L.icon({
    iconUrl: bikegreen,
    iconSize: [25, 25],
  });
}

function arrIcon() {
  return L.icon({
    iconUrl: arricon,
    iconSize: [35, 35],
  });
}

//main
const BkDirection = () => {
  const navigate = useNavigate();

  // 대여소 재검색 기능
  const [stationInfo, setStationInfo] = useState(undefined);

  if (stationInfo !== undefined) {
    navigate("/bk/departure", { state: stationInfo });
  }

  const location = useLocation();
  const params = location.state;
  const dep = params["dep"]; // coor, label, value,
  const arr = params["arr"]; // coor, label, value, min

  // 경로추천
  const [direction, setDirection] = useState([[0, 0]]);
  useEffect(() => {
    axios.post("api/direction", { dep: dep, arr: arr }).then((res) => {
      setDirection(res.data);
    });
  }, [dep, arr]);

  //child1
  function child1() {
    return <BkSelect setStationInfo={setStationInfo} />;
  }

  //child2
  function child2() {
    return (
      <div className="w-100 h-100">
        <BkDirctionInfo dep={dep} arr={arr} />
        <BkMapData>
          <ChangeView
            center={direction !== undefined ? direction[Math.round(direction.length / 3)] : ""} //
            zoom={arr["dist"] > 5 ? 11 : arr["dist"] > 3 ? 12 : arr["dist"] > 1 ? 13 : 14}
          />
          <Marker position={JSON.parse(dep["coor"])} icon={bikeIcon()} />
          <Polyline
            pathOptions={{ color: "var(--black-color)", opacity: 0.6 }} //
            positions={direction}
          />
          <Marker position={JSON.parse(arr["coor"])} icon={arrIcon()}></Marker>
        </BkMapData>
      </div>
    );
  }
  return <BkMainFrame children={child1()} children2={child2()} />;
};

export default BkDirection;
