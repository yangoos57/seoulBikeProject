import React, { useEffect, useState } from "react";
import "./assets/mlstyle.css";
import MlMapData from "./mlmapdata";
import MlSearchButton from "./mlsearchbutton";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function current_icon() {
  return L.icon({
    iconUrl: require("./assets/icons/current_icon.png"),
    iconSize: [55, 55],
    iconAnchor: [10, 35],
  });
}
function MlMain() {
  // 현재좌표 불러오기
  const [curLoca, setCurLoca] = useState([37.534863, 126.90241]);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setCurLoca([crd.latitude, crd.longitude]);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  // 여기까지

  return (
    <>
      <div className="whole-ml d-flex ">
        <div className="main-ml m-auto ">
          <div style={{ position: "relative" }} className="flex-container">
            <MlSearchButton name="출발장소 검색" />
            <div className="flex-item">
              <MlMapData mapdata={""} change={true}>
                <Marker position={curLoca} icon={current_icon()} />
                <ChangeView
                  center={curLoca} //
                  zoom={14}
                />
              </MlMapData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MlMain;
