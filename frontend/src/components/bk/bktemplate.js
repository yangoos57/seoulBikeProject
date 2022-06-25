import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import BkTitleName from "./bktitlename";
import L from "leaflet";
import BkMapData from "./bkmapdata";
import MlGeoLocation from "../ml/mlgeolocation";

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

function BkTemplate() {
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
          <div className="bg-white flex-column flex-container">
            <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
              <div className=" flex-container justify-content-between" style={{ flexBasis: "60%" }}>
                <div className="mx-2" style={{ flexBasis: "30%" }}>
                  <BkTitleName fontValue="30px" />
                </div>
                <div className=" flex-container mx-3" style={{ flexBasis: "30%" }}>
                  {/* weather Component */}
                  <div className="m-auto border border-2">날씨정보 API 넣기 </div>
                </div>
              </div>
              <div className="flex-container pb-2" style={{ flexBasis: "40%" }}>
                <div
                  className="m-auto bg-white flex-container p-1"
                  style={{ width: "90%", height: "80%", border: "1px dashed black" }}>
                  <div className="my-auto mx-3">
                    <i className=" fa-solid fa-magnifying-glass fa-lg"></i>{" "}
                  </div>
                  {/* Selector Component */}
                  <div className="my-auto">
                    출발대여소 검색하기 <br />
                    (Selector component)
                  </div>
                </div>
              </div>
            </div>
            {/* 지도부분 */}
            <div className="bg-success flex-container" style={{ flexBasis: "70%" }}>
              <BkMapData>
                <Marker position={curLoca} icon={current_icon()} />
                <ChangeView
                  center={curLoca} //
                  zoom={14}
                />
              </BkMapData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BkTemplate;
